class CartManager {
    constructor(buttonSelector) {
        this.productButtons = document.querySelectorAll(buttonSelector);
        this.init();
    }

    // Initialize event listeners
    init() {
        this.productButtons.forEach((button) => {
            button.addEventListener('click', (event) => this.handleAddToCart(event, button));
        });
    }

    // Handle the Add to Cart button click
    handleAddToCart(event, button) {
        event.preventDefault();

        const productId = button.getAttribute('data-id');
        if (!productId) {
            console.log('Product ID not found!');
            return;
        }

        const formData = {
            items: [
                {
                    id: parseInt(productId, 10), // Convert the ID to an integer
                    quantity: 1, // Default quantity set to 1
                },
            ],
            sections: 'cart-drawer,main-cart-items,cart-icon-bubble,cart-live-region-text,cart-footer',
        };

        this.addToCart(formData);
    }

    // Send the add-to-cart request
    async addToCart(formData) {
        try {
            const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Product added to cart:', data);
            this.updateCartUI(data);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }

    // Update the cart UI dynamically
    updateCartUI(cartData) {
        try {
            const parser = new DOMParser();

            // Update the cart icon bubble
            const newCartIconBubble = this.parseHTML(cartData.sections['cart-icon-bubble'], '.cart-count-bubble');
            const currentCartIconBubble = document.querySelector('.cart-count-bubble');
            if (newCartIconBubble && currentCartIconBubble) {
                currentCartIconBubble.innerHTML = newCartIconBubble.innerHTML;
            }

            // Update the cart drawer items
            const newCartItem = this.parseHTML(cartData.sections['cart-drawer'], '#CartDrawer-Item-1');
            const currentCartItem = document.querySelector('#CartDrawer-Item-1');
            if (newCartItem && currentCartItem) {
                currentCartItem.innerHTML = newCartItem.innerHTML;
            }
        } catch (error) {
            console.error('Error updating the cart UI:', error);
        }
    }

    // Helper method to parse HTML and extract a specific element
    parseHTML(htmlString, selector) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.querySelector(selector);
    }
}

// Instantiate the CartManager with the button selector
window.addEventListener('DOMContentLoaded', () => {
    new CartManager('.product-btn');
});