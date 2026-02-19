import express, { Request, Response } from "express"
import userRoutes from "./src/users/users.routes"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    return res.json({ success: true })
})

app.use("/users", userRoutes)

export default app;