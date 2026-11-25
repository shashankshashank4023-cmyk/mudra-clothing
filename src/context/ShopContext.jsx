import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as defaultProducts } from '../data/products';
import { api } from '../services/api';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts);

  // Sync products from backend API
  useEffect(() => {
    api.getProducts()
      .then(fetched => {
        if (fetched && fetched.length > 0) {
          setProducts(fetched);
        }
      })
      .catch(err => {
        console.warn('Backend API connection offline, using default catalog cache', err);
      });
  }, []);

  // Navigation / Collection Filter: "all" | "formal" | "casual"
  const [activeCollection, setActiveCollection] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(40000);
  const [sortBy, setSortBy] = useState("featured");

  // Quick View / Detail Modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modals: Checkout, Bespoke Customizer, Style Matchmaker Quiz, Admin Suite
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cart & Wishlist State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("mudra_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("mudra_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem("mudra_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("mudra_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Toast Notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to cart with customizer details
  const addToCart = (product, selectedSize, selectedColor, bespokeOptions = null) => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];
    const bespokeTag = bespokeOptions ? `-${bespokeOptions.monogramInitials}` : '';
    const cartItemId = `${product.id}-${size}-${color.name}${bespokeTag}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          ...product,
          cartItemId,
          selectedSize: size,
          selectedColor: color,
          bespokeOptions,
          quantity: 1
        }];
      }
    });

    showToast(`Added to bespoke bag: ${product.name} (${size})`);
  };

  // Remove from Cart
  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Update Cart Quantity
  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed from Wishlist: ${product.name}`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved to Wishlist: ${product.name}`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Financial Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartOriginalTotal = cart.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const savings = cartOriginalTotal - cartSubtotal;
  const isFreeShipping = cartSubtotal >= 5000;
  const shippingFee = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 450);
  const cartTotal = cartSubtotal + shippingFee;
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter & Search Engine
  const filteredProducts = products.filter(product => {
    if (activeCollection !== "all" && product.collection !== activeCollection) {
      return false;
    }
    if (selectedSubCategory !== "all" && product.subCategory !== selectedSubCategory) {
      return false;
    }
    if (product.price > priceRange) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchSub = product.subCategory.toLowerCase().includes(q);
      const matchFabric = product.fabricDetails.toLowerCase().includes(q);
      const matchBadge = product.badge.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchSub && !matchFabric && !matchBadge) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <ShopContext.Provider value={{
      products,
      filteredProducts,
      activeCollection,
      setActiveCollection,
      selectedSubCategory,
      setSelectedSubCategory,
      searchQuery,
      setSearchQuery,
      priceRange,
      setPriceRange,
      sortBy,
      setSortBy,
      selectedProduct,
      setSelectedProduct,
      isCheckoutOpen,
      setIsCheckoutOpen,
      isCustomizerOpen,
      setIsCustomizerOpen,
      isQuizOpen,
      setIsQuizOpen,
      isAdminOpen,
      setIsAdminOpen,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartSubtotal,
      savings,
      isFreeShipping,
      shippingFee,
      cartTotal,
      totalItemCount,
      wishlist,
      toggleWishlist,
      isInWishlist,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isSearchOpen,
      setIsSearchOpen,
      toastMessage,
      showToast
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
