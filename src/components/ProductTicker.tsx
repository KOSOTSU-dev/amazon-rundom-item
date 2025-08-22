"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { products } from "@/lib/products";

export default function ProductTicker() {
	const ref = useRef<HTMLDivElement>(null);
	const [productBlocks, setProductBlocks] = useState(products);
	const controls = useAnimation();

	// 1つの商品の横の長さ
	const itemWidth = 192; // w-48 = 192px
	// 商品間の間隔
	const gap = 24; // gap-6 = 24px
	// 商品の横幅と、商品間の合計値
	const itemWidthWithGap = itemWidth + gap;

	// 初期レンダリング時に横幅の穴埋め
	useEffect(() => {
		if (!ref.current) return;
		const containerWidth = ref.current.offsetWidth;
		const currentWidth = products.length * itemWidthWithGap;
		if (currentWidth < containerWidth) {
			const times = Math.ceil(containerWidth / currentWidth);
			const filled: typeof products = [];
			for (let i = 0; i < times; i++) filled.push(...products);
			setProductBlocks(filled);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 左→右へ無限ループ
	useEffect(() => {
		let isCancelled = false;
		(async () => {
			while (!isCancelled) {
				// 1カード分、右方向に移動
				await controls.start({
					x: itemWidthWithGap,
					transition: { duration: 1.2, ease: "linear" },
				});
				// 配列を1回だけ回転（末尾を先頭へ）
				setProductBlocks(prev => {
					if (prev.length === 0) return prev;
					const next = [...prev];
					const last = next.pop();
					if (last) next.unshift(last);
					return next;
				});
				// 位置リセット
				await controls.set({ x: 0 });
			}
		})();
		return () => {
			isCancelled = true;
		};
	}, [controls, itemWidthWithGap]);

	return (
		<div className="overflow-hidden bg-gray-50 py-8" ref={ref}>
			<motion.div animate={controls} style={{ x: 0 }}>
				<div
					className="flex gap-6"
					style={{
						width: `${itemWidthWithGap * productBlocks.length}px`,
						marginLeft: `-${itemWidth}px`,
					}}
				>
					{productBlocks.map((product, index) => (
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