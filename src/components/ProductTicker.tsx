"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/lib/products";

export default function ProductTicker() {
	const ref = useRef<HTMLDivElement>(null);

	// 1つの商品の横の長さ
	const itemWidth = 192; // w-48 = 192px
	// 商品間の間隔
	const gap = 24; // gap-6 = 24px
	// 商品の横幅と、商品間の合計値
	const itemWidthWithGap = itemWidth + gap;
	// 商品の数
	const numberOfContents = products.length;
	// 横に流れる商品のシーケンス合計
	const [productBlocks, setProductBlocks] = useState(products);

	useEffect(() => {
		// 「横幅の穴埋め」
		// windowの長さよりコンテンツ数が少ない場合
		// 横幅 < 商品の合計の長さ となるように、商品群(シーケンス)をループさせて配列に加える
		if (
			ref.current?.offsetWidth &&
			productBlocks.length * itemWidthWithGap < ref.current.offsetWidth
		) {
			// 全体の長さから何個分　足りていないのか
			const fillableNumberOfContents: number = Math.floor(
				(ref.current.offsetWidth - productBlocks.length * itemWidthWithGap) /
					numberOfContents
			);

			// シーケンスを追加するのは何個か
			const fillableNumberOfSequence: number = Math.ceil(
				fillableNumberOfContents / numberOfContents
			);

			// シーケンス分　コンテンツを追加
			const newProductBlocks = [...productBlocks];
			const _ = [...Array(fillableNumberOfSequence)].map((_, index) => {
				newProductBlocks.push(...productBlocks);
			});

			setProductBlocks(newProductBlocks);
		}
	}, [ref.current]); //DOMがレンダリングされ、横幅が確定した瞬間に実行される

	return (
		<div className="overflow-hidden bg-gray-50 py-8" ref={ref}>
			<AnimatePresence>
				<motion.div
					// アニメーションの変化終了時点の最終移動差分
					animate={{
						x: itemWidthWithGap,
					}}
					// 初期状態〜Animationまでをどう変化させるかを記述
					transition={{
						repeat: Infinity, //ループさせる
						duration: 15, //　animationを終えるまでの時間(秒) - 遅くした
						ease: "linear", // 変化方法。直線的に変化させている。
					}}
					onUpdate={(latest) => {
						const xValue = typeof latest.x === "number" ? latest.x : 0;
						if (xValue >= itemWidthWithGap) {
							//１マス分動いたら発動する処理
							const newProductBlocks = [...productBlocks];
							newProductBlocks.unshift(productBlocks[productBlocks.length - 1]); //冒頭に末尾の商品を追加
							newProductBlocks.pop(); //末端の商品を消去する
							setProductBlocks(newProductBlocks); //変更した配列を適応
						}
					}}
				>
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
			</AnimatePresence>
		</div>
	);
} 