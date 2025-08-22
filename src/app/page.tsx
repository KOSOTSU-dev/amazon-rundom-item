"use client";
import { useState, useMemo } from "react";
import { Product } from "@/lib/products";
import ProductTicker from "@/components/ProductTicker";
import PriceSlider from "@/components/PriceSlider";

export default function Home() {
	const [minPrice, setMinPrice] = useState<number>(500);
	const [maxPrice, setMaxPrice] = useState<number>(3000);
	const [category, setCategory] = useState<string>("all");
	const [excludeAdult, setExcludeAdult] = useState<boolean>(true);
	const [isSpinning, setIsSpinning] = useState<boolean>(false);
	const [items, setItems] = useState<Product[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [hasStarted, setHasStarted] = useState<boolean>(false);

	const categories = useMemo(
		() => [
			{ value: "all", label: "すべて" },
			{ value: "toys", label: "おもちゃ" },
			{ value: "grocery", label: "食品・飲料" },
			{ value: "household", label: "日用品" },
			{ value: "electronics", label: "家電" },
			{ value: "books", label: "書籍" },
			{ value: "beauty", label: "コスメ" },
		],
		[]
	);

	const handlePriceChange = (min: number, max: number) => {
		setMinPrice(min);
		setMaxPrice(max);
	};

	const spin = async () => {
		try {
			setErrorMessage("");
			setIsSpinning(true);
			setSelectedIndex(null);
			setHasStarted(true);

			// 実装した商品データベースAPIを呼び出し
			const params = new URLSearchParams({
				minPrice: minPrice.toString(),
				maxPrice: maxPrice.toString(),
				category,
				excludeAdult: excludeAdult.toString(),
				limit: "12",
			});

			const res = await fetch(`/api/random-items?${params}`);
			const data = await res.json();

			if (data.error) {
				setErrorMessage(data.error);
				setIsSpinning(false);
				return;
			}

			setItems(data.items);

			// 簡易ルーレット演出
			let current = 0;
			const total = data.items.length;
			const totalDurationMs = 2500;
			const start = Date.now();
			const timer = setInterval(() => {
				const elapsed = Date.now() - start;
				const progress = Math.min(elapsed / totalDurationMs, 1);
				current = (current + 1) % total;
				setSelectedIndex(current);
				if (progress >= 1) {
					clearInterval(timer);
					setIsSpinning(false);
				}
			}, 80);
		} catch (error) {
			console.error("Spin error:", error);
			setErrorMessage("取得に失敗しました。時間を置いて再度お試しください。");
			setIsSpinning(false);
		}
	};

	const resetGame = () => {
		setItems([]);
		setSelectedIndex(null);
		setHasStarted(false);
		setErrorMessage("");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			<div className="container mx-auto px-6 py-8">
				{/* ヘッダー */}
				<header className="text-center mb-12">
					<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
						Amazon ランダム商品（条件付き）
					</h1>
					<p className="text-gray-600 text-lg max-w-2xl mx-auto">
						罰ゲーム・サプライズに最適！条件を設定してランダム商品を表示
					</p>
				</header>

				{/* フィルターセクション */}
				<div className="max-w-4xl mx-auto mb-12">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* 価格スライダー */}
						<div className="lg:col-span-2">
							<PriceSlider
								minPrice={minPrice}
								maxPrice={maxPrice}
								onChange={handlePriceChange}
							/>
						</div>

						{/* カテゴリとオプション */}
						<div className="space-y-6">
							<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
								<label className="text-lg font-bold text-gray-900 mb-3 block">カテゴリ</label>
								<select
									className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								>
									{categories.map((c) => (
										<option key={c.value} value={c.value}>
											{c.label}
										</option>
									))}
								</select>
							</div>

							<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
								<div className="flex items-center gap-3">
									<input
										id="exclude-adult"
										type="checkbox"
										checked={excludeAdult}
										onChange={(e) => setExcludeAdult(e.target.checked)}
										className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
									/>
									<label htmlFor="exclude-adult" className="text-lg font-medium text-gray-900">
										成人向けを除外
									</label>
								</div>
							</div>
						</div>
					</div>

					{/* アクションボタン */}
					<div className="flex gap-4 mt-8">
						<button
							onClick={spin}
							disabled={isSpinning}
							className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-4 disabled:opacity-60 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
						>
							{isSpinning ? "🎲 回転中..." : "🎲 ルーレット開始"}
						</button>
						{hasStarted && (
							<button
								onClick={resetGame}
								className="bg-gray-500 hover:bg-gray-600 text-white rounded-xl px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-200"
							>
								リセット
							</button>
						)}
					</div>
				</div>

				{/* エラーメッセージ */}
				{errorMessage && (
					<div className="max-w-4xl mx-auto mb-8">
						<div className="bg-red-50 border border-red-200 rounded-xl p-4">
							<p className="text-red-600 text-center">{errorMessage}</p>
						</div>
					</div>
				)}

				{/* ルーレット開始前のティッカー表示 */}
				{!hasStarted && <ProductTicker />}

				{/* ルーレット結果表示 */}
				{hasStarted && (
					<div className="max-w-6xl mx-auto">
						<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
							{items.map((item, idx) => (
								<div
									key={item.asin || idx}
									className={`bg-white rounded-xl shadow-lg border border-gray-100 p-4 transition-all duration-300 ${
										selectedIndex === idx ? "ring-4 ring-blue-500 scale-105 shadow-2xl" : "hover:shadow-xl"
									}`}
								>
									<div className="aspect-square relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
										{item.image ? (
											/* eslint-disable @next/next/no-img-element */
											<img src={item.image} alt={item.title} className="object-contain w-full h-full" />
										) : (
											<div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
										)}
									</div>
									<div className="text-sm font-bold line-clamp-2 min-h-[2.5rem] mb-2">{item.title}</div>
									{item.price && <div className="text-lg font-bold text-blue-600 mb-3">¥{item.price.toLocaleString()}</div>}
									{item.link && (
										<a
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg px-4 py-2 font-medium transition-colors"
										>
											商品ページへ
										</a>
									)}
								</div>
							))}
						</section>
					</div>
				)}

				{/* フッター */}
				<footer className="text-center mt-16 text-gray-500 text-sm">
					当サイトは Amazonアソシエイト を利用しています。表示価格・在庫は遷移先をご確認ください。
				</footer>
			</div>
		</div>
	);
}
