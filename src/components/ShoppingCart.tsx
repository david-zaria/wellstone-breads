import { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

export function ShoppingCart({ siteId }: { siteId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }

    // Listen for cart updates
    const handleCartUpdate = ((event: CustomEvent) => {
      const { productId, name, price, imageUrl } = event.detail;

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.productId === productId);

        if (existingItem) {
          // Increment quantity
          const newCart = prevCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        } else {
          // Add new item
          const newCart = [
            ...prevCart,
            { productId, name, price: parseFloat(price), quantity: 1, imageUrl },
          ];
          localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        }
      });

      // Open cart when item added
      setIsOpen(true);
    }) as EventListener;

    window.addEventListener('cart-add-item', handleCartUpdate);
    return () => window.removeEventListener('cart-add-item', handleCartUpdate);
  }, []);

  const updateQuantity = (productId: string, change: number) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeItem = (productId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-accent text-white rounded-full p-4 shadow-lg transition-colors duration-200 z-40"
        aria-label="Shopping cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        ${item.price.toFixed(2)} each
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium text-gray-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="ml-auto text-red-600 hover:text-red-800 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => (window.location.href = '/checkout')}
                className="w-full bg-primary hover:bg-accent text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
