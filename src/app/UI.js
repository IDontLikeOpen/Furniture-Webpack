import './src/main.css';

import Storage from './Storage'

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const  cartDOM = document.querySelector(".cart");
const  cartOverlay = document.querySelector(".cart-overlay");
const  cartItems = document.querySelector(".cart-items");
const  cartTotal = document.querySelector(".cart-total");
const  cartContent = document.querySelector(".cart-content");
const  productsDOM = document.querySelector(".products-center");

  // Cart
  let cart = [];
  // Buttons.
  let buttonsDOM = [];
export default class UI {
  

  displayProducts(products) {
    let result = "";
    products.forEach(({ id, title, price, image }) => {
      result += `
     <div class="box" id="box-${id}">
      <div class="content">
        <img src="${image}">
        <div class="text">
     <button class="bag-btn" data-id=${id}>
                           <i class="fas fa-shopping-cart"></i>
                           add to bag
                       </button>
                       <br>
     <div class="line"> <h3>${title}</h3>
     </div><br>
     <div class="line"><h4>$${price}</h4></div>
   </div>
 </div>
</div>
     `;
    });

    productsDOM.innerHTML = result;
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;

    buttons.forEach((button) => {
      const id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.textContent = "In Cart";
        button.disabled = true;
      }

      button.addEventListener("click", (event) => {
        event.target.textContent = "In Cart";
        event.target.disabled = true;

        // Get product from products (Local storage).
        let cartItem = {
          ...Storage.getProduct(id),
          amount: 1,
        };
        // Add product to cart (Internal state).
        cart.push(cartItem);
        // Save cart state to storage.
        Storage.saveCart(cart);
        // Set cart values.
        this.setCartValue(cart);
        // Display cart item.
        this.addCartItem(cartItem);
        // Show the cart.
        this.showCart();
      });
    });

    let boxes = document.querySelectorAll(".box");
    console.log(boxes);
    boxes.forEach((box) => {
      box.addEventListener("mouseenter", () => {
        boxes.forEach((item) => {
          item.style.zIndex = 0;
          item.classList.remove("open");
        });
        box.style.zIndex = 10;
        box.classList.add("open");
      });
      box.addEventListener("mouseleave", () => {
        boxes.forEach((item) => {
          item.style.zIndex = 0;
          item.classList.remove("open");
        });
      });
    });
  }

  setCartValue(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    for (const { price, amount } of cart) {
      tempTotal += price * amount;
      itemsTotal += amount;
    }

    cartTotal.textContent = parseFloat(tempTotal.toFixed(2));
    cartItems.textContent = itemsTotal;
  }

  addCartItem({ id, title, price, image, amount }) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
     <img src="${image}" alt="${title}" />
     <div>
       <h4>${title}</h4>
       <h5>$${price}</h5>
       <span class="remove-item" data-id=${id}>remove</span>
     </div>
     <div>
       <i class="fas fa-chevron-up" data-id=${id}></i>
       <p class="item-amount">${amount}</p>
       <i class="fas fa-chevron-down" data-id=${id}></i>
     </div>
   `;
    cartContent.appendChild(div);
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValue(cart);
    this.populateCart(cart);

    cartBtn.addEventListener("click", this.showCart.bind(this));
    closeCartBtn.addEventListener("click", this.hideCart.bind(this));
  }

  populateCart(cart) {
    cart.forEach(this.addCartItem);
  }

  cartLogic() {
    clearCartBtn.addEventListener("click", this.clearCart.bind(this));
    cartContent.addEventListener("click", ({ target }) => {
      if (target.classList.contains("remove-item")) {
        let removeItem = target;
        let id = removeItem.dataset.id;
        this.removeItem(id);
        removeItem.closest(".cart-item").remove();
      } else if (target.classList.contains("fa-chevron-up")) {
        let addAmount = target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount++;
        Storage.saveCart(cart);
        this.setCartValue(cart);
        // Update view counter.
        let itemAmount = addAmount.nextElementSibling;
        itemAmount.textContent = tempItem.amount;
      } else if (target.classList.contains("fa-chevron-down")) {
        let lowerAmount = target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount--;

        if (tempItem.amount < 1) {
          // Remove from cart.
          this.removeItem(id);
          lowerAmount.closest(".cart-item").remove();
        } else {
          Storage.saveCart(cart);
          this.setCartValue(cart);
          // Update view counter.
          let itemAmount = lowerAmount.previousElementSibling;
          itemAmount.textContent = tempItem.amount;
        }
      }
    });
  }

  clearCart() {
    let cartItems = cart.map(({ id }) => id);
    cartItems.forEach(this.removeItem.bind(this));
    this.removeAllChild(cartContent);
    this.hideCart();
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValue(cart);
    Storage.saveCart(cart);

    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `
     <i class="fas fa-shopping-cart"></i>
     add to cart
   `;
  }

  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }

  removeAllChild(dom) {
    while (dom.firstChild) {
      dom.firstChild.remove();
    }
  }
}
