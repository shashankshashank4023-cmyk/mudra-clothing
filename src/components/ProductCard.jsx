import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist, addToCart, setSelectedProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [justAdded, setJustAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const imgSrc = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedProduct(product)}
    >
      {/* Visual Image Presentation */}
      <div className="product-image-container">
        {!imgLoaded && <div className="img-shimmer-loader"></div>}
        <img
          src={imgSrc}
          alt={product.name}
          className={`product-main-img ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85";
          }}
        />

        {/* Top Floating Badges */}
        <div className="card-top-badges">
          {product.badge && (
            <span className="mudra-badge">
              <Sparkles size={11} className="gold-accent" />
              <span>{product.badge}</span>
            </span>
          )}

          {discountPercent > 0 && (
            <span className="discount-tag">-{discountPercent}%</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-toggle-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isFavorited ? "Remove from Wishlist" : "Save to Wishlist"}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={isFavorited ? "#C5A059" : "none"} color={isFavorited ? "#C5A059" : "#121417"} />
        </button>

        {/* Hover Quick Actions Overlay */}
        <div className="quick-actions-overlay">
          {/* Size Quick Select */}
          <div className="quick-sizes-bar" onClick={e => e.stopPropagation()}>
            <span className="size-cue">SIZE:</span>
            {product.sizes.slice(0, 4).map(sz => (
              <button
                key={sz}
                className={`quick-sz-btn ${selectedSize === sz ? 'active' : ''}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="quick-btns-row">
            <button className="quick-view-btn" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}>
              <Eye size={15} />
              <span>INSPECT PIECE</span>
            </button>

            <button 
              className={`quick-add-btn ${justAdded ? 'added' : ''}`}
              onClick={handleQuickAdd}
            >
              {justAdded ? <Check size={16} /> : <ShoppingBag size={15} />}
              <span>{justAdded ? "ADDED" : "QUICK ADD"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="product-info-block">
        {/* Category & Color Swatches */}
        <div className="info-meta-row">
          <span className="product-category-text">
            {product.collection.toUpperCase()} // {product.subCategory.toUpperCase()}
          </span>

          <div className="color-swatches" onClick={e => e.stopPropagation()}>
            {product.colors.map(col => (
              <button
                key={col.name}
                className={`color-dot ${selectedColor.name === col.name ? 'active' : ''}`}
                style={{ backgroundColor: col.hex }}
                onClick={() => setSelectedColor(col)}
                title={col.name}
              />
            ))}
          </div>
        </div>

        {/* Product Title */}
        <h3 className="product-title">{product.name}</h3>

        {/* Rating and Reviews */}
        <div className="rating-row">
          <div className="stars-group">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? "#C5A059" : "none"}
                color="#C5A059"
              />
            ))}
          </div>
          <span className="rating-val">{product.rating.toFixed(1)}</span>
          <span className="review-count">({product.reviewCount} client reviews)</span>
        </div>

        {/* Price Row */}
        <div className="price-row">
          <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          <span className="tax-inclusive">INCL. TAXES</span>
        </div>
      </div>

      <style>{`
        .product-card {
          background: #FFF;
          border: 1px solid var(--color-stone);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
          transition: var(--transition-smooth);
        }

        .product-card:hover {
          border-color: var(--color-gold);
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }

        .product-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          background-color: #EFECE4;
          overflow: hidden;
        }

        .img-shimmer-loader {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #EFECE4 0%, #F9F7F2 50%, #EFECE4 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .product-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          image-rendering: -webkit-optimize-contrast;
          opacity: 1;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-main-img.loaded {
          opacity: 1;
        }

        .product-card:hover .product-main-img {
          transform: scale(1.05);
        }

        .card-top-badges {
          position: absolute;
          top: 0.8rem;
          left: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          z-index: 5;
        }

        .discount-tag {
          background-color: var(--color-terracotta);
          color: #FFF;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.5rem;
          align-self: flex-start;
        }

        .wishlist-toggle-btn {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border: 1px solid var(--color-stone);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          transition: var(--transition-smooth);
        }

        .wishlist-toggle-btn:hover {
          background: #FFF;
          transform: scale(1.1);
        }

        .wishlist-toggle-btn.favorited {
          border-color: var(--color-gold);
        }

        /* Hover Overlay */
        .quick-actions-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(18, 20, 23, 0.92) 100%);
          padding: 1.2rem 0.8rem 0.8rem 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          opacity: 0;
          transform: translateY(10px);
          transition: var(--transition-smooth);
          z-index: 10;
        }

        .product-card:hover .quick-actions-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .quick-sizes-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .size-cue {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--color-gold-light);
        }

        .quick-sz-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #FFF;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.45rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .quick-sz-btn:hover, .quick-sz-btn.active {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-obsidian);
        }

        .quick-btns-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .quick-view-btn {
          background: rgba(255, 255, 255, 0.95);
          color: var(--color-obsidian);
          border: none;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.55rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .quick-view-btn:hover {
          background: var(--color-gold);
          color: var(--color-obsidian);
        }

        .quick-add-btn {
          background: var(--color-obsidian);
          color: var(--color-cream);
          border: 1px solid var(--color-gold);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.55rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .quick-add-btn:hover {
          background: var(--color-gold);
          color: var(--color-obsidian);
        }

        .quick-add-btn.added {
          background: var(--color-emerald);
          border-color: var(--color-emerald);
          color: #FFF;
        }

        /* Product Info */
        .product-info-block {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .info-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }

        .product-category-text {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-muted);
        }

        .color-swatches {
          display: flex;
          gap: 0.35rem;
        }

        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: transform 0.2s;
        }

        .color-dot.active {
          outline: 2px solid var(--color-gold);
          outline-offset: 1px;
          transform: scale(1.15);
        }

        .product-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.3;
          color: var(--color-obsidian);
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.8rem;
        }

        .stars-group {
          display: flex;
          gap: 1px;
        }

        .rating-val {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-obsidian);
        }

        .review-count {
          font-size: 0.68rem;
          color: var(--color-muted);
        }

        .price-row {
          margin-top: auto;
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          padding-top: 0.6rem;
          border-top: 1px solid var(--color-sand);
        }

        .current-price {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-obsidian);
        }

        .original-price {
          font-size: 0.8rem;
          color: var(--color-muted);
          text-decoration: line-through;
        }

        .tax-inclusive {
          font-size: 0.6rem;
          color: var(--color-muted);
          letter-spacing: 0.05em;
          margin-left: auto;
        }
      `}</style>
    </div>
  );
}
