//selects all add cart buttons & loops through to see if it's clicked
document.querySelectorAll('.addCart').forEach(button => {
    //when add cart button is clicked
    button.addEventListener('click'), () => {
        //grabs closest food card, which should be the one it is on
        const card = button.closest('.foodCard')
        //get the data from the card
        const name = card.getAttribute('data-name');
        const price = card.getAttribute('data-price');

        /**get the cart or create a new cart for where the data is going to be stored
           localStorage.getItem('cart') gets the existing cart from local storage
           JSON.parse() converts it back into an array so we can add item
           if there isn't a cart, then it is just an empty array [] **/
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        //searches if item already exists, returns false if not
        const item = cart.find(item => item.name === name);

        //if item exists, add to the quantity
        if (item) {
            item.quantity++;
        } else {
            //if it doesn't, add new item object
            cart.push({ name, price, quantity: 1})
        }

        //convert back to string, then saves updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
    }
})