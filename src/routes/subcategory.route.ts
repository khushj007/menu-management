import { Router } from "express";
import {
  getAllSubCategory,
  getSubCategory,
  getByCategory,
  updateSubCategory,
  createSubCategory,
  deleteSubcategory,
} from "../controllers/subcategory.controller";

const router = Router();

router.route("/all").get(getAllSubCategory);
router.route("/:value").get(getSubCategory);
router.route("/bycategory/:category").get(getByCategory);
router.route("/update").put(updateSubCategory);
router.route("/create").post(createSubCategory);
router.route("/delete/:value").delete(deleteSubcategory);

export default router;
