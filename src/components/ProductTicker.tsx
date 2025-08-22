"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";

export default function ProductTicker() {
	const ref = useRef<HTMLDivElement>(null);
	const [baseBlocks, setBaseBlocks] = useState(products);

	// 1つの商品の横の長さ
	const itemWidth = 192; // w-48 = 192px
	// 商品間の間隔
	const gap = 24; // gap-6 = 24px
	// 商品の横幅と、商品間の合計値
	const itemWidthWithGap = itemWidth + gap;

	// 横幅の穴埋め（画面幅を満たすまで繰り返し）
	useEffect(() => {
		if (!ref.current) return;
		const containerWidth = ref.current.offsetWidth;
		const currentWidth = products.length * itemWidthWithGap;
		if (currentWidth < containerWidth) {
			const times = Math.ceil(containerWidth / currentWidth);
			const filled: typeof products = [];
			for (let i = 0; i < times; i++) filled.push(...products);
			setBaseBlocks(filled);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// シームレスループ用に重複させる（配列は不変）
	const loopBlocks = useMemo(() => [...baseBlocks, ...baseBlocks], [baseBlocks]);
	const totalWidth = baseBlocks.length * itemWidthWithGap; // 1周分の距離

	return (
		<div className="overflow-hidden bg-gray-50 py-8" ref={ref}>
			<motion.div
				// 左→右：マイナスから0へ
				animate={{ x: [ -totalWidth, 0 ] }}
				transition={{ duration: 30, ease: "linear", repeat: Infinity }}
				style={{ willChange: "transform" }}
			>
				<div
					className="flex gap-6"
					style={{
						width: `${itemWidthWithGap * loopBlocks.length}px`,
						marginLeft: `-${itemWidth}px`,
					}}
				>
					{loopBlocks.map((product, index) => (
						<div
							key={`${product.asin}-${index}`}
							className="flex-shrink-0 bg-white rounded-lg shadow-sm border p-4"
							style={{ width: `${itemWidth}px` }}
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
			</motion.div>
		</div>
	);
} 