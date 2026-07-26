# DESIGN.md

Candy Monster のデザイントークン一覧です。
CSS では**直値を書かず、必ずここで定義した変数を参照**してください（CLAUDE.md の原則）。
一覧に無い値が必要になった場合は、**先にこのファイルへ追加してから**使います。

## 出典と決定方法

本案件は Figma データを使いません。トークンは `11_design-direction.md` の方向性を実値へ落としたものです。
同ファイル47行目「固定HEXは実装時に最終調整する」に基づき、色値はここで確定させています。

**配色は Y2K パステル（レトロポップ）** を採用（参考ビジュアルより）。
ラベンダー／ライムイエロー／パステルピンクを主役に、ピーチ地＋**黒（#1A1A1A）の文字・太アウトライン**で構成する。
`11_design-direction.md` の「カラフル・ポジティブ・今っぽい」を、黒縁＋ハードシャドウ＋スマイリーのレトロ表現で具体化している。

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
- Y2K配色は**文字を黒（#1A1A1A）に統一**し、パステル面の上で高コントラストを得る（黒×パステルは 7〜17:1）
- 白文字を使うのは Discord ブランド面のみ（4.61:1）
- 情報を色だけで伝えない（アイコン・ラベル文言を併用する）

実装は `styles/base.css` の `:root` が正本です。ここは対応表として同じ値を記載します。
色を変えるときは `tools/check-contrast.mjs`（`npm run check:contrast`）で AA を再検証すること。

```css
:root {
  /* ---- ベース ---- */
  --color-bg-base: #fbebdd;     /* ピーチ地：ページ全体 */
  --color-bg-subtle: #f7d4e6;   /* パステルピンク：セクションの塗り分け */
  --color-bg-surface: #ffffff;  /* カード面 */
  --color-bg-header: rgb(251 235 221 / 92%); /* bg-base の半透明。ヘッダーのブラー地 */

  /* ---- テキスト（Y2Kは黒基調） ---- */
  --color-text-primary: #1a1a1a;   /* 地に対して 14.9:1 */
  --color-text-secondary: #575163; /* 地に対して 6.5:1 */
  --color-text-on-fill: #ffffff;   /* 濃色面（Discord）に乗せる白文字 */
  --color-text-on-accent: #1a1a1a; /* パステルアクセント面に乗せる黒文字 */

  /* ---- ブランド色：装飾用（シェイプ・ドット・アイコン線） ---- */
  --color-candy-pink-vivid: #f3a9d0; /* ピンク */
  --color-coral-vivid: #f6b38c;      /* ピーチ */
  --color-sunny-vivid: #ecee5f;      /* ライムイエロー */
  --color-turquoise-vivid: #8fd7c0;  /* ミント */
  --color-sky-vivid: #a9b8f0;        /* ペリウィンクル */
  --color-lavender-vivid: #b7a3ea;   /* ラベンダー */
  --color-periwinkle: #8e7ee0;       /* 濃いめペリウィンクル（アイコン線・装飾文字） */

  /* ---- アクセント面（黒文字を乗せる。旧 -strong の役割） ---- */
  --color-candy-pink-strong: #f3a9d0; /* 黒文字 9.45:1 */
  --color-coral-strong: #f6b38c;      /* 黒文字 9.73:1 */
  --color-turquoise-strong: #8fd7c0;  /* 黒文字 10.48:1 */
  --color-sky-strong: #a9b8f0;        /* 黒文字 8.95:1 */
  --color-lavender-strong: #b7a3ea;   /* 黒文字 7.82:1 */

  /* ---- 淡色ティント：カード地・アイコン背景・ラベル地（黒文字を乗せてよい） ---- */
  --color-pink-soft: #fbdcec;
  --color-coral-soft: #fbdbcb;      /* ピーチ淡 */
  --color-sunny-soft: #f5f6b8;      /* ライム淡 */
  --color-turquoise-soft: #d5efe4;  /* ミント淡 */
  --color-sky-soft: #dce3f8;        /* ペリウィンクル淡 */
  --color-lavender-soft: #e4daf7;   /* = ai-bg */
  --color-cream: #fcefdd;
  --color-neutral-soft: #efe9ef;

  /* ---- ラベル文字色：Y2Kは黒文字で統一（地の色で種別を表す） ---- */
  --color-candy-pink-text: #1a1a1a;
  --color-coral-text: #1a1a1a;
  --color-turquoise-text: #1a1a1a;
  --color-sky-text: #1a1a1a;
  --color-lavender-text: #1a1a1a;
  --color-amber-text: #1a1a1a;

  /* ---- 役割（セマンティック） ---- */
  /* 「試してみる」= 最重要CTA。ライム面＋黒文字＋黒枠＋ハードシャドウで最も目立たせる */
  --color-cta: #ecee5f;
  --color-cta-hover: #e0e23f;
  --color-cta-text: #1a1a1a;         /* 黒文字 14.06:1 */
  /* AI機能：ラベンダー面＋黒文字で他UIと区別 */
  --color-ai: #b7a3ea;
  --color-ai-hover: #a98fe6;
  --color-ai-text: #1a1a1a;          /* 黒文字 7.82:1 */
  --color-ai-bg: var(--color-lavender-soft);
  /* Discord は同社ブランドカラー（唯一の白文字面） */
  --color-discord: #5865f2;          /* 白文字 4.61:1 */
  --color-discord-hover: #4450e0;

  /* ---- 罫線・アウトライン・状態 ---- */
  --color-border: #e6d8ea;           /* ヘアライン（フッター等の区切り） */
  --color-border-strong: #cbbcd6;
  --color-outline: #1a1a1a;          /* レトロ黒アウトライン（署名要素・ボタン） */
  --color-focus: #6551ee;            /* フォーカスリング：地に対して 4.55:1 */
}
```

