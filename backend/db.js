const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'shopping.db');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      category TEXT,
      purchased INTEGER NOT NULL DEFAULT 0
    )
  `);
});

function normalizeItem(payload = {}) {
  const rawName = typeof payload.name === 'string' ? payload.name.trim() : '';
  const quantityValue = Number(payload.quantity);
  const rawCategory = typeof payload.category === 'string' ? payload.category.trim() : '';

  return {
    name: rawName,
    quantity: Number.isFinite(quantityValue) ? quantityValue : 0,
    category: rawCategory,
    purchased: Boolean(payload.purchased),
  };
}

function getAllItems() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, quantity, category, purchased FROM items ORDER BY id ASC', (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map((row) => ({
        ...row,
        purchased: Boolean(row.purchased),
      })));
    });
  });
}

function addItem(item) {
  const normalized = normalizeItem(item);

  if (!normalized.name) {
    throw new Error('Product name is required.');
  }

  if (!Number.isFinite(normalized.quantity) || normalized.quantity <= 0) {
    throw new Error('Quantity must be greater than 0.');
  }

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO items (name, quantity, category, purchased) VALUES (?, ?, ?, ?)',
      [normalized.name, normalized.quantity, normalized.category, normalized.purchased ? 1 : 0],
      function (err) {
        if (err) return reject(err);

        resolve({
          id: this.lastID,
          name: normalized.name,
          quantity: normalized.quantity,
          category: normalized.category,
          purchased: normalized.purchased,
        });
      }
    );
  });
}

function updateItem(id, item) {
  const normalized = normalizeItem(item);

  if (!normalized.name) {
    throw new Error('Product name is required.');
  }

  if (!Number.isFinite(normalized.quantity) || normalized.quantity <= 0) {
    throw new Error('Quantity must be greater than 0.');
  }

  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE items SET name = ?, quantity = ?, category = ?, purchased = ? WHERE id = ?',
      [normalized.name, normalized.quantity, normalized.category, normalized.purchased ? 1 : 0, id],
      function (err) {
        if (err) return reject(err);

        if (this.changes === 0) {
          return resolve(null);
        }

        resolve({
          id: Number(id),
          name: normalized.name,
          quantity: normalized.quantity,
          category: normalized.category,
          purchased: normalized.purchased,
        });
      }
    );
  });
}

function deleteItem(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
}

module.exports = {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  normalizeItem,
};
