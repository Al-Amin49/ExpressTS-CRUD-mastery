import { Request, Response } from "express";

const notFound = (req:Request, res:Response) => {
    res.status(404).json({
        success: false,
        message: "Route doesn't exist",
        error: {
          code: 404,
          description: "Route doesn't exist",
        },
      });
}

export default notFound;