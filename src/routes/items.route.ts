import { Router } from "express";
import {
  getAllItems,
  getItem,
  getByCategory,
  getBySubCategory,
  SearchItem,
  updateItem,
  createItem,
  deleteItem,
} from "../controllers/items.controller";

const router = Router();

router.route("/all").get(getAllItems);
router.route("/:value").get(getItem);
router.route("/bycategory/:category").get(getByCategory);
router.route("/bysubcategory/:subcategory").get(getBySubCategory);
router.route("/update").put(updateItem);
router.route("/search").post(SearchItem);
router.route("/create").post(createItem);
router.route("/delete/:value").delete(deleteItem);

export default router;
