import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import "./globals.css";

export const metadata: Metadata = {
  title: "VocVoi | Pure Titanium Cookware",
  description: "Premium pure titanium cookware. No coatings, no chemicals, just the purest cooking surface engineered for the people who matter most.",
  keywords: ["titanium cookware", "pure titanium pan", "non-toxic cookware", "PFAS-free pan", "healthy cooking"],
  openGraph: {
    title: "VocVoi | Pure Titanium Cookware",
    description: "Premium pure titanium cookware. No coatings. No chemicals. Pure cooking.",
    siteName: "VocVoi",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

/* ============================================================
   SiteHeader
   ============================================================ */
function SiteHeader() {
  const products = getAllProducts();
  const firstProduct = products[0];
  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-titanium/15">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-[1.375rem] font-semibold tracking-tight text-graphite hover:text-copper transition-colors duration-300"
          style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
        >
          VocVoi
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <a
            href="/"
            className="text-[0.9375rem] text-stone/80 hover:text-graphite transition-colors duration-200 tracking-tight"
          >
            Home
          </a>
          <a
            href="/products"
            className="text-[0.9375rem] text-stone/80 hover:text-graphite transition-colors duration-200 tracking-tight"
          >
            Products
          </a>
          <a
            href={`/products/${firstProduct.slug}`}
            className="text-[0.9375rem] text-stone/80 hover:text-graphite transition-colors duration-200 tracking-tight"
          >
            {firstProduct.name}
          </a>
        </nav>

        {/* Right: Amazon CTA */}
        <a
          href="https://www.amazon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#23211F] text-[#FFFFFF] text-[0.875rem] font-medium tracking-tight rounded-lg hover:bg-copper transition-colors duration-300 active:scale-[0.98]"
        >
          Shop on Amazon
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        {/* Mobile: Amazon icon */}
        <a
          href="https://www.amazon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden p-2 text-graphite/70 hover:text-copper transition-colors"
          aria-label="Shop on Amazon"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </header>
  );
}

/* ============================================================
   SiteFooter
   ============================================================ */
function SiteFooter() {
  const products = getAllProducts();
  return (
    <footer className="bg-graphite text-white/65">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="/"
              className="text-xl font-semibold tracking-tight text-white"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              VocVoi
            </a>
            <p className="text-sm text-white/35 mt-4 leading-relaxed max-w-[24ch]">
              Pure titanium cookware for the people who matter most.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white/80 text-[0.8125rem] font-semibold mb-5 uppercase tracking-[0.08em]">
              Products
            </h4>
            <ul className="space-y-2.5">
              {products.map((product) => (
                <li key={product.slug}>
                  <a
                    href={`/products/${product.slug}`}
                    className="text-sm text-white/40 hover:text-copper transition-colors duration-200"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/80 text-[0.8125rem] font-semibold mb-5 uppercase tracking-[0.08em]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Our Story", href: "#" },
                { label: "FAQ", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Privacy Policy", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-white/40 hover:text-copper transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white/80 text-[0.8125rem] font-semibold mb-5 uppercase tracking-[0.08em]">
              Shop
            </h4>
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C2854A] text-[#FFFFFF] text-sm font-medium rounded-lg hover:bg-copper-hover transition-colors duration-300 active:scale-[0.98]"
            >
              Shop on Amazon
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} VocVoi. All rights reserved.
          </p>
          <p className="text-xs text-white/15">
            Premium Titanium Cookware
          </p>
        </div>
      </div>
    </footer>
  );
}
