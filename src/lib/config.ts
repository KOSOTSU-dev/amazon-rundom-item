// アプリケーション設定
export const config = {
	// Amazon Associate Tag
	// 環境変数から取得、未設定の場合はデフォルト値を使用
	// 本番環境では必ず環境変数を設定してください
	amazonAssociateTag: process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || 'default-associate-tag',
	
	// その他の設定
	maxItemsPerRequest: 50,
	defaultMinPrice: 1,
	defaultMaxPrice: 10000,
}; 