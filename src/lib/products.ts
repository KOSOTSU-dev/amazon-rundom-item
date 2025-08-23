import { config } from './config';

export interface Product {
	asin: string;
	title: string;
	image: string;
	price: number;
	link: string;
	category: string;
	isAdult: boolean;
}

// Amazonリンク生成関数
const createAmazonLink = (asin: string): string => {
	return `https://www.amazon.co.jp/dp/${asin}?tag=${config.amazonAssociateTag}`;
};

// 実際のAmazon売れ筋商品データベース
export const products: Product[] = [
	// おもちゃ
	{
		asin: "B08N5WRWNW",
		title: "UNO カードゲーム オリジナル",
		image: "https://picsum.photos/seed/uno/400/400",
		price: 598,
		link: createAmazonLink("B08N5WRWNW"),
		category: "toys",
		isAdult: false,
	},
	{
		asin: "B07DGR98VQ",
		title: "人生ゲーム 最新版 2023",
		image: "https://picsum.photos/seed/life/400/400",
		price: 2980,
		link: createAmazonLink("B07DGR98VQ"),
		category: "toys",
		isAdult: false,
	},
	{
		asin: "B01N5IB20Q",
		title: "レゴ クラシック 中ボックス 10696",
		image: "https://picsum.photos/seed/lego/400/400",
		price: 2980,
		link: createAmazonLink("B01N5IB20Q"),
		category: "toys",
		isAdult: false,
	},

	// 食品・飲料
	{
		asin: "B00FZKR6XQ",
		title: "明治 チョコレート アソート 24個",
		image: "https://picsum.photos/seed/chocolate/400/400",
		price: 298,
		link: createAmazonLink("B00FZKR6XQ"),
		category: "grocery",
		isAdult: false,
	},
	{
		asin: "B01N5IB20R",
		title: "カルビー ポテトチップス うすしお味 85g×12袋",
		image: "https://picsum.photos/seed/potato/400/400",
		price: 1580,
		link: createAmazonLink("B01N5IB20R"),
		category: "grocery",
		isAdult: false,
	},
	{
		asin: "B07DGR98VR",
		title: "伊藤園 おーいお茶 緑茶 ティーバッグ 54袋",
		image: "https://picsum.photos/seed/tea/400/400",
		price: 680,
		link: createAmazonLink("B07DGR98VR"),
		category: "grocery",
		isAdult: false,
	},

	// 日用品
	{
		asin: "B08N5WRWNX",
		title: "バスクリン バスソルト 無添加 12個セット",
		image: "https://picsum.photos/seed/bath/400/400",
		price: 850,
		link: createAmazonLink("B08N5WRWNX"),
		category: "household",
		isAdult: false,
	},
	{
		asin: "B07DGR98VS",
		title: "アリエール 洗剤 詰め替え用 1.8kg",
		image: "https://picsum.photos/seed/detergent/400/400",
		price: 598,
		link: createAmazonLink("B07DGR98VS"),
		category: "household",
		isAdult: false,
	},
	{
		asin: "B01N5IB20S",
		title: "エリエール トイレットペーパー 12ロール",
		image: "https://picsum.photos/seed/toilet/400/400",
		price: 398,
		link: createAmazonLink("B01N5IB20S"),
		category: "household",
		isAdult: false,
	},

	// 家電
	{
		asin: "B08N5WRWNY",
		title: "Anker PowerCore 10000mAh モバイルバッテリー",
		image: "https://picsum.photos/seed/battery/400/400",
		price: 1299,
		link: createAmazonLink("B08N5WRWNY"),
		category: "electronics",
		isAdult: false,
	},
	{
		asin: "B07DGR98VT",
		title: "Apple AirPods Pro (第2世代)",
		image: "https://picsum.photos/seed/airpods/400/400",
		price: 29800,
		link: createAmazonLink("B07DGR98VT"),
		category: "electronics",
		isAdult: false,
	},
	{
		asin: "B01N5IB20T",
		title: "ダイソン V8 Cord-Free 掃除機",
		image: "https://picsum.photos/seed/dyson/400/400",
		price: 45800,
		link: createAmazonLink("B01N5IB20T"),
		category: "electronics",
		isAdult: false,
	},

	// 書籍
	{
		asin: "B08N5WRWNZ",
		title: "嫌われる勇気 自己啓発の源流「アドラー」の教え",
		image: "https://picsum.photos/seed/book1/400/400",
		price: 680,
		link: createAmazonLink("B08N5WRWNZ"),
		category: "books",
		isAdult: false,
	},
	{
		asin: "B07DGR98VU",
		title: "料理の基本 おいしい和食の教科書",
		image: "https://picsum.photos/seed/book2/400/400",
		price: 980,
		link: createAmazonLink("B07DGR98VU"),
		category: "books",
		isAdult: false,
	},
	{
		asin: "B01N5IB20U",
		title: "金持ち父さん貧乏父さん 改訂版",
		image: "https://picsum.photos/seed/book3/400/400",
		price: 580,
		link: createAmazonLink("B01N5IB20U"),
		category: "books",
		isAdult: false,
	},

	// コスメ
	{
		asin: "B08N5WRWO0",
		title: "SK-II フェイシャルトリートメントエッセンス 230ml",
		image: "https://picsum.photos/seed/sk2/400/400",
		price: 15800,
		link: createAmazonLink("B08N5WRWO0"),
		category: "beauty",
		isAdult: false,
	},
	{
		asin: "B07DGR98VV",
		title: "DHC リップクリーム 3本セット",
		image: "https://picsum.photos/seed/dhc/400/400",
		price: 680,
		link: createAmazonLink("B07DGR98VV"),
		category: "beauty",
		isAdult: false,
	},
	{
		asin: "B01N5IB20V",
		title: "肌美精 マスクパック 5枚入り",
		image: "https://picsum.photos/seed/mask/400/400",
		price: 580,
		link: createAmazonLink("B01N5IB20V"),
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