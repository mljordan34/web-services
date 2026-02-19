import express, { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { error } from "node:console";

const app = express();
const PORT = 3000;

app.use(express.json());

// ENDPOINTS

app.get('/', (req: Request, res: Response) => {
    res.send('Base / endpoint hit!')
})

app.post('/add', (req: Request, res: Response) => {
    let errorsList = [];
    const adding = req.body;
    let aTrue = false;
    let bTrue = false;

    if ("a" in adding) {
        if (typeof adding["a"] === "number" && adding["a"] !== Infinity && adding["a"] !== -Infinity && !isNaN(adding["a"])) {
            aTrue = true
        } else {
            errorsList.push("a must be a number")
        }
    } else {
        errorsList.push("a is required")
    }

    if ("b" in adding) {
        if (typeof adding["b"] === "number" && adding["b"] !== Infinity && adding["b"] !== -Infinity && !isNaN(adding["b"])) {
            bTrue = true
        } else {
            errorsList.push("b must be a number")
        }
    } else {
        errorsList.push("b is required")
    }

    if (aTrue && bTrue) {
        res.status(StatusCodes.OK).json({
            result: adding["a"] + adding["b"]
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/subtract', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let aTrue = false;
    let bTrue = false;

    if ("a" in num) {
        if (typeof num["a"] === "number" && num["a"] !== Infinity && num["a"] !== -Infinity && !isNaN(num["a"])) {
            aTrue = true
        } else {
            errorsList.push("a must be a number")
        }
    } else {
        errorsList.push("a is required")
    }

    if ("b" in num) {
        if (typeof num["b"] === "number" && num["b"] !== Infinity && num["b"] !== -Infinity && !isNaN(num["b"])) {
            bTrue = true
        } else {
            errorsList.push("b must be a number")
        }
    } else {
        errorsList.push("b is required")
    }

    if (aTrue && bTrue) {
        res.status(StatusCodes.OK).json({
            result: num["a"] - num["b"]
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/multiply', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let aTrue = false;
    let bTrue = false;

    if ("a" in num) {
        if (typeof num["a"] === "number" && num["a"] !== Infinity && num["a"] !== -Infinity && !isNaN(num["a"])) {
            aTrue = true
        } else {
            errorsList.push("a must be a number")
        }
    } else {
        errorsList.push("a is required")
    }

    if ("b" in num) {
        if (typeof num["b"] === "number" && num["b"] !== Infinity && num["b"] !== -Infinity && !isNaN(num["b"])) {
            bTrue = true
        } else {
            errorsList.push("b must be a number")
        }
    } else {
        errorsList.push("b is required")
    }

    if (aTrue && bTrue) {
        res.status(StatusCodes.OK).json({
            result: num["a"] * num["b"]
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/divide', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let aTrue = false;
    let bTrue = false;

    if ("a" in num) {
        if (typeof num["a"] === "number" && num["a"] !== Infinity && num["a"] !== -Infinity && !isNaN(num["a"])) {
            aTrue = true
        } else {
            errorsList.push("a must be a number")
        }
    } else {
        errorsList.push("a is required")
    }

    if ("b" in num) {
        if (typeof num["b"] === "number" && num["b"] !== Infinity && num["b"] !== -Infinity && !isNaN(num["b"])) {
            bTrue = true
        } else {
            errorsList.push("b must be a number")
        }
    } else {
        errorsList.push("b is required")
    }

    if (num["b"] === 0) {
        bTrue = false
        errorsList.push("cannot divide by zero")
    }

    if (aTrue && bTrue) {
        res.status(StatusCodes.OK).json({
            result: num["a"] / num["b"]
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/power', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let baseTrue = false;
    let exponentTrue = false;

    if ("base" in num) {
        if (typeof num["base"] === "number" && num["base"] !== Infinity && num["base"] !== -Infinity && !isNaN(num["base"])) {
            baseTrue = true
        } else {
            errorsList.push("base must be a number")
        }
    } else {
        errorsList.push("base is required")
    }

    if ("exponent" in num) {
        if (typeof num["exponent"] === "number" && num["exponent"] !== Infinity && num["exponent"] !== -Infinity && !isNaN(num["exponent"])) {
            exponentTrue = true
        } else {
            errorsList.push("exponent must be a number")
        }
    } else {
        errorsList.push("exponent is required")
    }

    if (baseTrue && exponentTrue) {
        res.status(StatusCodes.OK).json({
            result: num["base"] ** num["exponent"]
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/sqrt', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let numTrue = false

    if ("number" in num) {
        if (typeof num["number"] === "number" && num["number"] !== Infinity && num["number"] !== -Infinity && !isNaN(num["number"])) {
            numTrue = true
        } else {
            errorsList.push("number must be a number")
        }
    } else {
        errorsList.push("number is required")
    }

    if (numTrue) {
        res.status(StatusCodes.OK).json({
            result: num["number"] < 0 ? `${Math.sqrt(Math.abs(num["number"]))}i` : Math.sqrt(num["number"])
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/modulo', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let aTrue = false;
    let bTrue = false;

    if ("a" in num) {
        if (typeof num["a"] === "number" && num["a"] !== Infinity && num["a"] !== -Infinity && !isNaN(num["a"])) {
            aTrue = true
        } else {
            errorsList.push("a must be a number")
        }
    } else {
        errorsList.push("a is required")
    }

    if ("b" in num) {
        if (typeof num["b"] === "number" && num["b"] !== Infinity && num["b"] !== -Infinity && !isNaN(num["b"])) {
            bTrue = true
        } else {
            errorsList.push("b must be a number")
        }
    } else {
        errorsList.push("b is required")
    }

    if (num["b"] === 0) {
        bTrue = false
        errorsList.push("cannot perform modulo by zero")
    }

    if (aTrue && bTrue) {
        res.status(StatusCodes.OK).json({
            result: num["a"] % num["b"]
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/abs', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let numTrue = false

    if ("number" in num) {
        if (typeof num["number"] === "number" && num["number"] !== Infinity && num["number"] !== -Infinity && !isNaN(num["number"])) {
            numTrue = true
        } else {
            errorsList.push("number must be a number")
        }
    } else {
        errorsList.push("number is required")
    }

    if (numTrue) {
        res.status(StatusCodes.OK).json({
            result: Math.abs(num["number"])
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/sum', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let numTrue = false

    if ("numbers" in num) {
        if (Array.isArray(num["numbers"])) {
            numTrue = true
        } else {
            errorsList.push("numbers must be an array")
        }
    } else {
        errorsList.push("numbers is required")
    }

    let sum = 0;
    if (numTrue) {
        if (num["numbers"].length === 0){
            errorsList.push("numbers must not be empty")
            numTrue = false
        }
    
        for (let nums of num["numbers"]) {
            if (typeof nums === "number") {
                sum += nums
            } else {
                errorsList.push("all elements in numbers must be numbers")
                numTrue = false
                break
            }
        }
    }

    if (numTrue) {
        res.status(StatusCodes.OK).json({
            result: sum
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/average', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let numTrue = false

    if ("numbers" in num) {
        if (Array.isArray(num["numbers"])) {
            numTrue = true
        } else {
            errorsList.push("numbers must be an array")
        }
    } else {
        errorsList.push("numbers is required")
    }

    let sum = 0;
    let count = 0;
    if (numTrue) {
        if (num["numbers"].length === 0){
            errorsList.push("numbers must not be empty")
            numTrue = false
        }
    
        for (let nums of num["numbers"]) {
            if (typeof nums === "number") {
                sum += nums
                count += 1
            } else {
                errorsList.push("all elements in numbers must be numbers")
                numTrue = false
                break
            }
        }
    }

    if (numTrue) {
        res.status(StatusCodes.OK).json({
            result: sum/count
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/minmax', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let numTrue = false

    if ("numbers" in num) {
        if (Array.isArray(num["numbers"])) {
            numTrue = true
        } else {
            errorsList.push("numbers must be an array")
        }
    } else {
        errorsList.push("numbers is required")
    }

    if (numTrue) {
        if (num["numbers"].length === 0){
            errorsList.push("numbers must not be empty")
            numTrue = false
        }
    
        for (let nums of num["numbers"]) {
            if (typeof nums === "number") {
                continue
            } else {
                errorsList.push("all elements in numbers must be numbers")
                numTrue = false
                break
            }
        }
    }

    if (numTrue) {
        res.status(StatusCodes.OK).json({
            min: Math.min(...num["numbers"]),
            max: Math.max(...num["numbers"])
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/factorial', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let numTrue = false
    let goodNum = false

    if ("number" in num) {
        if (typeof num["number"] === "number" && num["number"] !== Infinity && num["number"] !== -Infinity && !isNaN(num["number"])) {
            numTrue = true
            goodNum = true
        } else {
            errorsList.push("number must be a number")
        }
    } else {
        errorsList.push("number is required")
    }

    if (numTrue && !Number.isInteger(num["number"])) {
        errorsList.push("number must be an integer")
        goodNum = false
    }
    if (numTrue && num["number"] < 0) {
        errorsList.push("number must not be negative")
        goodNum = false
    }

    if (numTrue && goodNum) {
        let factorial = 1;
        for (let i = num["number"]; i > 0; i--) {
            factorial *= i;
        }
        res.status(StatusCodes.OK).json({
            result: factorial
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.post('/calculate', (req: Request, res: Response) => {
    let errorsList = [];
    const num = req.body;
    let aTrue = false;
    let bTrue = false;
    let validOp = false

    if ("operation" in num) {

        switch (num["operation"]) {
            case "add":
                validOp = true
                break
            case "subtract":    
                validOp = true
                break
            case "multiply":        
                validOp = true
                break
            case "divide":
                validOp = true
                break
            default:
                errorsList.push("operation must be one of: add, subtract, multiply, divide")
                break
        }
    } else {
        errorsList.push("operation is required")
    }


    if ("a" in num) {
        if (typeof num["a"] === "number" && num["a"] !== Infinity && num["a"] !== -Infinity && !isNaN(num["a"])) {
            aTrue = true
        } else {
            errorsList.push("a must be a number")
        }
    } else {
        errorsList.push("a is required")
    }

    if ("b" in num) {
        if (typeof num["b"] === "number" && num["b"] !== Infinity && num["b"] !== -Infinity && !isNaN(num["b"])) {
            bTrue = true
        } else {
            errorsList.push("b must be a number")
        }
    } else {
        errorsList.push("b is required")
    }

    if (num["b"] === 0 && num["operation"] === "divide") {
        bTrue = false
        errorsList.push("cannot divide by zero")
    }

    if (aTrue && bTrue && validOp) {
        switch (num["operation"]) {
            case "add":
                res.status(StatusCodes.OK).json({
                    result: num["a"] + num["b"]
                })
                break
            case "subtract":    
                res.status(StatusCodes.OK).json({
                    result: num["a"] - num["b"]
                })
                break
            case "multiply":        
                res.status(StatusCodes.OK).json({
                    result: num["a"] * num["b"]
                })
                break
            case "divide":
                res.status(StatusCodes.OK).json({
                    result: num["a"] / num["b"]
                })
                break
            default:
                errorsList.push("SHOULD NEVER OCCUR")
                break
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsList
        })
    }
})

app.listen(PORT, () => {
    console.log(`RMS running at http://localhost:${PORT}`);
});

export default app;