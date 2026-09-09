"use client";

import { useState } from "react";
import type { ProductFamily } from "@/lib/products";
import { getVariantMainImage, getVariantImageDir } from "@/lib/products";
import {
  ShieldCheck,
  Sparkle,
  Flame,
  Lightning,
  Check,
  X,
  ArrowRight,
  Minus,
  Plus,
} from "@/components/ui/icons";

const iconResolver: Record<string, React.ReactNode> = {
  "shield-check": <ShieldCheck weight="bold" className="w-6 h-6" />,
  sparkles: <Sparkle weight="bold" className="w-6 h-6" />,
  flame: <Flame weight="bold" className="w-6 h-6" />,
  zap: <Lightning weight="bold" className="w-6 h-6" />,
  thermometer: <Lightning weight="bold" className="w-6 h-6" />,
  droplets: <ShieldCheck weight="bold" className="w-6 h-6" />,
  eye: <ShieldCheck weight="bold" className="w-6 h-6" />,
  maximize: <Sparkle weight="bold" className="w-6 h-6" />,
  "grip-horizontal": <ShieldCheck weight="bold" className="w-6 h-6" />,
  layers: <Sparkle weight="bold" className="w-6 h-6" />,
  circle: <ShieldCheck weight="bold" className="w-6 h-6" />,
  move: <Lightning weight="bold" className="w-6 h-6" />,
};

interface ProductPageClientProps {
  product: ProductFamily;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeVariant = product.variants[activeVariantIndex];
  const variantMainImage = getVariantMainImage(product, activeVariant);
  const variantImageDir = getVariantImageDir(product, activeVariant);

  return (
    <>
      {/* ================================================================
          SECTION 1 — HERO: Image Left + Info Right
          ================================================================ */}
      <section className="bg-sand">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_500px] gap-12 lg:gap-20 items-start">
            {/* LEFT: Product Image */}
            <div className="relative">
              <div className="aspect-[5/4] rounded-[2rem] overflow-hidden bg-white">
                <img
                  key={variantMainImage}
                  src={variantMainImage}
                  alt={`VocVoi ${activeVariant.name}`}
                  className="w-full h-full object-contain p-6 animate-fade-in"
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="absolute top-5 left-5 bg-white/85 backdrop-blur-lg rounded-full px-4 py-2 text-xs font-medium tracking-tight text-stone border border-titanium/20">
                {product.variants.length} variants available
              </div>
            </div>

