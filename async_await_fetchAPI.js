/* =============================================================================
   CS 499: async, await & Fetch API
   ============================================================================= */

/* =============================================================================
PART 1. Demo                                         
============================================================================= */

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function getUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  // if (!response.ok) {
  //   throw new Error(`No account found (HTTP ${response.status})`);
  // }

  const user = await response.json();
  return user;
}

async function showUser(id) {
  console.log(`\n--- Looking up user ${id} ---`);
  try {
    const user = await getUser(id);
    console.log(`Welcome, ${user.name}!`);
    console.log(`Email: ${user.email}`);
    console.log(`City:  ${user.address.city}`);
  } catch (error) {
    console.log("LOOKUP FAILED:", error.message);
  } finally {
    console.log("Lookup finished");
  }
}

async function inspectResponse(id) {
  console.log(`\n--- Inspecting the Response for user ${id} ---`);
  const response = await fetch(`${BASE_URL}/users/${id}`);
  console.log("response.ok:    ", response.ok);
  console.log("response.status:", response.status);
  // Notice: for id 99999 there is NO error thrown. Status is just 404.
}

async function main() {
  await showUser(1);        // success
  await showUser(99999);    // 404: handled by our ok check
  await inspectResponse(1); // ok: true,  status: 200
  await inspectResponse(99999); // ok: false, status: 404, and no throw!

  console.log("\nAll done.");
}

main();

/* =============================================================================
PART 2. Try-It-Yourself                                      
============================================================================= */

// 1.1 
// function checkEvenNumber(number) {
//   return new Promise((resolve, reject) => {
//     if (number % 2 === 0) {
//       resolve("Success! The number is even.");
//     } else {
//       reject("Error: The number is odd.");
//     }
//   });
// }

// TODO: Write the same function using async/await. 

// TODO: Write runCheck(number). Use try/catch/finally for error handling. 
 
// 1.2 
// function getTitleWithThen(id) {
//   return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
//     .then((response) => response.json())
//     .then((todo) => todo.title);
// }
 
// TODO: Write the same function using async/await. Return the todo's title.
// async function getTitleWithAwait(id) {
  
// }

// 1.3 

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
 
// TODO: Wait 1000 ms, then wait 1000 ms again (one after the other).
// Time it with console.time("sequential") and console.timeEnd("sequential").
// async function runSequential() {
  
// }
 
// TODO: Start both waits at the same time using Promise.all.
// Time it with console.time("parallel") and console.timeEnd("parallel").
// async function runParallel() {
  
// }
 
// ------------------------------------------------------------
// Run everything (don't edit)
// ------------------------------------------------------------
// async function main() {

//   console.log("--- Part 1 ---");
//   await runCheck(4);                         
//   await runCheck(7);                         

//   console.log("--- Part 2 ---");
//   console.log(await getTitleWithThen(1));
//   console.log(await getTitleWithAwait(1));   
 
//   console.log("--- Part 3 ---");
//   await runSequential();                     
//   await runParallel();                       
// }
 
// main();
