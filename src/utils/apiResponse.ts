import { Response } from "express";

class ApiResponse {
  constructor(private res: Response) {}

  message(success = true, message = "Success", statusCode = 200, data?: any) {
    this.res.status(statusCode).json({
      success,
      message,
      data,
    });
  }
}

export default ApiResponse;
