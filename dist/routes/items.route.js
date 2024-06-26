"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_controller_1 = require("../controllers/items.controller");
const router = (0, express_1.Router)();
router.route("/all").get(items_controller_1.getAllItems);
router.route("/:value").get(items_controller_1.getItem);
router.route("/bycategory/:category").get(items_controller_1.getByCategory);
router.route("/bysubcategory/:subcategory").get(items_controller_1.getBySubCategory);
router.route("/update").put(items_controller_1.updateItem);
router.route("/search").post(items_controller_1.SearchItem);
router.route("/create").post(items_controller_1.createItem);
router.route("/delete/:value").delete(items_controller_1.deleteItem);
exports.default = router;
