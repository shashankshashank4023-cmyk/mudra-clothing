import React from 'react';
import { SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CollectionFilter() {
  const {
    activeCollection,
    setActiveCollection,
    selectedSubCategory,
    setSelectedSubCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    filteredProducts,
    products,
    searchQuery,
    setSearchQuery
  } = useShop();

  const formalSubCategories = ["all", "Bandhgalas", "Suits & Tuxedos", "Shirts", "Trousers"];
  const casualSubCategories = ["all", "Linen & Shirts", "Trousers & Chinos", "Jackets & Overshirts", "Polo & Knits"];

  const activeSubList = activeCollection === "formal"
    ? formalSubCategories
    : activeCollection === "casual"
    ? casualSubCategories
    : ["all", "Bandhgalas", "Suits & Tuxedos", "Linen & Shirts", "Jackets & Overshirts", "Trousers & Chinos"];

  const resetAllFilters = () => {
    setActiveCollection("all");
    setSelectedSubCategory("all");
    setPriceRange(40000);
    setSortBy("featured");
    setSearchQuery("");
  };

  return (
    <div className="filter-wrapper" id="catalog-section">
      <div className="filter-inner">
        {/* Main Collection Tabs (Formal vs Casual) */}
        <div className="primary-collection-switch">
          <button
            className={`col-tab-btn ${activeCollection === 'all' ? 'active' : ''}`}
            onClick={() => { setActiveCollection('all'); setSelectedSubCategory('all'); }}
          >
            <span>ENTIRE ATELIER</span>
            <span className="count-pill">{products.length}</span>
          </button>

          <button
            className={`col-tab-btn formal ${activeCollection === 'formal' ? 'active' : ''}`}
            onClick={() => { setActiveCollection('formal'); setSelectedSubCategory('all'); }}
          >
            <span className="tab-title-text">FORMAL WEAR</span>
            <span className="tab-sub-text">Bespoke Suits, Tuxedos & Bandhgalas</span>
            <span className="count-pill">
              {products.filter(p => p.collection === 'formal').length}
            </span>
          </button>

          <button
            className={`col-tab-btn casual ${activeCollection === 'casual' ? 'active' : ''}`}
            onClick={() => { setActiveCollection('casual'); setSelectedSubCategory('all'); }}
          >
            <span className="tab-title-text">CASUAL WEAR</span>
            <span className="tab-sub-text">Normandy Linen, Kurtas & Selvedge Overshirts</span>
            <span className="count-pill">
              {products.filter(p => p.collection === 'casual').length}
            </span>
          </button>
        </div>

        {/* Sub-Category Chips & Refinements */}
        <div className="secondary-controls-bar">
          {/* Subcategory Pills */}
          <div className="subcat-pills-row">
            <span className="subcat-label">SILHOUETTE:</span>
            {activeSubList.map(sub => (
              <button
                key={sub}
                className={`subcat-chip ${selectedSubCategory === sub ? 'active' : ''}`}
                onClick={() => setSelectedSubCategory(sub)}
              >
                {sub === "all" ? "All Silhouettes" : sub}
              </button>
            ))}
          </div>

          {/* Right Controls: Price Slider & Sort Dropdown */}
          <div className="refinements-group">
            {/* Price Range Slider */}
            <div className="price-slider-box">
              <span className="slider-label">UP TO: <strong>₹{priceRange.toLocaleString('en-IN')}</strong></span>
              <input
                type="range"
                min="4000"
                max="40000"
                step="1000"
                value={priceRange}
                onChange={e => setPriceRange(Number(e.target.value))}
                className="luxury-slider"
              />
            </div>

            {/* Sort Select */}
            <div className="sort-box">
              <SlidersHorizontal size={14} className="sort-icon" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="luxury-select"
              >
                <option value="featured">Curated & Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Client Evaluation (Rating)</option>
              </select>
            </div>

            {/* Reset Button */}
            {(activeCollection !== 'all' || selectedSubCategory !== 'all' || priceRange < 40000 || searchQuery) && (
              <button className="reset-btn" onClick={resetAllFilters} title="Reset all filters">
                <RotateCcw size={14} />
                <span>RESET</span>
              </button>
            )}
          </div>
        </div>

        {/* Status Bar / Active Query */}
        <div className="filter-status-meta">
          <div className="meta-left">
            <Sparkles size={14} className="gold-accent" />
            <span>
              DISPLAYING <strong>{filteredProducts.length}</strong> MASTER PIECES
              {activeCollection !== 'all' && ` IN ${activeCollection.toUpperCase()} WEAR`}
              {selectedSubCategory !== 'all' && ` • ${selectedSubCategory}`}
              {searchQuery && ` MATCHING "${searchQuery}"`}
            </span>
          </div>

          <span className="handcrafted-tag">HAND-TAILORED ON ORDER & READY-TO-WEAR</span>
        </div>
      </div>

      <style>{`
        .filter-wrapper {
          background-color: var(--color-sand);
          border-top: 1px solid var(--color-stone);
          border-bottom: 1px solid var(--color-stone);
          padding: 2.5rem 2rem 1.8rem 2rem;
        }

        .filter-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Primary Formal vs Casual Split Tabs */
        .primary-collection-switch {
          display: grid;
          grid-template-columns: 0.6fr 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .col-tab-btn {
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 1.2rem 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          transition: var(--transition-smooth);
        }

        .col-tab-btn:hover {
          border-color: var(--color-gold);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .col-tab-btn.active {
          background-color: var(--color-obsidian);
          color: var(--color-cream);
          border-color: var(--color-obsidian);
          box-shadow: var(--shadow-md);
        }

        .col-tab-btn.active .tab-title-text {
          color: var(--color-gold);
        }

        .col-tab-btn.active .tab-sub-text {
          color: rgba(255, 255, 255, 0.7);
        }

        .col-tab-btn.active .count-pill {
          background: var(--color-gold);
          color: var(--color-obsidian);
        }

        .tab-title-text {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--color-obsidian);
          display: block;
        }

        .tab-sub-text {
          font-size: 0.7rem;
          color: var(--color-muted);
          margin-top: 2px;
          display: block;
        }

        .count-pill {
          background: var(--color-sand);
          color: var(--color-obsidian);
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
        }

        /* Secondary Refinements Bar */
        .secondary-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-stone);
          margin-bottom: 1.2rem;
        }

        .subcat-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .subcat-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-muted);
          margin-right: 0.4rem;
        }

        .subcat-chip {
          background: transparent;
          border: 1px solid var(--color-stone);
          padding: 0.45rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-obsidian);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .subcat-chip:hover {
          background: #FFF;
          border-color: var(--color-obsidian);
        }

        .subcat-chip.active {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-obsidian);
          font-weight: 700;
        }

        .refinements-group {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .price-slider-box {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: #FFF;
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--color-stone);
        }

        .slider-label {
          font-size: 0.7rem;
          color: var(--color-obsidian);
          white-space: nowrap;
        }

        .luxury-slider {
          accent-color: var(--color-gold);
          width: 100px;
          cursor: pointer;
        }

        .sort-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .sort-icon {
          position: absolute;
          left: 0.8rem;
          color: var(--color-gold);
          pointer-events: none;
        }

        .luxury-select {
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 0.55rem 1rem 0.55rem 2.2rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-obsidian);
          outline: none;
          cursor: pointer;
        }

        .reset-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: 1px solid var(--color-muted);
          padding: 0.5rem 0.8rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-obsidian);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .reset-btn:hover {
          background: var(--color-obsidian);
          color: #FFF;
        }

        .filter-status-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--color-muted);
          letter-spacing: 0.05em;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .meta-left {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .meta-left strong {
          color: var(--color-obsidian);
        }

        .handcrafted-tag {
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: 0.1em;
        }

        @media (max-width: 992px) {
          .primary-collection-switch {
            grid-template-columns: 1fr;
          }
          .secondary-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .refinements-group {
            justify-content: space-between;
          }
          .price-slider-box {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
