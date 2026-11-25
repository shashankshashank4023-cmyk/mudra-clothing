import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    savings,
    isFreeShipping,
    shippingFee,
    cartTotal,
    showToast
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "MUDRA10") {
      setDiscountApplied(true);
      showToast("Privilege 10% Discount Code Applied!");
    } else {
      showToast("Invalid code. Try using 'MUDRA10'");
    }
  };

  const couponDiscount = discountApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const finalPayable = Math.max(0, cartTotal - couponDiscount);

  const handleOpenCheckoutModal = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="drawer-panel" onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="drawer-kicker">MUDRA SARTORIAL ATELIER</span>
            <h3 className="drawer-heading">YOUR BESPOKE BAG ({cart.length})</h3>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          <div className="progress-info">
            {isFreeShipping ? (
              <span className="free-shipping-achieved">
                <Sparkles size={14} className="gold-accent" />
                <span>Complimentary White-Glove Courier Unlocked!</span>
              </span>
            ) : (
              <span>
                Add ₹{(5000 - cartSubtotal).toLocaleString('en-IN')} more for Complimentary Domestic & Global Courier
              </span>
            )}
          </div>
          <div className="progress-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.min(100, (cartSubtotal / 5000) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="drawer-scroll-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} className="empty-bag-icon" />
              <h4 className="empty-title">YOUR BAG IS CURRENTLY VACANT</h4>
              <p className="empty-desc">
                Explore our Formal Suits, Handcrafted Bandhgalas, or Relaxed Linen Casuals to commence your sartorial curation.
              </p>
              <button
                className="btn-mudra-gold"
                onClick={() => setIsCartOpen(false)}
              >
                BROWSE ATELIER CREATIONS
              </button>
            </div>
          ) : (
            <div className="cart-items-stack">
              {cart.map(item => (
                <div key={item.cartItemId} className="cart-item-card">
                  <img src={item.images[0]} alt={item.name} className="cart-item-thumb" />

                  <div className="cart-item-details">
                    <div className="item-title-row">
                      <h4 className="item-name">{item.name}</h4>
                      <button
                        className="item-remove-btn"
                        onClick={() => removeFromCart(item.cartItemId)}
                        title="Remove garment"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="item-specs-pills">
                      <span className="spec-badge">Size: {item.selectedSize}</span>
                      <span className="spec-badge">
                        <span
                          className="item-color-preview"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        ></span>
                        {item.selectedColor.name}
                      </span>
                      {item.bespokeOptions && (
                        <span className="spec-badge bespoke">
                          Monogram: {item.bespokeOptions.monogramInitials}
                        </span>
                      )}
                    </div>

                    <div className="item-pricing-row">
                      {/* Quantity Stepper */}
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Total Line Item Price */}
                      <div className="item-line-price">
                        <span className="line-current">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Calculations & Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="coupon-form">
              <Tag size={16} className="coupon-icon" />
              <input
                type="text"
                placeholder="Privilege Code (Try 'MUDRA10')"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button type="submit" className="coupon-submit-btn">
                APPLY
              </button>
            </form>

            {discountApplied && (
              <div className="discount-alert">
                <span>Code MUDRA10 Applied (-10% Privilege Savings)</span>
                <span className="discount-amount">-₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Financial Ledger */}
            <div className="ledger-box">
              <div className="ledger-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {savings > 0 && (
                <div className="ledger-row savings-row">
                  <span>Atelier Privilege Savings</span>
                  <span>-₹{savings.toLocaleString('en-IN')}</span>
                </div>
              )}

              {discountApplied && (
                <div className="ledger-row discount-row">
                  <span>Privilege Coupon Savings</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="ledger-row">
                <span>Insured White-Glove Courier</span>
                <span>{shippingFee === 0 ? "COMPLIMENTARY" : `₹${shippingFee}`}</span>
              </div>

              <div className="ledger-row total-row">
                <span>Total Investment</span>
                <span className="final-total">₹{finalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action -> Opens Full CheckoutModal */}
            <button
              className="btn-mudra-gold checkout-btn"
              onClick={handleOpenCheckoutModal}
            >
              <span>PROCEED TO BESPOKE CHECKOUT</span>
              <ArrowRight size={18} />
            </button>

            <div className="checkout-trust-row">
              <ShieldCheck size={14} className="gold-accent" />
              <span>Includes Complimentary Tailored Sizing Consultation</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .drawer-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-stone);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .drawer-kicker {
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          display: block;
        }

        .drawer-heading {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--color-obsidian);
          margin-top: 2px;
        }

        .drawer-close-btn {
          background: transparent;
          border: none;
          color: var(--color-muted);
          cursor: pointer;
          transition: color 0.2s;
        }

        .drawer-close-btn:hover {
          color: var(--color-obsidian);
        }

        .shipping-progress-banner {
          background: var(--color-sand);
          padding: 0.8rem 1.5rem;
          border-bottom: 1px solid var(--color-stone);
        }

        .progress-info {
          font-size: 0.72rem;
          color: var(--color-obsidian);
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .free-shipping-achieved {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-gold);
          font-weight: 700;
        }

        .progress-track {
          width: 100%;
          height: 4px;
          background: #e2ddd5;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--color-gold);
          transition: width 0.4s ease;
        }

        .drawer-scroll-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .empty-cart-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 1rem;
        }

        .empty-bag-icon {
          color: var(--color-stone);
          margin-bottom: 1rem;
        }

        .empty-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-desc {
          font-size: 0.82rem;
          color: var(--color-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 320px;
        }

        .cart-items-stack {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .cart-item-card {
          display: flex;
          gap: 1rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--color-stone);
        }

        .cart-item-thumb {
          width: 80px;
          height: 105px;
          object-fit: cover;
          object-position: center top;
          image-rendering: -webkit-optimize-contrast;
          border: 1px solid var(--color-stone);
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .item-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }

        .item-name {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-obsidian);
          line-height: 1.2;
        }

        .item-remove-btn {
          background: transparent;
          border: none;
          color: var(--color-muted);
          cursor: pointer;
          transition: color 0.2s;
        }

        .item-remove-btn:hover {
          color: var(--color-terracotta);
        }

        .item-specs-pills {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 0.8rem;
        }

        .spec-badge {
          font-size: 0.65rem;
          font-weight: 600;
          background: var(--color-sand);
          padding: 0.2rem 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--color-obsidian);
        }

        .spec-badge.bespoke {
          background: rgba(197, 160, 89, 0.15);
          color: var(--color-gold);
          border: 1px solid var(--color-gold);
          font-weight: 800;
        }

        .item-color-preview {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .item-pricing-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .qty-stepper {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-stone);
          background: #FFF;
        }

        .qty-btn {
          background: transparent;
          border: none;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .qty-number {
          font-size: 0.75rem;
          font-weight: 700;
          min-width: 24px;
          text-align: center;
        }

        .item-line-price {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--color-obsidian);
        }

        /* Drawer Footer */
        .drawer-footer {
          padding: 1.5rem;
          background: #FFF;
          border-top: 1px solid var(--color-stone);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
        }

        .coupon-form {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-stone);
          padding: 0.2rem 0.6rem;
          margin-bottom: 0.8rem;
          background: var(--color-sand);
        }

        .coupon-icon {
          color: var(--color-gold);
          margin-right: 0.4rem;
        }

        .coupon-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-obsidian);
        }

        .coupon-submit-btn {
          background: var(--color-obsidian);
          color: #FFF;
          border: none;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
        }

        .discount-alert {
          display: flex;
          justify-content: space-between;
          background: rgba(197, 160, 89, 0.15);
          color: var(--color-gold);
          border: 1px solid var(--color-gold);
          padding: 0.4rem 0.8rem;
          font-size: 0.72rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
        }

        .ledger-box {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.8rem;
          margin-bottom: 1.2rem;
        }

        .ledger-row {
          display: flex;
          justify-content: space-between;
          color: var(--color-muted);
        }

        .savings-row, .discount-row {
          color: var(--color-gold);
          font-weight: 600;
        }

        .total-row {
          padding-top: 0.6rem;
          border-top: 1px solid var(--color-stone);
          font-size: 1rem;
          font-weight: 800;
          color: var(--color-obsidian);
        }

        .final-total {
          color: var(--color-obsidian);
          font-size: 1.2rem;
        }

        .checkout-btn {
          width: 100%;
          padding: 1.1rem;
        }

        .checkout-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          color: var(--color-muted);
          margin-top: 0.8rem;
        }
      `}</style>
    </div>
  );
}
