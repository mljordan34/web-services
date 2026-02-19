import express, { type Request, type Response } from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

// endpoints
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

app.get("/time", (req: Request, res: Response) => {
    res.json({
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        iso: new Date().toISOString(),
        unix: Date.now(),
    })
})

app.post("/echo", (req: Request, res: Response) => {
    res.json({
        received: req.body,
        timestamp: new Date().toISOString(),
        method: req.method
    });
});

app.post("/analyze", (req: Request, res: Response) => {
    const reqBody: string = req.body.text;
    const reqBodyWO: string = reqBody.replaceAll(" ", "")
    res.json({
        textLength: reqBody.length,
        wordCount: reqBody !== "" ? reqBody.split(' ').length : 0,
        characterCount: reqBodyWO.length
    });
});

app.post("/file", (req: Request, res: Response) => {
    fs.writeFileSync("test.json", JSON.stringify(req.body))
    res.json({
        success: true
    });
});

app.get("/file", (req: Request, res: Response) => {
    if (fs.existsSync("test.json")) {
        const content = fs.readFileSync("test.json", "utf-8");
        const data = JSON.parse(content);
        res.json(data)
    } else {
        res.json({})
    }

})

app.delete("/file", (req: Request, res: Response) => {
    if (fs.existsSync("test.json")) {
        fs.unlinkSync("test.json")
    }

    res.json({
        success: true
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

export default app;