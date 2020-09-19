import Storage from './Storage'
import UI from './UI'
import Products from './Products'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";




export const run = () => {
 document.addEventListener("DOMContentLoaded", () => {
const ui = new UI();
const products = new Products();
// Setup app.
 ui.setupAPP();

 products
   .getProducts()
   .then((products) => {
     ui.displayProducts(products);
     Storage.saveProducts(products);
   })
   .then(() => {
     ui.getBagButtons();
     ui.cartLogic();
   })
  //  .then(() => gsap.to(".box", {rotation: 27, x: 100, duration: 1}))
.then(() => {
  gsap.fromTo(".grid-item-1", {left: -1000}, {left:0 , duration: 1});
  gsap.fromTo(".banner", {left: -1000}, {left:150, duration: 1, delay: 0.7});
  gsap.fromTo(".grid-item-2", {top: -1000}, {top: -20, duration: 1, delay: 0.7});
  gsap.fromTo(".grid-item-3", {top: -1000}, {top: 40, duration: 1, delay: 1});
  gsap.fromTo(".grid-item-4", {left: 1000}, {left:-300, duration: 1, delay: 1.3});
  gsap.registerPlugin(ScrollTrigger)
  gsap.fromTo("#box-1, #box-2, #box-3, #box-4", {y: 500},{
  scrollTrigger: "#box-1, #box-2, #box-3, #box-4",
  y: 0
});
gsap.fromTo("#box-5, #box-6, #box-7, #box-8", {y: 500},{
  scrollTrigger: "#box-5, #box-6, #box-7, #box-8",
  y: 0,
  delay:-0.5
});

gsap.fromTo(".grid-item-5", {y: 500},{
  scrollTrigger: ".grid-item-5",
  y: 0
});

gsap.fromTo(".grid-item-6", {y: -500},{
  scrollTrigger: ".grid-item-6",
  y: 0
});

gsap.fromTo(".grid-item-7", {x: -500},{
  scrollTrigger: ".grid-item-7",
  x: 0
});

gsap.fromTo(".grid-item-8", {x: 500},{
  scrollTrigger: ".grid-item-8",
  x: 0
});

})
  
})}