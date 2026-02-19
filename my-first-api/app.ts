import express from "express";

const app = express();

app.use(express.json())

interface User {
    name: string,
    email: string,
    isAdmin: boolean,
}
const users: User[] = []

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.post("/users", (req, res) => {
    const { name, email, isAdmin } = req.body
    users.push({
        name: name,
        email: email,
        isAdmin: isAdmin
    });
    res.status(201).send("Yay, user was created!");
});


app.get("/users", (req, res) => {
    res.json(users);
});

export default app;