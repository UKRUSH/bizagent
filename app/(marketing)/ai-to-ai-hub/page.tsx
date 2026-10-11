import type { Metadata } from "next";
import { getProduct } from "@/content/products";
import { ProductPage } from "@/components/products/ProductPage";

const product = getProduct("ai-to-ai-hub");

export const metadata: Metadata = {
  title: product.title,
  description: product.summary,
  alternates: { canonical: product.href },
};

export default function AiToAiHubPage() {
  return <ProductPage product={product} />;
}
