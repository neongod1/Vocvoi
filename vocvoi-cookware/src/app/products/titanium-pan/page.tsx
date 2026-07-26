import { getProductBySlug } from "@/lib/products";
import ProductPageClient from "./product-page-client";

export default function TitaniumPanPage() {
  const product = getProductBySlug("titanium-pan");

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Product not found</h1>
      </div>
    );
  }

  return <ProductPageClient product={product} />;
}
