// Cart functionality - handles add to cart buttons

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCart);
} else {
  initCart();
}

function initCart() {
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', handleAddToCart);
  });
}

function handleAddToCart(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;

  const productId = button.dataset.productId;
  const productName = button.dataset.productName;
  const productPrice = button.dataset.productPrice;
  const productImage = button.dataset.productImage;

  if (!productId || !productName || !productPrice) {
    console.error('Missing product data on button');
    return;
  }

  // Dispatch custom event that ShoppingCart component listens for
  const cartEvent = new CustomEvent('cart-add-item', {
    detail: {
      productId,
      name: productName,
      price: productPrice,
      imageUrl: productImage || null,
    },
  });

  window.dispatchEvent(cartEvent);

  // Visual feedback
  button.textContent = 'Added!';
  button.classList.add('bg-green-600');

  setTimeout(() => {
    button.textContent = 'Add to Cart';
    button.classList.remove('bg-green-600');
  }, 1000);
}

// Re-initialize when navigating (for Astro View Transitions)
document.addEventListener('astro:page-load', initCart);
