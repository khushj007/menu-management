import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import prisma from "../prismaClient/prismaClient";
import imageurl from "../utils/imageurl";

interface Params {
  value?: string;
  category?: string;
}
interface Body {
  id?: number;
  old_name?: string;
  name?: string;
  description?: string;
  tax?: number;
  categoryid?: number;
  image?: string;
}

const getAllSubCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const data = await prisma.subCategory.findMany();
  response.message(true, "success", 200, data);
});

const getSubCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  let { value }: Params = req.params;
  value = value.toLowerCase().trim();
  const output = isNaN(parseInt(value)) ? "string" : "number";

  // search by name
  if (output === "string") {
    const data = await prisma.subCategory.findUnique({
      where: {
        name: value,
      },
    });
    response.message(true, "success", 200, data);
  }
  // search by id
  else if (output == "number") {
    const data = await prisma.subCategory.findUnique({
      where: {
        id: parseInt(value),
      },
    });
    response.message(true, "success", 200, data);
  }
});

// get subcategory by category
const getByCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  let { category }: Params = req.params;
  category = category.toLowerCase().trim();
  const output = isNaN(parseInt(category)) ? "string" : "number";
  // search by name
  if (output === "string") {
    const data = await prisma.category.findUnique({
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
    const data = await prisma.category.findUnique({
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
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const { id, old_name, name, description, tax, image }: Body = req.body;

  if (id) {
    const old_data = await prisma.subCategory.findUnique({
      where: {
        id: id,
      },
    });
    if (!old_data?.name) {
      return response.message(false, "subcategory does not exist", 400, null);
    }
    const data = await prisma.subCategory.update({
      where: {
        id: id,
      },
      data: {
        name: name ? name : old_data?.name,
        image: image ? image : old_data?.image,
        description: description ? description : old_data?.description,
        tax: tax ? tax : old_data?.tax,
      },
    });
    response.message(true, "subcategory updated", 200, data);
  } else if (old_name) {
    const old_data = await prisma.subCategory.findUnique({
      where: {
        name: old_name,
      },
    });

    if (!old_data?.name) {
      return response.message(false, "subcategory does not exist", 400, null);
    }
    const data = await prisma.subCategory.update({
      where: {
        name: old_name,
      },
      data: {
        name: name ? name : old_data?.name,
        image: image ? image : old_data?.image,
        description: description ? description : old_data?.description,
        tax: tax ? tax : old_data?.tax,
      },
    });
    response.message(true, "subcategory updated", 200, data);
  } else {
    response.message(false, "provide id or old_name", 400, null);
  }
});

const createSubCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const { name, description, tax, categoryid, image }: Body = req.body;

  if (name && categoryid) {
    let data = await prisma.subCategory.findUnique({
      where: {
        name: name,
      },
    });

    if (data?.name) {
      return response.message(false, "subcategory already exist", 400, null);
    }

    const cat_data = await prisma.category.findUnique({
      where: {
        id: categoryid,
      },
    });

    if (cat_data?.id) {
      data = await prisma.subCategory.create({
        data: {
          name,
          description,
          categoryId: categoryid,
          tax: tax,
          image: image,
          taxApplicable: cat_data?.taxApplicable,
        },
      });
      response.message(true, "subcategory created", 200, data);
    } else {
      response.message(
        false,
        "for the subcategory , category does not exist",
        400,
        null
      );
    }
  } else {
    response.message(false, "name or subcategoryid not provided", 400, null);
  }
});

const deleteSubcategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  let { value }: Params = req.params;
  value = value.toLowerCase().trim();
  const output = isNaN(parseInt(value)) ? "string" : "number";

  // search by name
  if (output === "string") {
    let data = await prisma.subCategory.findUnique({
      where: {
        name: value,
      },
    });
    if (!data?.name) {
      return response.message(false, "subcategory not exist", 200, null);
    }
    data = await prisma.subCategory.delete({
      where: {
        name: value,
      },
    });
    response.message(true, "success", 200, data);
  }
  // search by id
  else if (output == "number") {
    let data = await prisma.subCategory.findUnique({
      where: {
        id: parseInt(value),
      },
    });
    if (!data?.name) {
      return response.message(false, "subcategory not exist", 200, null);
    }
    data = await prisma.subCategory.delete({
      where: {
        id: parseInt(value),
      },
    });

    response.message(true, "success", 200, data);
  }
});

export {
  getAllSubCategory,
  getSubCategory,
  getByCategory,
  updateSubCategory,
  createSubCategory,
  deleteSubcategory,
};
