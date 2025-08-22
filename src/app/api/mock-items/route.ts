import { NextRequest } from "next/server";

function generateMockItems(limit: number) {
	const samples = [
		{
			asin: "B0MOCK001",
			title: "サンプルお菓子セット",
			image: "https://picsum.photos/seed/candy/400",
			price: 598,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK002",
			title: "USB-C 急速充電器 20W",
			image: "https://picsum.photos/seed/charger/400",
			price: 1299,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK003",
			title: "パーティゲームカード 罰ゲーム付き",
			image: "https://picsum.photos/seed/cards/400",
			price: 980,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK004",
			title: "入浴剤 詰め合わせ 12個",
			image: "https://picsum.photos/seed/bath/400",
			price: 850,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK005",
			title: "おもしろ雑貨 ストレス解消",
			image: "https://picsum.photos/seed/gag/400",
			price: 1350,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK006",
			title: "ミニ懐中電灯 防水",
			image: "https://picsum.photos/seed/flash/400",
			price: 799,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK007",
			title: "トートバッグ シンプル",
			image: "https://picsum.photos/seed/bag/400",
			price: 1580,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK008",
			title: "ステンレスマグ 350ml",
			image: "https://picsum.photos/seed/mug/400",
			price: 1199,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK009",
			title: "コースター 4枚セット",
			image: "https://picsum.photos/seed/coaster/400",
			price: 680,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK010",
			title: "メモ帳 方眼 A6",
			image: "https://picsum.photos/seed/memo/400",
			price: 399,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK011",
			title: "不織布マスク 30枚",
			image: "https://picsum.photos/seed/mask/400",
			price: 550,
			link: "https://www.amazon.co.jp/",
		},
		{
			asin: "B0MOCK012",
			title: "ボールペン 5本セット",
			image: "https://picsum.photos/seed/pen/400",
			price: 320,
			link: "https://www.amazon.co.jp/",
		},
	];
	const results = Array.from({ length: limit }, (_, i) => samples[i % samples.length]);
	return results.sort(() => Math.random() - 0.5);
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const limit = Math.min(parseInt(searchParams.get("limit") || "12", 10), 20);
	return new Response(JSON.stringify({ items: generateMockItems(limit) }), {
		headers: { "content-type": "application/json" },
	});
} 