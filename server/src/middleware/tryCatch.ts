import { Request, Response, NextFunction } from 'express';

const tryCatch =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      // Catch the error and send it to our errorHandler middleware
      return next(error);
    }
  };

export default tryCatch;
