"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Product } from "@/lib/products";

export default function Home() {
	const [minPrice, setMinPrice] = useState<string>("500");
	const [maxPrice, setMaxPrice] = useState<string>("3000");
	const [category, setCategory] = useState<string>("all");
	const [excludeAdult, setExcludeAdult] = useState<boolean>(true);
	const [isSpinning, setIsSpinning] = useState<boolean>(false);
	const [items, setItems] = useState<Product[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>("");

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

	const spin = async () => {
		try {
			setErrorMessage("");
			setIsSpinning(true);
			setSelectedIndex(null);

			// 実装した商品データベースAPIを呼び出し
			const params = new URLSearchParams({
				minPrice,
				maxPrice,
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

	return (
		<div className="font-sans min-h-screen p-6 sm:p-10 flex flex-col gap-8">
			<header className="flex items-center gap-3">
				<Image className="dark:invert" src="/next.svg" alt="Logo" width={120} height={26} />
				<h1 className="text-2xl font-bold">Amazon ランダム商品（条件付き）</h1>
			</header>

			<section className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
				<div className="flex flex-col gap-2">
					<label className="text-sm">最低価格（円）</label>
					<input
						type="number"
						className="border rounded px-3 py-2 bg-background"
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
						min={0}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm">最高価格（円）</label>
					<input
						type="number"
						className="border rounded px-3 py-2 bg-background"
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
						min={0}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm">カテゴリ</label>
					<select
						className="border rounded px-3 py-2 bg-background"
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
				<div className="flex items-center gap-2">
					<input
						id="exclude-adult"
						type="checkbox"
						checked={excludeAdult}
						onChange={(e) => setExcludeAdult(e.target.checked)}
					/>
					<label htmlFor="exclude-adult" className="text-sm">
						成人向けを除外
					</label>
				</div>
				<button
					onClick={spin}
					disabled={isSpinning}
					className="md:col-span-4 bg-foreground text-background rounded px-4 py-2 disabled:opacity-60"
				>
					{isSpinning ? "回転中..." : "ルーレット開始"}
				</button>
			</section>

			{errorMessage && (
				<p className="text-red-500 text-sm">{errorMessage}</p>
			)}

			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{items.map((item, idx) => (
					<div
						key={item.asin || idx}
						className={`border rounded p-3 transition-transform ${
							selectedIndex === idx ? "ring-2 ring-blue-500 scale-105" : ""
						}`}
					>
						<div className="aspect-square relative mb-2 bg-[#f5f5f5]">
							{item.image ? (
								/* eslint-disable @next/next/no-img-element */
								<img src={item.image} alt={item.title} className="object-contain w-full h-full" />
							) : (
								<div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
							)}
						</div>
						<div className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{item.title}</div>
						{item.price && <div className="text-sm mt-1">¥{item.price.toLocaleString()}</div>}
						{item.link && (
							<a
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 text-sm underline mt-2 inline-block"
							>
								商品ページへ
							</a>
						)}
					</div>
				))}
			</section>

			<footer className="text-xs text-gray-500">
				当サイトは Amazonアソシエイト を利用しています。表示価格・在庫は遷移先をご確認ください。
			</footer>
		</div>
	);
}
