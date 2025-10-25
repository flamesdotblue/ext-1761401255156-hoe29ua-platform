import { useState } from 'react';
import { ShoppingCart, MapPin, Search, Radio } from 'lucide-react';

export default function Header({ cartCount, onCartToggle, onSearchChange, location, onLocationChange, liveUpdating, onToggleLive }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearchChange(val);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 grid place-items-center text-white font-bold">SB</div>
            <div>
              <div className="text-lg font-semibold leading-tight">SwiftBasket</div>
              <button className="group inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900" onClick={() => {
                const next = prompt('Enter your location/city:', location) || location;
                onLocationChange(next);
              }}>
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>{location}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                value={query}
                onChange={handleSearch}
                placeholder="Search for fruits, veggies, milk, snacks..."
                className="w-full pl-11 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLive}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${liveUpdating ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-neutral-200 text-neutral-700 bg-white'}`}
              title="Toggle live updates"
            >
              <Radio className={`h-4 w-4 ${liveUpdating ? 'text-emerald-600 animate-pulse' : 'text-neutral-400'}`} />
              {liveUpdating ? 'Live' : 'Paused'}
            </button>
            <button
              onClick={onCartToggle}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-white text-emerald-700 font-semibold rounded-full h-6 w-6 grid place-items-center shadow">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search groceries"
              className="w-full pl-11 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
