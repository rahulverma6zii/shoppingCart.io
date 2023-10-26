let productContainer = document.getElementsByClassName("products")[0];
let cartConatiner = document.getElementsByClassName("cart-items")[0];
let subTotal=document.querySelector(".subtotal");
let totalIteminCart=document.querySelector(".total-items-in-cart");
let cart = [];

products.forEach(product => {

    productContainer.innerHTML +=
        `<div class="item">
    <div class="item-container">
        <div class="item-img">
            <img src="${product.imgSrc}" alt="${product.name}">
        </div>
        <div class="desc">
            <h2>${product.name}</h2>
            <h2><small>$</small>${product.price}</h2>
            <p>
                ${product.description}
            </p>
        </div>
        <div class="add-to-wishlist">
            <img src="./icons/heart.png" alt="add to wish list">
        </div>
        <div class="add-to-cart" onclick="addToCart(${product.id})">
            <img src="./icons/bag-plus.png" alt="add to cart">
        </div>
    </div>
</div>
    `


})
function addToCart(id) {

    if (cart.some(item => item.id == id)) {
        alert("Item already present in the cart , please increment it in cart")
    }
    else {
        let tshirt = products.find(object => object.id == id);
        tshirt.numberOfUnits = 1;
        cart.push(tshirt);
        cartConatiner.innerHTML += `
        <div class="cart-item">
        <div class="item-info" onclick="removeItemFromCart(${tshirt.id})">
            <img src="${tshirt.imgSrc}" alt="${tshirt.name}">
            <h4>${tshirt.name}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${tshirt.price}
        </div>
        <div class="units">
            <div class="btn minus" onclick="changeNumberOfUnits('minus', ${tshirt.id})">-</div>
            <div class="number">${tshirt.numberOfUnits}</div>
            <div class="btn plus" onclick="changeNumberOfUnits('plus', ${tshirt.id})">+</div>           
        </div>
    </div>
        `
    }
    ;
    updateSum();
}

function changeNumberOfUnits(sign, id) {
    let tshirt = cart.find(item => item.id == id);
    if (sign == 'plus') {

        tshirt.numberOfUnits++;
       
    }
    else {
        if(
            tshirt.numberOfUnits >1 
        ){
            tshirt.numberOfUnits--;
        }
      
       
    }
    updateCart();
    updateSum();
   
    
}
function updateCart() {
    cartConatiner.innerHTML = ''
    cart.forEach(tshirt => {
      
        cartConatiner.innerHTML += `
        <div class="cart-item">
        <div class="item-info" onclick="removeItemFromCart(${tshirt.id})">
            <img src="${tshirt.imgSrc}" alt="${tshirt.name}">
            <h4>${tshirt.name}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${tshirt.price}
        </div>
        <div class="units">
            <div class="btn minus" onclick="changeNumberOfUnits('minus', ${tshirt.id})">-</div>
            <div class="number">${tshirt.numberOfUnits}</div>
            <div class="btn plus" onclick="changeNumberOfUnits('plus', ${tshirt.id})">+</div>           
        </div>
    </div>
        `
    })
}

function updateSum(){
        let finalTotal=cart.reduce((x,y)=>x+y.price*y.numberOfUnits,0)   
        let finalItem=cart.reduce((x,y)=>x+y.numberOfUnits,0)
        console.log(finalItem,finalTotal)
        let finalRender=` Subtotal (${finalItem} items): $${finalTotal}`
        subTotal.innerHTML=finalRender;
        totalIteminCart.innerHTML=finalItem;
}