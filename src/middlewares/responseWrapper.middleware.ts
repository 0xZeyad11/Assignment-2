import type { NextFunction, Request, Response } from "express";
import type { Task } from "../types/tasks.type";

export const ResponseWrapper = (req:Request , res: Response , next: NextFunction): void => {
  const originalRes = res.json.bind(res);
  res.json = (data: unknown) => {
    return originalRes({
      statusCode: res.statusCode,
      success: res.statusCode >= 200 && res.statusCode < 400,
      length: Array.isArray(data) ? data.length : undefined ,
      data
    })
  }
  next();
}
