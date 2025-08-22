import { NextRequest } from "next/server";
import { filterProducts, getRandomProducts } from "@/lib/products";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		
		// クエリパラメータを取得
		const minPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!, 10) : undefined;
		const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!, 10) : undefined;
		const category = searchParams.get("category") || undefined;
		const excludeAdult = searchParams.get("excludeAdult") !== "false"; // デフォルトtrue
		const limit = Math.min(parseInt(searchParams.get("limit") || "12", 10), 20);

		// 商品をフィルタリング
		const filteredProducts = filterProducts({
			minPrice,
			maxPrice,
			category,
			excludeAdult,
		});

		// フィルタ結果が0件の場合
		if (filteredProducts.length === 0) {
			return new Response(
				JSON.stringify({
					error: "条件に一致する商品が見つかりませんでした。条件を変更してお試しください。",
					items: [],
				}),
				{
					status: 200,
					headers: { "content-type": "application/json" },
				}
			);
		}

		// ランダム商品を取得
		const randomItems = getRandomProducts(filteredProducts, limit);

		return new Response(
			JSON.stringify({
				items: randomItems,
				total: filteredProducts.length,
				filtered: filteredProducts.length,
			}),
			{
				headers: { "content-type": "application/json" },
			}
		);
	} catch (error) {
		console.error("API Error:", error);
		return new Response(
			JSON.stringify({
				error: "サーバーエラーが発生しました。時間を置いて再度お試しください。",
				items: [],
			}),
			{
				status: 500,
				headers: { "content-type": "application/json" },
			}
		);
	}
} 