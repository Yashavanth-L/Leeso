// simple cart helper using localStorage
const KEY = 'leezo_cart';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch (e) {
    return { items: [] };
  }
}

function write(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  // notify listeners
  try {
    window.dispatchEvent(new CustomEvent('cart:update'));
  } catch (e) {}
}

export function getCart() {
  return read();
}

export function getCount() {
  const c = read();
  return c.items.reduce((s, it) => s + (it.qty || 1), 0);
}

export function addItem(product, qty = 1) {
  const c = read();
  const idx = c.items.findIndex((i) => i.id === product.id);
  if (idx >= 0) {
    c.items[idx].qty = (c.items[idx].qty || 1) + qty;
  } else {
    c.items.push({ id: product.id, name: product.name, price: product.price, qty, image: product.image || product.img || '' });
  }
  write(c);
}

export function removeItem(id) {
  const c = read();
  c.items = c.items.filter((i) => i.id !== id);
  write(c);
}

export function clearCart() {
  const c = { items: [] };
  write(c);
}

export default { getCart, getCount, addItem, removeItem, clearCart };
