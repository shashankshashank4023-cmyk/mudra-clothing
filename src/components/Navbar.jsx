import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, X, Menu, Scissors, Compass, Sparkles, Shield } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const {
    activeCollection,
    setActiveCollection,
    searchQuery,
    setSearchQuery,
    totalItemCount,
    cartSubtotal,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    isSearchOpen,
    setIsSearchOpen,
    setIsCustomizerOpen,
    setIsQuizOpen,
    setIsAdminOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchPills = ["Bandhgala", "Merino Suit", "Linen Shirt", "Tuxedo", "Khadi Kurta", "Chinos", "Silk Polo"];

  const handleSelectSearchPill = (term) => {
    setSearchQuery(term);
    setIsSearchOpen(false);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Privilege Banner */}
      <div className="top-banner">
        <div className="banner-content">
          <span className="banner-badge">PRIVILEGE SARTORIAL</span>
          <span className="banner-text">COMPLIMENTARY BESPOKE ALTERATIONS & WORLDWIDE COURIER | CODE: <strong>MUDRA10</strong> FOR 10% PRIVILEGE SAVINGS</span>
          
          <div className="banner-tools">
            <button className="banner-tool-btn" onClick={() => setIsCustomizerOpen(true)}>
              <Scissors size={12} className="gold-accent" />
              <span>MONOGRAM STUDIO</span>
            </button>
            <button className="banner-tool-btn" onClick={() => setIsQuizOpen(true)}>
              <Compass size={12} className="gold-accent" />
              <span>STYLE MATCHMAKER</span>
            </button>
            <button className="banner-tool-btn" onClick={() => setIsAdminOpen(true)}>
              <Shield size={12} className="gold-accent" />
              <span>ATELIER SUITE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Header */}
      <header className={`main-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-trigger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Left: Collection Navigation Tabs */}
          <nav className="desktop-nav">
            <button 
              className={`nav-link ${activeCollection === 'all' ? 'active' : ''}`}
              onClick={() => {
                setActiveCollection('all');
                const el = document.getElementById("catalog-section");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              ALL CREATIONS
            </button>
            <button 
              className={`nav-link ${activeCollection === 'formal' ? 'active' : ''}`}
              onClick={() => {
                setActiveCollection('formal');
                const el = document.getElementById("catalog-section");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              FORMAL WEAR
              <span className="nav-tag">SUITS & BANDHGALAS</span>
            </button>
            <button 
              className={`nav-link ${activeCollection === 'casual' ? 'active' : ''}`}
              onClick={() => {
                setActiveCollection('casual');
                const el = document.getElementById("catalog-section");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              CASUAL WEAR
              <span className="nav-tag">LINEN & OVER-SHIRTS</span>
            </button>
            <button 
              className="nav-link bespoke-highlight"
              onClick={() => setIsCustomizerOpen(true)}
            >
              BESPOKE STUDIO
              <span className="nav-tag gold-text">MONOGRAMMING</span>
            </button>
          </nav>

          {/* Center: Brand Crest & Logo */}
          <div 
            className="brand-logo-container" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="brand-crest">M</span>
            <h1 className="brand-title">MUDRA</h1>
            <span className="brand-subtitle">HAUTE SARTORIAL MENSWEAR</span>
          </div>

          {/* Right: Actions (Search, Wishlist, Bag) */}
          <div className="header-actions">
            {/* Search Trigger */}
            <button 
              className="action-icon-btn" 
              onClick={() => setIsSearchOpen(true)}
              title="Search Catalog"
            >
              <Search size={20} />
              <span className="action-label">SEARCH</span>
            </button>

            {/* Wishlist Trigger */}
            <button 
              className="action-icon-btn" 
              onClick={() => setIsWishlistOpen(true)}
              title="Saved Items"
            >
              <div className="icon-wrapper">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="badge-count">{wishlist.length}</span>
                )}
              </div>
              <span className="action-label">WISHLIST</span>
            </button>

            {/* Bag Trigger */}
            <button 
              className="action-bag-btn" 
              onClick={() => setIsCartOpen(true)}
              title="Bespoke Bag"
            >
              <div className="icon-wrapper">
                <ShoppingBag size={20} />
                {totalItemCount > 0 && (
                  <span className="badge-count gold">{totalItemCount}</span>
                )}
              </div>
              <div className="bag-price-col">
                <span className="bag-label">BAG</span>
                <span className="bag-amount">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown">
            <button 
              className={`mobile-nav-btn ${activeCollection === 'all' ? 'active' : ''}`}
              onClick={() => { setActiveCollection('all'); setMobileMenuOpen(false); }}
            >
              ALL CREATIONS
            </button>
            <button 
              className={`mobile-nav-btn ${activeCollection === 'formal' ? 'active' : ''}`}
              onClick={() => { setActiveCollection('formal'); setMobileMenuOpen(false); }}
            >
              FORMAL WEAR (SUITS & BANDHGALAS)
            </button>
            <button 
              className={`mobile-nav-btn ${activeCollection === 'casual' ? 'active' : ''}`}
              onClick={() => { setActiveCollection('casual'); setMobileMenuOpen(false); }}
            >
              CASUAL WEAR (LINEN & RELAXED KNITS)
            </button>
            <button 
              className="mobile-nav-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCustomizerOpen(true);
              }}
            >
              BESPOKE MONOGRAM STUDIO
            </button>
            <button 
              className="mobile-nav-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsQuizOpen(true);
              }}
            >
              STYLE CONCIERGE MATCHMAKER
            </button>
          </div>
        )}
      </header>

      {/* Luxury Search Overlay Modal */}
      {isSearchOpen && (
        <div className="search-modal-backdrop" onClick={() => setIsSearchOpen(false)}>
          <div className="search-modal-box" onClick={e => e.stopPropagation()}>
            <div className="search-input-header">
              <Search size={24} className="gold-accent" />
              <input
                type="text"
                placeholder="Search by garment, fabric (Silk, Linen, Wool), or occasion..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="luxury-search-input"
              />
              <button className="search-close-btn" onClick={() => setIsSearchOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="search-quick-pills">
              <span className="pills-title">FREQUENT INQUIRIES:</span>
              <div className="pills-group">
                {searchPills.map(pill => (
                  <button 
                    key={pill} 
                    className="search-pill-btn"
                    onClick={() => handleSelectSearchPill(pill)}
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            <div className="search-footer-note">
              <span>Press ESC or click outside to dismiss • Real-time sartorial catalog indexing active</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .top-banner {
          background-color: var(--color-obsidian);
          color: var(--color-gold-light);
          padding: 0.45rem 1.5rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
        }

        .banner-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .banner-badge {
          background: rgba(197, 160, 89, 0.2);
          color: var(--color-gold);
          border: 1px solid var(--color-gold);
          padding: 0.1rem 0.4rem;
          font-size: 0.65rem;
          font-weight: 800;
        }

        .banner-tools {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .banner-tool-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.3);
          color: #FFF;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.6rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: var(--transition-smooth);
        }

        .banner-tool-btn:hover {
          background: var(--color-gold);
          color: var(--color-obsidian);
        }

        .main-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: rgba(249, 247, 242, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--color-stone);
          transition: var(--transition-smooth);
        }

        .header-scrolled {
          background-color: rgba(255, 255, 255, 0.98);
          box-shadow: var(--shadow-md);
        }

        .header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-menu-trigger {
          display: none;
          background: transparent;
          border: none;
          color: var(--color-obsidian);
          cursor: pointer;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          background: transparent;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-obsidian);
          cursor: pointer;
          position: relative;
          padding: 0.4rem 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: var(--transition-smooth);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--color-gold);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: var(--color-gold);
        }

        .nav-tag {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-muted);
          margin-top: 1px;
        }

        .gold-text {
          color: var(--color-gold);
        }

        .brand-logo-container {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;
        }

        .brand-crest {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-gold);
          line-height: 1;
        }

        .brand-title {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--color-obsidian);
          line-height: 1;
          margin: 0.1rem 0;
        }

        .brand-subtitle {
          font-family: var(--font-sans);
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--color-gold);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .action-icon-btn {
          background: transparent;
          border: none;
          color: var(--color-obsidian);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          padding: 0.4rem;
          transition: var(--transition-smooth);
        }

        .action-icon-btn:hover {
          color: var(--color-gold);
        }

        .action-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .badge-count {
          position: absolute;
          top: -8px;
          right: -10px;
          background-color: var(--color-obsidian);
          color: #FFF;
          font-size: 0.65rem;
          font-weight: 800;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge-count.gold {
          background-color: var(--color-gold);
          color: var(--color-obsidian);
        }

        .action-bag-btn {
          background: var(--color-obsidian);
          color: var(--color-cream);
          border: 1px solid var(--color-obsidian);
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .action-bag-btn:hover {
          background-color: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-obsidian);
        }

        .bag-price-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .bag-label {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          opacity: 0.8;
        }

        .bag-amount {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        /* Search Modal */
        .search-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(18, 20, 23, 0.7);
          backdrop-filter: blur(8px);
          z-index: 2500;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 6rem;
          animation: fadeIn 0.25s ease;
        }

        .search-modal-box {
          background: #FFF;
          width: 100%;
          max-width: 720px;
          box-shadow: var(--shadow-lg);
          padding: 2rem;
          border-top: 3px solid var(--color-gold);
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .search-input-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 2px solid var(--color-stone);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .luxury-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-obsidian);
        }

        .search-close-btn {
          background: transparent;
          border: none;
          color: var(--color-muted);
          cursor: pointer;
          transition: color 0.2s;
        }

        .search-close-btn:hover {
          color: var(--color-obsidian);
        }

        .search-quick-pills {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .pills-title {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-muted);
        }

        .pills-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .search-pill-btn {
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 0.4rem 0.9rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-obsidian);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .search-pill-btn:hover {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-obsidian);
        }

        .search-footer-note {
          font-size: 0.7rem;
          color: var(--color-muted);
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid var(--color-stone);
        }

        /* Mobile Responsive */
        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-trigger {
            display: block;
          }
          .action-label, .bag-price-col {
            display: none;
          }
          .brand-title {
            font-size: 1.7rem;
          }
          .mobile-dropdown {
            display: flex;
            flex-direction: column;
            background: #FFF;
            padding: 1.5rem;
            border-top: 1px solid var(--color-stone);
            gap: 1rem;
          }
          .mobile-nav-btn {
            background: transparent;
            border: none;
            text-align: left;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            padding: 0.5rem 0;
            cursor: pointer;
          }
          .mobile-nav-btn.active {
            color: var(--color-gold);
          }
        }
      `}</style>
    </>
  );
}
