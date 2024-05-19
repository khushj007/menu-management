import { Router } from "express";
import {
  getAllCategory,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
} from "../controllers/category.controller";

const router = Router();

router.route("/all").get(getAllCategory);
router.route("/:value").get(getCategory);
router.route("/update").put(updateCategory);
router.route("/create").post(createCategory);
router.route("/delete/:value").delete(deleteCategory);

export default router;
