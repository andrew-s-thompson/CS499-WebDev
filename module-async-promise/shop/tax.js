// shop/tax.js

export default function calculateTax(amount, rate = 0.07) {
  return Math.round(amount * rate * 100) / 100;
}
