// Script.js
var localStorage = window.localStorage;
var addedList = [];

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("items") == null) {
    // Fetch data (json) from website and create the items
    fetchAndCreate();
  } else {
    // List the items from the existing localStorage
    createItems();
  }
});

/**
 * An asynchronous function that grabs data from the url link
 */
async function fetchAndCreate() {
  const response = await fetch("https://fakestoreapi.com/products");
  const json = await response.json();

  localStorage.setItem("items", JSON.stringify(json));

  await createItems();
}

/**
 * Helper asynchronous function that creates the items and puts them into the
 * shop
 */
async function createItems() {
  // Create all the items in the shop
  let items = JSON.parse(localStorage.getItem("items"));
  let productList = document.getElementById("product-list");

  // Load the item
  if (localStorage.getItem("itemCnt")) {
    // Load saved cart data
    let count = document.getElementById("cart-count");

    addedList = JSON.parse(localStorage.getItem("itemCnt"));
    count.innerHTML = addedList.length;
  } else {
    // Use an empty cart
    localStorage.setItem("itemCnt", addedList);
  }

  // Iterate through all the items (create the cards) and put them into the shop
  for (i in items) {
    let prodItem;

    if (addedList.includes(items[i].id)) {
      prodItem = new ProductItem(
        items[i].title,
        items[i].price,
        items[i].image,
        items[i].id,
        "Remove from Cart"
      );
    } else {
      prodItem = new ProductItem(
        items[i].title,
        items[i].price,
        items[i].image,
        items[i].id,
        "Add to Cart"
      );
    }

    productList.appendChild(prodItem);
  }
}
