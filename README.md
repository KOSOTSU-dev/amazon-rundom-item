# Amazon ランダム商品（条件付き）

条件付きで Amazon 商品をランダム表示するサイトです。罰ゲームやサプライズ用途に最適です。

## 機能

- **条件付き絞り込み**: 価格帯、カテゴリ、成人向け除外
- **ルーレット演出**: 商品がランダムに選択される演出
- **アソシエイトリンク**: Amazon アソシエイトプログラム対応
- **レスポンシブデザイン**: モバイル・デスクトップ対応

## 技術スタック

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Vercel (デプロイ)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 3. ビルド

```bash
npm run build
```

## デプロイ

### Vercel での公開

1. [Vercel](https://vercel.com) にアカウント作成・ログイン
2. GitHub リポジトリを連携
3. 自動デプロイが開始されます

### 環境変数

本番環境では以下の環境変数を設定してください：

```bash
# Amazonアソシエイト情報（後で設定）
PAAPI_ACCESS_KEY=your_access_key
PAAPI_SECRET_KEY=your_secret_key
PAAPI_PARTNER_TAG=your_partner_tag
PAAPI_MARKETPLACE=www.amazon.co.jp
```

## 商品データベース

現在は手動管理の商品データベースを使用しています：

- カテゴリ: おもちゃ、食品・飲料、日用品、家電、書籍、コスメ
- 価格帯: 298 円〜3,000 円
- 商品数: 18 商品

## 今後の改善予定

- [ ] PA-API v5 連携
- [ ] 商品データの自動更新
- [ ] より多くの商品カテゴリ
- [ ] 効果音・アニメーション強化

## ライセンス

MIT License

## 注意事項

- 当サイトは Amazon アソシエイト・プログラムの参加者です
- 表示価格・在庫は遷移先の Amazon ページでご確認ください
- 商品情報は定期的に更新されます
