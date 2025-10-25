import { motion } from 'framer-motion';

export default function Categories({ categories, selected, onSelect }) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Shop by category</h2>
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <motion.button
            whileTap={{ scale: 0.98 }}
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${selected === cat ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'}`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
