import { Request, Response, NextFunction } from "express";
import imageurl from "../src/utils/imageurl";

interface Body {
  id?: string;
  taxApplicable?: string;
  tax?: string;
  discount?: string;
  categoryid?: string;
  subcategoryid?: string;
  baseAmount?: string;
}
async function Dataconversion(req: Request, res: Response, next: NextFunction) {
  let {
    id,
    taxApplicable,
    tax,
    discount,
    categoryid,
    subcategoryid,
    baseAmount,
  }: Body = req.body;

  // converting the data into form described in database schema

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

  // uploading image
  let image: any = req.files?.image;
  let image_url = await imageurl(image);
  req.body.image = image_url;
  next();
}

export default Dataconversion;
