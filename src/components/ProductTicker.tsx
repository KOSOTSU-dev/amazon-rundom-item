"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { products } from "@/lib/products";

export default function ProductTicker() {
	const ref = useRef<HTMLDivElement>(null);
	const [baseBlocks, setBaseBlocks] = useState(products.slice(0, 6)); // 表示商品数を6個に制限
	const [isVisible, setIsVisible] = useState(true); // 初期状態で表示

	// 1つの商品の横の長さ
	const itemWidth = 192; // w-48 = 192px
	// 商品間の間隔
	const gap = 24; // gap-6 = 24px
	// 商品の横幅と、商品間の合計値
	const itemWidthWithGap = itemWidth + gap;

	// Intersection Observerでビューポート内かどうかを監視
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.01, rootMargin: '50px' }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, []);

	// 横幅の穴埋め（画面幅を満たすまで繰り返し）
	useEffect(() => {
		if (!ref.current) return;
		const containerWidth = ref.current.offsetWidth;
		const currentWidth = baseBlocks.length * itemWidthWithGap;
		if (currentWidth < containerWidth) {
			const times = Math.ceil(containerWidth / currentWidth);
			const filled: typeof baseBlocks = [];
			for (let i = 0; i < times; i++) filled.push(...baseBlocks);
			setBaseBlocks(filled);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// シームレスループ用に2つ重複させる（パフォーマンス改善）
	const loopBlocks = useMemo(() => [...baseBlocks, ...baseBlocks], [baseBlocks]);
	const totalWidth = baseBlocks.length * itemWidthWithGap; // 1周分の距離

	return (
		<div 
			className="w-full overflow-hidden bg-white py-4" 
			style={{ 
				marginLeft: 'calc(-50vw + 50%)',
				marginRight: 'calc(-50vw + 50%)',
				width: '100vw'
			}}
			ref={ref}
		>
			{isVisible && (
				<motion.div
					// 左→右：マイナスから0へ（より滑らかに）
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
								<div className="aspect-square relative mb-3 bg-gray-100 rounded overflow-hidden">
									<Image
										src={product.image}
										alt={product.title}
										fill
										className="object-contain"
										sizes="192px"
										priority={index < 3} // 最初の3つの画像のみ優先読み込み
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
			)}
		</div>
	);
} 