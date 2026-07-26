import productsData from '@/data/products.json';

export interface SpecItem {
  label: string;
  value: string;
}

export interface AmazonInfo {
  asin: string;
  url: string;
  price: string;
  rating: number;
  reviewCount: number;
}

export interface ProductVariant {
  sku: string;
  name: string;
  shortName: string;
  title: string;
  subtitle: string;
  imagesDir: string;
  category: string;
  specs: SpecItem[];
  amazon: AmazonInfo;
}

export interface SellingPoint {
  icon: string;
  title: string;
  body: string;
}

export interface ComparisonRow {
  feature: string;
  vocvoi: boolean;
  stainless: boolean;
  ceramic: boolean;
  traditional: boolean;
}

export interface ProductFamily {
  slug: string;
  name: string;
  tagline: string;
  imagePrefix: string;
  featured: boolean;
  heroAlt: string;
  description: {
    short: string;
    long: string;
  };
  sellingPoints: SellingPoint[];
  comparisonTable?: {
    headers: string[];
    rows: ComparisonRow[];
  };
  faqs: { question: string; answer: string }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  variants: ProductVariant[];
}

export interface ProductsData {
  products: ProductFamily[];
  _meta: {
    version: string;
    imageBasePath: string;
    variantImageConvention: {
      main: string;
      gallery: string;
      hero: string;
    };
  };
}

const data = productsData as ProductsData;

export function getAllProducts(): ProductFamily[] {
  return data.products;
}

export function getFeaturedProducts(): ProductFamily[] {
  return data.products.filter(p => p.featured);
}

export function getProductBySlug(slug: string): ProductFamily | undefined {
  return data.products.find(p => p.slug === slug);
}

/**
 * Get the main product image for a variant.
 * Path formula: {product.imagePrefix}/{variant.imagesDir}/main.webp
 * Always data-driven — no hardcoded paths.
 */
export function getVariantMainImage(product: ProductFamily, variant: ProductVariant): string {
  return `${product.imagePrefix}/${variant.imagesDir}/${data._meta.variantImageConvention.main}`;
}

/**
 * Get the full image directory for a variant.
 * Used for gallery image construction in client components.
 */
export function getVariantImageDir(product: ProductFamily, variant: ProductVariant): string {
  return `${product.imagePrefix}/${variant.imagesDir}`;
}
