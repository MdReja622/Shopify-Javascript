document.addEventListener('DOMContentLoaded', () => {
    const variantIdInput = document.querySelector('#variant-id');

    const observer = new MutationObserver(() => {
        const newVariantId = variantIdInput.value;
        updateURLWithVariantId(newVariantId);
    });

    observer.observe(variantIdInput, {
        attributes: true,
        attributeFilter: ['value'],
    });

    //update the URL
    function updateURLWithVariantId(variantId) {
        const currentURL = new URL(window.location.href);
        currentURL.searchParams.set('variant', variantId);
        history.replaceState({ path: currentURL.href }, '', currentURL.href);
    }
});
