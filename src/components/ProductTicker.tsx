"use client";
import { products } from "@/lib/products";

export default function ProductTicker() {
	// 商品をランダムに並び替えて複製（無限スクロール用）
	const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
	const duplicatedProducts = [...shuffledProducts, ...shuffledProducts];

	return (
		<div className="overflow-hidden bg-gray-50 py-8">
			<div className="animate-scroll flex gap-6 whitespace-nowrap" style={{ width: "max-content" }}>
				{duplicatedProducts.map((product, index) => (
					<div
						key={`${product.asin}-${index}`}
						className="flex-shrink-0 w-48 bg-white rounded-lg shadow-sm border p-4"
					>
						<div className="aspect-square relative mb-3 bg-gray-100 rounded">
							{/* eslint-disable @next/next/no-img-element */}
							<img
								src={product.image}
								alt={product.title}
								className="object-contain w-full h-full rounded"
							/>
						</div>
						<div className="text-sm font-medium line-clamp-2 mb-2 min-h-[2.5rem]">
							{product.title}
						</div>
						<div className="text-sm text-gray-600 mb-2">
							¥{product.price.toLocaleString()}
						</div>
						<div className="text-xs text-gray-500 capitalize">
							{product.category === "toys" && "おもちゃ"}
							{product.category === "grocery" && "食品・飲料"}
							{product.category === "household" && "日用品"}
							{product.category === "electronics" && "家電"}
							{product.category === "books" && "書籍"}
							{product.category === "beauty" && "コスメ"}
						</div>
					</div>
				))}
			</div>
		</div>
	);
} 