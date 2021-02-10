// Script.js

function populateStorage(localStorage) {
  // Fetch from URL
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => localStorage.setItem('products', JSON.stringify(data)))
    .then(() => setShop(localStorage))
}

function setShop(localStorage) {
  let products = JSON.parse(localStorage.getItem('products'));
  for (product of products) {
    let element = document.createElement('product-item');
    element.setAttribute('id', 'product-' + product.id);
    element.setAttribute('img', product.image);
    element.setAttribute('data-title', product.title);
    element.setAttribute('data-price', product.price);
    document.querySelector('#product-list').appendChild(element);
  }

}

window.addEventListener('DOMContentLoaded', () => {

  // Check for local storage
  let localStorage = window.localStorage;

  if (!localStorage.getItem('products')) {
    populateStorage(localStorage);
  } else {
    setShop(localStorage);
  }
});