            {/* RIGHT: Product Info + Variant Selector */}
            <div className="space-y-8 lg:sticky lg:top-28">
              <div>
                <h1 className="text-[2rem] lg:text-[2.5rem] font-semibold tracking-[-0.025em] leading-[1.12] text-balance">
                  {activeVariant.title}
                </h1>
                <p className="text-lg text-stone/60 mt-3 leading-relaxed">
                  {activeVariant.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-6">
                <span className="text-[1.75rem] font-semibold tracking-tight text-graphite">
                  {activeVariant.amazon.price}
                </span>
              </div>

              {/* Variant Selector */}
              <div className="space-y-3">
                <label className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ash">
                  Select Variant
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.sku}
                      onClick={() => setActiveVariantIndex(index)}
                      className={`
                        relative text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200
                        ${
                          index === activeVariantIndex
                            ? "border-copper bg-copper-lighter text-copper shadow-sm"
                            : "border-titanium/30 bg-white text-stone/60 hover:border-titanium/60 hover:text-stone"
                        }
                      `}
                    >
                      <span className="block text-[0.6875rem] uppercase tracking-[0.06em] text-ash/70 mb-0.5 font-medium">
                        {variant.category}
                      </span>
                      <span className="block text-[0.875rem] font-semibold tracking-tight">
                        {variant.shortName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs preview */}
              <div className="bg-white rounded-2xl border border-titanium/15 p-5 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-stone">
                  {activeVariant.name}
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {activeVariant.specs.slice(0, 6).map((spec, i) => (
                    <div key={i} className="flex justify-between text-[0.875rem]">
                      <span className="text-ash">{spec.label}</span>
                      <span className="text-stone font-medium text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amazon CTA */}
              <div className="space-y-3">
                <a
                  href={activeVariant.amazon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2.5 px-8 py-4 bg-[#23211F] text-[#FFFFFF] text-[0.9375rem] font-semibold tracking-tight rounded-lg hover:bg-copper transition-all duration-300 active:scale-[0.98]"
                >
                  Shop on Amazon
                  <ArrowRight weight="bold" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <p className="text-xs text-ash leading-relaxed">
                  {product.description.short}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — SELLING POINTS: data-driven from products.json
          ================================================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20">
            <h2 className="text-[2rem] sm:text-[2.75rem] font-semibold tracking-[-0.025em] leading-[1.12] text-balance">
              Titanium Technology
            </h2>
            <p className="text-lg text-stone/60 mt-4 max-w-lg">
              What makes VocVoi different — and why it matters for your kitchen.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-20">
            {product.sellingPoints.map((sp, i) => (
              <div
                key={i}
                className="group flex gap-6 bg-warm-white rounded-2xl p-8 border border-titanium/10 hover:border-titanium/25 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-copper-lighter rounded-xl flex items-center justify-center shrink-0 text-copper group-hover:scale-110 transition-transform duration-300">
                  {iconResolver[sp.icon] || (
                    <Check weight="bold" className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2 text-graphite">
                    {sp.title}
                  </h3>
                  <p className="text-[0.9375rem] text-stone/60 leading-relaxed">
                    {sp.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Material benefit badges — brand-wide constants, derived from sellingPoints */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "100% Titanium",
              "PFAS Free",
              "PFOA Free",
              "PTFE Free",
              "Lightweight",
              "Durable",
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-titanium/20 text-[0.875rem] font-medium tracking-tight text-stone hover:border-copper/20 hover:text-graphite transition-all duration-300"
              >
                <Check weight="bold" className="w-4 h-4 text-copper shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — MATERIAL COMPARISON TABLE
          ================================================================ */}
      {product.comparisonTable && (
        <section className="py-24 lg:py-32 bg-sand">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="mb-14 lg:mb-16">
              <h2 className="text-[2rem] sm:text-[2.75rem] font-semibold tracking-[-0.025em] leading-[1.12] text-balance">
                Why Settle for Less?
              </h2>
              <p className="text-lg text-stone/60 mt-4 max-w-lg">
                See how VocVoi Titanium compares to traditional cookware.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-titanium/15 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-titanium/15 bg-sand/50">
                    {product.comparisonTable.headers.map((h, i) => (
                      <th
                        key={i}
                        className={`px-5 py-4 text-left ${
                          i === 0
                            ? "font-semibold text-stone pl-6"
                            : "text-center font-semibold"
                        } ${
                          i === 1
                            ? "text-copper bg-copper-lighter/40"
                            : "text-stone"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.comparisonTable.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-titanium/8 last:border-0 hover:bg-sand/30 transition-colors"
                    >
                      <td className="px-5 py-4 font-medium text-stone pl-6">
                        {row.feature}
                      </td>
                      <td className="px-5 py-4 text-center bg-copper-lighter/10">
                        {row.vocvoi ? (
                          <Check weight="bold" className="w-5 h-5 text-copper mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-ash/25 mx-auto" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {row.stainless ? (
                          <Check weight="bold" className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-ash/25 mx-auto" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {row.ceramic ? (
                          <Check weight="bold" className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-ash/25 mx-auto" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {row.traditional ? (
                          <Check weight="bold" className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-ash/25 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          SECTION 4 — GALLERY
          ================================================================ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-14 lg:mb-16">
            <h2 className="text-[2rem] sm:text-[2.75rem] font-semibold tracking-[-0.025em] leading-[1.12] text-balance">
              Gallery
            </h2>
            <p className="text-lg text-stone/60 mt-4">
              A closer look at the {activeVariant.name}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] rounded-2xl overflow-hidden bg-white">
              <img
                key={`gallery-main-${activeVariant.sku}`}
                src={variantMainImage}
                alt={`VocVoi ${activeVariant.name}`}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
            </div>

            {[1, 2, 3, 4].map((n) => {
              const imgPath = `${variantImageDir}/${String(n).padStart(2, "0")}.webp`;
              return (
                <div
                  key={`${activeVariant.sku}-${n}`}
                  className="aspect-square rounded-2xl overflow-hidden bg-white"
                >
                  <img
                    src={imgPath}
                    alt={`VocVoi ${activeVariant.name} — view ${n}`}
                    className="w-full h-full object-contain p-2 hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = variantMainImage;
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — FAQ (data-driven from products.json)
          ================================================================ */}
      <section className="py-24 lg:py-32 bg-sand">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <div className="mb-14 lg:mb-16 text-center">
            <h2 className="text-[2rem] sm:text-[2.75rem] font-semibold tracking-[-0.025em] leading-[1.12]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {product.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-titanium/15 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-sand/30 transition-colors duration-200"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-[0.9375rem] text-stone pr-4">
                    {faq.question}
                  </span>
                  {openFaq === i ? (
                    <Minus weight="bold" className="w-5 h-5 text-copper shrink-0" />
                  ) : (
                    <Plus weight="bold" className="w-5 h-5 text-copper shrink-0" />
                  )}
                </button>
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${openFaq === i ? "max-h-96 pb-5 px-5" : "max-h-0"}
                  `}
                >
                  <p className="text-[0.9375rem] text-stone/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — AMAZON CTA (data-driven)
          ================================================================ */}
      <section className="py-24 lg:py-36 bg-graphite">
        <div className="max-w-[720px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-semibold tracking-[-0.03em] leading-[1.1] text-white text-balance">
            Ready to Experience Pure Titanium?
          </h2>
          <p className="text-lg text-white/45 mt-6 max-w-xl mx-auto leading-relaxed">
            Get the {activeVariant.name} on Amazon with free Prime shipping,
            a lifetime warranty, and a 30-day risk-free trial.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href={activeVariant.amazon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-9 py-4 bg-[#C2854A] text-[#FFFFFF] text-lg font-medium tracking-tight rounded-lg hover:bg-copper-hover transition-all duration-300 active:scale-[0.98]"
            >
              Shop {activeVariant.shortName} on Amazon
              <ArrowRight weight="bold" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <div className="flex items-center justify-center gap-4 text-sm text-white/25">
              <span>{activeVariant.amazon.price}</span>
              <span className="w-px h-3.5 bg-white/10" />
              <span>Free Prime Shipping</span>
              <span className="w-px h-3.5 bg-white/10" />
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          Mobile Bottom CTA Bar (data-driven)
          ================================================================ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-cream/95 backdrop-blur-xl border-t border-titanium/15 p-4 z-40">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold tracking-tight text-stone truncate">
              {activeVariant.shortName}
            </p>
            <p className="text-base font-bold tracking-tight text-copper">
              {activeVariant.amazon.price}
            </p>
          </div>
          <a
            href={activeVariant.amazon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#23211F] text-[#FFFFFF] text-sm font-medium tracking-tight rounded-lg hover:bg-copper transition-colors active:scale-[0.98] shrink-0"
          >
            Shop on Amazon
          </a>
        </div>
      </div>
    </>
  );
}
