document.addEventListener('DOMContentLoaded', () => {
    const product = {{ product | json
}};
const addToCartButton = document.querySelector('.add-to-cart');
const checkoutButton = document.querySelector('.checkout');
const variantIdInput = document.querySelector('#variant-id');

// Get selected options
const getSelectedOptions = () => {
    return Array.from(document.querySelectorAll('.option-value input[type="radio"]:checked'))
        .map(radio => radio.value);
};

// Find the matched variant
const findMatchedVariant = (selectedValue) => {
    return product.variants.find(variant =>
        selectedValue.every((option, index) => option === variant.options[index])
    );
};

// Update the UI based on availability
const updateUI = (matchedVariant) => {
    const isUnavailable = matchedVariant && !matchedVariant.available;
    addToCartButton.classList.toggle('disable', isUnavailable);
    addToCartButton.disabled = isUnavailable;
    addToCartButton.textContent = isUnavailable ? 'Sold Out' : 'Add to Cart';
    checkoutButton.classList.toggle('disable', isUnavailable);
    checkoutButton.disabled = isUnavailable;
    checkoutButton.textContent = isUnavailable ? 'Sold Out' : 'Checkout';

    // Disable unavailable options
    document.querySelectorAll('.option-value input[type="radio"]').forEach(radio => {
        const isUnavailableOption = matchedVariant && !matchedVariant.available && matchedVariant.options.includes(radio.value);
        radio.classList.toggle('disabled', isUnavailableOption);
    });

    // Update variant id input if available
    if (matchedVariant) {
        variantIdInput.value = matchedVariant.id;
    }
};

// Event listener for option changes
document.querySelector('.product-options').addEventListener('change', (event) => {
    if (event.target.matches('.option-value input[type="radio"]')) {
        const selectedValue = getSelectedOptions();
        const matchedVariant = findMatchedVariant(selectedValue);
        updateUI(matchedVariant);
    }
});

// Event listener for the checkout button
checkoutButton.addEventListener('click', () => {
    const form = document.querySelector('form');
    if (form) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'return_to';
        input.value = '/checkout';
        form.appendChild(input);
        form.submit();
    }
});
});