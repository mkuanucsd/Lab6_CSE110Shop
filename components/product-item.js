// product-item.js
class ProductItem extends HTMLElement {
  constructor(title, itemPrice, imgSrc, id, state) {
    // Super Constructor
    super();

    // Attach a shadow root to <product-list>
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Create a list that will store the img, name, and price
    let lst = document.createElement("li");
    lst.setAttribute("class", "product");

    // Create the img
    let img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    img.setAttribute("alt", title);
    img.setAttribute("width", 200);

    // Create the name
    let name = document.createElement("p");
    name.setAttribute("class", "title");
    name.innerHTML = title;

    // Create the price
    let price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerHTML = "$" + itemPrice;

    // Create the button
    let btn = document.createElement("button");
    btn.innerHTML = state;

    // Increments count and notifies the user
    btn.onclick = function () {
      let count = document.getElementById("cart-count");

      // Change the state of the button
      if (btn.innerHTML == "Add to Cart") {
        // Adding an item
        addedList.push(id);
        btn.innerHTML = "Remove from Cart";
        alert("Added to Cart!");
      } else {
        // Remove an item
        addedList.splice(addedList.indexOf(id), 1);
        btn.innerHTML = "Add to Cart";
        alert("Removed from Cart!");
      }

      // Store the cart data in localStorage
      localStorage.setItem("itemCnt", JSON.stringify(addedList));

      // Display the count of the cart
      count.innerHTML = addedList.length;
    };

    // Create CSS style
    let style = document.createElement("style");

    // Store the data onto the 'li' tag
    lst.appendChild(img);
    lst.appendChild(name);
    lst.appendChild(price);
    lst.appendChild(btn);

    // Attach the elements to the shadow root
    shadowRoot.appendChild(lst);
    shadowRoot.appendChild(style);

    // CSS style
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
  }
}

customElements.define("product-item", ProductItem);
