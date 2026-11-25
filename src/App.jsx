import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollectionFilter from './components/CollectionFilter';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import BespokeCustomizer from './components/BespokeCustomizer';
import StyleQuizModal from './components/StyleQuizModal';
import AdminModal from './components/AdminModal';
import LookbookSection from './components/LookbookSection';
import HeritageCraftSection from './components/HeritageCraftSection';
import Footer from './components/Footer';
import { Sparkles, CheckCircle2 } from 'lucide-react';

function MudraStoreApp() {
  const { filteredProducts, toastMessage, isAdminOpen, setIsAdminOpen } = useShop();

  return (
    <div className="mudra-app-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="mudra-toast">
          <CheckCircle2 size={18} className="gold-accent" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Luxury Navbar */}
      <Navbar />

      <main>
        {/* Editorial Hero Banner */}
        <Hero />

        {/* Collection & Filter Bar */}
        <CollectionFilter />

        {/* Product Grid Showcase */}
        <section className="catalog-grid-section">
          <div className="catalog-inner">
            {filteredProducts.length === 0 ? (
              <div className="catalog-zero-state">
                <Sparkles size={36} className="gold-accent" />
                <h3 className="zero-title">NO GARMENTS FOUND</h3>
                <p className="zero-desc">
                  Try adjusting your price range or clearing search keywords to view our complete bespoke atelier catalogue.
                </p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Curated Ensembles Lookbook */}
        <LookbookSection />

        {/* Brand Heritage & Master Craftsmanship */}
        <HeritageCraftSection />
      </main>

      {/* Interactive Detail Modal Drawer */}
      <ProductDetailModal />

      {/* Cart & Wishlist Sliding Drawers */}
      <CartDrawer />
      <WishlistDrawer />

      {/* Full 3-Step Bespoke Checkout Modal */}
      <CheckoutModal />

      {/* Bespoke Studio Monogramming Configurator */}
      <BespokeCustomizer />

      {/* Sartorial Style Concierge Matchmaker Quiz */}
      <StyleQuizModal />

      {/* Atelier Executive Suite / Client Admin Portal */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Footer */}
      <Footer />

      <style>{`
        .catalog-grid-section {
          padding: 4rem 2rem 6rem 2rem;
          background-color: var(--color-cream);
        }

        .catalog-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.2rem;
        }

        .catalog-zero-state {
          padding: 6rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          background: #FFF;
          border: 1px solid var(--color-stone);
        }

        .zero-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 600;
        }

        .zero-desc {
          font-size: 0.85rem;
          color: var(--color-muted);
          max-width: 420px;
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MudraStoreApp />
    </ShopProvider>
  );
}
