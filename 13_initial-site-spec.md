# 初期サイト仕様

## サービス名
Candy Monster

## サービス表記
新米ママのための、AI × 育児コミュニティ

## 初期リリースの目的
情報メディア + 「試してみる」行動支援 + Discordコミュニティ導線を最小構成で成立させます。

サイト内AIチャットは初期リリースに含めません。

## 初期ページ

1. トップページ
2. カテゴリーページ
3. 年齢別ページ
4. 記事ページ
5. AI活用ガイド一覧
6. ログイン / 新規登録
7. マイページ
8. タスク一覧・詳細
9. Candy Monsterについて
10. Discordコミュニティ案内
11. 運営者情報
12. 利用規約 / プライバシー / 免責

## 主要カテゴリー
- 睡眠・生活リズム
- ごはん
- 遊び・知育
- ことば・関わり方
- 家事・時短・両立
- AI活用ガイド

## 年齢
- 0〜6か月
- 7〜12か月
- 1〜2歳
- 3〜4歳
- 5〜6歳

## 記事タイプ
- 悩み解決記事
- 試してみる記事
- AI活用記事
- 年齢別ガイド
- 体験談・みんなの声
- 基礎知識・安心ガイド

## MVP主要機能

### 記事閲覧
- カテゴリー
- 記事タイプ
- 対象年齢
- 更新日
- この記事で分かること
- 本文
- 試してみる
- AIプロンプトコピー
- 関連記事
- Discord CTA

### 会員機能
- 新規登録
- ログイン / ログアウト
- マイページ

認証方式は実装技術に合わせて選定。

### 「試してみる」
- 記事内のアドバイス単位で保存
- マイページに一覧表示
- 状態変更

状態：
- あとで試す
- 試している
- できた
- 合わなかった

### マイページ
初期表示：

1. 今試していること
2. あとで試す
3. できたこと
4. 合わなかったこと
5. おすすめ記事
6. Discord相談導線

### AI機能
初期は以下のみ：
- プロンプト表示
- ワンクリックコピー

実装しない：
- サイト内AIチャット
- AIによる医療・発達判定
- ユーザー情報を自動でAI送信する機能

## コンテンツモデル案

### Article
```ts
Article {
  id: string
  slug: string
  title: string
  excerpt: string
  body: richtext
  categoryId: string
  articleType: string
  ageGroups: string[]
  publishedAt: datetime
  updatedAt: datetime
  status: 'draft' | 'published'
}
```

### Advice
```ts
Advice {
  id: string
  articleId: string
  title: string
  description: string
  ageGroups: string[]
  durationLabel?: string
  difficulty?: 'easy' | 'normal' | 'challenge'
  tips?: string
  sortOrder: number
}
```

### Prompt
```ts
Prompt {
  id: string
  articleId: string
  title: string
  description?: string
  promptText: string
  safetyNote?: string
}
```

### UserTask
```ts
UserTask {
  id: string
  userId: string
  adviceId: string
  status: 'saved' | 'trying' | 'done' | 'not_fit'
  note?: string
  createdAt: datetime
  updatedAt: datetime
  startedAt?: datetime
  completedAt?: datetime
}
```

## 初期ヘッダー
- ロゴ
- 悩みから探す
- カテゴリー
- 年齢から探す
- AI活用
- みんなの体験
- マイページ
- Discord CTA

モバイルはハンバーガー + マイページアイコンを検討。

## 検索機能
記事数が少ないMVPでは必須ではありません。

記事が30〜50本を超える段階で、サイト内検索を優先実装候補とします。

## フェーズ2候補
- サイト内AI相談
- ユーザープロフィール（子どもの年齢等）による推薦
- 「試してみる」のリマインド
- 体験談投稿
- Discord連携強化
- お気に入り
- 検索
- 通知

## 非機能要件
- モバイルファースト
- Core Web Vitalsを意識
- WCAGを意識したコントラスト・タップ領域
- 個人情報最小化
- 子どもの個人情報を不用意に収集しない
- アクセス解析・イベント計測対応
