// ==========================================================
// CS 499: JavaScript Fundamentals Starter Code
// ==========================================================

// ----------------------------------------------------------
// PART 1: Quirks, Coercion, and Equality
// ----------------------------------------------------------

// 1.1
let tuitionBalance = "1500";
let labFee = 50;
let latePenalty = "20";

let totalBalance = tuitionBalance + labFee;
let totalBalance2 = labFee + tuitionBalance;
let reducedBalance = tuitionBalance - latePenalty;

console.log(`Total Balance: ${totalBalance}`);
console.log(`Total Balance2: ${totalBalance2}`);
console.log(`Reduced Balance: ${reducedBalance}`);

// 1.2 
let studentID = 10482;
let enteredID = "10482";
let campusAccessGranted = false;
let userStatusCode = 0;

console.log("Loose equality (ID):", studentID == enteredID);
console.log("Strict equality (ID):", studentID === enteredID);
console.log("Loose equality (Status):", userStatusCode == campusAccessGranted);
console.log("Strict equality (Status):", userStatusCode === campusAccessGranted);

// 1.3 
let courseWaitlist = [];
let accountBalance = 0;

if (courseWaitlist) {
    console.log("Waitlist process initialized.");
} else {
    console.log("No waitlist found.");
}

if (accountBalance) {
    console.log("Account active.");
} else {
    console.log("Account balance zero/inactive.");
}

// ----------------------------------------------------------
// PART 2: Loops & Array 
// ----------------------------------------------------------

// 2.1 
const weeklyExpenses = [45.50, 12.00, 85.25, 3.75];

console.log("for...of iteration:");
for (const item of weeklyExpenses) {
    console.log(item);
}

console.log("for...in iteration:");
for (const index in weeklyExpenses) {
    console.log(index);
}

// 2.2
let budgetQueue = [120, 45, 15, 80];

// TODO 1: Add 60 to the end of budgetQueue
budgetQueue.push(60);
// TODO 2: Add 200 to the start of budgetQueue
budgetQueue.unshift(200)
// TODO 3: Remove the last element and store it in 'lastRemoved'
let lastRemoved = budgetQueue.pop()
// TODO 4: Remove the first element from budgetQueue
budgetQueue.shift()
// TODO 5: Use splice() at index 2 to remove 1 element (15) and insert 10 and 5
console.log("old: " + budgetQueue)
budgetQueue.splice(2, 1, 10, 5)
console.log("new: " + budgetQueue)
// TODO 6: Use forEach() to calculate the sum of all remaining elements in budgetQueue

// Write your forEach loop here:
let totalExpenses = 0;
budgetQueue.forEach(element => {
    totalExpenses = totalExpenses + element
});

console.log("Updated Budget Queue:", budgetQueue);
console.log("Total Expenses calculated via forEach:", totalExpenses);

