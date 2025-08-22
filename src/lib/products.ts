export interface Product {
	asin: string;
	title: string;
	image: string;
	price: number;
	link: string;
	category: string;
	isAdult: boolean;
}

// 商品データベース（手動管理）
export const products: Product[] = [
	// おもちゃ
	{
		asin: "B08N5WRWNW",
		title: "UNO カードゲーム",
		image: "https://picsum.photos/seed/uno/400",
		price: 598,
		link: "https://www.amazon.co.jp/dp/B08N5WRWNW?tag=kosotsu0c-22",
		category: "toys",
		isAdult: false,
	},
	{
		asin: "B07DGR98VQ",
		title: "人生ゲーム 最新版",
		image: "https://picsum.photos/seed/life/400",
		price: 2980,
		link: "https://www.amazon.co.jp/dp/B07DGR98VQ?tag=kosotsu0c-22",
		category: "toys",
		isAdult: false,
	},
	{
		asin: "B01N5IB20Q",
		title: "パーティゲーム 罰ゲームカード",
		image: "https://picsum.photos/seed/party/400",
		price: 980,
		link: "https://www.amazon.co.jp/dp/B01N5IB20Q?tag=kosotsu0c-22",
		category: "toys",
		isAdult: false,
	},

	// 食品・飲料
	{
		asin: "B00FZKR6XQ",
		title: "明治 チョコレート アソート",
		image: "https://picsum.photos/seed/chocolate/400",
		price: 298,
		link: "https://www.amazon.co.jp/dp/B00FZKR6XQ?tag=kosotsu0c-22",
		category: "grocery",
		isAdult: false,
	},
	{
		asin: "B01N5IB20Q",
		title: "お菓子セット 詰め合わせ",
		image: "https://picsum.photos/seed/snacks/400",
		price: 850,
		link: "https://www.amazon.co.jp/dp/B01N5IB20Q?tag=kosotsu0c-22",
		category: "grocery",
		isAdult: false,
	},
	{
		asin: "B07DGR98VQ",
		title: "お茶 緑茶 ティーバッグ",
		image: "https://picsum.photos/seed/tea/400",
		price: 680,
		link: "https://www.amazon.co.jp/dp/B07DGR98VQ?tag=kosotsu0c-22",
		category: "grocery",
		isAdult: false,
	},

	// 日用品
	{
		asin: "B08N5WRWNW",
		title: "入浴剤 詰め合わせ 12個",
		image: "https://picsum.photos/seed/bath/400",
		price: 850,
		link: "https://www.amazon.co.jp/dp/B08N5WRWNW?tag=kosotsu0c-22",
		category: "household",
		isAdult: false,
	},
	{
		asin: "B07DGR98VQ",
		title: "洗剤 詰め替え用",
		image: "https://picsum.photos/seed/detergent/400",
		price: 598,
		link: "https://www.amazon.co.jp/dp/B07DGR98VQ?tag=kosotsu0c-22",
		category: "household",
		isAdult: false,
	},
	{
		asin: "B01N5IB20Q",
		title: "トイレットペーパー 12ロール",
		image: "https://picsum.photos/seed/toilet/400",
		price: 398,
		link: "https://www.amazon.co.jp/dp/B01N5IB20Q?tag=kosotsu0c-22",
		category: "household",
		isAdult: false,
	},

	// 家電
	{
		asin: "B08N5WRWNW",
		title: "USB-C 急速充電器 20W",
		image: "https://picsum.photos/seed/charger/400",
		price: 1299,
		link: "https://www.amazon.co.jp/dp/B08N5WRWNW?tag=kosotsu0c-22",
		category: "electronics",
		isAdult: false,
	},
	{
		asin: "B07DGR98VQ",
		title: "ワイヤレスイヤホン",
		image: "https://picsum.photos/seed/earphone/400",
		price: 2980,
		link: "https://www.amazon.co.jp/dp/B07DGR98VQ?tag=kosotsu0c-22",
		category: "electronics",
		isAdult: false,
	},
	{
		asin: "B01N5IB20Q",
		title: "ミニ扇風機 卓上",
		image: "https://picsum.photos/seed/fan/400",
		price: 1580,
		link: "https://www.amazon.co.jp/dp/B01N5IB20Q?tag=kosotsu0c-22",
		category: "electronics",
		isAdult: false,
	},

	// 書籍
	{
		asin: "B08N5WRWNW",
		title: "小説 ベストセラー",
		image: "https://picsum.photos/seed/book1/400",
		price: 680,
		link: "https://www.amazon.co.jp/dp/B08N5WRWNW?tag=kosotsu0c-22",
		category: "books",
		isAdult: false,
	},
	{
		asin: "B07DGR98VQ",
		title: "料理レシピ本",
		image: "https://picsum.photos/seed/cookbook/400",
		price: 980,
		link: "https://www.amazon.co.jp/dp/B07DGR98VQ?tag=kosotsu0c-22",
		category: "books",
		isAdult: false,
	},
	{
		asin: "B01N5IB20Q",
		title: "自己啓発本",
		image: "https://picsum.photos/seed/selfhelp/400",
		price: 580,
		link: "https://www.amazon.co.jp/dp/B01N5IB20Q?tag=kosotsu0c-22",
		category: "books",
		isAdult: false,
	},

	// コスメ
	{
		asin: "B08N5WRWNW",
		title: "化粧水 保湿",
		image: "https://picsum.photos/seed/lotion/400",
		price: 980,
		link: "https://www.amazon.co.jp/dp/B08N5WRWNW?tag=kosotsu0c-22",
		category: "beauty",
		isAdult: false,
	},
	{
		asin: "B07DGR98VQ",
		title: "リップクリーム 3本セット",
		image: "https://picsum.photos/seed/lip/400",
		price: 680,
		link: "https://www.amazon.co.jp/dp/B07DGR98VQ?tag=kosotsu0c-22",
		category: "beauty",
		isAdult: false,
	},
	{
		asin: "B01N5IB20Q",
		title: "マスクパック 5枚",
		image: "https://picsum.photos/seed/mask/400",
		price: 580,
		link: "https://www.amazon.co.jp/dp/B01N5IB20Q?tag=kosotsu0c-22",
		category: "beauty",
		isAdult: false,
	},
];

// 商品フィルタリング関数
export function filterProducts(params: {
	minPrice?: number;
	maxPrice?: number;
	category?: string;
	excludeAdult?: boolean;
}): Product[] {
	return products.filter((product) => {
		// 価格フィルター
		if (params.minPrice && product.price < params.minPrice) return false;
		if (params.maxPrice && product.price > params.maxPrice) return false;

		// カテゴリフィルター
		if (params.category && params.category !== "all" && product.category !== params.category) return false;

		// 成人向け除外
		if (params.excludeAdult && product.isAdult) return false;

		return true;
	});
}

// ランダム商品取得関数
export function getRandomProducts(filteredProducts: Product[], limit: number): Product[] {
	const shuffled = [...filteredProducts].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, Math.min(limit, shuffled.length));
} 