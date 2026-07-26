#!/usr/bin/env node

/**
 * Product Data Validator
 * 
 * Usage: node scripts/check-products.js
 * Or add to package.json: "check-products": "node scripts/check-products.js"
 * 
 * Validates:
 * 1. products.json is valid JSON and has correct structure
 * 2. All imageDir paths exist
 * 3. main.webp exists for every variant
 * 4. No duplicate SKUs
 * 5. Amazon URLs are well-formed
 * 6. All required fields are present
 */

const fs = require("fs");
const path = require("path");

const PRODUCTS_PATH = path.join(__dirname, "..", "src", "data", "products.json");
const PUBLIC_DIR = path.join(__dirname, "..", "public");

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ❌ ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠️  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

// ── Step 1: Parse JSON ──────────────────────────────────────────
console.log("\n📋 Validating products.json…");
console.log("─".repeat(50));

let data;
try {
  const raw = fs.readFileSync(PRODUCTS_PATH, "utf-8");
  data = JSON.parse(raw);
  ok("products.json is valid JSON");
} catch (e) {
  error(`Failed to parse products.json: ${e.message}`);
  process.exit(1);
}

// ── Step 2: Top-level structure ─────────────────────────────────
if (!data.products || !Array.isArray(data.products)) {
  error("Missing or invalid 'products' array");
  process.exit(1);
}
ok(`Found ${data.products.length} product families`);

const allSKUs = new Set();
const allSlugs = new Set();

// ── Step 3: Validate each product family ────────────────────────
for (const product of data.products) {
  const label = `[${product.slug || "UNKNOWN"}]`;

  // Required fields
  const requiredFields = [
    "slug", "name", "tagline", "imagePrefix", "heroAlt",
    "description", "variants"
  ];

  for (const field of requiredFields) {
    if (!product[field]) {
      error(`${label} Missing required field: "${field}"`);
    }
  }

  // Slug uniqueness
  if (product.slug && allSlugs.has(product.slug)) {
    error(`${label} Duplicate slug`);
  } else if (product.slug) {
    allSlugs.add(product.slug);
  }

  // description structure
  if (product.description) {
    if (!product.description.short) error(`${label} Missing description.short`);
    if (!product.description.long) warn(`${label} Missing description.long`);
  }

  // Variants
  if (!Array.isArray(product.variants)) {
    error(`${label} 'variants' is not an array`);
    continue;
  }

  if (product.variants.length === 0) {
    error(`${label} Has zero variants`);
    continue;
  }

  ok(`${product.name} — ${product.variants.length} variant(s)`);

  for (const variant of product.variants) {
    const vLabel = `${label}[SKU: ${variant.sku || "UNKNOWN"}]`;

    // Required variant fields
    for (const field of ["sku", "name", "shortName", "imagesDir", "category", "specs", "amazon"]) {
      if (!variant[field]) {
        error(`${vLabel} Missing required field: "${field}"`);
      }
    }

    // SKU uniqueness
    if (variant.sku && allSKUs.has(variant.sku)) {
      error(`${vLabel} Duplicate SKU across products`);
    } else if (variant.sku) {
      allSKUs.add(variant.sku);
    }

    // Amazon info
    if (variant.amazon) {
      if (!variant.amazon.asin) error(`${vLabel} Missing amazon.asin`);
      if (!variant.amazon.url) error(`${vLabel} Missing amazon.url`);
      else if (!variant.amazon.url.startsWith("https://www.amazon.com/")) {
        warn(`${vLabel} Amazon URL doesn't start with https://www.amazon.com/`);
      }
      if (!variant.amazon.price) error(`${vLabel} Missing amazon.price`);
      if (typeof variant.amazon.rating !== "number") error(`${vLabel} amazon.rating must be a number`);
      if (typeof variant.amazon.reviewCount !== "number") error(`${vLabel} amazon.reviewCount must be a number`);
    }

    // Specs
    if (Array.isArray(variant.specs) && variant.specs.length === 0) {
      warn(`${vLabel} specs array is empty`);
    }

    // Image directory check
    if (product.imagePrefix && variant.imagesDir) {
      const imageDirPath = path.join(
        PUBLIC_DIR,
        product.imagePrefix.replace(/^\/images/, "images"),
        variant.imagesDir
      );
      const mainWebpPath = path.join(imageDirPath, "main.webp");

      if (!fs.existsSync(imageDirPath)) {
        warn(`${vLabel} Image directory not found: ${imageDirPath}`);
      } else if (!fs.existsSync(mainWebpPath)) {
        warn(`${vLabel} main.webp not found in image directory`);
      }
    }
  }

  // SEO check
  if (product.seo) {
    if (!product.seo.title) warn(`${label} Missing seo.title`);
    if (!product.seo.description) warn(`${label} Missing seo.description`);
  }
}

// ── Summary ──────────────────────────────────────────────────────
console.log("\n" + "─".repeat(50));
console.log("📊 SUMMARY");
console.log(`  Products: ${data.products.length}`);
console.log(`  Total SKUs: ${allSKUs.size}`);
console.log(`  Errors: ${errors}`);
console.log(`  Warnings: ${warnings}`);

if (errors > 0) {
  console.log("\n❌ VALIDATION FAILED — fix the errors above before deploying.");
  process.exit(1);
} else if (warnings > 0) {
  console.log("\n⚠️  VALIDATION PASSED with warnings — review warnings above.");
  process.exit(0);
} else {
  console.log("\n✅ ALL CHECKS PASSED — products.json and images are valid.");
  process.exit(0);
}
