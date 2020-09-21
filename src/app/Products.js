import './src/main.css';

export default class Products {
 async getProducts() {
   // Local JSON data.
   let products = await fetch("/src/public/products.json")
     .then((res) => res.json())
     .then((data) => data.items);

   products = products.map((item) => {
     const { title, price } = item.fields;
     const { id } = item.sys;
     const image = item.fields.image.fields.file.url;

     return {
       id,
       title,
       price,
       image,
     };
   });

   return products;
 }
 catch(error) {
   console.log(error);
 }
}