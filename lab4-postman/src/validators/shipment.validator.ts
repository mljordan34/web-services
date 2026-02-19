import { body } from "express-validator";

export const createShipmentValidators = [
    // sender validation
    body("sender.name")
        .trim()
        .isString().withMessage("Sender name must be a string")
        .isLength({ min: 2, max: 100 }).withMessage("Sender name must be 2-100 characters")
        .notEmpty().withMessage("Sender name is required"),
    body("sender.email")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),
    body("sender.phone")
        .matches(/^\d{3}-\d{3}-\d{4}$/)
        .withMessage("Phone must be in format XXX-XXX-XXXX"),
    body("sender.address.street")
        .isString()
        .isLength({ min: 5, max: 200 })
        .withMessage("Street must be 5-200 characters"),
    body("sender.address.city")
        .isString()
        .isLength({ min: 2, max: 100 })
        .withMessage("City must be 2-100 characters"),
    body("sender.address.state")
        .matches(/^[A-Z]{2}$/)
        .withMessage("State must be exactly 2 uppercase letters"),
    body("sender.address.zip")
        .matches(/^\d{5}(-\d{4})?$/)
        .withMessage("ZIP must be XXXXX or XXXXX-XXXX"),
    // recipient validation
    body("recipient.name")
        .trim()
        .isString().withMessage("Sender name must be a string")
        .isLength({ min: 2, max: 100 }).withMessage("Sender name must be 2-100 characters")
        .notEmpty().withMessage("Sender name is required"),
    body("recipient.email")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),
    body("recipient.phone")
        .matches(/^\d{3}-\d{3}-\d{4}$/)
        .withMessage("Phone must be in format XXX-XXX-XXXX"),
    body("recipient.address.street")
        .isString()
        .isLength({ min: 5, max: 200 })
        .withMessage("Street must be 5-200 characters"),
    body("recipient.address.city")
        .isString()
        .isLength({ min: 2, max: 100 })
        .withMessage("City must be 2-100 characters"),
    body("recipient.address.state")
        .matches(/^[A-Z]{2}$/)
        .withMessage("State must be exactly 2 uppercase letters"),
    body("recipient.address.zip")
        .matches(/^\d{5}(-\d{4})?$/)
        .withMessage("ZIP must be XXXXX or XXXXX-XXXX"),
    // package validation
    body("package.weight")
        .isFloat({ gt: 0, max: 70 })
        .withMessage("Weight must be between 0 and 70 pounds"),
    body("package.dimensions.length")
        .isFloat({ gt: 0, max: 108 })
        .withMessage("Length must be between 0 and 108 inches"),
    body("package.dimensions.width")
        .isFloat({ gt: 0, max: 108 })
        .withMessage("Width must be between 0 and 108 inches"),
    body("package.dimensions.height")
        .isFloat({ gt: 0, max: 108 })
        .withMessage("Height must be between 0 and 108 inches"),
    body("package.description")
        .isString()
        .isLength({ min: 3, max: 500 })
        .withMessage("Description must be 3-500 characters"),
    // options validation
    body("options.priority")
        .isIn(["standard", "express", "overnight"])
        .withMessage("Priority must be standard, express, or overnight"),
    body("options.signature")
        .isBoolean()
        .withMessage("Signature must be a boolean"),
    body("options.insurance.required")
        .isBoolean()
        .withMessage("Insurance required must be a boolean"),
    body("options.insurance.value")
        .custom((value, { req }) => {
        if (req.body.options?.insurance?.required) {
            if (value === undefined) {
                throw new Error("Insurance value is required when insurance is enabled");
            }
            if (typeof value !== "number" || value <= 0 || value > 50000) {
                throw new Error("Insurance value must be between 0 and 50,000");
            }
        }
        return true;
        }),
    body("options.insurance.required")
        .exists({ checkNull: true })
        .withMessage("Insurance required field is required")
        .bail()
        .custom((value) => typeof value === "boolean")
        .withMessage("Insurance required must be a boolean"),
    body("options.fragile")
        .exists({ checkNull: true })
        .withMessage("Fragile field is required")
        .bail()
        .custom((value) => typeof value === "boolean")
        .withMessage("Fragile must be a boolean"),
    body("options.specialInstructions")
        .optional()
        .isString()
        .isLength({ max: 500 })
        .withMessage("Special instructions cannot exceed 500 characters"),
];