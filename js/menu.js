document.addEventListener('DOMContentLoaded', function() {
    
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.textContent = "Added to Cart!";
    
    document.body.appendChild(notification);
    
    
    //Get all the food items
    const foodCards = document.querySelectorAll('.foodCard');
    
    //Getting data from foodcards
    for (let i = 0; i < foodCards.length; i++) {
        const card = foodCards[i];
        
        const nameElement = card.querySelector('h3');
        const priceElement = card.querySelector('.price');
        const addButton = card.querySelector('.addCart');
        
        //Assign ids
        nameElement.id = `food-name-${i}`;
        priceElement.id = `food-price-${i}`;
        addButton.id = `add-btn-${i}`;
        
        //Add to cart button
        addButton.addEventListener('click', function() {
            const itemName = document.getElementById(`food-name-${i}`).textContent;
            const itemPrice = parseFloat(
                document.getElementById(`food-price-${i}`).textContent.replace('$', '')
            );
            addItemToCart(itemName, itemPrice);
            
            // Show notification
            notification.style.display = 'block'    ;
            setTimeout(function() {
                notification.style.display = 'none';
            }, 2000);
        });
    }
    
    //Function executed by add to cart button
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
