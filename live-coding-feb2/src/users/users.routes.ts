import { Router, Request, Response } from 'express'
import CreateUserDTO from '../dtos/create-user.dto'
import { StatusCodes } from 'http-status-codes'
import { body, validationResult } from "express-validator"

const router = Router()

router.post("/",
    body("name").isString().isLength({min: 1, max:255}),
    body("email").isString().isEmail().normalizeEmail(),
    (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(errors.array().length) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            errors: errors
        })
    }
    
    const body: CreateUserDTO = req.body

    return res.status(StatusCodes.CREATED).json({
        success: true,
        user: body
    })
})

export default router