/* app.js */
const productsE1 = document.querySelector(".products");
const cartItemE2 = document.querySelector(".cart-items");
const subtotalE1 = document.querySelector(".subtotal");
const totalItemsIncartE1 = document.querySelector(".total-items-in-cart");
//Render products
function renderProducts() {
    products.forEach((product) => {
        productsE1.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="t-shirt 1">
                    </div>
                    <div class="desc">
                        <h2>"${product.name}"</h2>
                        <h2><small>$</small>"${product.price}"</h2>
                        <p>
                           "${product.description}"
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onClick="addToCart(${product.id})">
                        <img src="./bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
            `;
    });
}

renderProducts();
//Add to cart
let cart = [];
function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
        alert("Product already in cart");
    } else {
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    updateCart();
}
function updateCart() {
    renderCartItems();
    renderSubtotal();
}

function renderCartItems() {
    cartItemE2.innerHTML = "";

    cart.forEach((item) => {
        cartItemE2.innerHTML += `<div class="cart-item">
        <div class="item-info">
            <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${item.price}
        </div>
        <div class="units">
            <div class="btn minus" onclick="changeNumberOfUnits('minus',${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick="changeNumberOfUnits('plus',${item.id})">+</div>
        </div>
    </div>
    `;
    });
}
function renderSubtotal() {
    let totalPrice = 0;
    let totalItems = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    subtotalE1.innerHTML = `Subtotal(${totalItems}items:$${totalPrice.toFixed(2)})`;
    totalItemsIncartE1.innerHTML = totalItems;
}

function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;
        if (item.id === id) {
            if (action === "minus" && item.numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && item.numberOfUnits < item.instock) {
                {
                    numberOfUnits++;
                }
            }
        }
        return {
            ...item,
            numberOfUnits,
        };
    });
    updateCart();
}
