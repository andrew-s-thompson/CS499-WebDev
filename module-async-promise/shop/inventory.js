// shop/inventory.js
// Pretend this talks to a database. The answer takes about 1 second,
// so checkStock() returns a PROMISE instead of an answer.

const inventory = {
  sneakers: 3,
  backpack: 0,
  "water bottle": 12,
};

export function checkStock(item, qty) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const available = inventory[item];

      if (available === undefined) {
        reject(`We don't sell "${item}".`);
      } else if (available < qty) {
        reject(`Only ${available} "${item}" left, but you asked for ${qty}.`);
      } else {
        resolve(`${qty} x ${item} in stock!`);
      }
    }, 1000);
  });
}
