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
    button.addEventListener('click', this.handleClick);
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
    updateAttributes(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    updateAttributes(this);
  }
}

function updateAttributes(element) {

  const shadow = element.shadowRoot;

  // img element
  const img = shadow.querySelector('img');
  img.setAttribute('src', element.getAttribute('img'));
  img.setAttribute('alt', element.getAttribute('data-title'));
  img.setAttribute('width', 200);
  // title element
  const title = shadow.querySelector('.title');
  title.textContent = element.getAttribute('data-title');
  // price element
  const price = shadow.querySelector('.price');
  price.textContent = element.getAttribute('data-price');
}

customElements.define('product-item', ProductItem);
