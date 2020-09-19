export default class Storage {
 static saveProducts(products) {
   if (localStorage) {
     localStorage.setItem("products", JSON.stringify(products));
   } else {
     console.log("Local storage is not available on this machine.");
   }
 }

 static getProduct(id) {
   let products = JSON.parse(localStorage.getItem("products"));
   return products.find((p) => p.id === id);
 }

 static saveCart(cart) {
   if (localStorage) {
     localStorage.setItem("cart", JSON.stringify(cart));
   } else {
     console.log("Local storage is not available on this machine.");
   }
 }

 static getCart() {
   let cart = localStorage.getItem("cart");
   return cart ? JSON.parse(cart) : [];
 }
}