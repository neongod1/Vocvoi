import { getAllProducts, getVariantMainImage } from "@/lib/products";
import { ArrowRight } from "@/components/ui/icons";

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      {/* Hero */}
      <section className="bg-sand">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
          <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.12] text-balance">
            The VocVoi Collection
          </h1>
          <p className="text-lg text-stone/60 mt-5 max-w-xl mx-auto leading-relaxed">
            Every piece crafted from pure titanium. No coatings. No chemicals. Built for a lifetime of cooking.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 gap-8">
            {products.map((product) => {
              const defaultVariant = product.variants[0];
              const variantCount = product.variants.length;

              return (
                <a
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group bg-warm-white rounded-2xl p-7 md:p-8 border border-titanium/10 hover:border-titanium/25 hover:shadow-sm transition-all duration-500 flex flex-col md:flex-row gap-7"
                >
                  {/* Thumbnail */}
                  <div className="w-full md:w-56 aspect-square bg-white rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={getVariantMainImage(product, defaultVariant)}
                      alt={product.heroAlt}
                      className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h2 className="text-[1.25rem] font-semibold tracking-tight text-graphite group-hover:text-copper transition-colors duration-300">
                        {product.name}
                      </h2>
                      <p className="text-sm text-stone/50 mt-1">{product.tagline}</p>
                      <p className="text-sm text-stone/60 mt-3 leading-relaxed line-clamp-2">
                        {product.description.short}
                      </p>

                      {variantCount > 1 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {product.variants.map((v) => (
                            <span
                              key={v.sku}
                              className="text-xs px-3 py-1.5 rounded-lg border border-titanium/30 text-stone/60 bg-warm-white/50"
                            >
                              {v.shortName}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-5 border-t border-titanium/10 flex items-center justify-between">
                      {defaultVariant.amazon.price && (
                        <span className="text-[0.9375rem] font-semibold tracking-tight text-copper">
                          {defaultVariant.amazon.price}
                        </span>
                      )}
                      <span className="text-[0.875rem] font-medium text-stone/50 group-hover:text-copper transition-colors duration-300 inline-flex items-center gap-1">
                        View Details
                        <ArrowRight weight="bold" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
