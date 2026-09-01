const CartProducts = document.getElementById('cart-products');
const CartTotal = document.getElementById('cart-total');
const cartKey = 'cart';

const getCart = () => JSON.parse(localStorage.getItem(cartKey) || '{}');

const saveCart = (cart) => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
};

const updateCartTotal = (products, cart) => {
    const total = products.reduce((sum, product) => {
        return sum + (product.price * (cart[product.id] || 0));
    }, 0);
    CartTotal.innerText = `Total: $${total.toFixed(2)}`;
};

const showProducts = (products) => {
    const cart = getCart();
    CartProducts.innerHTML = '';
    updateCartTotal(products, cart);

    products.filter((product) => cart[product.id]).forEach((product) => {
        const div = document.createElement("div");

        const img = document.createElement("img");
        img.src = product.thumbnail;
        img.alt = product.title;

        const title = document.createElement("h1");
        title.innerText = product.title;

        const price = document.createElement("h2");
        price.innerText = `$${product.price}`;

        const productTotal = document.createElement("h3");
        productTotal.innerText = `Amount: $${(product.price * cart[product.id]).toFixed(2)}`;

        const decrementBtn = document.createElement("button");
        decrementBtn.innerText = "-";

        const quantity = document.createElement("span");
        quantity.innerText = cart[product.id];

        const incrementBtn = document.createElement("button");
        incrementBtn.innerText = "+";

        const quantityControls = document.createElement("div");
        quantityControls.className = "quantity-controls";
        quantityControls.appendChild(decrementBtn);
        quantityControls.appendChild(quantity);
        quantityControls.appendChild(incrementBtn);

        incrementBtn.addEventListener('click', () => {
            const currentCart = getCart();
            currentCart[product.id] += 1;
            saveCart(currentCart);
            showProducts(products);
        });

        decrementBtn.addEventListener('click', () => {
            const currentCart = getCart();
            currentCart[product.id] -= 1;
            if (currentCart[product.id] === 0) delete currentCart[product.id];
            saveCart(currentCart);
            showProducts(products);
        });

        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(price);
        div.appendChild(productTotal);
        div.appendChild(quantityControls);

        CartProducts.appendChild(div);
    });
}

const loadCart = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    showProducts(data.products);
};

loadCart();