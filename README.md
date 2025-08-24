# Amazon Roulette

Amazon 商品のランダム抽選アプリケーションです。価格やカテゴリで条件を絞って商品をランダムに表示し、ルーレット形式で抽選できます。

## 機能

- 🎰 ルーレット形式の商品抽選
- 🔍 価格・カテゴリ・成人向け除外の条件設定
- 🎵 効果音付きの抽選アニメーション
- 📱 レスポンシブデザイン
- 🛒 Amazon 商品ページへの直接リンク

## 技術スタック

- **フレームワーク**: Next.js 14
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **音声**: Web Audio API

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の内容を追加してください：

```env
# Amazon Associate Tag
# 本番環境では実際のAmazon Associate Tagを設定してください
# 開発時は任意の値で構いません
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=your-amazon-associate-tag-here

# 環境設定
NODE_ENV=development
```

**重要**:

- Amazon Associate Tag は本番環境での収益化に必要です
- 開発時は任意の値で構いません
- `.env.local` ファイルは `.gitignore` に含まれているため、Git にコミットされません
- 本番環境では必ず実際の Amazon Associate Tag を設定してください

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 使用方法

1. **条件設定**: 上部の「条件で探す」ボタンから価格範囲やカテゴリを設定
2. **ルーレット開始**: 「🎰 ルーレット開始」ボタンをクリック
3. **抽選**: カードがバババババと切り替わり、最後に表示された商品が当選
4. **商品確認**: 「商品ページへ」ボタンで Amazon 商品ページに移動

## セキュリティ

- **Amazon Associate Tag**: 環境変数 `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` で管理
- **商品データ**: 公開情報のみ使用（Amazon 商品ページの公開データ）
- **機密情報**: API キーやパスワードは含まれていません
- **環境変数**: `.env.local` ファイルは `.gitignore` で除外され、Git にコミットされません
- **本番環境**: 必ず実際の Amazon Associate Tag を環境変数で設定してください

## ライセンス

MIT License

## 注意事項

- このアプリケーションは Amazon の商品データを使用しています
- Amazon Associate Program の利用規約に従ってご利用ください
- 商品の価格や在庫状況は変更される可能性があります
