/* ==========================================================================
   CS 499: JavaScript Functions, Objects & Exception Handling
   ========================================================================== */

// ==========================================================================
// PART 1 — Functions & Arguments
// ==========================================================================

// 1.1 Standard Function Declaration & Argument Mismatch

//TODO 
function calculateScore(basePoints, bonusPoints) {
   return (basePoints+bonusPoints)
}

console.log("Two args:", calculateScore(100, 50)); 
console.log("One arg:", calculateScore(100)); 
console.log("Three args:", calculateScore(100, 50, 25));

// 1.2 Arrow Function Conversion (Standard Expression)

const toFarenheit = (celsius) => {
   return (celsius * 9/5)+32;
};

console.log(toFarenheit(20));

// 1.3 Arrow Function Conversion (Implicit Return Syntax)

const triple = (x) => x*3;
console.log(triple(3));

// ==========================================================================
// PART 2 — Objects, Getters/Setters & Maps
// ==========================================================================

// 2.1 Object Literal with Getter & Setter

const bankAccount = {
   name: "Alex",
   balance: 500,
   get formattedBalance() {
      return "$"+this.balance;
   },
   set deposit(amount) {
      if (amount >= 0) {
         this.balance = this.balance + amount;
      };
   }
};

console.log(bankAccount.formattedBalance);
bankAccount.deposit=500;
console.log(bankAccount.formattedBalance);

// 2.2 Plain Objects as Maps vs. Map Object
let inventory = {
    item101: "Laptop",
    item102: "Keyboard"
};
inventory["item103"] = "Mouse";
console.log("Item 102:", inventory["item102"]);

// Task 2.2 Map Implementation

const map = new Map();
map.set(1001, "Manager");
map.set(1002, "Developer");
console.log(map);
console.log(map.has(1001));
console.log(map.size);

// ==========================================================================
// PART 3 — Built-in Objects
// ==========================================================================

// 3.1 String Object Manipulation
let rawProductCode = "   sku-98765-electronics   ";
rawProductCode = rawProductCode.trim();
rawProductCode = rawProductCode.toUpperCase();
console.log(rawProductCode.split("-"));

// 3.2 Date Objects & Zero-Indexing Gotcha
let currDateTime = new Date();
console.log("Current Date/Time:", currDateTime);

let oneSecPastEpoch = new Date(1000);
console.log("1 Second Past Epoch:", oneSecPastEpoch);

let georgeBirthday = new Date(1732, 1, 22);
console.log("George Washington's Birthday:", georgeBirthday);

let theFuture = new Date(2035, 9, 21, 7, 28, 0);
console.log("Future Date:", theFuture);

// 3.3 Math Object Random Number Generation

//TODO


// ==========================================================================
// PART 4 — Exception Handling
// ==========================================================================

// 4.1 Unhandled Exception

function processOrder(itemCount, maxLimit) {
    if (itemCount <= 0) {
        throw "Item count must be greater than zero.";
    }
    if (itemCount > maxLimit) {
        throw "Order exceeds maximum limit.";
    }
    return `Order processed for ${itemCount} items.`;
}

console.log(processOrder(15, 10)); 
console.log("System continuing standard execution...");


// 4.2 Handled Exception with try...catch
function processOrder(itemCount, maxLimit) {
    if (itemCount <= 0) {
        throw "Item count must be greater than zero.";
    }
    if (itemCount > maxLimit) {
        throw "Order exceeds maximum limit.";
    }
    return `Order processed for ${itemCount} items.`;
}
try {
    console.log(processOrder(15, 10));
} catch (error) {
    console.log("Caught Exception:", error);
}
console.log("System continuing standard execution...");

// ==========================================================================
// PART 5 — Application (E-Commerce Inventory Monitor)
// ==========================================================================

const formatSKU = (sku) => {
   return (sku.trim().toUpperCase());
};
console.log(formatSKU("saaswegsaodfin"));

const product = {
   name: "Andrew",
   price: 50,
   get priceTag() {
      return "$" + this.price;
   }
}

const warehouseLocations = new Map();
warehouseLocations.set(101, "Electronics");
warehouseLocations.set(102, "Groceries");
console.log(warehouseLocations);

function verifyStock(skuInput, aisleNumber) {
   if (!skuInput) {
      throw "SKU cannot be empty.";
   }
   if (!warehouseLocations.has(aisleNumber)) {
      return "Unassigned Aisle."
   }
   else {
      return "Aisle Found: " + warehouseLocations.get(aisleNumber);
   }
}

try {
   console.log(verifyStock("sku-101", 101));
}
catch (error) {
   console.log("Error Caught: ", error);
}

try {
   console.log(verifyStock("sku-202", 190));
}
catch (error) {
   console.log("Error Caught: ", error);
}

try {
   console.log(verifyStock("", 101));
}
catch (error) {
   console.log("Error Caught: ", error);
}