### レトロ（黒アウトライン・ハードシャドウ）

Y2K の署名的表現。ぼかしのないオフセット影＋黒2px枠を、署名要素とボタンに使う。

```css
:root {
  --border-retro: 2px;                              /* 黒アウトラインの太さ */
  --shadow-hard-sm: 3px 3px 0 0 var(--color-outline);
  --shadow-hard: 5px 5px 0 0 var(--color-outline);
  --shadow-cta: 4px 4px 0 0 var(--color-outline);   /* ボタン */
}
```

ボタン・カード・チップは、ホバーで右下へ寄せて影を縮め（`translate(2px,2px)` + `--shadow-hard-sm`）、
押下で影を消して沈める（`translate(4px,4px)` + 影なし）＝物理ボタン風の押し込み表現。

### soft / strong / vivid / text の使い分け

同じ色相でも用途で変数を分けています。**面の役割で選ぶ**こと。

- `-vivid`：装飾専用（シェイプ・ドット・アイコン線）
- `-strong`：アクセント面。**黒文字**を乗せる（ボタン・ラベルの塗り）※Y2Kでは白文字は使わない
- `-soft`：淡い面。カード地・タグ地・アイコン背景。黒文字を乗せる
- `-text`：ラベル文字色。Y2Kでは全て黒（`#1a1a1a`）に統一（地の色で種別を表す）

### 黒アウトラインの使いどころ

`--color-outline`（黒2px）は、署名的な要素にのみ使う：ボタン、カード（悩み/カテゴリ/試す/体験/記事）、
チップ、ラベルpill、アイコン背景、ヘッダー下線、ヒーローの装飾ドット・スマイリー。
フッター/ヘッダー内の細い区切りは `--color-border`（淡色ヘアライン）を使い、黒枠を乱用しない。

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
やわらかい影（`--shadow-*`）は補助的に、Y2Kの主役はハードシャドウ（`--shadow-hard*` / 上記「レトロ」参照）。

```css
:root {
  --shadow-sm: 0 1px 3px rgb(26 26 26 / 8%);
  --shadow-card: 0 4px 16px rgb(26 26 26 / 8%);
  --shadow-lg: 0 8px 32px rgb(26 26 26 / 12%);
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
