import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={() => setIsWishlistOpen(false)}>
      <div className="drawer-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="wishlist-header">
          <div>
            <span className="wishlist-kicker">MUDRA PRIVATE CLIENT</span>
            <h3 className="wishlist-heading">SAVED ATELIER CREATIONS ({wishlist.length})</h3>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsWishlistOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="wishlist-scroll-body">
          {wishlist.length === 0 ? (
            <div className="empty-wishlist-box">
              <Heart size={44} className="empty-heart-icon" />
              <h4 className="empty-wishlist-title">NO GARMENTS SAVED YET</h4>
              <p className="empty-wishlist-desc">
                Curate your private bespoke wardrobe by selecting the heart icon on any formal suit or casual creation.
              </p>
              <button
                className="btn-mudra-primary"
                onClick={() => setIsWishlistOpen(false)}
              >
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            <div className="wishlist-items-stack">
              {wishlist.map(product => (
                <div key={product.id} className="wishlist-item-row">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="wishlist-thumb"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsWishlistOpen(false);
                    }}
                  />

                  <div className="wishlist-item-info">
                    <span className="wishlist-cat">{product.collection.toUpperCase()} // {product.subCategory}</span>
                    <h4
                      className="wishlist-item-name"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsWishlistOpen(false);
                      }}
                    >
                      {product.name}
                    </h4>
                    <span className="wishlist-price">₹{product.price.toLocaleString('en-IN')}</span>

                    <div className="wishlist-actions-row">
                      <button
                        className="move-bag-btn"
                        onClick={() => {
                          addToCart(product, product.sizes[0], product.colors[0]);
                          toggleWishlist(product);
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>MOVE TO BAG</span>
                      </button>

                      <button
                        className="wishlist-del-btn"
                        onClick={() => toggleWishlist(product)}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .wishlist-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-stone);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .wishlist-kicker {
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          display: block;
        }

        .wishlist-heading {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--color-obsidian);
          margin-top: 2px;
        }

        .wishlist-scroll-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .empty-wishlist-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 4rem 1rem;
        }

        .empty-heart-icon {
          color: var(--color-stone);
          margin-bottom: 1rem;
        }

        .empty-wishlist-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-wishlist-desc {
          font-size: 0.82rem;
          color: var(--color-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 320px;
        }

        .wishlist-items-stack {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .wishlist-item-row {
          display: flex;
          gap: 1rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--color-stone);
        }

        .wishlist-thumb {
          width: 75px;
          height: 100px;
          object-fit: cover;
          object-position: center top;
          image-rendering: -webkit-optimize-contrast;
          border: 1px solid var(--color-stone);
          cursor: pointer;
        }

        .wishlist-item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .wishlist-cat {
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--color-gold);
        }

        .wishlist-item-name {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-obsidian);
          cursor: pointer;
          line-height: 1.2;
          margin: 0.2rem 0;
        }

        .wishlist-item-name:hover {
          color: var(--color-gold);
        }

        .wishlist-price {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--color-obsidian);
          margin-bottom: 0.8rem;
        }

        .wishlist-actions-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: auto;
        }

        .move-bag-btn {
          flex: 1;
          background: var(--color-obsidian);
          color: var(--color-cream);
          border: 1px solid var(--color-obsidian);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .move-bag-btn:hover {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-obsidian);
        }

        .wishlist-del-btn {
          background: transparent;
          border: 1px solid var(--color-stone);
          color: var(--color-muted);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .wishlist-del-btn:hover {
          color: var(--color-terracotta);
          border-color: var(--color-terracotta);
        }
      `}</style>
    </div>
  );
}
