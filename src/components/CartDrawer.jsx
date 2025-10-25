import { Fragment, useMemo } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CartDrawer({ isOpen, onClose, items, pricing, onAdd, onRemove, onClear }) {
  const isEmpty = items.length === 0;

  const freeDeliveryLeft = useMemo(() => {
    if (pricing.subtotal >= 499) return 0;
    return Math.max(0, 499 - pricing.subtotal);
  }, [pricing.subtotal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-neutral-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {isEmpty ? (
              <div className="flex-1 grid place-items-center p-8 text-center text-neutral-600">
                <div>
                  <div className="text-6xl mb-3">🧺</div>
                  <p className="font-medium text-neutral-800 mb-1">Your basket is empty</p>
                  <p className="text-sm">Add fresh groceries and we will deliver in minutes.</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-3 border rounded-lg p-3">
                    <img src={product.img} alt={product.name} className="h-16 w-16 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <div className="text-sm text-neutral-600">₹{product.price} {product.mrp > product.price && (<span className="line-through text-neutral-400 ml-1">₹{product.mrp}</span>)} • <span className={`${product.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onRemove(product.id)} className="h-8 w-8 grid place-items-center rounded-lg border hover:bg-neutral-50"><Minus className="h-4 w-4" /></button>
                      <span className="w-6 text-center text-sm font-medium">{qty}</span>
                      <button onClick={() => onAdd(product.id)} disabled={qty >= product.stock} className="h-8 w-8 grid place-items-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"><Plus className="h-4 w-4" /></button>
                    </div>
                    <div className="w-16 text-right font-semibold">₹{product.price * qty}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t p-4 space-y-3">
              {freeDeliveryLeft > 0 && (
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg p-2">Add ₹{freeDeliveryLeft} more for free delivery</div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">₹{pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Delivery</span>
                <span className="font-medium">{pricing.delivery === 0 ? 'Free' : `₹${pricing.delivery.toFixed(2)}`}</span>
              </div>
              {pricing.savings > 0 && (
                <div className="flex items-center justify-between text-sm text-emerald-700">
                  <span>You save</span>
                  <span>₹{pricing.savings.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₹{pricing.total.toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClear}
                  disabled={isEmpty}
                  className="w-1/3 px-4 py-2 rounded-lg border hover:bg-neutral-50 disabled:opacity-50"
                >
                  Clear
                </button>
                <button
                  onClick={() => alert('Checkout flow can be integrated here!')}
                  disabled={isEmpty}
                  className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.aside>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
