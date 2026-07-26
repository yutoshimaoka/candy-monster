# DESIGN.md

Candy Monster のデザイントークン一覧です。
CSS では**直値を書かず、必ずここで定義した変数を参照**してください（CLAUDE.md の原則）。
一覧に無い値が必要になった場合は、**先にこのファイルへ追加してから**使います。

## 出典と決定方法

本案件は Figma データを使いません。トークンは `11_design-direction.md` の方向性を実値へ落としたものです。
同ファイル47行目「固定HEXは実装時に最終調整する」に基づき、色値はここで確定させています。

**配色はエディトリアル・ニュートラル（くすみ上品／おしゃれ系）** を採用（参考ビジュアルより）。
ウォームアイボリー地に、ブラッシュ／サンド／グレージュ／モーヴグレーのくすみ色を重ね、**チャコール（#2A2622）の文字**でまとめる。
質感は**細いヘアラインフレーム（1px）＋やわらかい影＋余白多め**。見出しは**明朝（Shippori Mincho）**でエディトリアルな品を出す。
`11_design-direction.md` の「今っぽい・洗練」を、ミニマルで上質なファッション誌的トーンで具体化している。

---

## 基準ビューポート

`clamp()` の `vw` 換算はこの値を前提に算出する。

- SP 基準幅：375px
- PC 基準幅：1440px
- 主要ブレークポイント：768px（`48em`）／ 1024px（`64em`）

メディアクエリのブレークポイントは `em` で書く（ブラウザのズーム・文字サイズ変更に追従させるため）。

---

## カラー

### アクセシビリティ方針

- 本文・UIラベルは **WCAG 2.1 AA（4.5:1）** を満たす（全ペア実測済み。`npm run check:contrast`）
- 配色は**文字をチャコール（#2A2622）に統一**し、くすみニュアンス面の上で高コントラストを得る（チャコール×くすみ色は 5〜15:1）
- 白文字を使うのは CTA / Discord のチャコール面のみ（15.8:1）
- 情報を色だけで伝えない（アイコン・ラベル文言を併用する）

実装は `styles/base.css` の `:root` が正本です。ここは対応表として同じ値を記載します。
色を変えるときは `tools/check-contrast.mjs`（`npm run check:contrast`）で AA を再検証すること。

