/* =============================================================================
   CS 499: Modules, Sync vs. Async & Promises
   ============================================================================= */

// ---- Imports (all of these come from OTHER FILES: modules!) -----------------
import * as price from "./shop/price.js";                        // everything price.js exports, in one object
import { formatPrice, calculateSubtotal, applyDiscount } from "./shop/price.js";  
import calculateTax from "./shop/tax.js";                        // default import
import salesTax from "./shop/tax.js";                            // same default export, different name
import { checkStock } from "./shop/inventory.js";
import { verifyUser, getCart, calculateTotal, chargeCard } from "./shop/checkout.js";


// /* =============================================================================
//    PART 1. Modules                                         
//    ============================================================================= */

// // // 1.2 
// function calculate() {
//   const cart = [
//     { name: "Running shoes", price: 59.99, qty: 1 },
//     { name: "Water bottle", price: 12.5, qty: 2 },
//   ];

//   const subtotal = calculateSubtotal(cart);
//   const tax = calculateTax(subtotal);

//   console.log("Subtotal:      ", formatPrice(subtotal));
//   console.log("Tax:           ", formatPrice(tax));
//   console.log("Total:         ", formatPrice(subtotal + tax));
//   console.log("10% off subtotal:", formatPrice(applyDiscount(subtotal, 10)));
// }

// calculate(); 

// // 1.3
// function outputPrice() {
//   console.log("Exports from price.js:", Object.keys(price));
//   console.log("price.round2 is:", price.round2);
// }

// outputPrice(); 

// // 1.4 
// function defaultExport() {
//   console.log("Same function?", calculateTax === salesTax);
//   console.log("salesTax(100) =", salesTax(100));
// }

// defaultExport();

// /* =============================================================================
//    PART 2 -- Asynchronous Programming 
//    ============================================================================= */

// // 2.1 
// function outputOrder() {
//   console.log("1. Order placed");

//   setTimeout(() => {
//     console.log("3. Confirmation email sent");
//   }, 2000);

//   console.log("2. Show the 'Thank you' page");
// }

// outputOrder();

// // 2.2 
// function timerOutput() {
//   console.log("Before");
//   setTimeout(() => console.log("Timer with 0 ms delay"), 0);
//   console.log("After");
// }

// timerOutput();

// /* =============================================================================
//    PART 3 -- Promises                                  
//    ============================================================================= */

// // 3.1 
// function rejectOutput() {
//   const request = checkStock("sneakers", 1);

//   request.catch(() => {}); // keeps Node quiet for now; real handlers are in Part 5

//   setTimeout(() => {
//     console.log("1.5 seconds later:", request);
//   }, 1500);
// }

// rejectOutput();

// // 3.2
// function validatePromoCode(code) {
//    return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (code === "SAVE10") {
//             resolve(10);
//           }
//         else if (code === "SAVE20") {
//           resolve(20);
//         }
//         else {
//           reject(`Invalid promo code: "${code}"`);
//         }
//       });
//    })
// }

// function promoOutput() {
//   ["SAVE10", "SAVE20", "FREESTUFF"].forEach((code) => {
//     validatePromoCode(code)
//       .then((percent) => console.log(`${code}: ${percent}% off`))
//       .catch((error) => console.log(`${code}: ${error}`));
//   });
// }

// promoOutput();


// /* =============================================================================
//    PART 4 -- Handling Results: .then() .catch() .finally()      
//    ============================================================================= */

// // 4.1 
// function checkItem(item, qty) {
//   console.log("Loading spinner ON...");

//   checkStock(item, qty)
//     .then((message) => console.log("SUCCESS:", message))
//     .catch((error) => console.log("PROBLEM:", error))
//     .finally(() => console.log("Loading spinner OFF"));

//   console.log("(This line is written AFTER the promise code)");
// }

// checkItem("sneakers",2);

// // 4.2
// function errorOutput() {
//   checkStock("sneakers", 1)
//     .then((message) => {
//       console.log("Stock check:", message);
//       throw "Payment service is down";
//     })
//     .then(() => console.log("Payment complete"))
//     .catch((error) => console.log("Caught:", error))
//     .finally(() => console.log("Done"));
// }

// errorOutput();

/* =============================================================================
   PART 5 -- Chaining Promises
   ============================================================================= */

// 5.1 
// function checkoutFlow(email) {
//   verifyUser(email)
//     .then(getCart)
//     .then(calculateTotal)
//     .then(chargeCard)
//     .then((receipt) => console.log("RECEIPT:", receipt))
//     .catch((error) => console.log("CHECKOUT FAILED:", error))
//     .finally(() => console.log("Checkout finished"));
// }

// checkoutFlow("jordan@example.com"); 

// 5.2 

function bug() {
  verifyUser("jordan@example.com")
    .then((user) => {
      return getCart(user); // <-- BUG: something is missing on this line
    })
    .then((cart) => {
      console.log("Cart received:", cart);
    })
    .catch((error) => console.log("CHECKOUT FAILED:", error));
}

bug();

