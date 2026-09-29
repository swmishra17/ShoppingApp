const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeItem, buildItem, createStorage } = require('./storage');

test('normalizeItem trims and validates input', () => {
  const result = normalizeItem({ name: '  Milk  ', quantity: '2', category: ' Groceries ', purchased: true });

  assert.equal(result.name, 'Milk');
  assert.equal(result.quantity, 2);
  assert.equal(result.category, 'Groceries');
  assert.equal(result.purchased, true);
});

test('normalizeItem rejects invalid quantity', () => {
  const result = normalizeItem({ name: 'Milk', quantity: 0, category: 'Groceries' });

  assert.equal(result.quantity, 0);
  assert.equal(result.name, 'Milk');
});

test('createStorage manages item collection', () => {
  const storage = createStorage();
  const item = buildItem({ name: 'Bread', quantity: 1, category: 'Bakery' });

  storage.add(item);
  assert.equal(storage.list().length, 1);

  const updated = storage.update(1, { ...item, purchased: true });
  assert.equal(updated.purchased, true);

  storage.remove(1);
  assert.equal(storage.list().length, 0);
});
