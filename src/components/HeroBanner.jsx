import { motion } from 'framer-motion';

const promos = [
  {
    title: '15% OFF on Fruits',
    subtitle: 'Healthy and fresh picks delivered in minutes',
    color: 'from-emerald-500 to-teal-500',
    emoji: '🍎',
  },
  {
    title: 'Dairy Delights',
    subtitle: 'Up to 20% off on milk, cheese and more',
    color: 'from-indigo-500 to-sky-500',
    emoji: '🥛',
  },
  {
    title: 'Snacks Fiesta',
    subtitle: 'Buy 2 get 1 free on select snacks',
    color: 'from-amber-500 to-orange-500',
    emoji: '🍿',
  },
];

export default function HeroBanner() {
  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`lg:col-span-2 rounded-2xl bg-gradient-to-r ${promos[0].color} text-white p-6 sm:p-8 relative overflow-hidden`}
        >
          <div className="absolute right-4 bottom-0 text-7xl opacity-30 select-none">{promos[0].emoji}</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{promos[0].title}</h2>
          <p className="text-white/90">{promos[0].subtitle}</p>
          <div className="mt-4">
            <a href="#" className="inline-block bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30">Shop now</a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {promos.slice(1).map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className={`rounded-2xl bg-gradient-to-r ${p.color} text-white p-4 relative overflow-hidden`}
            >
              <div className="absolute right-3 bottom-0 text-5xl opacity-30 select-none">{p.emoji}</div>
              <div className="text-base font-semibold">{p.title}</div>
              <div className="text-sm text-white/90">{p.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
