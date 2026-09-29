const express = require("express");
const cors = require("cors");
const { getAllItems, addItem, updateItem, deleteItem, normalizeItem } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/items", async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to load items." });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const normalized = normalizeItem(req.body);

    if (!normalized.name) {
      return res.status(400).json({ message: "Product name is required." });
    }

    if (!Number.isFinite(normalized.quantity) || normalized.quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0." });
    }

    const newItem = await addItem(normalized);
    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Unable to create item." });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const itemId = Number(req.params.id);
    const normalized = normalizeItem(req.body);

    if (!normalized.name) {
      return res.status(400).json({ message: "Product name is required." });
    }

    if (!Number.isFinite(normalized.quantity) || normalized.quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0." });
    }

    const updated = await updateItem(itemId, normalized);

    if (!updated) {
      return res.status(404).json({ message: "Item not found." });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Unable to update item." });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const itemId = Number(req.params.id);
    const removed = await deleteItem(itemId);

    if (!removed) {
      return res.status(404).json({ message: "Item not found." });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete item." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