```css
:root {
  /* ---- ベース ---- */
  --color-bg-base: #f5efe7;     /* ウォームアイボリー地：ページ全体 */
  --color-bg-subtle: #ebdcd4;   /* ブラッシュ／ヌード：セクションの塗り分け */
  --color-bg-surface: #ffffff;  /* カード面 */
  --color-bg-header: rgb(245 239 231 / 90%); /* bg-base の半透明。ヘッダーのブラー地 */

  /* ---- テキスト（チャコール基調） ---- */
  --color-text-primary: #2a2622;   /* 地に対して 13.1:1 */
  --color-text-secondary: #635b52; /* 地に対して 5.8:1 */
  --color-text-on-fill: #ffffff;   /* チャコール面（CTA/Discord）に乗せる白文字 */
  --color-text-on-accent: #2a2622; /* 淡いアクセント面に乗せる文字 */

  /* ---- ニュアンス色：装飾用（シェイプ・ドット・細線） ---- */
  --color-candy-pink-vivid: #d9b9ad; /* ダスティローズ */
  --color-coral-vivid: #d8c3ae;      /* サンド */
  --color-sunny-vivid: #e4d9c4;      /* ソフトゴールド */
  --color-turquoise-vivid: #bfc9be;  /* セージ */
  --color-sky-vivid: #b9c0cb;        /* ダスティブルーグレー */
  --color-lavender-vivid: #c6bbc7;   /* モーヴグレー */
  --color-periwinkle: #9c93a0;       /* 濃いめモーヴ（アイコン線・装飾） */

  /* ---- アクセント面（文字を乗せる。チャコール文字で高コントラスト） ---- */
  --color-candy-pink-strong: #d9b9ad; /* 黒文字 5.7:1 */
  --color-coral-strong: #d8c3ae;      /* 黒文字 6.5:1 */
  --color-turquoise-strong: #bfc9be;  /* 黒文字 6.9:1 */
  --color-sky-strong: #b9c0cb;        /* 黒文字 6.4:1 */
  --color-lavender-strong: #c6bbc7;   /* 黒文字 6.6:1 */

  /* ---- 淡色ティント：カード地・アイコン背景・ラベル地（黒文字を乗せてよい） ---- */
  --color-pink-soft: #ead9d1;       /* ブラッシュ淡 */
  --color-coral-soft: #e9e1d2;      /* サンド淡 */
  --color-sunny-soft: #ede6d5;      /* ゴールド淡 */
  --color-turquoise-soft: #dfe3db;  /* セージ淡 */
  --color-sky-soft: #dee1e6;        /* ミスト淡 */
  --color-lavender-soft: #e7e0e7;   /* モーヴ淡 */
  --color-cream: #f5efe6;
  --color-neutral-soft: #ece7e0;

  /* ---- ラベル文字色：チャコールで統一（地の色で種別を表す） ---- */
  --color-candy-pink-text: #2a2622;
  --color-coral-text: #2a2622;
  --color-turquoise-text: #2a2622;
  --color-sky-text: #2a2622;
  --color-lavender-text: #2a2622;
  --color-amber-text: #2a2622;

  /* ---- 役割（セマンティック） ---- */
  /* 「試してみる」= 最重要CTA。チャコールの角ばったミニマルボタン（白文字・字間広め） */
  --color-cta: #262220;
  --color-cta-hover: #3d3630;
  --color-cta-text: #ffffff;         /* 白文字 15.8:1 */
  /* AI機能：ウォームタウプ面＋チャコール文字で他UIと区別 */
  --color-ai: #e3d9cb;
  --color-ai-hover: #d8cdbc;
  --color-ai-text: #2a2622;
  --color-ai-bg: #efe7dd;
  /* Discord：エディトリアル調に合わせチャコール（種別はアイコンで示す） */
  --color-discord: #262220;
  --color-discord-hover: #43392f;

  /* ---- 罫線・アウトライン・状態 ---- */
  --color-border: #ded5ca;           /* ヘアライン（フッター等の区切り） */
  --color-border-strong: #c9beb0;
  --color-outline: #2a2622;          /* 細フレーム（1px）に使うチャコール */
  --color-focus: #2a2622;            /* フォーカスリング：地に対して 13.1:1 */
}
```

### フレーム・エレベーション（エディトリアル調）

Y2Kのハードシャドウ＋太黒枠はやめ、**細いヘアラインフレーム（1px）＋やわらかい影**で上質さを出す。

```css
:root {
  --border-retro: 1px;                       /* 細フレームの太さ（旧レトロ枠を1pxに） */
  --shadow-hard-sm: var(--shadow-sm);        /* 旧トークン名を維持しやわらか影へ */
  --shadow-hard: var(--shadow-card);
  --shadow-cta: 0 8px 20px rgb(38 34 32 / 18%);
}
```

ボタン・カード・チップは、ホバーでわずかに持ち上げ（`translateY(-2px)`）影を深める＝上品なリフト表現。

### soft / strong / vivid / text の使い分け

同じ色相でも用途で変数を分けています。**面の役割で選ぶ**こと。

- `-vivid`：装飾専用（シェイプ・ドット・細線）
- `-strong`：アクセント面。**チャコール文字**を乗せる（ラベルの塗り等）※白文字は使わない
- `-soft`：淡い面。カード地・タグ地・アイコン背景。チャコール文字を乗せる
- `-text`：ラベル文字色。全てチャコール（`#2a2622`）に統一（地の色で種別を表す）

### 細フレーム（`--color-outline`）の使いどころ

`--color-outline`（チャコール1px）は、カード（悩み/カテゴリ/試す/体験/記事）・チップ・ラベルpill・
アイコン背景・ヘッダー下線・ヒーローのフレーム/装飾ドットに使う。太くせず、余白で見せる。
フッター/ヘッダー内の細い区切りは `--color-border`（淡色ヘアライン）を使う。

---

## タイポグラフィ

本文は読みやすいゴシック（Noto Sans JP）、見出しは**明朝（Shippori Mincho）**でエディトリアルな品を出す。
Web フォントには必ず `font-display: swap` を指定する。

