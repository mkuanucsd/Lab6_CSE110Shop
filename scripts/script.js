// Script.js
var localStorage = window.localStorage;
var addedList = [];

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('items') == null) {
    // Fetch data (json) from website
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        // Store the data
        localStorage.setItem('items', JSON.stringify(data));
      });

    console.log('Items stored');
  } else {
    console.log('Items already exist');
  }

  // Create all the items in the shop
  let items = JSON.parse(localStorage.getItem('items'));
  let productList = document.getElementById('product-list');

  // Load the item 
  if (localStorage.getItem('itemCnt')) {
    // Load saved cart data
    let count = document.getElementById('cart-count');

    addedList = JSON.parse(localStorage.getItem('itemCnt'));
    count.innerHTML = addedList.length;
  } else {
    // Use an empty cart
    localStorage.setItem('itemCnt', addedList);
  }


  for (i in items) {
    let prodItem;

    if (addedList.includes(items[i].id)) {
      prodItem = new ProductItem(items[i].title, items[i].price,
        items[i].image, items[i].id, 'Remove from Cart');
    } else {
      prodItem = new ProductItem(items[i].title, items[i].price,
        items[i].image, items[i].id, 'Add to Cart');
    }

    productList.appendChild(prodItem);
  }
})

