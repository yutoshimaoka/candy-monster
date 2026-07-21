# DESIGN.md

Candy Monster のデザイントークン一覧です。
CSS では**直値を書かず、必ずここで定義した変数を参照**してください（CLAUDE.md の原則）。
一覧に無い値が必要になった場合は、**先にこのファイルへ追加してから**使います。

## 出典と決定方法

本案件は Figma データを使いません。トークンは `11_design-direction.md` の方向性を実値へ落としたものです。
同ファイル47行目「固定HEXは実装時に最終調整する」に基づき、色値はここで確定させています。

配色は「Colorful Community × Playful AI」（人の温かさ 70% / AI 30%）に沿って、
アイボリー基調 + 多色アクセントで構成しています。

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

- 本文・UIラベルは **WCAG 2.1 AA（4.5:1）** を満たす
- 彩度の高いブランド色は白文字を支えられないため、**2層構成**にする
  - `*-vivid`：装飾シェイプ・背景・イラスト用（**文字を乗せない**）
  - `*-strong`：文字（白）を乗せる面用。白文字で 4.5:1 以上を確保済み
- 情報を色だけで伝えない（アイコン・ラベルを併用する）

実装は `styles/base.css` の `:root` が正本です。ここは対応表として同じ値を記載します。
色を変えるときは `tools/check-contrast.mjs`（`npm run check:contrast`）で AA を再検証すること。

```css
:root {
  /* ---- ベース ---- */
  --color-bg-base: #fffbf5;     /* アイボリー／ウォームホワイト：ページ地 */
  --color-bg-subtle: #fdeef2;   /* 淡いピンク：セクションの塗り分け */
  --color-bg-surface: #ffffff;  /* カード面 */
  --color-bg-header: rgb(255 251 245 / 92%); /* bg-base の半透明。ヘッダーのブラー地 */

  /* ---- テキスト ---- */
  --color-text-primary: #2b2430;   /* 地に対して 14.57:1 */
  --color-text-secondary: #6b6270; /* 地に対して 5.65:1 */
  --color-text-on-fill: #ffffff;   /* 濃色面に乗せる文字 */

  /* ---- ブランド色：装飾用（文字を乗せない。シェイプ・アイコン・ドット） ---- */
  --color-candy-pink-vivid: #e5326e;
  --color-coral-vivid: #f0562e;
  --color-sunny-vivid: #ffc53d;
  --color-turquoise-vivid: #0e9b93;
  --color-sky-vivid: #38a8e8;
  --color-lavender-vivid: #7c6bf0;

  /* ---- ブランド色：文字を乗せる面用（白文字で AA 以上） ---- */
  --color-candy-pink-strong: #e21d5f;  /* 白文字 4.59:1 */
  --color-coral-strong: #da3910;       /* 白文字 4.59:1 */
  --color-turquoise-strong: #0c837c;   /* 白文字 4.61:1 */
  --color-sky-strong: #157bb6;         /* 白文字 4.62:1 */
  --color-lavender-strong: #715fef;    /* 白文字 4.58:1 */

  /* ---- 淡色ティント：カード地・アイコン背景・ラベル地（本文/ラベル文字を乗せてよい） ---- */
  --color-pink-soft: #fdeef2;      /* = bg-subtle */
  --color-coral-soft: #fde9e3;
  --color-sunny-soft: #fdf0dc;
  --color-turquoise-soft: #e6f6f5;
  --color-sky-soft: #e7f0fb;
  --color-lavender-soft: #f0edfe;  /* = ai-bg */
  --color-cream: #fdf8ee;
  --color-neutral-soft: #f1eef0;

  /* ---- ラベル文字色：対応する soft 地に色文字を乗せるとき用（各 4.5:1 以上） ---- */
  --color-candy-pink-text: #d31b59;  /* on pink-soft 4.59:1 */
  --color-coral-text: #c6340f;       /* on coral-soft 4.60:1 */
  --color-turquoise-text: #0b7b74;   /* on turquoise-soft 4.60:1 */
  --color-sky-text: #1371a8;         /* on sky-soft 4.62:1 */
  --color-lavender-text: #6551ee;    /* on lavender-soft 4.60:1 */
  --color-amber-text: #8a5a00;       /* on sunny-soft 5.27:1 */

  /* ---- 役割（セマンティック） ---- */
  /* 「試してみる」= 最重要CTA。ブランド内で1色固定する */
  --color-cta: var(--color-coral-strong);
  --color-cta-hover: #b82f0d;        /* 白文字 6.09:1 */
  /* AI機能はブルー〜ラベンダーで他UIと視覚的に区別する */
  --color-ai: var(--color-lavender-strong);
  --color-ai-hover: #5c48e8;         /* 白文字 5.92:1 */
  --color-ai-bg: var(--color-lavender-soft);
  /* Discord は同社ブランドカラーに整合させる */
  --color-discord: #5865f2;          /* 白文字 4.61:1 */
  --color-discord-hover: #4450e0;    /* 白文字 6.05:1 */

  /* ---- 罫線・状態 ---- */
  --color-border: #ece4e6;
  --color-border-strong: #d8ccd0;
  --color-focus: #157bb6;  /* フォーカスリング：地に対して 4.49:1 */
}
```

### soft / strong / text / vivid の使い分け

同じ色相でも用途で変数を分けています。**面の役割で選ぶ**こと。

- `-vivid`：装飾専用（シェイプ・ドット・アイコン線）。**文字を乗せない**
- `-strong`：濃い面。**白文字**を乗せる（ボタン・ラベルの塗り）
- `-soft`：淡い面。**本文（primary）や `-text` の色文字**を乗せる（カード地・タグ地）
- `-text`：`-soft` の上に**色文字**を乗せるとき専用（記事タイプ／体験談ラベル）

### サニーイエローの扱い

`--color-sunny-vivid: #ffc53d` は白文字が乗りません（1.58:1）。
**必ず `--color-text-primary` を乗せる**か、装飾のみに使ってください（黒文字で 9.52:1）。
淡い `--color-sunny-soft` の上に文字を置く場合は `--color-amber-text`（5.27:1）を使います。

---

## タイポグラフィ

日本語は読みやすいゴシックを基本とし、丸ゴシック一辺倒にしない（`11_design-direction.md`）。
Web フォントには必ず `font-display: swap` を指定する。

```css
:root {
  --font-family-base: 'Noto Sans JP', system-ui, sans-serif;
  --font-family-display: 'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif;

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

ボーダー・シャドウの単位は `px` を使う。

```css
:root {
  --shadow-sm: 0 1px 3px rgb(43 36 48 / 8%);
  --shadow-card: 0 4px 16px rgb(43 36 48 / 8%);
  --shadow-lg: 0 8px 32px rgb(43 36 48 / 12%);
  --shadow-cta: 0 4px 14px rgb(218 57 16 / 32%);
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