```css
:root {
  --font-family-base: 'Noto Sans JP', system-ui, sans-serif;
  --font-family-display: 'Shippori Mincho', 'Noto Serif JP', serif;

  /* フォントサイズは rem。伸縮させる箇所は clamp（SP375 / PC1440 基準） */
  --font-size-xs: 0.75rem;    /* 12px：補足・注記 */
  --font-size-sm: 0.875rem;   /* 14px：ラベル・メタ */
  --font-size-base: 1rem;     /* 16px：本文 */
  --font-size-lg: 1.125rem;   /* 18px：リード文 */
  --font-size-h3: clamp(1.125rem, 1.0357rem + 0.381vw, 1.375rem);  /* 18→22px */
  --font-size-h2: clamp(1.375rem, 1.1071rem + 1.1429vw, 2.125rem); /* 22→34px */
  --font-size-h1: clamp(1.75rem, 1.2143rem + 2.2857vw, 3.25rem);   /* 28→52px */

  /* line-height は単位なし */
  --line-height-tight: 1.3;   /* 見出し */
  --line-height-base: 1.7;    /* 本文 */

  /* letter-spacing は em */
  --letter-spacing-tight: -0.02em;  /* 大きい見出し */
  --letter-spacing-base: 0.02em;
  --letter-spacing-wide: 0.08em;    /* ラベル・小さい英字 */

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}
```

---

## スペーシング

```css
:root {
  --spacing-2xs: 0.25rem;  /*  4px */
  --spacing-xs: 0.5rem;    /*  8px */
  --spacing-sm: 0.75rem;   /* 12px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */

  /* セクションの上下余白：画面幅に応じて伸縮 */
  --spacing-section: clamp(3rem, 2.1429rem + 3.6571vw, 5.5rem);  /* 48→88px */
  --gap-card: clamp(1rem, 0.8214rem + 0.7619vw, 1.5rem);         /* 16→24px */
}
```

---

## レイアウト

```css
:root {
  --container-max: 71.25rem;  /* 1140px：コンテンツ最大幅 */
  --container-narrow: 46rem;  /* 736px：記事本文の可読幅 */
  --container-padding: clamp(1rem, 0.6429rem + 1.5238vw, 2rem);  /* 16→32px */
}
```

カードの段組みは `grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr))` で自動折り返しにする。
PC / SP で並び順が変わる箇所は `grid-template-areas` で切り替える。

---

## 角丸

「大きめのカード・角丸をしっかり使う」（`11_design-direction.md` UI方針）。
キャンディ／丸／しずくのモチーフに合わせ、全体的に大きめに取る。

```css
:root {
  --radius-sm: 0.5rem;    /*  8px：タグ・小さい要素 */
  --radius-md: 1rem;      /* 16px：入力欄・小カード */
  --radius-lg: 1.5rem;    /* 24px：カード */
  --radius-xl: 2rem;      /* 32px：大きいブロック・セクション */
  --radius-pill: 62.4375rem; /* 999px：CTA・チップ */
  --radius-blob: 60% 40% 55% 45% / 50% 55% 45% 50%; /* 有機的なシェイプ用 */
}
```

---

## 影

ボーダー・シャドウの単位は `px` を使う。影はにじみを広く・薄く取り、上品な浮きにする。

```css
:root {
  --shadow-sm: 0 2px 8px rgb(42 38 34 / 5%);
  --shadow-card: 0 10px 30px rgb(42 38 34 / 7%);
  --shadow-lg: 0 20px 50px rgb(42 38 34 / 10%);
  --border-width: 1px;
}
```

---

## モーション

「小さなキャンディや星が弾む程度の軽い演出」にとどめ、過度な演出はしない。
`prefers-reduced-motion: reduce` の場合は無効化する（`styles/reset.css` で対応済み）。

```css
:root {
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --easing-base: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* 弾む演出用 */
}
```

---

## z-index

```css
:root {
  --z-base: 1;
  --z-sticky: 100;
  --z-header: 200;
  --z-drawer: 300;
  --z-modal: 400;
}
```
