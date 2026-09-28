const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: "Milk", quantity: 2, category: "Groceries", purchased: false },
  { id: 2, name: "Eggs", quantity: 1, category: "Groceries", purchased: true },
];

let nextId = 3;

function normalizeItem(payload = {}) {
  const rawName = typeof payload.name === "string" ? payload.name.trim() : "";
  const quantity = Number(payload.quantity);
  const rawCategory = typeof payload.category === "string" ? payload.category.trim() : "";

  return {
    name: rawName,
    quantity: Number.isFinite(quantity) ? quantity : 0,
    category: rawCategory,
    purchased: Boolean(payload.purchased),
  };
}

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.post("/api/items", (req, res) => {
  const { name, quantity, category, purchased } = normalizeItem(req.body);

  if (!name) {
    return res.status(400).json({ message: "Product name is required." });
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0." });
  }

  const newItem = {
    id: nextId,
    name,
    quantity,
    category,
    purchased: Boolean(purchased),
  };

  nextId += 1;
  items.push(newItem);

  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const itemId = Number(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found." });
  }

  const { name, quantity, category, purchased } = normalizeItem(req.body);

  if (!name) {
    return res.status(400).json({ message: "Product name is required." });
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0." });
  }

  items[itemIndex] = {
    ...items[itemIndex],
    name,
    quantity,
    category,
    purchased: Boolean(purchased),
  };

  res.json(items[itemIndex]);
});

app.delete("/api/items/:id", (req, res) => {
  const itemId = Number(req.params.id);
  const originalLength = items.length;

  items = items.filter((item) => item.id !== itemId);

  if (items.length === originalLength) {
    return res.status(404).json({ message: "Item not found." });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
