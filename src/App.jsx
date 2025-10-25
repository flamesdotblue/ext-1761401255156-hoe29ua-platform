import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import HeroBanner from './components/HeroBanner';

const initialProducts = [
  {
    id: 'p1',
    name: 'Fresh Tomatoes - 1kg',
    category: 'Vegetables',
    price: 49,
    mrp: 69,
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=1200&auto=format&fit=crop',
    stock: 42,
    badge: 'Bestseller',
  },
  {
    id: 'p2',
    name: 'Bananas - 6 pcs',
    category: 'Fruits',
    price: 39,
    mrp: 49,
    rating: 4.3,
    img: 'https://images.unsplash.com/photo-1615486363876-06c9dae7a435?q=80&w=1200&auto=format&fit=crop',
    stock: 120,
    badge: 'Deal of the Day',
  },
  {
    id: 'p3',
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    price: 35,
    mrp: 45,
    rating: 4.1,
    img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1200&auto=format&fit=crop',
    stock: 30,
  },
  {
    id: 'p4',
    name: 'Organic Milk - 1L',
    category: 'Dairy',
    price: 65,
    mrp: 72,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1200&auto=format&fit=crop',
    stock: 18,
    badge: 'Organic',
  },
  {
    id: 'p5',
    name: 'Basmati Rice - 5kg',
    category: 'Staples',
    price: 479,
    mrp: 549,
    rating: 4.4,
    img: 'https://images.unsplash.com/photo-1563630423917-1c8686f70df9?q=80&w=1200&auto=format&fit=crop',
    stock: 12,
  },
  {
    id: 'p6',
    name: 'Eggs - 12 pcs',
    category: 'Dairy',
    price: 79,
    mrp: 99,
    rating: 4.2,
    img: 'https://images.unsplash.com/photo-1517959105821-eaf2591984dd?q=80&w=1200&auto=format&fit=crop',
    stock: 55,
  },
  {
    id: 'p7',
    name: 'Onions - 1kg',
    category: 'Vegetables',
    price: 34,
    mrp: 44,
    rating: 4.0,
    img: 'https://images.unsplash.com/photo-1607301405390-dbb8dec98c9b?q=80&w=1200&auto=format&fit=crop',
    stock: 64,
  },
  {
    id: 'p8',
    name: 'Apples - 1kg',
    category: 'Fruits',
    price: 149,
    mrp: 179,
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1200&auto=format&fit=crop',
    stock: 22,
  },
  {
    id: 'p9',
    name: 'Almonds - 500g',
    category: 'Snacks',
    price: 449,
    mrp: 529,
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1200&auto=format&fit=crop',
    stock: 10,
    badge: 'Premium',
  },
  {
    id: 'p10',
    name: 'Potato Chips - Classic Salted',
    category: 'Snacks',
    price: 35,
    mrp: 40,
    rating: 4.1,
    img: 'https://images.unsplash.com/photo-1577640277228-376a28d84bb4?q=80&w=1200&auto=format&fit=crop',
    stock: 150,
  },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Staples', 'Snacks'];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState({}); // { productId: quantity }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [location, setLocation] = useState('Bengaluru');
  const [liveUpdating, setLiveUpdating] = useState(true);

  // Simulate realtime price/stock pulse
  useEffect(() => {
    if (!liveUpdating) return;
    const interval = setInterval(() => {
      setProducts(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        const p = { ...next[idx] };
        // Randomly nudge price or stock within sensible bounds
        if (Math.random() > 0.5) {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const newPrice = Math.max(5, p.price + delta);
          p.price = newPrice;
        } else {
          const delta = Math.random() > 0.5 ? 1 : -1;
          p.stock = Math.max(0, p.stock + delta);
        }
        next[idx] = p;
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [liveUpdating]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter(p => {
      const matchesTerm = term
        ? p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
        : true;
      const matchesCategory = selectedCategory === 'All' ? true : p.category === selectedCategory;
      return matchesTerm && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        return { product, qty };
      })
      .filter(ci => !!ci.product);
  }, [cart, products]);

  const cartCount = useMemo(() => cartItems.reduce((sum, i) => sum + i.qty, 0), [cartItems]);

  const pricing = useMemo(() => {
    const subtotal = cartItems.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
    const mrpTotal = cartItems.reduce((sum, { product, qty }) => sum + product.mrp * qty, 0);
    const savings = Math.max(0, mrpTotal - subtotal);
    const delivery = subtotal > 499 || subtotal === 0 ? 0 : 25;
    const total = subtotal + delivery;
    return { subtotal, mrpTotal, savings, delivery, total };
  }, [cartItems]);

  const addToCart = (id) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const product = products.find(p => p.id === id);
      const nextQty = Math.min(current + 1, product ? product.stock : current + 1);
      return { ...prev, [id]: nextQty };
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const nextQty = Math.max(0, current - 1);
      const updated = { ...prev, [id]: nextQty };
      if (nextQty === 0) delete updated[id];
      return updated;
    });
  };

  const clearCart = () => setCart({});

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header
        cartCount={cartCount}
        onCartToggle={() => setIsCartOpen(true)}
        onSearchChange={setSearch}
        location={location}
        onLocationChange={setLocation}
        liveUpdating={liveUpdating}
        onToggleLive={() => setLiveUpdating(v => !v)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroBanner />
        <Categories
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ProductGrid
          products={filteredProducts}
          cartMap={cart}
          onAdd={addToCart}
          onRemove={removeFromCart}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        pricing={pricing}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <footer className="mt-16 border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SwiftBasket. Fast groceries. Better days.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-900">Privacy</a>
            <a href="#" className="hover:text-neutral-900">Terms</a>
            <a href="#" className="hover:text-neutral-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
