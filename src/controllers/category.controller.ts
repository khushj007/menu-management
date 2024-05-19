import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import prisma from "../prismaClient/prismaClient";

interface Params {
  value?: string;
}
interface Body {
  id?: number;
  old_name?: string;
  name?: string;
  image?: string;
  description?: string;
  taxApplicable?: boolean;
  tax?: number;
  taxType?: string;
}

// get all category
const getAllCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const data = await prisma.category.findMany();
  response.message(true, "success", 200, data);
});

// get unique category
const getCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  let { value }: Params = req.params;
  value = value.toLowerCase().trim();
  const output = isNaN(parseInt(value)) ? "string" : "number";

  // search by name
  if (output === "string") {
    const data = await prisma.category.findUnique({
      where: {
        name: value,
      },
    });
    response.message(true, "success", 200, data);
  }
  // search by id
  else if (output == "number") {
    const data = await prisma.category.findUnique({
      where: {
        id: parseInt(value),
      },
    });
    response.message(true, "success", 200, data);
  }
});

// update category

const updateCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const {
    id,
    old_name,
    name,
    description,
    taxApplicable,
    tax,
    taxType,
    image,
  }: Body = req.body;

  if (id) {
    const old_data = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    const data = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: name ? name : old_data?.name,
        image: image ? image : old_data?.image,
        description: description ? description : old_data?.description,
        taxApplicable:
          taxApplicable != undefined ? taxApplicable : old_data?.taxApplicable,
        tax: tax ? tax : old_data?.tax,
        taxType: taxType ? taxType : old_data?.taxType,
      },
    });

    // updating subcategory tax applicablity
    await prisma.subCategory.updateMany({
      where: {
        categoryId: id,
      },
      data: {
        taxApplicable: data.taxApplicable,
      },
    });
    response.message(true, "category updated", 200, data);
  } else if (old_name) {
    const old_data = await prisma.category.findUnique({
      where: {
        name: old_name,
      },
    });

    const data = await prisma.category.update({
      where: {
        name: old_name,
      },
      data: {
        name: name ? name : old_data?.name,
        image: image ? image : old_data?.image,
        description: description ? description : old_data?.description,
        taxApplicable:
          taxApplicable !== undefined ? taxApplicable : old_data?.taxApplicable,
        tax: tax ? tax : old_data?.tax,
        taxType: taxType ? taxType : old_data?.taxType,
      },
    });

    // updating subcategory tax applicablity
    await prisma.subCategory.updateMany({
      where: {
        categoryId: data.id,
      },
      data: {
        taxApplicable: data.taxApplicable,
      },
    });
    response.message(true, "category updated", 200, data);
  } else {
    response.message(false, "provide id or old_name", 400, null);
  }
});

// create category

const createCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const { name, description, taxApplicable, tax, taxType, image }: Body =
    req.body;

  if (name) {
    let data = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });

    if (data?.name) {
      return response.message(false, "category already exist", 400, null);
    }

    data = await prisma.category.create({
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
  } else {
    response.message(false, "name not provided", 400, null);
  }
});

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  let { value }: Params = req.params;
  value = value.toLowerCase().trim();
  const output = isNaN(parseInt(value)) ? "string" : "number";

  // search by name
  if (output === "string") {
    let data = await prisma.category.findUnique({
      where: {
        name: value,
      },
    });
    if (!data?.name) {
      return response.message(false, "category not exist", 200, null);
    }
    data = await prisma.category.delete({
      where: {
        name: value,
      },
    });
    response.message(true, "success", 200, data);
  }
  // search by id
  else if (output == "number") {
    let data = await prisma.category.findUnique({
      where: {
        id: parseInt(value),
      },
    });
    if (!data?.name) {
      return response.message(false, "category not exist", 200, null);
    }
    data = await prisma.category.delete({
      where: {
        id: parseInt(value),
      },
    });

    response.message(true, "success", 200, data);
  }
});

export {
  getAllCategory,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
};
