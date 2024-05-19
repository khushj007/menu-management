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
const imageurl_1 = __importDefault(require("../src/utils/imageurl"));
function Dataconversion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let { id, taxApplicable, tax, discount, categoryid, subcategoryid, baseAmount, } = req.body;
        if (id) {
            req.body.id = isNaN(parseInt(id)) ? null : parseInt(id);
        }
        if (taxApplicable) {
            req.body.taxApplicable = taxApplicable == "true" ? true : false;
        }
        if (tax) {
            req.body.tax = isNaN(parseInt(tax)) ? null : parseInt(tax);
        }
        if (discount) {
            req.body.discount = isNaN(parseInt(discount)) ? null : parseInt(discount);
        }
        if (baseAmount) {
            req.body.baseAmount = isNaN(parseInt(baseAmount))
                ? null
                : parseInt(baseAmount);
        }
        if (categoryid) {
            req.body.categoryid = isNaN(parseInt(categoryid))
                ? null
                : parseInt(categoryid);
        }
        if (subcategoryid) {
            req.body.subcategoryid = isNaN(parseInt(subcategoryid))
                ? null
                : parseInt(subcategoryid);
        }
        let image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
        let image_url = yield (0, imageurl_1.default)(image);
        req.body.image = image_url;
        next();
    });
}
exports.default = Dataconversion;
