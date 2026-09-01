const products = document.getElementById('products');
const cartButton = document.querySelector('.cart-button');
const cartKey = 'cart';

const getCart = () => JSON.parse(localStorage.getItem(cartKey) || '{}');

const saveCart = (cart) => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
};

const updateCartButton = () => {
    const cart = getCart();
    const productCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
    cartButton.innerText = `Cart (${productCount})`;
};

const getproductsdata = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    const productsData = data.products;
    const cart = getCart();

    productsData.forEach((product) => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = product.thumbnail;
        img.alt = "product img here";

        const title = document.createElement("h1");
        title.innerText = product.title;

        const price = document.createElement("h2");
        price.innerText = `$${product.price}`;

        const incrementBtn = document.createElement("button");
        incrementBtn.innerText = "+";

        const decrementBtn = document.createElement("button");
        decrementBtn.innerText = "-";

        const span = document.createElement("span");
        span.innerText = cart[product.id] || 0;

        const quantityControls = document.createElement("div");
        quantityControls.className = "quantity-controls";
        quantityControls.appendChild(decrementBtn);
        quantityControls.appendChild(span);
        quantityControls.appendChild(incrementBtn);

        incrementBtn.addEventListener('click', () => {
            const currentCart = getCart();
            currentCart[product.id] = (currentCart[product.id] || 0) + 1;
            saveCart(currentCart);
            span.innerText = currentCart[product.id];
            updateCartButton();
        });

        decrementBtn.addEventListener('click', () => {
            const currentCart = getCart();
            if (!currentCart[product.id]) return;

            currentCart[product.id] -= 1;
            if (currentCart[product.id] === 0) delete currentCart[product.id];
            saveCart(currentCart);
            span.innerText = currentCart[product.id] || 0;
            updateCartButton();
        });
        
        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(price);
        div.appendChild(quantityControls);

        products.appendChild(div)
    });
    updateCartButton();
}
getproductsdata();