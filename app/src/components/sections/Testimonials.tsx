import { Star } from 'lucide-react';

/**
 * Concept-demo placeholder. No reviews or ratings are shown until real,
 * permission-cleared Google/Facebook reviews are supplied by the shop.
 */
export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#151c3a]" aria-labelledby="reviews-heading">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 max-w-4xl mx-auto text-center">
        <h2 id="reviews-heading" className="text-4xl sm:text-5xl font-display font-black text-white tracking-tighter mb-6">
          Customer reviews
        </h2>
        <div className="border-2 border-dashed border-white/20 rounded-3xl p-10 lg:p-14">
          <div className="flex justify-center gap-1.5 mb-6" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-6 h-6 text-white/30" />
            ))}
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">Example placeholder</p>
          <p className="text-white/70 text-lg leading-relaxed">
            Your real Google and Facebook reviews go here, shown only with your permission.
          </p>
        </div>
      </div>
    </section>
  );
}
