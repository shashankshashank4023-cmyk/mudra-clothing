import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Shield, Check, Ruler, Truck, RotateCcw, Sparkles, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    products,
    setIsCartOpen
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);
  const [activeTab, setActiveTab] = useState('FABRIC'); // 'FABRIC' | 'CRAFT' | 'FIT' | 'CARE'
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Sync state when selected product changes
  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes[0]);
      setSelectedColor(selectedProduct.colors[0]);
      setActiveImgIdx(0);
      setShowSizeGuide(false);
    }
  }, [selectedProduct?.id]);

  const isFavorited = isInWishlist(selectedProduct.id);

  const handleAddAndOpenBag = () => {
    setIsAdding(true);
    addToCart(selectedProduct, selectedSize, selectedColor);
    setTimeout(() => {
      setIsAdding(false);
      setSelectedProduct(null);
      setIsCartOpen(true);
    }, 400);
  };

  // Find paired accessories or garments
  const pairedItems = (selectedProduct.pairedWith || [])
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-icon" onClick={() => setSelectedProduct(null)}>
          <X size={22} />
        </button>

        <div className="modal-grid">
          {/* Left Column: Visual Gallery */}
          <div className="modal-gallery-col">
            <div className="main-display-img-box">
              <img
                src={selectedProduct.images[activeImgIdx] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="main-display-img"
              />
              {selectedProduct.badge && (
                <span className="gallery-badge">{selectedProduct.badge}</span>
              )}
            </div>

            {/* Thumbnail Switcher */}
            <div className="gallery-thumbs-row">
              {selectedProduct.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${activeImgIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveImgIdx(idx)}
                >
                  <img src={imgUrl} alt="Thumbnail view" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Sartorial Details & Selectors */}
          <div className="modal-content-col">
            {/* Header / Category */}
            <div className="product-modal-header">
              <span className="collection-track">
                MUDRA ATELIER // {selectedProduct.collection.toUpperCase()} WEAR // {selectedProduct.subCategory.toUpperCase()}
              </span>
              <h2 className="modal-product-title">{selectedProduct.name}</h2>
              
              <div className="modal-rating-row">
                <div className="modal-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(selectedProduct.rating) ? "#C5A059" : "none"}
                      color="#C5A059"
                    />
                  ))}
                </div>
                <span className="rating-score">{selectedProduct.rating.toFixed(1)}</span>
                <span className="reviews-pill">{selectedProduct.reviewCount} client evaluations</span>
              </div>

              {/* Price */}
              <div className="modal-pricing-box">
                <span className="modal-price">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                {selectedProduct.originalPrice && (
                  <span className="modal-original-price">₹{selectedProduct.originalPrice.toLocaleString('en-IN')}</span>
                )}
                <span className="savings-badge">
                  Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Short Narrative */}
            <p className="modal-short-desc">{selectedProduct.shortDesc}</p>

            {/* Color Palette Selector */}
            <div className="modal-selection-group">
              <div className="group-label-row">
                <span className="group-label">SHADE: <strong>{selectedColor.name}</strong></span>
              </div>
              <div className="color-palette-options">
                {selectedProduct.colors.map(col => (
                  <button
                    key={col.name}
                    className={`palette-chip ${selectedColor.name === col.name ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(col)}
                  >
                    <span className="palette-color-dot" style={{ backgroundColor: col.hex }}></span>
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector & Size Guide */}
            <div className="modal-selection-group">
              <div className="group-label-row">
                <span className="group-label">BESPOKE SIZE: <strong>{selectedSize}</strong></span>
                <button className="size-guide-link" onClick={() => setShowSizeGuide(!showSizeGuide)}>
                  <Ruler size={14} />
                  <span>{showSizeGuide ? "HIDE MEASUREMENT GUIDE" : "VIEW SIZE GUIDE"}</span>
                </button>
              </div>

              <div className="size-options-grid">
                {selectedProduct.sizes.map(sz => (
                  <button
                    key={sz}
                    className={`size-chip ${selectedSize === sz ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Interactive Size Chart Drawer */}
              {showSizeGuide && (
                <div className="size-chart-box">
                  <h4 className="chart-title">MUDRA SARTORIAL SIZING (INCHES)</h4>
                  <table className="size-table">
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Chest</th>
                        <th>Shoulder</th>
                        <th>Waist</th>
                        <th>Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>38 (S)</td>
                        <td>39.5"</td>
                        <td>17.5"</td>
                        <td>34.0"</td>
                        <td>28.5"</td>
                      </tr>
                      <tr>
                        <td>40 (M)</td>
                        <td>41.5"</td>
                        <td>18.0"</td>
                        <td>36.0"</td>
                        <td>29.0"</td>
                      </tr>
                      <tr>
                        <td>42 (L)</td>
                        <td>43.5"</td>
                        <td>18.5"</td>
                        <td>38.0"</td>
                        <td>29.5"</td>
                      </tr>
                      <tr>
                        <td>44 (XL)</td>
                        <td>45.5"</td>
                        <td>19.0"</td>
                        <td>40.0"</td>
                        <td>30.0"</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="size-chart-tip">
                    * Need bespoke tailor alterations? Our master drapers offer complimentary custom fitting on all orders.
                  </p>
                </div>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="modal-actions-box">
              <button
                className="btn-mudra-gold add-bag-btn"
                onClick={handleAddAndOpenBag}
                disabled={isAdding}
              >
                <ShoppingBag size={18} />
                <span>{isAdding ? "SECURING BESPOKE ORDER..." : "ADD TO BESPOKE BAG"}</span>
              </button>

              <button
                className={`modal-wishlist-btn ${isFavorited ? 'active' : ''}`}
                onClick={() => toggleWishlist(selectedProduct)}
                title={isFavorited ? "Saved in Wishlist" : "Save to Wishlist"}
              >
                <Heart size={20} fill={isFavorited ? "#C5A059" : "none"} color={isFavorited ? "#C5A059" : "#121417"} />
              </button>
            </div>

            {/* Guarantees Strip */}
            <div className="guarantees-strip">
              <div className="guarantee-item">
                <Truck size={15} className="gold-accent" />
                <span>Complimentary White-Glove Transit</span>
              </div>
              <div className="guarantee-item">
                <RotateCcw size={15} className="gold-accent" />
                <span>14-Day Bespoke Exchange</span>
              </div>
              <div className="guarantee-item">
                <Shield size={15} className="gold-accent" />
                <span>100% Genuine Milled Textiles</span>
              </div>
            </div>

            {/* Accordion Tabs for Deep Details */}
            <div className="modal-tabs-wrapper">
              <div className="tab-buttons-bar">
                <button
                  className={`accordion-tab-btn ${activeTab === 'FABRIC' ? 'active' : ''}`}
                  onClick={() => setActiveTab('FABRIC')}
                >
                  FABRIC & WEAVE
                </button>
                <button
                  className={`accordion-tab-btn ${activeTab === 'CRAFT' ? 'active' : ''}`}
                  onClick={() => setActiveTab('CRAFT')}
                >
                  CRAFTSMANSHIP
                </button>
                <button
                  className={`accordion-tab-btn ${activeTab === 'FIT' ? 'active' : ''}`}
                  onClick={() => setActiveTab('FIT')}
                >
                  SILHOUETTE & FIT
                </button>
                <button
                  className={`accordion-tab-btn ${activeTab === 'CARE' ? 'active' : ''}`}
                  onClick={() => setActiveTab('CARE')}
                >
                  PRESERVATION
                </button>
              </div>

              <div className="tab-content-panel">
                {activeTab === 'FABRIC' && (
                  <div>
                    <h5 className="tab-pane-title">Textile Provenance & Composition</h5>
                    <p>{selectedProduct.fabricDetails}</p>
                    <p style={{ marginTop: '0.6rem', color: 'var(--color-muted)', fontSize: '0.8rem' }}>
                      {selectedProduct.description}
                    </p>
                  </div>
                )}
                {activeTab === 'CRAFT' && (
                  <div>
                    <h5 className="tab-pane-title">Sartorial Handcrafting Notes</h5>
                    <p>{selectedProduct.craftsmanship}</p>
                  </div>
                )}
                {activeTab === 'FIT' && (
                  <div>
                    <h5 className="tab-pane-title">Silhouette Guide</h5>
                    <p>{selectedProduct.fitGuide}</p>
                  </div>
                )}
                {activeTab === 'CARE' && (
                  <div>
                    <h5 className="tab-pane-title">Care & Preservation Protocol</h5>
                    <p>{selectedProduct.careInstructions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Paired With / Complete the Look */}
            {pairedItems.length > 0 && (
              <div className="paired-section">
                <h4 className="paired-heading">COMPLETE THE ATELIER ENSEMBLE</h4>
                <div className="paired-items-list">
                  {pairedItems.map(item => (
                    <div
                      key={item.id}
                      className="paired-card"
                      onClick={() => setSelectedProduct(item)}
                    >
                      <img src={item.images[0]} alt={item.name} className="paired-img" />
                      <div className="paired-details">
                        <span className="paired-cat">{item.subCategory}</span>
                        <h5 className="paired-title">{item.name}</h5>
                        <span className="paired-price">₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .modal-close-icon {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          background: #FFF;
          border: 1px solid var(--color-stone);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 50;
          transition: var(--transition-smooth);
        }

        .modal-close-icon:hover {
          background-color: var(--color-obsidian);
          color: #FFF;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
        }

        .modal-gallery-col {
          padding: 2rem;
          background-color: var(--color-sand);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-display-img-box {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #FFF;
        }

        .main-display-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          image-rendering: -webkit-optimize-contrast;
        }

        .gallery-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--color-obsidian);
          color: var(--color-gold);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.7rem;
          border: 1px solid var(--color-gold);
        }

        .gallery-thumbs-row {
          display: flex;
          gap: 0.8rem;
        }

        .thumb-btn {
          width: 70px;
          height: 90px;
          border: 1px solid var(--color-stone);
          padding: 0;
          cursor: pointer;
          background: #FFF;
          transition: var(--transition-smooth);
        }

        .thumb-btn.active {
          border: 2px solid var(--color-gold);
        }

        .thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Content Column */
        .modal-content-col {
          padding: 2.5rem;
          overflow-y: auto;
          max-height: 85vh;
        }

        .collection-track {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--color-gold);
          display: block;
          margin-bottom: 0.4rem;
        }

        .modal-product-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.2;
          color: var(--color-obsidian);
          margin-bottom: 0.6rem;
        }

        .modal-rating-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.2rem;
        }

        .modal-stars {
          display: flex;
          gap: 2px;
        }

        .rating-score {
          font-size: 0.8rem;
          font-weight: 800;
        }

        .reviews-pill {
          font-size: 0.75rem;
          color: var(--color-muted);
        }

        .modal-pricing-box {
          display: flex;
          align-items: baseline;
          gap: 0.8rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--color-stone);
          margin-bottom: 1.2rem;
        }

        .modal-price {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--color-obsidian);
        }

        .modal-original-price {
          font-size: 1.1rem;
          color: var(--color-muted);
          text-decoration: line-through;
        }

        .savings-badge {
          background: rgba(197, 160, 89, 0.15);
          color: var(--color-gold);
          border: 1px solid var(--color-gold);
          padding: 0.2rem 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .modal-short-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 1.8rem;
        }

        .modal-selection-group {
          margin-bottom: 1.6rem;
        }

        .group-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.7rem;
        }

        .group-label {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--color-obsidian);
        }

        .size-guide-link {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-gold);
          cursor: pointer;
        }

        .color-palette-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .palette-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 0.4rem 0.9rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .palette-chip.selected {
          border-color: var(--color-obsidian);
          background: #FFF;
          box-shadow: var(--shadow-sm);
        }

        .palette-color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }

        .size-options-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .size-chip {
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 0.6rem 1.2rem;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .size-chip:hover {
          border-color: var(--color-gold);
        }

        .size-chip.selected {
          background: var(--color-obsidian);
          border-color: var(--color-obsidian);
          color: #FFF;
        }

        .size-chart-box {
          margin-top: 1rem;
          background: var(--color-sand);
          padding: 1.2rem;
          border: 1px solid var(--color-stone);
        }

        .chart-title {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-bottom: 0.8rem;
        }

        .size-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.75rem;
          text-align: left;
        }

        .size-table th, .size-table td {
          padding: 0.4rem 0.6rem;
          border-bottom: 1px solid var(--color-stone);
        }

        .size-chart-tip {
          font-size: 0.7rem;
          color: var(--color-muted);
          margin-top: 0.8rem;
          font-style: italic;
        }

        /* Action Buttons */
        .modal-actions-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.8rem;
        }

        .add-bag-btn {
          flex: 1;
        }

        .modal-wishlist-btn {
          width: 52px;
          height: 52px;
          background: #FFF;
          border: 1px solid var(--color-stone);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .modal-wishlist-btn:hover {
          border-color: var(--color-gold);
        }

        .guarantees-strip {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          border-top: 1px solid var(--color-stone);
          border-bottom: 1px solid var(--color-stone);
          margin-bottom: 1.8rem;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .guarantee-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-obsidian);
        }

        /* Accordion Tabs */
        .modal-tabs-wrapper {
          margin-bottom: 2rem;
        }

        .tab-buttons-bar {
          display: flex;
          border-bottom: 1px solid var(--color-stone);
          gap: 1rem;
          overflow-x: auto;
        }

        .accordion-tab-btn {
          background: transparent;
          border: none;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 0.6rem 0;
          color: var(--color-muted);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: var(--transition-smooth);
          white-space: nowrap;
        }

        .accordion-tab-btn.active {
          color: var(--color-obsidian);
          border-bottom-color: var(--color-gold);
        }

        .tab-content-panel {
          padding: 1.2rem 0;
          font-size: 0.85rem;
          line-height: 1.7;
          color: #4b5563;
        }

        .tab-pane-title {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-obsidian);
          margin-bottom: 0.4rem;
        }

        /* Paired Items */
        .paired-section {
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-stone);
        }

        .paired-heading {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          margin-bottom: 1rem;
        }

        .paired-items-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .paired-card {
          display: flex;
          gap: 0.8rem;
          background: var(--color-sand);
          padding: 0.6rem;
          border: 1px solid var(--color-stone);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .paired-card:hover {
          border-color: var(--color-gold);
        }

        .paired-img {
          width: 60px;
          height: 75px;
          object-fit: cover;
          object-position: center top;
          image-rendering: -webkit-optimize-contrast;
        }

        .paired-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .paired-cat {
          font-size: 0.6rem;
          color: var(--color-muted);
          font-weight: 700;
        }

        .paired-title {
          font-family: var(--font-serif);
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.2;
        }

        .paired-price {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--color-gold);
          margin-top: 2px;
        }

        @media (max-width: 860px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
          .modal-content-col {
            padding: 1.5rem;
            max-height: none;
          }
        }
      `}</style>
    </div>
  );
}
