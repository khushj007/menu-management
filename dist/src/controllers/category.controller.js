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
exports.deleteCategory = exports.createCategory = exports.updateCategory = exports.getCategory = exports.getAllCategory = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const prismaClient_1 = __importDefault(require("../prismaClient/prismaClient"));
// get all category
const getAllCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    const data = yield prismaClient_1.default.category.findMany();
    response.message(true, "success", 200, data);
}));
exports.getAllCategory = getAllCategory;
// get unique category
const getCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    let { value } = req.params;
    value = value.toLowerCase().trim();
    const output = isNaN(parseInt(value)) ? "string" : "number";
    // search by name
    if (output === "string") {
        const data = yield prismaClient_1.default.category.findUnique({
            where: {
                name: value,
            },
        });
        response.message(true, "success", 200, data);
    }
    // search by id
    else if (output == "number") {
        const data = yield prismaClient_1.default.category.findUnique({
            where: {
                id: parseInt(value),
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.getCategory = getCategory;
// update category
const updateCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    const { id, old_name, name, description, taxApplicable, tax, taxType, image, } = req.body;
    if (id) {
        const old_data = yield prismaClient_1.default.category.findUnique({
            where: {
                id: id,
            },
        });
        const data = yield prismaClient_1.default.category.update({
            where: {
                id: id,
            },
            data: {
                name: name ? name : old_data === null || old_data === void 0 ? void 0 : old_data.name,
                image: image ? image : old_data === null || old_data === void 0 ? void 0 : old_data.image,
                description: description ? description : old_data === null || old_data === void 0 ? void 0 : old_data.description,
                taxApplicable: taxApplicable != undefined ? taxApplicable : old_data === null || old_data === void 0 ? void 0 : old_data.taxApplicable,
                tax: tax ? tax : old_data === null || old_data === void 0 ? void 0 : old_data.tax,
                taxType: taxType ? taxType : old_data === null || old_data === void 0 ? void 0 : old_data.taxType,
            },
        });
        // updating subcategory tax applicablity
        yield prismaClient_1.default.subCategory.updateMany({
            where: {
                categoryId: id,
            },
            data: {
                taxApplicable: data.taxApplicable,
            },
        });
        response.message(true, "category updated", 200, data);
    }
    else if (old_name) {
        const old_data = yield prismaClient_1.default.category.findUnique({
            where: {
                name: old_name,
            },
        });
        const data = yield prismaClient_1.default.category.update({
            where: {
                name: old_name,
            },
            data: {
                name: name ? name : old_data === null || old_data === void 0 ? void 0 : old_data.name,
                image: image ? image : old_data === null || old_data === void 0 ? void 0 : old_data.image,
                description: description ? description : old_data === null || old_data === void 0 ? void 0 : old_data.description,
                taxApplicable: taxApplicable !== undefined ? taxApplicable : old_data === null || old_data === void 0 ? void 0 : old_data.taxApplicable,
                tax: tax ? tax : old_data === null || old_data === void 0 ? void 0 : old_data.tax,
                taxType: taxType ? taxType : old_data === null || old_data === void 0 ? void 0 : old_data.taxType,
            },
        });
        // updating subcategory tax applicablity
        yield prismaClient_1.default.subCategory.updateMany({
            where: {
                categoryId: data.id,
            },
            data: {
                taxApplicable: data.taxApplicable,
            },
        });
        response.message(true, "category updated", 200, data);
    }
    else {
        response.message(false, "provide id or old_name", 400, null);
    }
}));
exports.updateCategory = updateCategory;
// create category
const createCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    const { name, description, taxApplicable, tax, taxType, image } = req.body;
    if (name) {
        let data = yield prismaClient_1.default.category.findUnique({
            where: {
                name: name,
            },
        });
        if (data === null || data === void 0 ? void 0 : data.name) {
            return response.message(false, "category already exist", 400, null);
        }
        data = yield prismaClient_1.default.category.create({
            data: {
                name,
                description,
                taxApplicable,
                tax,
                taxType,
                image,
            },
        });
        response.message(true, "category created", 200, data);
    }
    else {
        response.message(false, "name not provided", 400, null);
    }
}));
exports.createCategory = createCategory;
// delete category
const deleteCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new apiResponse_1.default(res);
    let { value } = req.params;
    value = value.toLowerCase().trim();
    const output = isNaN(parseInt(value)) ? "string" : "number";
    // search by name
    if (output === "string") {
        let data = yield prismaClient_1.default.category.findUnique({
            where: {
                name: value,
            },
        });
        if (!(data === null || data === void 0 ? void 0 : data.name)) {
            return response.message(false, "category not exist", 200, null);
        }
        data = yield prismaClient_1.default.category.delete({
            where: {
                name: value,
            },
        });
        response.message(true, "success", 200, data);
    }
    // search by id
    else if (output == "number") {
        let data = yield prismaClient_1.default.category.findUnique({
            where: {
                id: parseInt(value),
            },
        });
        if (!(data === null || data === void 0 ? void 0 : data.name)) {
            return response.message(false, "category not exist", 200, null);
        }
        data = yield prismaClient_1.default.category.delete({
            where: {
                id: parseInt(value),
            },
        });
        response.message(true, "success", 200, data);
    }
}));
exports.deleteCategory = deleteCategory;
