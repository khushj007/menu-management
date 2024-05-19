import { Request, Response, NextFunction } from "express";
import ApiResponse from "./apiResponse";
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const response = new ApiResponse(res);
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.log("error occur in async handler :", error.message);
      response.message(false, "something went wrong", 400, null);
    }
  };

export default asyncHandler;
