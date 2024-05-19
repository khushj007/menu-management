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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cloudinary_1 = require("cloudinary");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const predefineData_1 = __importDefault(require("../data/predefineData"));
const Dataconversion_1 = __importDefault(require("../middleware/Dataconversion"));
(0, dotenv_1.config)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
app.use(express_1.default.json());
app.use(Dataconversion_1.default);
// if you want predefined data uncomment the function and run
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, predefineData_1.default)();
}))();
// routes imports
const category_route_1 = __importDefault(require("./routes/category.route"));
const subcategory_route_1 = __importDefault(require("./routes/subcategory.route"));
const items_route_1 = __importDefault(require("./routes/items.route"));
// routes
app.use("/category", category_route_1.default);
app.use("/subcategory", subcategory_route_1.default);
app.use("/item", items_route_1.default);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app is working on port ${port}`);
});
