document.addEventListener("DOMContentLoaded", ()=> {
    const products = [
        { id: 1, name: "Product 1", price: 19.23 },
        { id: 2, name: "Product 2", price: 27.80 }, 
        { id: 3, name: "Product 3", price: 32.30 },
        { id: 4, name: "Product 4", price: 46.90 },
    ];

    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const checkOutBtn = document.getElementById("checkout-btn");
    const totalPriceDisplay = document.getElementById("total-price");

    products.forEach(product =>{
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);  
    })

    productList.addEventListener("click", (event) => {
        if(event.target.tagName === "BUTTON"){
            const productId = parseInt(event.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId)
            addToCart(product);
        }
    });

    function addToCart(product){
        cart.push(product);
        console.log(cart);        
        renderCart();
    }

    function renderCart(){
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if(cart.length > 0){
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((items, index)=>{
                totalPrice += items.price;
                const cartItemsDiv = document.createElement("div");
                cartItemsDiv.innerHTML = `
                ${items.name} - $${items.price.toFixed(2)}
                <button class="remove-item" data-index="${index}">Remove</button>
                `
                cartItemsDiv.classList.add("cart-item");
                cartItems.appendChild(cartItemsDiv);
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
            })
        } else {
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `0.00`;
        }
    }

    checkOutBtn.addEventListener("click", () => {
        alert("Thank you for your purchase!");
        cart.length = 0; 
        cartItems.innerHTML = ""; 
        renderCart();        
        console.log("Cart after checkout:", cart);
    });

    cartItems.addEventListener("click", (e)=>{
        if(e.target.tagName !== "BUTTON") return;
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        cartItems.innerHTML = ""; 
        renderCart();        
        console.log("Cart after removal:", cart);
    })
});