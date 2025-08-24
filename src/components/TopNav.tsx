"use client";
import { useEffect, useRef, useState } from "react";
import PriceSlider from "./PriceSlider";

export default function TopNav() {
	const [open, setOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	// ドロップダウン内のローカル状態（ページ初期値と同じ）
	const [minPrice, setMinPrice] = useState<number>(1);
	const [maxPrice, setMaxPrice] = useState<number>(10000);
	const [category, setCategory] = useState<string>("all");
	const [excludeAdult, setExcludeAdult] = useState<boolean>(true);

	// ホームに戻る処理
	const handleHomeClick = () => {
		// ページの状態をリセットするイベントを発火
		window.dispatchEvent(new CustomEvent('resetToHome'));
		// ページをリロードして完全にリセット
		window.location.reload();
	};

	// 変更をブラウザ全体へ通知
	const emit = () => {
		window.dispatchEvent(
			new CustomEvent("filterUpdate", {
				detail: { minPrice, maxPrice, category, excludeAdult },
			})
		);
	};

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (!panelRef.current) return;
			if (open && !panelRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);

	return (
		<nav className="w-full text-white relative z-50">
			{/* メインバー */}
			<div className="w-full bg-[#131921]">
				<div className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
					<button 
						onClick={handleHomeClick}
						className="text-xl font-bold tracking-wide hover:text-[#FFA41C] transition-colors cursor-pointer"
					>
						Amazon roulett
					</button>
					<div />
				</div>
			</div>

			{/* ミニヘッダー（サブバー） */}
			<div className="w-full bg-[#232f3e] text-gray-100 text-sm">
				<div className="w-full px-0 py-1">
					<div className="relative flex justify-start pl-4" ref={panelRef}>
						<button
							className="bg-transparent hover:bg-[#314458] text-gray-100 px-5 py-1.5 rounded-md text-sm font-medium shadow transition-colors"
							onClick={() => setOpen((v) => !v)}
						>
							条件で探す
						</button>

						{open && (
							<div className="absolute left-0 top-full mt-3 bg-white text-black shadow-2xl border border-gray-200 rounded-xl w-[min(47.5vw,28rem)] overflow-hidden">
								<div className="p-4 flex flex-col gap-4 max-h-[70vh] overflow-auto">
									<div className="bg-white rounded-md shadow p-3 border border-gray-200">
										<label className="text-sm font-bold text-[#131921] mb-2 block">価格</label>
										<PriceSlider
											minPrice={minPrice}
											maxPrice={maxPrice}
											onChange={(min, max) => {
												setMinPrice(min);
												setMaxPrice(max);
											}}
										/>
									</div>
									<div className="bg-white rounded-md shadow p-3 border border-gray-200">
										<label className="text-sm font-bold text-[#131921] mb-2 block">カテゴリ</label>
										<select
											className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-[#FF9900] transition"
											value={category}
											onChange={(e) => setCategory(e.target.value)}
										>
											<option value="all">すべて</option>
											<option value="toys">おもちゃ</option>
											<option value="grocery">食品・飲料</option>
											<option value="household">日用品</option>
											<option value="electronics">家電</option>
											<option value="books">書籍</option>
											<option value="beauty">コスメ</option>
										</select>
									</div>
									<div className="bg-white rounded-md shadow p-3 border border-gray-200">
										<label className="flex items-center gap-3">
											<input
												type="checkbox"
												checked={excludeAdult}
												onChange={(e) => setExcludeAdult(e.target.checked)}
												className="w-5 h-5 text-[#FF9900] border-gray-300 rounded focus:ring-[#FF9900]"
											/>
											<span className="text-sm font-medium text-[#131921]">成人向けを除外</span>
										</label>
									</div>
									<button
										className="w-full bg-[#FFA41C] hover:bg-[#FF9900] text-black rounded-md px-4 py-2 font-semibold"
										onClick={() => {
											emit();
											setOpen(false);
										}}
									>
										この条件で反映
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
