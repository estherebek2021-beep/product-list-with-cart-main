let products = [];
let cart = [];

fetch("data.json")
.then(function(response){

    return response.json();

})
.then(function(data){

    products = data;

    displayProducts();

});

function displayProducts(){

    let output = "";

    products.forEach(function(product,index){

        output += `

        <div class="card">

            <img src="${product.image.desktop}" alt="${product.name}">

            <p>${product.category}</p>

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

            <button onclick="addToCart(${index})">

                Add To Cart

            </button>

        </div>

        `;
    });

    document.getElementById("products").innerHTML = output;
}

function addToCart(index){

    let selectedProduct = products[index];

    let found = false;

    for(let item of cart){

        if(item.name === selectedProduct.name){

            item.quantity++;

            found = true;
        }
    }

    if(found === false){

        cart.push({

            name:selectedProduct.name,
            price:selectedProduct.price,
            image:selectedProduct.image.thumbnail,
            quantity:1

        });
    }

    displayCart();
}

function displayCart(){

    let output = "";

    let total = 0;

    cart.forEach(function(item){

        total += item.price * item.quantity;

        output += `

        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>Quantity: ${item.quantity}</p>

            <button onclick="decreaseQuantity('${item.name}')">
                -
            </button>

            <button onclick="increaseQuantity('${item.name}')">
                +
            </button>

            <button onclick="removeItem('${item.name}')">
                Remove
            </button>

            <p>
                $${(item.price * item.quantity).toFixed(2)}
            </p>

        </div>

        `;
    });

    document.getElementById("cartItems").innerHTML = output;

    document.getElementById("cartCount").textContent = cart.length;

    document.getElementById("cartTotal").innerHTML = `

        <h3>Total: $${total.toFixed(2)}</h3>

        <button onclick="confirmOrder()">

            Confirm Order

        </button>

    `;
}

function increaseQuantity(name){

    for(let item of cart){

        if(item.name === name){

            item.quantity++;
        }
    }

    displayCart();
}

function decreaseQuantity(name){

    for(let i = 0; i < cart.length; i++){

        if(cart[i].name === name){

            cart[i].quantity--;

            if(cart[i].quantity === 0){

                cart.splice(i,1);
            }
        }
    }

    displayCart();
}

function removeItem(name){

    for(let i = 0; i < cart.length; i++){

        if(cart[i].name === name){

            cart.splice(i,1);
            break;
        }
    }

    displayCart();
}

function confirmOrder(){

    let summary = "";

    let total = 0;

    cart.forEach(function(item){

        total += item.price * item.quantity;

        summary += `

            <p>

                ${item.name}
                x ${item.quantity}

            </p>

        `;
    });

    summary += `<h3>Total: $${total.toFixed(2)}</h3>`;

    document.getElementById("orderSummary").innerHTML = summary;

    document.getElementById("modal").style.display = "flex";
}

function startNewOrder(){

    cart = [];

    displayCart();

    document.getElementById("modal").style.display = "none";
}