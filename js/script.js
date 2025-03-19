class Product {
  constructor(id, name, price, img, descrip) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.descrip = descrip;
  }
}

class Store {
  constructor(product, cart, modal) {
    this.products = product;
    this.cart = cart;
    this.modal = modal;
    this.renderProducts();
  }
  renderProducts() {
    const storeContainer = document.getElementById("store-container");
    storeContainer.innerHTML = "";
    this.products.forEach((product) => {
      const productsElem = document.createElement("div");
      productsElem.classList.add("product");
      productsElem.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="descrip">
          <h2>${product.name}</h2>
          <p>Ціна за кг: ${product.price} грн</p>
          <label>
            Кількість
            <input type="number" value="1" min="1" id=rq-${product.id}> 
          </label>
          <button data-id=${product.id}>У корзину</button>
        </div>
      `;
      productsElem.querySelector("img").addEventListener("click", () => {
        this.modal.show(product);
      });
      productsElem.querySelector("button").addEventListener("click", () => {
        const quantity = document.querySelector(`#rq-${product.id}`).value;
        this.cart.addToCart(product, parseInt(quantity));
      });
      storeContainer.appendChild(productsElem);
    });
  }
}

class Cart {
  constructor() {
    this.items = [];
  }
  addToCart(product, quantity) {
    const exItem = this.items.find((item) => item.product.id == product.id);
    if (exItem) {
      exItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.renderCart();
  }
  deleteFromCart(product) {
    const productIndex = this.items.findIndex(
      (item) => item.product.id == product.id
    );
    this.items.splice(productIndex, 1);
    this.renderCart();
  }
  renderCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    if (this.items.length == 0) {
      cartContainer.innerHTML = `
      <div class="descrip">
        <h3>Кошик порожній</h3>
      </div>
      `;
    } else {
      let totalPrice = 0;
      this.items.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = ` 
       <div class="cart_product">
            <img src="${item.product.img}" alt="${item.product.name}">
            <div class="descrip">
              <h2>${item.product.name}</h2>
              <p>${item.quantity} шт. за ${
          item.product.price * item.quantity
        } грн</p>
              <button>Видалити</button>
            </div>
          </div>
      `;
        cartItem
          .querySelector("button")
          .addEventListener("click", () => this.deleteFromCart(item.product));
        cartContainer.appendChild(cartItem);
        totalPrice += item.product.price * item.quantity;
      });
      const totalElm = document.createElement("div");
      totalElm.innerHTML = `
     <h3>До сплати: ${totalPrice} грн</h3>
    `;
      cartContainer.appendChild(totalElm);
    }
  }
}
class Modal {
  show(product) {
    const modal = document.getElementById("modal");
    const modalBody = document.querySelector(".modal-body");
    const productsElem = document.createElement("div");
    modalBody.innerHTML = null;
    productsElem.classList.add("product");
    productsElem.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <div class="descrip">
      <h2>${product.name}</h2>
      <p>Ціна за кг: ${product.price} грн</p>
      <p>${product.descrip}</p>
    </div>
    `;
    modalBody.appendChild(productsElem);
    modal.addEventListener("click", (e) => {
      if (e.target == modal) {
        this.close(modal);
      }
    });
    modal.style.display = "flex";
  }
  close(modal) {
    modal.style.display = "none";
  }
}

const myProduct = [
  new Product(
    1,
    "Картопля",
    32,
    "img/Картопля.jpg",
    "Універсальний продукт, використовується в багатьох стравах."
  ),
  new Product(
    2,
    "Морква",
    38,
    "img/Морква.jpg",
    "Багата на бета-каротин, корисна для зору та імунітету."
  ),
  new Product(
    3,
    "Цибуля",
    92,
    "img/Цибуля.jpg",
    "Додає смаку стравам, має антибактеріальні властивості."
  ),
  new Product(
    4,
    "Часник",
    182,
    "img/Часник.jpg",
    "Природний антибіотик, покращує імунітет."
  ),
  new Product(
    5,
    "Помідор",
    119,
    "img/Помідор.jpg",
    "Містять лікопін, корисні для серця та судин."
  ),
  new Product(
    6,
    "Огірки",
    166,
    "img/Огірки.jpg",
    "Освіжаючі, містять багато води."
  ),
  new Product(
    1,
    "Картопля",
    32,
    "img/Картопля.jpg",
    "Універсальний продукт, використовується в багатьох стравах."
  ),
  new Product(
    2,
    "Морква",
    38,
    "img/Морква.jpg",
    "Багата на бета-каротин, корисна для зору та імунітету."
  ),
  new Product(
    3,
    "Цибуля",
    92,
    "img/Цибуля.jpg",
    "Додає смаку стравам, має антибактеріальні властивості."
  ),
  new Product(
    4,
    "Часник",
    182,
    "img/Часник.jpg",
    "Природний антибіотик, покращує імунітет."
  ),
  new Product(
    5,
    "Помідор",
    119,
    "img/Помідор.jpg",
    "Містять лікопін, корисні для серця та судин."
  ),
  new Product(
    6,
    "Огірки",
    166,
    "img/Огірки.jpg",
    "Освіжаючі, містять багато води."
  ),
];

const cart = new Cart();
const modal = new Modal();
const store = new Store(myProduct, cart, modal);
