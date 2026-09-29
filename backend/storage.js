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

function buildItem(payload = {}, id = 1) {
  const normalized = normalizeItem(payload);

  return {
    id,
    name: normalized.name,
    quantity: normalized.quantity,
    category: normalized.category,
    purchased: Boolean(normalized.purchased),
  };
}

function createStorage(initialItems = []) {
  let items = [...initialItems];
  let nextId = items.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1;

  return {
    list() {
      return [...items];
    },
    add(item) {
      const normalized = {
        ...item,
        id: item.id ?? nextId,
      };

      if (!normalized.name || !Number.isFinite(Number(normalized.quantity)) || Number(normalized.quantity) <= 0) {
        throw new Error("Invalid shopping item");
      }

      items.push(normalized);
      nextId += 1;
      return normalized;
    },
    update(id, updates) {
      const index = items.findIndex((item) => item.id === Number(id));
      if (index === -1) {
        return null;
      }

      const nextItem = {
        ...items[index],
        ...updates,
      };

      items[index] = nextItem;
      return nextItem;
    },
    remove(id) {
      const before = items.length;
      items = items.filter((item) => item.id !== Number(id));
      return before !== items.length;
    },
  };
}

module.exports = {
  normalizeItem,
  buildItem,
  createStorage,
};
