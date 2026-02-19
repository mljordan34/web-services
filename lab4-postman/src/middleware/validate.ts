import { Request, Response, NextFunction } from "express";
import { FieldValidationError, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
        const formattedErrors = errors
            .array()
            .filter(
            (error): error is FieldValidationError =>
                error.type === "field"
            )
            .map((error) => ({
            field: error.path,
            message: error.msg
            }));

        return res.status(400).json({
            success: false,
            errors: formattedErrors
        });
        }

        next();
    };
};