// shop/price.js
// Everything about prices lives here. 

const round2 = (n) => Math.round(n * 100) / 100;

export function formatPrice(amount) {
  return "$" + round2(amount).toFixed(2);
}

export function calculateSubtotal(cart) {
  return round2(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
}

export function applyDiscount(amount, percent) {
  return round2(amount - amount * (percent / 100));
}
