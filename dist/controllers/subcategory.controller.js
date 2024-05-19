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
exports.deleteSubcategory = exports.createSubCategory = exports.updateSubCategory = exports.getByCategory = exports.getSubCategory = exports.getAllSubCategory = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const prismaClient_1 = __importDefault(require("../prismaClient/prismaClient"));
const imageurl_1 = __importDefault(require("../utils/imageurl"));
const getAllSubCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    const data = yield prismaClient_1.default.subCategory.findMany();
    response.message(true, "success", 200, data);
}));
exports.getAllSubCategory = getAllSubCategory;
const getSubCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    let { value } = req.params;
    value = value.toLowerCase().trim();
    const output = isNaN(parseInt(value)) ? "string" : "number";
    // search by name
    if (output === "string") {
        const data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                name: value,
            },
        });
        response.message(true, "success", 200, data);
    }
    // search by id
    else if (output == "number") {
        const data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                id: parseInt(value),
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.getSubCategory = getSubCategory;
// get subcategory by category
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
                subcategories: true,
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
                subcategories: true,
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.getByCategory = getByCategory;
const updateSubCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = new apiResponse_1.default(res);
    const { id, old_name, name, description, tax } = req.body;
    const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
    let image_url = yield (0, imageurl_1.default)(image);
    const tax_num = tax ? parseInt(tax) : null;
    if (id) {
        const parsedId = parseInt(id);
        const old_data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                id: parsedId,
            },
        });
        if (!(old_data === null || old_data === void 0 ? void 0 : old_data.name)) {
            return response.message(false, "subcategory does not exist", 400, null);
        }
        const data = yield prismaClient_1.default.subCategory.update({
            where: {
                id: parsedId,
            },
            data: {
                name: name ? name : old_data === null || old_data === void 0 ? void 0 : old_data.name,
                image: image_url ? image_url : old_data === null || old_data === void 0 ? void 0 : old_data.image,
                description: description ? description : old_data === null || old_data === void 0 ? void 0 : old_data.description,
                tax: tax_num ? tax_num : old_data === null || old_data === void 0 ? void 0 : old_data.tax,
            },
        });
        response.message(true, "subcategory updated", 200, data);
    }
    else if (old_name) {
        const old_data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                name: old_name,
            },
        });
        if (!(old_data === null || old_data === void 0 ? void 0 : old_data.name)) {
            return response.message(false, "subcategory does not exist", 400, null);
        }
        const data = yield prismaClient_1.default.subCategory.update({
            where: {
                name: old_name,
            },
            data: {
                name: name ? name : old_data === null || old_data === void 0 ? void 0 : old_data.name,
                image: image_url ? image_url : old_data === null || old_data === void 0 ? void 0 : old_data.image,
                description: description ? description : old_data === null || old_data === void 0 ? void 0 : old_data.description,
                tax: tax_num ? tax_num : old_data === null || old_data === void 0 ? void 0 : old_data.tax,
            },
        });
        response.message(true, "subcategory updated", 200, data);
    }
    else {
        response.message(false, "provide id or old_name", 400, null);
    }
}));
exports.updateSubCategory = updateSubCategory;
const createSubCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const response = new apiResponse_1.default(res);
    const { name, description, tax, categoryid } = req.body;
    if (name && categoryid) {
        let data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                name: name,
            },
        });
        if (data === null || data === void 0 ? void 0 : data.name) {
            return response.message(false, "subcategory already exist", 400, null);
        }
        const tax_num = tax ? parseInt(tax) : null;
        const categoryid_num = parseInt(categoryid);
        const image = (_b = req.files) === null || _b === void 0 ? void 0 : _b.image;
        let image_url = yield (0, imageurl_1.default)(image);
        const cat_data = yield prismaClient_1.default.category.findUnique({
            where: {
                id: categoryid_num,
            },
        });
        if (cat_data === null || cat_data === void 0 ? void 0 : cat_data.id) {
            data = yield prismaClient_1.default.subCategory.create({
                data: {
                    name,
                    description,
                    categoryId: categoryid_num,
                    tax: tax_num,
                    image: image_url,
                    taxApplicable: cat_data === null || cat_data === void 0 ? void 0 : cat_data.taxApplicable,
                },
            });
            response.message(true, "subcategory created", 200, data);
        }
        else {
            response.message(false, "for the subcategory , category does not exist", 400, null);
        }
    }
    else {
        response.message(false, "name or subcategoryid not provided", 400, null);
    }
}));
exports.createSubCategory = createSubCategory;
const deleteSubcategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    let { value } = req.params;
    value = value.toLowerCase().trim();
    const output = isNaN(parseInt(value)) ? "string" : "number";
    // search by name
    if (output === "string") {
        let data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                name: value,
            },
        });
        if (!(data === null || data === void 0 ? void 0 : data.name)) {
            return response.message(false, "subcategory not exist", 200, null);
        }
        data = yield prismaClient_1.default.subCategory.delete({
            where: {
                name: value,
            },
        });
        response.message(true, "success", 200, data);
    }
    // search by id
    else if (output == "number") {
        let data = yield prismaClient_1.default.subCategory.findUnique({
            where: {
                id: parseInt(value),
            },
        });
        if (!(data === null || data === void 0 ? void 0 : data.name)) {
            return response.message(false, "subcategory not exist", 200, null);
        }
        data = yield prismaClient_1.default.subCategory.delete({
            where: {
                id: parseInt(value),
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.deleteSubcategory = deleteSubcategory;
