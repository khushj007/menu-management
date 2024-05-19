import express from "express";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import Dataconversion from "../middleware/Dataconversion";

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();

//middlewares
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
app.use(Dataconversion);

// routes imports

import categoryroutes from "./routes/category.route";
import subcategoryroutes from "./routes/subcategory.route";
import itemsroutes from "./routes/items.route";

// routes
app.use("/category", categoryroutes);
app.use("/subcategory", subcategoryroutes);
app.use("/item", itemsroutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app is working on port ${port}`);
});
