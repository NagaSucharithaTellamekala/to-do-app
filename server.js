const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json()); 
let users = [
    { id: 1, name: "Sucharitha" },
    { id: 2, name: "ABC" }
];
app.post("/users", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newUser = {
        id: users.length + 1,
        name
    };

    users.push(newUser);

    res.status(201).json(newUser);
  });
app.get("/users", (req, res) => {
    res.json(users);
});
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
});
app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    user.name = name;

    res.json({ message: "User updated", user });
});
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    users.splice(index, 1);

    res.json({ message: "User deleted" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to the Mock CRUD App!");
});