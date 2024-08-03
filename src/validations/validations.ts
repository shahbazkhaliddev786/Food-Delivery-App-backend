import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: string[] = [];
    errors.array().map((err: any) => extractedErrors.push(err.msg));

    return res.status(422).json({
        errors: extractedErrors,
    });
};
