const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const FILE = "feedback.json";

function readData() {
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]");
  return JSON.parse(fs.readFileSync(FILE));
}

function saveData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}
app.post("/feedback", (req, res) => {
  console.log("Received body:", req.body);
  const { name, message } = req.body;
  const data = readData();

  const newFeedback = {
    id: data.length + 1,
    name: req.body.name,
    message: req.body.message
    
  };
data.push(newFeedback);
  saveData(data);

  res.json({ message: "Feedback added", newFeedback });
});
app.get("/feedback", (req, res) => {
  res.json(readData());
});
app.get("/feedback/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  const feedback = data.find(f => f.id === id);

  if (!feedback) {
    return res.status(404).json({ error: "Feedback not found" });
  }

  res.json(feedback);
});
app.put("/feedback/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  const feedback = data.find(f => f.id === id);
  if (!feedback)
    return res.status(404).json({ error: "Feedback not found" });

  feedback.name = req.body.name;
  feedback.message = req.body.message;

  saveData(data);

  res.json({ message: "Feedback updated", feedback });
});

app.listen(3000, () => console.log("Server running on port 3000"));
