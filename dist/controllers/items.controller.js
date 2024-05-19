"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.createItem = exports.updateItem = exports.SearchItem = exports.getBySubCategory = exports.getByCategory = exports.getItem = exports.getAllItems = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const prismaClient_1 = __importDefault(require("../prismaClient/prismaClient"));
const imageurl_1 = __importDefault(require("../utils/imageurl"));
const getAllItems = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    const data = yield prismaClient_1.default.item.findMany();
    response.message(true, "success", 200, data);
}));
exports.getAllItems = getAllItems;
const getItem = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    let { value } = req.params;
    value = value.toLowerCase().trim();
    const output = isNaN(parseInt(value)) ? "string" : "number";
    // search by name
    if (output === "string") {
        const data = yield prismaClient_1.default.item.findUnique({
            where: {
                name: value,
            },
        });
        response.message(true, "success", 200, data);
    }
    // search by id
    else if (output == "number") {
        const data = yield prismaClient_1.default.item.findUnique({
            where: {
                id: parseInt(value),
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.getItem = getItem;
// get item by category
const getByCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    let { category } = req.params;
    category = category.toLowerCase().trim();
    const output = isNaN(parseInt(category)) ? "string" : "number";
    // search by name
    if (output === "string") {
        const data = yield prismaClient_1.default.category.findUnique({
            where: {
                name: category,
            },
            select: {
                name: true, // Only select the 'name' field from Category
                items: true,
            },
        });
        response.message(true, "success", 200, data);
    }
    // search by id
    else if (output == "number") {
        const data = yield prismaClient_1.default.category.findUnique({
            where: {
                id: parseInt(category),
            },
            select: {
                name: true, // Only select the 'name' field from Category
                items: true,
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.getByCategory = getByCategory;
// get item by subcategory
const getBySubCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    let { subcategory } = req.params;
    subcategory = subcategory.toLowerCase().trim();
    const output = isNaN(parseInt(subcategory)) ? "string" : "number";
    // search by name
    if (output === "string") {
        const data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                name: subcategory,
            },
            select: {
                name: true, // Only select the 'name' field from Category
                items: true,
            },
        });
        response.message(true, "success", 200, data);
    }
    // search by id
    else if (output == "number") {
        const data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                id: parseInt(subcategory),
            },
            select: {
                name: true, // Only select the 'name' field from Category
                items: true,
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.getBySubCategory = getBySubCategory;
const SearchItem = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    const { query } = req.body;
    if (typeof query == "string") {
        const data = yield prismaClient_1.default.item.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        });
        response.message(true, "success", 200, data);
    }
    else {
        response.message(false, "fail provide valid input", 400, null);
    }
}));
exports.SearchItem = SearchItem;
const updateItem = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = new apiResponse_1.default(res);
    const { id, name, old_name, description, taxApplicable, tax, baseAmount, discount, } = req.body;
    const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
    let image_url = yield (0, imageurl_1.default)(image);
    const baseAmount_num = baseAmount ? parseInt(baseAmount) : null;
    const discount_num = discount ? parseInt(discount) : null;
    const tax_num = tax ? parseInt(tax) : null;
    const tax_app_bool = (taxApplicable === null || taxApplicable === void 0 ? void 0 : taxApplicable.toLowerCase().trim()) == "true" ? true : false;
    if (id) {
        const old_data = yield prismaClient_1.default.item.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!(old_data === null || old_data === void 0 ? void 0 : old_data.name)) {
            return response.message(false, "item not exist", 400, null);
        }
        const data = yield prismaClient_1.default.item.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name ? name : old_data === null || old_data === void 0 ? void 0 : old_data.name,
                image: image_url ? image_url : old_data === null || old_data === void 0 ? void 0 : old_data.image,
                description: description ? description : old_data === null || old_data === void 0 ? void 0 : old_data.description,
                tax: tax_num ? tax_num : old_data === null || old_data === void 0 ? void 0 : old_data.tax,
                baseAmount: baseAmount_num ? baseAmount_num : old_data === null || old_data === void 0 ? void 0 : old_data.baseAmount,
                discount: discount_num ? discount_num : old_data === null || old_data === void 0 ? void 0 : old_data.discount,
                taxApplicable: tax_app_bool !== undefined ? tax_app_bool : old_data === null || old_data === void 0 ? void 0 : old_data.taxApplicable,
                totalAmount: baseAmount_num
                    ? discount_num
                        ? baseAmount_num - (discount_num * baseAmount_num) / 100
                        : old_data === null || old_data === void 0 ? void 0 : old_data.totalAmount
                    : old_data === null || old_data === void 0 ? void 0 : old_data.totalAmount,
            },
        });
        response.message(true, "item updated", 200, data);
    }
    else if (old_name) {
        const old_data = yield prismaClient_1.default.item.findUnique({
            where: {
                name: old_name,
            },
        });
        if (!(old_data === null || old_data === void 0 ? void 0 : old_data.name)) {
            return response.message(false, "item not exist", 400, null);
        }
        const data = yield prismaClient_1.default.item.update({
            where: {
                name: old_name,
            },
            data: {
                name: name ? name : old_data === null || old_data === void 0 ? void 0 : old_data.name,
                image: image_url ? image_url : old_data === null || old_data === void 0 ? void 0 : old_data.image,
                description: description ? description : old_data === null || old_data === void 0 ? void 0 : old_data.description,
                tax: tax_num ? tax_num : old_data === null || old_data === void 0 ? void 0 : old_data.tax,
                baseAmount: baseAmount_num ? baseAmount_num : old_data === null || old_data === void 0 ? void 0 : old_data.baseAmount,
                discount: discount_num ? discount_num : old_data === null || old_data === void 0 ? void 0 : old_data.discount,
                taxApplicable: tax_app_bool !== undefined ? tax_app_bool : old_data === null || old_data === void 0 ? void 0 : old_data.taxApplicable,
                totalAmount: baseAmount_num
                    ? discount_num
                        ? baseAmount_num - (discount_num * baseAmount_num) / 100
                        : old_data === null || old_data === void 0 ? void 0 : old_data.totalAmount
                    : old_data === null || old_data === void 0 ? void 0 : old_data.totalAmount,
            },
        });
        response.message(true, "item updated", 200, data);
    }
    else {
        response.message(false, "provide id or old_name", 400, null);
    }
}));
exports.updateItem = updateItem;
const createItem = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const response = new apiResponse_1.default(res);
    const { name, description, tax, categoryid, subcategoryid, discount, baseAmount, taxApplicable, } = req.body;
    const image = (_b = req.files) === null || _b === void 0 ? void 0 : _b.image;
    const tax_app_bool = (taxApplicable === null || taxApplicable === void 0 ? void 0 : taxApplicable.toLowerCase().trim()) == "true" ? true : false;
    if (categoryid && subcategoryid && name) {
        const categoryid_num = categoryid
            ? isNaN(parseInt(categoryid))
                ? null
                : parseInt(categoryid)
            : null;
        const subcategories_num = subcategoryid
            ? isNaN(parseInt(subcategoryid))
                ? null
                : parseInt(subcategoryid)
            : null;
        const base_amt_num = baseAmount
            ? isNaN(parseInt(baseAmount))
                ? 0
                : parseInt(baseAmount)
            : 0;
        const discount_num = discount
            ? isNaN(parseInt(discount))
                ? 0
                : parseInt(discount)
            : 0;
        const tax_num = tax ? parseInt(tax) : null;
        const category = yield prismaClient_1.default.category.findUnique({
            where: {
                id: categoryid_num,
            },
        });
        const sub_category = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                id: subcategories_num,
            },
        });
        let data = yield prismaClient_1.default.item.findUnique({
            where: {
                name: name,
            },
        });
        if (data === null || data === void 0 ? void 0 : data.name) {
            return response.message(false, "item already exist", 400, null);
        }
        if ((category === null || category === void 0 ? void 0 : category.id) && (sub_category === null || sub_category === void 0 ? void 0 : sub_category.id)) {
            let image_url = yield (0, imageurl_1.default)(image);
            data = yield prismaClient_1.default.item.create({
                data: {
                    name,
                    description,
                    tax: tax_num,
                    taxApplicable: tax_app_bool,
                    categoryId: categoryid_num,
                    subCategoryId: subcategories_num,
                    baseAmount: base_amt_num,
                    discount: discount_num,
                    totalAmount: base_amt_num - base_amt_num * discount_num * 0.01,
                    image: image_url,
                },
            });
            response.message(true, "item added", 200, data);
        }
        else {
            response.message(false, "category or subcategory does not exist", 400, null);
        }
    }
    else {
        response.message(false, "categoryid or subcategoryid or name not provided", 400, null);
    }
}));
exports.createItem = createItem;
const deleteItem = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    let { value } = req.params;
    value = value.toLowerCase().trim();
    const output = isNaN(parseInt(value)) ? "string" : "number";
    // search by name
    if (output == "string") {
        let data = yield prismaClient_1.default.item.findUnique({
            where: {
                name: value,
            },
        });
        if (!(data === null || data === void 0 ? void 0 : data.name)) {
            return response.message(false, "item not exist", 200, null);
        }
        data = yield prismaClient_1.default.item.delete({
            where: {
                name: value,
            },
        });
        response.message(true, "success", 200, data);
    }
    // search by id
    else if (output == "number") {
        let data = yield prismaClient_1.default.item.findUnique({
            where: {
                id: parseInt(value),
            },
        });
        if (!(data === null || data === void 0 ? void 0 : data.name)) {
            return response.message(false, "item not exist", 200, null);
        }
        data = yield prismaClient_1.default.item.delete({
            where: {
                id: parseInt(value),
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.deleteItem = deleteItem;
