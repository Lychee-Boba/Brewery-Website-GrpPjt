document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();

    // Prevent checkout if cart is empty
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before checking out.');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }
    
    
    function displayCartItems() {
        const cartBody = document.getElementById('cart-body');
        const cartTotalElement = document.getElementById('cart-total');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        
        cartBody.innerHTML = '';
        
        if (cart.length === 0) {
            cartBody.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
            cartTotalElement.textContent = 'Total: $0.00';
            return;
        }
        
        let total = 0;
        
        // Creating the html for items added to cart
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="quantity-btn minus" id="minus-${i}">-</button>
                    ${item.quantity}
                    <button class="quantity-btn plus" id="plus-${i}">+</button>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-btn" id="remove-${i}">⨉</button></td>
            `;
            cartBody.appendChild(row);
        }
        
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        
        //Adding functionality to the minus and plus buttons
        for (let i = 0; i < cart.length; i++) {
            //minus button
            document.getElementById(`minus-${i}`).addEventListener('click', function() {
                updateQuantity(i, false);
            });
            
            //puls button
            document.getElementById(`plus-${i}`).addEventListener('click', function() {
                updateQuantity(i, true);
            });
            
            // Remove button
            document.getElementById(`remove-${i}`).addEventListener('click', function() {
                removeItem(i);
            });
        }
    }
    
    //The function thats called by the minus and plus button to update the quantity
    function updateQuantity(index, isIncrease) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (isIncrease) {
            cart[index].quantity += 1;
        } else {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                // Remove object if item quatity becomes 0
                cart.splice(index, 1);
            }
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateNavCartCount();
    }
    
    // The function used by the rremove button
    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateNavCartCount();
    }
    
    // Updates counter for items in cart at the cart navigation button at the top of the page
    function updateNavCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;
        
        for (let i = 0; i < cart.length; i++) {
            totalItems += cart[i].quantity;
        }
        
        let cartCount = document.getElementById('cart-count');
        cartCount.textContent = totalItems > 0 ? totalItems : '';
    }
    updateNavCartCount();
});
