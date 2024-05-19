import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import prisma from "../prismaClient/prismaClient";
import imageurl from "../utils/imageurl";

interface Params {
  value?: string;
  category?: string;
  subcategory?: string;
}
interface Body {
  query?: string;
  id?: number;
  old_name?: string;
  name?: string;
  description?: string;
  taxApplicable?: boolean;
  tax?: number;
  baseAmount?: number;
  discount?: number;
  categoryid?: number;
  subcategoryid?: number;
  image?: string;
}
const getAllItems = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const data = await prisma.item.findMany();
  response.message(true, "success", 200, data);
});

const getItem = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  let { value }: Params = req.params;
  value = value.toLowerCase().trim();
  const output = isNaN(parseInt(value)) ? "string" : "number";

  // search by name
  if (output === "string") {
    const data = await prisma.item.findUnique({
      where: {
        name: value,
      },
    });
    response.message(true, "success", 200, data);
  }
  // search by id
  else if (output == "number") {
    const data = await prisma.item.findUnique({
      where: {
        id: parseInt(value),
      },
    });
    response.message(true, "success", 200, data);
  }
});

// get item by category
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
        items: true,
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
        items: true,
      },
    });

    response.message(true, "success", 200, data);
  }
});

// get item by subcategory
const getBySubCategory = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  let { subcategory }: Params = req.params;
  subcategory = subcategory.toLowerCase().trim();
  const output = isNaN(parseInt(subcategory)) ? "string" : "number";
  // search by name
  if (output === "string") {
    const data = await prisma.subCategory.findUnique({
      where: {
        name: subcategory,
      },
      select: {
        name: true, // Only select the 'name' field from Category
        items: true,
      },
    });
    response.message(true, "success", 200, data);
  }
  // search by id
  else if (output == "number") {
    const data = await prisma.subCategory.findUnique({
      where: {
        id: parseInt(subcategory),
      },
      select: {
        name: true, // Only select the 'name' field from Category
        items: true,
      },
    });

    response.message(true, "success", 200, data);
  }
});

const SearchItem = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const { query }: Body = req.body;

  if (typeof query == "string") {
    const data = await prisma.item.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    response.message(true, "success", 200, data);
  } else {
    response.message(false, "fail provide valid input", 400, null);
  }
});

const updateItem = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);

  const {
    id,
    name,
    old_name,
    description,
    taxApplicable,
    tax,
    baseAmount,
    discount,
    image,
  }: Body = req.body;

  if (id) {
    const old_data = await prisma.item.findUnique({
      where: {
        id: id,
      },
    });
    if (!old_data?.name) {
      return response.message(false, "item not exist", 400, null);
    }
    const data = await prisma.item.update({
      where: {
        id: id,
      },
      data: {
        name: name ? name : old_data?.name,
        image: image ? image : old_data?.image,
        description: description ? description : old_data?.description,
        tax: tax ? tax : old_data?.tax,
        baseAmount: baseAmount ? baseAmount : old_data?.baseAmount,
        discount: discount ? discount : old_data?.discount,
        taxApplicable:
          taxApplicable !== undefined ? taxApplicable : old_data?.taxApplicable,
        totalAmount: baseAmount
          ? discount
            ? baseAmount - (discount * baseAmount) / 100
            : old_data?.totalAmount
          : old_data?.totalAmount,
      },
    });
    response.message(true, "item updated", 200, data);
  } else if (old_name) {
    const old_data = await prisma.item.findUnique({
      where: {
        name: old_name,
      },
    });

    if (!old_data?.name) {
      return response.message(false, "item not exist", 400, null);
    }

    const data = await prisma.item.update({
      where: {
        name: old_name,
      },
      data: {
        name: name ? name : old_data?.name,
        image: image ? image : old_data?.image,
        description: description ? description : old_data?.description,
        tax: tax ? tax : old_data?.tax,
        baseAmount: baseAmount ? baseAmount : old_data?.baseAmount,
        discount: discount ? discount : old_data?.discount,
        taxApplicable:
          taxApplicable !== undefined ? taxApplicable : old_data?.taxApplicable,
        totalAmount: baseAmount
          ? discount
            ? baseAmount - (discount * baseAmount) / 100
            : old_data?.totalAmount
          : old_data?.totalAmount,
      },
    });
    response.message(true, "item updated", 200, data);
  } else {
    response.message(false, "provide id or old_name", 400, null);
  }
});

const createItem = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  const {
    name,
    description,
    tax,
    categoryid,
    subcategoryid,
    discount,
    baseAmount,
    taxApplicable,
    image,
  }: Body = req.body;

  if (categoryid && subcategoryid && name && baseAmount) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryid,
      },
    });
    const sub_category = await prisma.subCategory.findUnique({
      where: {
        id: subcategoryid,
      },
    });

    let data = await prisma.item.findUnique({
      where: {
        name: name,
      },
    });
    if (data?.name) {
      return response.message(false, "item already exist", 400, null);
    }

    if (category?.id && sub_category?.id) {
      data = await prisma.item.create({
        data: {
          name,
          description,
          tax,
          taxApplicable,
          categoryId: categoryid,
          subCategoryId: subcategoryid,
          baseAmount: baseAmount,
          discount: discount,
          totalAmount:
            baseAmount - baseAmount * (discount ? discount : 0) * 0.01,
          image: image,
        },
      });
      response.message(true, "item added", 200, data);
    } else {
      response.message(
        false,
        "category or subcategory does not exist",
        400,
        null
      );
    }
  } else {
    response.message(
      false,
      "categoryid or subcategoryid or name or baseAmount not provided",
      400,
      null
    );
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const response = new ApiResponse(res);
  let { value }: Params = req.params;
  value = value.toLowerCase().trim();
  const output = isNaN(parseInt(value)) ? "string" : "number";

  // search by name
  if (output == "string") {
    let data = await prisma.item.findUnique({
      where: {
        name: value,
      },
    });
    if (!data?.name) {
      return response.message(false, "item not exist", 200, null);
    }

    data = await prisma.item.delete({
      where: {
        name: value,
      },
    });
    response.message(true, "success", 200, data);
  }
  // search by id
  else if (output == "number") {
    let data = await prisma.item.findUnique({
      where: {
        id: parseInt(value),
      },
    });
    if (!data?.name) {
      return response.message(false, "item not exist", 200, null);
    }
    data = await prisma.item.delete({
      where: {
        id: parseInt(value),
      },
    });
    response.message(true, "success", 200, data);
  }
});

export {
  getAllItems,
  getItem,
  getByCategory,
  getBySubCategory,
  SearchItem,
  updateItem,
  createItem,
  deleteItem,
};
