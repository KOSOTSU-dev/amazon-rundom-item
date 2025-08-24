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
		title: "スーパーマリオ ALL STAR COLLECTION ガボン ぬいぐるみ",
		image: "https://m.media-amazon.com/images/I/613WB83fojL._AC_SX679_.jpg",
		price: 598,
		link: "https://amzn.to/4lJcF7w",
		category: "toys",
		isAdult: false,
	},
	{
		asin: "B07DGR98VQ",
		title: "シルバニアファミリー 人形 ヒツジの赤ちゃん",
		image: "https://m.media-amazon.com/images/I/71qz-QY27DL._AC_SY300_SX300_QL70_ML2_.jpg",
		price: 2980,
		link: "https://amzn.to/4lFooDW",
		category: "toys",
		isAdult: false,
	},
	{
		asin: "B01N5IB20Q",
		title: "EMOPET Aibi ポケットペット AIコンパニオンロボット",
		image: "https://m.media-amazon.com/images/I/51fzK1P0YsL._AC_SY300_SX300_QL70_ML2_.jpg",
		price: 2980,
		link: "https://amzn.to/3JKZTrw",
		category: "toys",
		isAdult: false,
	},

	// 食品・飲料
	{
		asin: "B00FZKR6XQ",
		title: "ミネラルストロング 伊藤園 ラベルレス 強炭酸水 500ml×24本",
		image: "https://m.media-amazon.com/images/I/71Ml6js+1HL._AC_SY300_SX300_QL70_ML2_.jpg",
		price: 298,
		link: "https://amzn.to/45M3gFZ",
		category: "grocery",
		isAdult: false,
	},
	{
		asin: "B01N5IB20R",
		title: "伊良コーラ クラフトコーラ 瓶 200ml/6本",
		image: "https://m.media-amazon.com/images/I/71I3Vz6qWSL._AC_SX300_SY300_QL70_ML2_.jpg",
		price: 1580,
		link: "https://amzn.to/4oNCm9p",
		category: "grocery",
		isAdult: false,
	},
	{
		asin: "B07DGR98VR",
		title: "昆虫食 ウジ虫 食用 乾燥 65匹程度",
		image: "https://m.media-amazon.com/images/I/71Dp4+FGMHL._AC_SY300_SX300_QL70_ML2_.jpg",
		price: 680,
		link: "https://amzn.to/47IjVgk",
		category: "grocery",
		isAdult: false,
	},

	// 日用品
	{
		asin: "B08N5WRWNX",
		title: "ゴキブリ駆除 ゴキ滅多打ち 1箱(12個入り)",
		image: "https://m.media-amazon.com/images/I/81wn+cpmTuL._SX522_.jpg",
		price: 850,
		link: "https://amzn.to/45HO4da",
		category: "household",
		isAdult: false,
	},
	{
		asin: "B07DGR98VS",
		title: "by Amazon ごみ袋 半透明 シャカシャカタイプ 45L 200枚",
		image: "https://m.media-amazon.com/images/I/71JLcf-yIsL._AC_SX300_SY300_QL70_ML2_.jpg",
		price: 598,
		link: "https://amzn.to/45Ild8t",
		category: "household",
		isAdult: false,
	},
	{
		asin: "B01N5IB20S",
		title: "アリエール 洗濯洗剤 ジェルボール プロ 部屋干し×鉄壁バリア 100個",
		image: "https://m.media-amazon.com/images/I/81KORX9RDDL._AC_SX679_.jpg",
		price: 398,
		link: "https://amzn.to/475yxWV",
		category: "household",
		isAdult: false,
	},

	// 家電
	{
		asin: "B08N5WRWNY",
		title: "トランシーバー 無線機 免許不要 特定小電力 充電式 2台セット",
		image: "https://m.media-amazon.com/images/I/61VBgv8oSYL._AC_SX679_.jpg",
		price: 1299,
		link: "https://amzn.to/4n08Mfq",
		category: "electronics",
		isAdult: false,
	},
	{
		asin: "B07DGR98VT",
		title: "Apple AirTag",
		image: "https://m.media-amazon.com/images/I/71PvOS6LRnL._AC_SX342_SY445_QL70_ML2_.jpg",
		price: 29800,
		link: "https://amzn.to/3UItaWb",
		category: "electronics",
		isAdult: false,
	},
	{
		asin: "B01N5IB20T",
		title: "スマートリング 健康管理 Android/Iphone対応 睡眠管理",
		image: "https://m.media-amazon.com/images/I/61g-U3FSI7L._AC_SY300_SX300_QL70_ML2_.jpg",
		price: 45800,
		link: "https://amzn.to/4mPreHw",
		category: "electronics",
		isAdult: false,
	},

	// 書籍
	{
		asin: "B08N5WRWNZ",
		title: "世界一わかりやすい 筋肉のつながり図鑑セルフケア編",
		image: "https://m.media-amazon.com/images/I/51Zp3y-lEVL._SY445_SX342_ControlCacheEqualizer_.jpg",
		price: 680,
		link: "https://amzn.to/45z0ViY",
		category: "books",
		isAdult: false,
	},
	{
		asin: "B07DGR98VU",
		title: "Tarzan特別編集 痩せる生活 増補版",
		image: "https://m.media-amazon.com/images/I/41LaBr7+x0L._SY445_SX342_ControlCacheEqualizer_.jpg",
		price: 980,
		link: "https://amzn.to/4fSdx8j",
		category: "books",
		isAdult: false,
	},
	{
		asin: "B01N5IB20U",
		title: "TNM悪性腫瘍の分類 第8版 日本語版",
		image: "https://m.media-amazon.com/images/I/71uLt+-6ARL._SY522_.jpg",
		price: 580,
		link: "https://amzn.to/3VfOQcp",
		category: "books",
		isAdult: false,
	},

	// コスメ
	{
		asin: "B08N5WRWO0",
		title: "キュレル エイジングケア 化粧水140ml",
		image: "https://m.media-amazon.com/images/I/614VvV63srL._AC_SY300_SX300_QL70_ML2_.jpg",
		price: 15800,
		link: "https://amzn.to/4fMGzWU",
		category: "beauty",
		isAdult: false,
	},
	{
		asin: "B07DGR98VV",
		title: "デオナチュレ 男さっぱりパウダー 男性用 制汗パウダー 25g",
		image: "https://m.media-amazon.com/images/I/71AFQwD1cLL._AC_SY300_SX300_QL70_ML2_.jpg",
		price: 680,
		link: "https://amzn.to/45ubunw",
		category: "beauty",
		isAdult: false,
	},
	{
		asin: "B01N5IB20V",
		title: "GIVENCHY ジバンシイ ローズ・パーフェクト・リキッド リップバーム",
		image: "https://m.media-amazon.com/images/I/51+X7wTMsTL._AC_SX679_.jpg",
		price: 580,
		link: "https://amzn.to/47a5GRp",
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