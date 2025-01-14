document.addEventListener('DOMContentLoaded', () => {
    // const product = {{ product | json }} // it is product object its mandatory to 
    document.querySelectorAll('.option-value input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            let selectedValue = [];
            document.querySelectorAll('.option-value input[type="radio"]:checked').forEach((radio) => {
                selectedValue.push(radio.value);
            });
            const matchedVariant = product.variants.find((variant) =>
                selectedValue.every((option, index) => option === variant.options[index])
            );
            console.log(matchedVariant);
            document.querySelector('#variant-id').value = matchedVariant.id

        });
    });
});  