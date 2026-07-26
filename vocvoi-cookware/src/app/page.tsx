import { getAllProducts, getVariantMainImage } from "@/lib/products";
import {
  ShieldCheck,
  Sparkle,
  Flame,
  Lightning,
  ArrowRight,
  Heart,
  Clock,
  Flask,
} from "@/components/ui/icons";

export default function HomePage() {
  const products = getAllProducts();
  const titaniumPan = products.find((p) => p.slug === "titanium-pan");
  const defaultVariant = titaniumPan?.variants[0];

  return (
    <>
      {/* ================================================================
          HERO — Editorial Split Screen
          ================================================================ */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(100dvh-4.25rem)]">
            {/* Left: Copy */}
            <div className="flex flex-col justify-center py-16 lg:py-24 pr-0 lg:pr-12">
              <div className="space-y-8 max-w-xl">
                <h1 className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] font-semibold tracking-[-0.03em] leading-[1.05] text-balance">
                  Cookware pure enough
                  <br />
                  to last a lifetime.
                </h1>

                <p className="text-lg text-stone/70 leading-relaxed max-w-[42ch]">
                  VocVoi Titanium. No coatings. No chemicals. Just the purest
                  cooking surface, engineered for the people who matter most.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={titaniumPan ? `/products/${titaniumPan.slug}` : "/products"}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#23211F] text-[#FFFFFF] text-[0.9375rem] font-medium tracking-tight rounded-lg hover:bg-copper transition-colors duration-300 active:scale-[0.98]"
                  >
                    Explore Titanium
                    <ArrowRight
                      weight="bold"
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href="https://www.amazon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-[0.9375rem] font-medium tracking-tight text-stone border border-titanium/40 rounded-lg hover:border-copper hover:text-copper transition-all duration-300 active:scale-[0.98]"
                  >
                    Shop on Amazon
                  </a>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-6 pt-2 text-[0.8125rem] text-ash">
                  <span>Lab Certified</span>
                  <span className="w-px h-3.5 bg-titanium/40" />
                  <span>Lifetime Warranty</span>
                  <span className="w-px h-3.5 bg-titanium/40" />
                  <span>30-Day Risk-Free Trial</span>
                </div>
              </div>
            </div>

            {/* Right: Product Image */}
            <div className="relative flex items-center justify-center bg-sand/50 lg:bg-transparent -mx-6 lg:mx-0">
              <div className="relative w-full h-full flex items-center justify-center p-8 lg:p-16">
                <div className="relative w-full max-w-[520px]">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-white flex items-center justify-center">
                    <img
                      src={titaniumPan && defaultVariant ? getVariantMainImage(titaniumPan, defaultVariant) : ""}
                      alt={titaniumPan?.heroAlt || "VocVoi Titanium Cookware"}
                      className="w-full h-full object-contain p-4"
                      loading="eager"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRUST STRIP — Single line, understated
          ================================================================ */}
      <section className="border-y border-titanium/15 bg-warm-white/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.8125rem] tracking-tight text-stone/60">
            {[
              { icon: <Flask weight="bold" className="w-3.5 h-3.5 text-copper" />, label: "Lab Certified Titanium" },
              { icon: <ShieldCheck weight="bold" className="w-3.5 h-3.5 text-copper/70" />, label: "Lifetime Warranty" },
              { icon: <Heart weight="bold" className="w-3.5 h-3.5 text-copper/70" />, label: "30-Day Risk-Free Trial" },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          WHY TITANIUM — 4 benefit cards, editorial layout
          ================================================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20">
            <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-[-0.025em] leading-[1.12] text-balance">
              Why Titanium?
            </h2>
            <p className="text-lg text-stone/60 mt-4 max-w-lg">
              The material that changes everything about how you cook.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: <ShieldCheck weight="bold" className="w-6 h-6" />,
                title: "Pure Titanium",
                desc: "Crafted from medical-grade titanium — the same material trusted in surgical implants. No coatings that break down.",
              },
              {
                icon: <Sparkle weight="bold" className="w-6 h-6" />,
                title: "Zero Chemicals",
                desc: "No PFAS. No PTFE. No PFOA. No ceramic coatings. Just pure metal meeting food — exactly as nature intended.",
              },
              {
                icon: <Clock weight="bold" className="w-6 h-6" />,
                title: "Built to Last",
                desc: "Titanium's natural strength resists scratches, warping, and peeling. One pan that cooks for decades, not seasons.",
              },
              {
                icon: <Flame weight="bold" className="w-6 h-6" />,
                title: "Heats Perfectly",
                desc: "Superior thermal conductivity means even heat without hot spots. Cook with precision, every single time.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-warm-white rounded-2xl p-8 border border-titanium/10 hover:border-titanium/25 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-copper-lighter flex items-center justify-center text-copper mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-graphite">
                  {item.title}
                </h3>
                <p className="text-[0.9375rem] text-stone/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PRODUCT COLLECTION — Bento Grid
          ================================================================ */}
      <section className="py-24 lg:py-32 bg-sand">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20">
            <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-[-0.025em] leading-[1.12] text-balance">
              The VocVoi Collection
            </h2>
            <p className="text-lg text-stone/60 mt-4 max-w-lg">
              Every piece crafted from pure titanium. Every piece built to last.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {products.map((product) => {
              const v = product.variants[0];
              return (
                <a
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group bg-warm-white rounded-2xl p-5 pb-6 border border-titanium/10 hover:border-titanium/25 hover:shadow-sm transition-all duration-500 flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[4/5] bg-white rounded-xl mb-5 overflow-hidden">
                    <img
                      src={getVariantMainImage(product, v)}
                      alt={product.heroAlt}
                      className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-[1.0625rem] font-semibold tracking-tight text-graphite group-hover:text-copper transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone/50 mt-1.5 leading-relaxed flex-1">
                    {product.tagline}
                  </p>

                  {/* Bottom row */}
                  <div className="mt-4 pt-4 border-t border-titanium/10 flex items-center justify-between">
                    {v.amazon.price && (
                      <span className="text-sm font-semibold tracking-tight text-copper">
                        {v.amazon.price}
                      </span>
                    )}
                    <span className="text-sm font-medium text-stone/50 group-hover:text-copper transition-colors duration-300 inline-flex items-center gap-1">
                      Details
                      <ArrowRight weight="bold" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          BRAND PROMISE — 3 columns, spacious
          ================================================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {[
              {
                icon: <ShieldCheck weight="bold" className="w-6 h-6" />,
                title: "Lifetime Warranty",
                desc: "Every VocVoi pan is backed for life. If anything goes wrong, we replace it — no questions asked.",
              },
              {
                icon: <Heart weight="bold" className="w-6 h-6" />,
                title: "30-Day Risk-Free Trial",
                desc: "Cook with it. Love it. Or send it back for a full refund. Completely risk-free.",
              },
              {
                icon: <Flask weight="bold" className="w-6 h-6" />,
                title: "Lab Certified Safe",
                desc: "Every batch is third-party lab tested. No PFAS, no toxins — verified and certified.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-copper-lighter flex items-center justify-center text-copper">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-graphite">
                  {item.title}
                </h3>
                <p className="text-[0.9375rem] text-stone/60 leading-relaxed max-w-[32ch] mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA — Dark, dramatic, editorial
          ================================================================ */}
      <section className="py-24 lg:py-36 bg-graphite">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.75rem] font-semibold tracking-[-0.03em] leading-[1.1] text-white text-balance">
            Ready to cook pure?
          </h2>
          <p className="text-lg text-white/45 mt-6 max-w-xl mx-auto leading-relaxed">
            Experience the difference of pure titanium. Shop VocVoi on Amazon
            with free Prime shipping and our lifetime warranty.
          </p>
          <div className="mt-10 space-y-5">
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-9 py-4 bg-[#C2854A] text-[#FFFFFF] text-lg font-medium tracking-tight rounded-lg hover:bg-copper-hover transition-all duration-300 active:scale-[0.98]"
            >
              Shop VocVoi on Amazon
              <ArrowRight weight="bold" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <div className="flex items-center justify-center gap-4 text-sm text-white/25">
              <span>Free Prime Shipping</span>
              <span className="w-px h-3.5 bg-white/10" />
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
