// product-item.js

class ProductItem extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // li element
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');
    // img element
    const img = wrapper.appendChild(document.createElement('img'));
    // title element
    const title = wrapper.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    // price element
    const price = wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    // button element
    const button = wrapper.appendChild(document.createElement('button'));
    button.textContent = 'Add to Cart';
    this.eventHandler = this.addToCart.bind(this);
    button.addEventListener('click', this.eventHandler);
    // CSS styling
    const style = document.createElement('style');
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
    }`;

    this.shadowRoot.append(style, wrapper);
  }

  connectedCallback() {
    this.updateAttributes();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateAttributes();
  }

  updateAttributes() {
    const shadow = this.shadowRoot;
    // img element
    const img = shadow.querySelector('img');
    img.setAttribute('src', this.getAttribute('img'));
    img.setAttribute('alt', this.getAttribute('data-title'));
    img.setAttribute('width', 200);
    // title element
    const title = shadow.querySelector('.title');
    title.textContent = this.getAttribute('data-title');
    // price element
    const price = shadow.querySelector('.price');
    price.textContent = this.getAttribute('data-price');
    // Check local storage
    let localStorage = window.localStorage;
    if (!localStorage.getItem('cart')) {
      this.setCartData(this.id, 0);
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (cart[this.id]) {
        this.addToCart();
      } else {
        this.setCartData(this.id, 0);
      }
    }
  }

  addToCart() {
    const shadow = this.shadowRoot;
    const button = shadow.querySelector('button');

    button.textContent = 'Remove from Cart';
    document.querySelector('#cart-count').textContent++;

    this.setCartData(this.id, 1);

    button.removeEventListener('click', this.eventHandler);
    this.eventHandler = this.removeFromCart.bind(this);
    button.addEventListener('click', this.eventHandler);
  }

  removeFromCart() {
    const shadow = this.shadowRoot;
    const button = shadow.querySelector('button');

    button.textContent = 'Add to Cart';
    document.querySelector('#cart-count').textContent--;

    this.setCartData(this.id, 0);

    button.removeEventListener('click', this.eventHandler);
    this.eventHandler = this.addToCart.bind(this);
    button.addEventListener('click', this.eventHandler);
  }

  getCartData() {
    let localStorage = window.localStorage;
    return localStorage.getItem('cart');
  }

  setCartData(id, value) {
    let localStorage = window.localStorage;
    if (!localStorage.getItem('cart')) {
      // Initialize and set cart
      let cart = [];
      let obj = {};
      obj[id] = value;
      cart.push(obj);
      console.log(cart);
      window.localStorage.setItem('cart', JSON.stringify(obj));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'));
      // Fetch and set cart
      cart[id] = value;
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }

  }

}

customElements.define('product-item', ProductItem);