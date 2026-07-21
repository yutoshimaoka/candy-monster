# PROGRESS.md — LP実装 進行状況

このファイルは `start-orchestrator` スキルが読み書きする進捗管理ファイルです。
`[ ]` が未完了、`[x]` が完了です。「lp-start」と言うと現在地が表示されます（`lp-status` で進捗確認、`lp-next` で次へ）。

---

## 進行状況

- [x] STEP1  初期セットアップ            → project-setup
- [-] STEP2  Figma MCP 接続             → figma-mcp-connect（今回はFigmaデータ無しのためスキップ）
- [-] STEP3  Figma URL を読み込む        → figma-read（今回はFigmaデータ無しのためスキップ）
- [x] STEP4  バリアブルを反映             → figma-read（specからDESIGN.mdを確定・AA実測済み）
- [x] STEP5  ドキュメント更新             → figma-read（README/DESIGN.md更新済み）
- [x] STEP6  セクション実装              → lp-implementation（トップページ全10セクション実装）
- [x] STEP7  Lighthouse計測             → lighthouse-check（PC/モバイルとも4項目100点）
- [ ] STEP8  デプロイ確認・GitHubアップロード → deploy-preview
- [ ] STEP9  PR作成・レビュー・マージ          → github-review

---

## メモ

- STEP0（Figma整理）は人の手作業のため、この進行管理の対象外（事前準備）です。
- 各STEPが完了したら、対応する行を `[x]` に更新してください（Claude Codeが自動で行います）。
- つまずいた点は `TROUBLESHOOTING.md` に記録します。

## 案件切り替えの記録（2026-07-21）

このリポジトリは別案件「リフォ活 入門Book」を複製して作成されました。
設計ドキュメント（00〜15）を Candy Monster 用に書き換えたうえで、旧案件の実装を全削除し、
設計ドキュメントから作り直す方針に切り替えています。

- 削除済み：旧案件のHTML・記事9本・styles.css・画像52点・WordPressテーマ一式・記事生成スクリプト
- 書き換え済み：`README.md` / `package.json` / `vite.config.js` / `.github/workflows/deploy-pages.yml`
- 引き継ぎ：Vite本体と `手順Final.md`・`.claude/` 配下のルールのみ
- STEP1 は 2026-07-21 に完了。Vite・`.gitignore`・`styles/reset.css`・Lint 3種・husky pre-commit を導入済みです。
- `origin` は旧案件の `rifokatsubook` を指したままです。**STEP8 で Candy Monster 用の新リポジトリを作成し、差し替えるまで push しないでください。**

## 実装の記録（2026-07-21）

- Figmaデータ無しの案件のため、STEP2〜3（MCP接続・Figma読込）はスキップ。デザイントークンは `11_design-direction.md` からspec起点で確定した。
- トップページ（`index.html`）を `04_top-page-wireframe.md` の全10セクションで実装。CSSはセクション単位で分割（`styles/`）。
- カラーは全て `DESIGN.md` / `styles/base.css` の `:root` 変数を参照（直値なし）。淡色背景に乗る文字は `tools/check-contrast.mjs`（`npm run check:contrast`）で全ペア AA(4.5:1) 以上を実測済み。
- Lint（stylelint/eslint/htmlhint）3種エラー0。Lighthouse は PC・モバイルとも パフォーマンス/アクセシビリティ/ベストプラクティス/SEO の4項目100点。
- **未確定のリンク・素材**（実装済みだが後で差し替え要）：
  - Discord招待URL（`href` 未設定・TODOコメント有り）
  - 各下層ページ（カテゴリ/年齢/悩み/記事/マイページ/about等）は未作成のため、リンク先URLは仮置き
  - ヒーローの親子ビジュアルは写真未入稿のため、暫定でCSS/SVGの有機的シェイプ
  - 体験談・記事カードの文言はデザイン確認用サンプル（実データ入稿まで非公開推奨）
