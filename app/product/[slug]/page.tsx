// File: /app/product/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug, ProductDetailProps } from "@/lib/productutils";
import { urlFor } from "@/sanity/lib/image";


export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound(); // If product is not found, trigger Next.js notFound page
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 relative group">
          <Image
            width={500}
            height={500}
            src={urlFor(product.images[0]).url()}
            alt={product.name}
            className="rounded-lg object-cover shadow-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
        </div>

        <div className="md:w-1/2 space-y-4 items-start justify-center flex flex-col">
          <h1 className="text-4xl font-extrabold text-white">{product.name}</h1>
          <p className="text-md text-white/80 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-2">
            <p className="text-sm text-white/80">Company: {product.company}</p>
            <p className="text-sm text-white/80">Category: {product.category}</p>
            <p className="text-2xl font-semibold text-blue-500">
              Price: ₹{product.price}
            </p>
          </div>

          {/* Use AddToCartButton and pass product as a prop */}
          <AddToCartButton product={product} />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Featured Video
        </h2>
        {/* Responsive Video Wrapper */}
        {product.videoLink && (
          <div className="relative overflow-hidden" style={{ paddingTop: "56.25%" }}>
            <iframe
              src={product.videoLink}
              title="Featured Video"
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
