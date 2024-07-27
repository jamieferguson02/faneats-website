let cart = [];

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function addToCart(button) {
    const itemElement = button.parentElement;
    const itemName = itemElement.getAttribute('data-item');
    const itemPrice = parseFloat(itemElement.getAttribute('data-price'));

    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const orderSummary = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    document.getElementById('food').value = `Order Summary: ${orderSummary} \nTotal: $${orderTotal}`;
    scrollToSection('order');
}

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your order has been placed!');
    cart = [];
    updateCart();
});
