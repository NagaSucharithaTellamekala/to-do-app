// Step 1: Function to place an order
function placeOrder(food) {
  return new Promise((resolve, reject) => {
    console.log(`Order received for ${food}. 🍔`);
    setTimeout(() => {
      if (food) {
        resolve(food);
      } else {
        reject("No food selected! ❌");
      }
    }, 1000); // simulate 1 second delay
  });
}

// Step 2: Function to prepare the food
function prepareFood(food) {
  return new Promise((resolve) => {
    console.log(`Preparing ${food}... 🍳`);
    setTimeout(() => {
      resolve(`${food} is ready! ✅`);
    }, 2000); // simulate 2 seconds delay
  });
}

// Step 3: Function to deliver the food
function deliverFood(preparedFood) {
  return new Promise((resolve) => {
    console.log(`Delivering ${preparedFood}... 🚴`);
    setTimeout(() => {
      resolve(`${preparedFood} delivered to your doorstep! 🎉`);
    }, 1500); // simulate 1.5 seconds delay
  });
}

// Using the promises
placeOrder(" burger")// if no order it will be error
  .then((food) => prepareFood(food))
  .then((preparedFood) => deliverFood(preparedFood))
  .then((deliveredMessage) => console.log(deliveredMessage))
  .catch((error) => console.log("Error:", error));
