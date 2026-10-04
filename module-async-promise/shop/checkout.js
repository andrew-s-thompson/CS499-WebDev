// shop/checkout.js
// The four steps of a checkout. Each step takes a little time, so each
// returns a PROMISE. Notice this module imports from the other modules too.

import { calculateSubtotal, formatPrice } from "./price.js";
import calculateTax from "./tax.js";

// Private helper (not exported): a promise that fulfills after `ms` milliseconds.
const wait = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const users = {
  "jordan@example.com": { id: 1, name: "Jordan" },
  "casey@example.com": { id: 2, name: "Casey" },
};

const carts = {
  1: [
    { name: "sneakers", price: 59.99, qty: 1 },
    { name: "water bottle", price: 12.5, qty: 2 },
  ],
  2: [
    { name: "desk lamp", price: 45.0, qty: 1 },
    { name: "keyboard", price: 79.99, qty: 1 },
  ],
};

// Step 1
export function verifyUser(email) {
  console.log(`Verifying ${email}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email.includes("@")) {
        reject("Invalid email address");
      } else if (!users[email]) {
        reject(`No account found for ${email}`);
      } else {
        resolve(users[email]);
      }
    }, 500);
  });
}

// Step 2
export function getCart(user) {
  console.log(`Loading cart for ${user.name}...`);
  return wait(500, carts[user.id]);
}

// Step 3
export function calculateTotal(cart) {
  console.log("Calculating total...");
  const subtotal = calculateSubtotal(cart);
  return wait(300, subtotal + calculateTax(subtotal));
}

// Step 4
export function chargeCard(total) {
  console.log(`Charging ${formatPrice(total)}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (total > 100) {
        reject(`Card declined: ${formatPrice(total)} is over your $100 limit`);
      } else {
        resolve(`Payment of ${formatPrice(total)} approved`);
      }
    }, 500);
  });
}
