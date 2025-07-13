document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.addCart');
    
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.textContent = "Added to Cart!";
    
    document.body.appendChild(notification);
    
    
    // Add to cart button
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', function() {
            const foodCard = this.closest('.foodCard');
            const itemName = foodCard.dataset.name;
            const itemPrice = parseFloat(foodCard.dataset.price);
            
            // Add item to cart
            addItemToCart(itemName, itemPrice);
            
            // Show notification
            notification.style.display = 'block';
            setTimeout(function() {
                notification.style.display = 'none';
            }, 2000);
        });
    }
    
    function addItemToCart(name, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingItemIndex = -1;
        
        for (let j = 0; j < cart.length; j++) {
            if (cart[j].name === name) {
                existingItemIndex = j;
                break;
            }
        }
        
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
    
    // Updates counter for items in cart at the cart navigation button at the top of the page
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;
        
        for (let i = 0; i < cart.length; i++) {
            totalItems += cart[i].quantity;
        }
        
        let cartCount = document.getElementById('cart-count');
        cartCount.textContent = totalItems > 0 ? totalItems : '';
    }
    
    // Initialize cart count when page loads
    updateCartCount();
});
