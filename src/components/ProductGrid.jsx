import { Plus, Minus, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGrid({ products, cartMap, onAdd, onRemove }) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Popular near you</h2>
        <p className="text-sm text-neutral-500">{products.length} items</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <motion.div
            key={p.id}
            layout
            className="group relative bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition"
          >
            {p.badge && (
              <span className="absolute top-2 left-2 z-10 text-[10px] uppercase tracking-wide bg-emerald-600 text-white px-2 py-1 rounded-full shadow">
                {p.badge}
              </span>
            )}
            <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
              <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="font-medium text-neutral-700">{p.rating}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-semibold">₹{p.price}</span>
                {p.mrp > p.price && (
                  <span className="text-sm text-neutral-500 line-through">₹{p.mrp}</span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className={`text-xs ${p.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</span>
                <div className="flex items-center gap-2">
                  <AnimatePresence initial={false}>
                    {(cartMap[p.id] || 0) > 0 ? (
                      <motion.div
                        key="qty"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="flex items-center gap-2"
                      >
                        <button
                          onClick={() => onRemove(p.id)}
                          className="h-8 w-8 grid place-items-center rounded-lg border text-neutral-700 hover:bg-neutral-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-medium">{cartMap[p.id]}</span>
                        <button
                          disabled={cartMap[p.id] >= p.stock}
                          onClick={() => onAdd(p.id)}
                          className="h-8 w-8 grid place-items-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="add"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        disabled={p.stock === 0}
                        onClick={() => onAdd(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
