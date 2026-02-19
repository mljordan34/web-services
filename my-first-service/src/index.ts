import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});