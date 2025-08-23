// アプリケーション設定
export const config = {
	// Amazon Associate Tag
	// 本番環境では環境変数から取得することを推奨
	amazonAssociateTag: process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || 'kosotsu0c-22',
	
	// その他の設定
	maxItemsPerRequest: 50,
	defaultMinPrice: 1,
	defaultMaxPrice: 10000,
}; 