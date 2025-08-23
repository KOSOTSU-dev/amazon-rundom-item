"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Product } from "@/lib/products";
import ProductTicker from "@/components/ProductTicker";

export default function Home() {
	const [items, setItems] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [errorMessage, setErrorMessage] = useState("");
	const [hasStarted, setHasStarted] = useState(false);
	const [currentDisplayIndex, setCurrentDisplayIndex] = useState<number>(0);
	const [currentFilters, setCurrentFilters] = useState({
		minPrice: 1,
		maxPrice: 10000,
		category: 'all',
		excludeAdult: true
	});

	// 効果音用のAudioオブジェクト
	const spinAudioRef = useRef<HTMLAudioElement | null>(null);
	const winAudioRef = useRef<HTMLAudioElement | null>(null);

	// 効果音の初期化
	useEffect(() => {
		// 音声ファイルの安全な初期化
		const initAudio = () => {
			try {
				// ルーレット回転音（じゃらららら）
				spinAudioRef.current = new Audio('/sounds/spin.mp3');
				spinAudioRef.current.loop = true;
				spinAudioRef.current.volume = 0.3;
				
				// エラーイベントのハンドリング
				spinAudioRef.current.addEventListener('error', () => {
					console.log('ルーレット音声ファイルが見つかりません');
					spinAudioRef.current = null;
				});
			} catch (error) {
				console.log('ルーレット音声の初期化に失敗:', error);
				spinAudioRef.current = null;
			}

			try {
				// 当選音
				winAudioRef.current = new Audio('/sounds/win.mp3');
				winAudioRef.current.volume = 0.5;
				
				// エラーイベントのハンドリング
				winAudioRef.current.addEventListener('error', () => {
					console.log('当選音声ファイルが見つかりません');
					winAudioRef.current = null;
				});
			} catch (error) {
				console.log('当選音声の初期化に失敗:', error);
				winAudioRef.current = null;
			}
		};

		initAudio();

		// クリーンアップ
		return () => {
			if (spinAudioRef.current) {
				spinAudioRef.current.pause();
				spinAudioRef.current = null;
			}
			if (winAudioRef.current) {
				winAudioRef.current.pause();
				winAudioRef.current = null;
			}
		};
	}, []);

	const categories = useMemo(() => [
		{ value: "all", label: "全カテゴリ" },
		{ value: "toys", label: "おもちゃ" },
		{ value: "grocery", label: "食品・飲料" },
		{ value: "household", label: "日用品" },
		{ value: "electronics", label: "家電" },
		{ value: "books", label: "書籍" },
		{ value: "beauty", label: "コスメ" },
	], []);

	// 初期商品読み込み
	useEffect(() => {
		const loadInitialItems = async () => {
			try {
				const params = new URLSearchParams({
					minPrice: '1',
					maxPrice: '10000',
					category: 'all',
					excludeAdult: 'true',
					limit: '50'
				});

				const response = await fetch(`/api/random-items?${params}`);
				if (!response.ok) throw new Error('商品の取得に失敗しました');

				const data = await response.json();
				console.log('Loaded items:', data.items.length);
				setItems(data.items);
			} catch (error) {
				console.error('Initial load error:', error);
				setErrorMessage('初期商品の読み込みに失敗しました。');
			}
		};

		loadInitialItems();
	}, []);

	// フィルター更新イベントのリスナー
	useEffect(() => {
		const handleFilterUpdate = (event: CustomEvent) => {
			const { minPrice, maxPrice, category, excludeAdult } = event.detail;
			setCurrentFilters({ minPrice, maxPrice, category, excludeAdult });
			fetchItems(minPrice, maxPrice, category, excludeAdult);
		};

		window.addEventListener('filterUpdate', handleFilterUpdate as EventListener);
		return () => {
			window.removeEventListener('filterUpdate', handleFilterUpdate as EventListener);
		};
	}, []);

	// 商品データ取得
	const fetchItems = async (minPrice?: number, maxPrice?: number, category?: string, excludeAdult?: boolean) => {
		setIsLoading(true);
		setErrorMessage("");

		try {
			const params = new URLSearchParams();
			if (minPrice) params.append('minPrice', minPrice.toString());
			if (maxPrice) params.append('maxPrice', maxPrice.toString());
			if (category) params.append('category', category);
			if (excludeAdult) params.append('excludeAdult', excludeAdult.toString());
			params.append('limit', '50');

			const response = await fetch(`/api/random-items?${params}`);
			if (!response.ok) throw new Error('商品の取得に失敗しました');

			const data = await response.json();
			setItems(data.items);
		} catch (error) {
			console.error('Fetch error:', error);
			setErrorMessage('商品の取得に失敗しました。もう一度お試しください。');
		} finally {
			setIsLoading(false);
		}
	};

	// ルーレット開始
	const handleSpin = async () => {
		if (items.length === 0) {
			setErrorMessage('商品がありません。条件を変更してお試しください。');
			return;
		}

		setHasStarted(true);
		setIsSpinning(true);
		setErrorMessage("");
		setSelectedIndex(-1);

		try {
			// ルーレット回転音を開始
			if (spinAudioRef.current) {
				try {
					spinAudioRef.current.currentTime = 0;
					spinAudioRef.current.play().catch(() => {
						console.log('音声再生がブロックされました（ユーザー操作が必要）');
					});
				} catch (error) {
					console.log('音声再生エラー:', error);
				}
			}

			const data = { items };
			const pick = Math.floor(Math.random() * data.items.length);

			// カード切り替えの回数（20〜30回）
			const totalSwitches = 20 + Math.floor(Math.random() * 11);
			let currentSwitch = 0;

			// ワンテンポ遅れてから開始
			await new Promise(resolve => setTimeout(resolve, 500));

			// カードをバババババと切り替える
			const switchInterval = setInterval(() => {
				currentSwitch++;
				
				// ランダムなカードを表示（最後の数回は当選商品に近づける）
				let displayIndex;
				if (currentSwitch > totalSwitches - 5) {
					// 最後の5回は当選商品の周辺を表示
					const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
					displayIndex = Math.max(0, Math.min(data.items.length - 1, pick + variation));
				} else {
					// それ以外はランダム
					displayIndex = Math.floor(Math.random() * data.items.length);
				}
				
				setCurrentDisplayIndex(displayIndex);

				// 最後の切り替えで当選商品を表示
				if (currentSwitch >= totalSwitches) {
					clearInterval(switchInterval);
					setCurrentDisplayIndex(pick);
					setSelectedIndex(pick);
					setIsSpinning(false);

					// ルーレット回転音を停止
					if (spinAudioRef.current) {
						spinAudioRef.current.pause();
						spinAudioRef.current.currentTime = 0;
					}

					// 当選音を再生
					if (winAudioRef.current) {
						try {
							winAudioRef.current.currentTime = 0;
							winAudioRef.current.play().catch(() => {
								console.log('当選音の再生がブロックされました');
							});
						} catch (error) {
							console.log('当選音再生エラー:', error);
						}
					}
				}
			}, 100); // 100ms間隔で切り替え

		} catch (error) {
			console.error("Spin error:", error);
			setErrorMessage('ルーレットの実行中にエラーが発生しました。');
			setIsSpinning(false);

			// エラー時も音を停止
			if (spinAudioRef.current) {
				try {
					spinAudioRef.current.pause();
					spinAudioRef.current.currentTime = 0;
				} catch (error) {
					console.log('エラー時の音声停止に失敗:', error);
				}
			}
		}
	};

	// リセット
	const handleReset = () => {
		setHasStarted(false);
		setSelectedIndex(-1);
		setErrorMessage("");
		setIsSpinning(false);
		setCurrentDisplayIndex(0);

		// 音を停止
		if (spinAudioRef.current) {
			try {
				spinAudioRef.current.pause();
				spinAudioRef.current.currentTime = 0;
			} catch (error) {
				console.log('ルーレット音停止エラー:', error);
			}
		}
		if (winAudioRef.current) {
			try {
				winAudioRef.current.pause();
				winAudioRef.current.currentTime = 0;
			} catch (error) {
				console.log('当選音停止エラー:', error);
			}
		}

		// 初期商品を再読み込み
		const loadInitialItems = async () => {
			try {
				const params = new URLSearchParams({
					minPrice: '1',
					maxPrice: '10000',
					category: 'all',
					excludeAdult: 'true',
					limit: '50'
				});

				const response = await fetch(`/api/random-items?${params}`);
				if (!response.ok) throw new Error('商品の取得に失敗しました');

				const data = await response.json();
				setItems(data.items);
			} catch (error) {
				console.error('Reset load error:', error);
				setErrorMessage('商品の再読み込みに失敗しました。');
			}
		};

		loadInitialItems();
	};

	// 現在表示中の商品
	const currentItem = items[currentDisplayIndex];

	return (
		<main className="min-h-screen bg-gray-100">
			{/* メインコンテンツ */}
			<div className={`w-full ${hasStarted ? 'py-4 pb-24' : 'py-12 pb-24'}`}>
				<div className={`${hasStarted ? 'w-full' : 'max-w-6xl mx-auto px-6'}`}>
					{/* 使い方説明 - ルーレット開始後は非表示 */}
					{!hasStarted && (
						<div className="text-center mb-6">
							<h3 className="text-lg font-semibold text-black mb-2">🎯 使い方</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								1. 左上の「条件で探す」から価格やカテゴリを設定<br/>
								2. 「ルーレット開始」ボタンをクリック<br/>
								3. 最後に表示された商品を購入してください！
							</p>
						</div>
					)}

					{/* ルーレット開始ボタン */}
					<div className={`text-center ${hasStarted ? 'mb-4' : 'mb-8'}`}>
						<div className="flex justify-center gap-4">
							<button
								onClick={handleSpin}
								disabled={isSpinning || items.length === 0}
								className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
									isSpinning || items.length === 0
										? 'bg-gray-300 text-gray-500 cursor-not-allowed'
										: 'bg-gradient-to-r from-[#FFA41C] to-[#FF9900] hover:from-[#FF9900] hover:to-[#FF8C00] text-white shadow-lg hover:shadow-xl transform hover:scale-105'
								}`}
							>
								{isSpinning ? "🎲 抽選中..." : "🎰 ルーレット開始"}
							</button>
							{hasStarted && (
								<button
									onClick={handleReset}
									disabled={isSpinning}
									className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
										isSpinning
											? 'bg-gray-300 text-gray-500 cursor-not-allowed'
											: 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg hover:shadow-xl'
									}`}
								>
									リセット
								</button>
							)}
						</div>
					</div>

					{/* 商品ティッカー - ルーレット開始前のみ表示 */}
					{!hasStarted && (
						<div className="mb-8">
							<ProductTicker />
						</div>
					)}

					{/* 抽選条件表示 - ルーレット開始後のみ表示 */}
					{hasStarted && (
						<div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
							<h3 className="text-sm font-semibold text-blue-800 mb-2">🎯 抽選条件</h3>
							<div className="flex flex-wrap gap-3 text-sm text-blue-700">
								<span className="bg-blue-100 px-2 py-1 rounded">
									💰 価格: ¥{currentFilters.minPrice.toLocaleString()} ～ ¥{currentFilters.maxPrice.toLocaleString()}
								</span>
								<span className="bg-blue-100 px-2 py-1 rounded">
									📂 カテゴリ: {categories.find(cat => cat.value === currentFilters.category)?.label || '全カテゴリ'}
								</span>
								{currentFilters.excludeAdult && (
									<span className="bg-blue-100 px-2 py-1 rounded">
										🔒 成人向け除外
									</span>
								)}
							</div>
						</div>
					)}

					{/* エラーメッセージ */}
					{errorMessage && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{errorMessage}
						</div>
					)}

					{/* ルーレット結果表示 */}
					{hasStarted && (
						<div className="w-full flex justify-center">
							<div className="w-full max-w-4xl">
								{/* 中央固定型ルーレット */}
								<div className="relative bg-gray-100 rounded-xl p-6">
									<div className="flex items-center justify-center mb-6">
										<h2 className="text-2xl font-bold text-[#131921]">
											{isSpinning ? "🎲 抽選中..." : "🎯 当選商品"}
										</h2>
									</div>
									
									{/* カード表示エリア */}
									<div className="flex items-center justify-center">
																					{currentItem ? (
											<div className="w-[300px] h-[320px] flex items-center justify-center">
												<div 
													className={`bg-white rounded-xl shadow-lg border-2 p-3 w-full h-full transition-all duration-300 ${
														!isSpinning && selectedIndex === currentDisplayIndex
															? "border-[#FF9900] shadow-2xl scale-105 ring-4 ring-[#FF9900]/30" 
															: "border-gray-200"
													}`}
												>
													<div className="relative mb-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex items-center justify-center" style={{ height: '55%' }}>
														{currentItem.image ? (
															<>
																{/* eslint-disable @next/next/no-img-element */}
																<img 
																	src={currentItem.image} 
																	alt={currentItem.title} 
																	className="object-contain w-full h-full p-2" 
																	onError={(e) => {
																		const target = e.target as HTMLImageElement;
																		target.style.display = 'none';
																		target.nextElementSibling?.classList.remove('hidden');
																	}}
																/>
																<div className="hidden absolute inset-0 flex items-center justify-center text-xs text-gray-500 bg-gray-50">
																	<div className="text-center">
																		<div className="text-2xl mb-1">📦</div>
																		<div>商品画像</div>
																	</div>
																</div>
															</>
														) : (
															<div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
																<div className="text-center">
																	<div className="text-2xl mb-1">📦</div>
																	<div>商品画像</div>
																</div>
															</div>
														)}
													</div>
													<div className="text-sm font-bold line-clamp-3 min-h-[2rem] mb-1 text-[#131921]">{currentItem.title}</div>
													{currentItem.price && <div className="text-xl font-bold text-[#B12704] mb-2">¥{currentItem.price.toLocaleString()}</div>}
													{!isSpinning && selectedIndex === currentDisplayIndex && currentItem.link && (
														<a
															href={currentItem.link}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-block w-full bg-[#FFA41C] hover:bg-[#FF9900] text-black text-center rounded-md px-3 py-1.5 font-semibold text-sm"
														>
															商品ページへ
														</a>
													)}
												</div>
											</div>
										) : (
											<div className="text-center text-gray-500">
												<div className="text-4xl mb-4">🎲</div>
												<div>ルーレット開始ボタンを押してください</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* フッター */}
			<footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 z-50">
				<div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-600">
					当サイトは Amazonアソシエイトを利用しています。表示価格・在庫は遷移先をご確認ください。
				</div>
			</footer>
		</main>
	);
}

