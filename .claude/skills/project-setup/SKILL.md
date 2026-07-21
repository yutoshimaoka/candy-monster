---
description: LP実装プロジェクトの【初期セットアップ専用】スキル。テンプレートをクローンした直後に一度だけ実行し、Vite・.gitignore・リセットCSS・Lint（stylelint / eslint / htmlhint）・pre-commitフックをまとめて導入する。「初期セットアップ」「環境構築」「プロジェクトの土台を作って」といった依頼で使う。Figmaの読み込み・LPの実装・デザイン反映には使わない（それらは別スキルの担当）。
---

## プロジェクト初期セットアップ スキル（初期セットアップ専用）

> このスキルは**プロジェクトの土台作り専用**です。1プロジェクトにつき原則1回、クローン直後にだけ実行します。
> Figma読み込み・LP実装・デザイン反映は担当外です（`lp-implementation` など別スキルが担当）。

### このスキルを使うタイミング
- テンプレートをクローンした直後、まだ何も実装していない段階
- Figmaの読み込みやLPの実装を始める**前**に、ビルド・Lint環境を固めたいとき

### このスキルでやらないこと（担当外）
- Figma URL / バリアブルの読み込み → `lp-implementation` スキル
- LPのHTML/CSS/JS実装、セクション実装 → `lp-implementation` スキル
- README / CLAUDE / DESIGN の中身の更新 → 実装ワークフロー側で対応
- 2回目以降の再セットアップ（このスキルは初回のみが前提）

### 原則
- このスキルでは**LPの中身（HTML/CSS/JS）は実装しない**。土台の構築のみ行う。
- 実装を始めてから設定を追加すると構成がばらつくため、必ず実装前にこのスキルを完了させる。
- 各手順の完了後、`TROUBLESHOOTING.md` への記録ルール（CLAUDE.md参照）に従い、つまずいた点は記録する。

### 手順

**1. 前提を確認する**
- カレントディレクトリがテンプレートをクローンしたプロジェクトルートであること
- `CLAUDE.md` / `DESIGN.md` / `.claude/` が既に存在すること（テンプレート由来）
- Node.js が利用可能であること

**2. Vite を導入する**
- Vite を開発依存として導入し、`index.html` をエントリとする最小構成をつくる
- `npm run dev` / `npm run build` / `npm run preview` が動く状態にする
- 目的：バンドラを最初に固定し、プロジェクト間でビルド設定を統一する

**3. .gitignore を追加する**
- 最低限 `node_modules/`、`dist/`、`.env`、OS/エディタ固有ファイル（`.DS_Store` 等）を除外する
- 目的：依存物や秘密情報をリポジトリに含めない

**4. リセットCSS（または box-sizing）を用意する**
- `styles/reset.css`（または全体CSSの先頭）に `*, *::before, *::after { box-sizing: border-box; }` を含むリセットを配置する
- エントリから読み込まれる状態にする
- 目的：ブラウザ間のデフォルトスタイル差をなくす

**5. Lint を導入する**
- `stylelint`：BEM崩れ・直値（マジックナンバー）使用を検知する設定にする
- `eslint`：JavaScript のルールを検知する設定にする
- `htmlhint`：セマンティックタグ・`alt` 漏れ等を検知する設定にする
- それぞれ設定ファイルを生成し、`package.json` に lint スクリプトを追加する
- 目的：コーディング規約を目視レビュー任せにせず機械的に検知する

**6. pre-commit フックを設定する**
- コミット前に上記 Lint が自動で走るようにする（husky + lint-staged など）
- Lint エラーがある状態ではコミットできないようにする
- 目的：規約違反がコミットに混入するのを防ぐ

**7. 動作確認する**
- `npm run dev` が起動すること
- Lint スクリプトが実行できること
- 意図的に規約違反を書いてコミットし、pre-commit で弾かれることを確認する

### 完了条件（Definition of Done）
- [ ] `npm run dev` / `build` / `preview` が動く
- [ ] `.gitignore` に node_modules / dist / .env が含まれている
- [ ] リセットCSS（または box-sizing）が全体に効いている
- [ ] stylelint / eslint / htmlhint が実行でき、設定ファイルが存在する
- [ ] pre-commit フックが動作し、Lintエラー時にコミットが弾かれる
- [ ] この段階でLPの中身は実装していない

### 完了したら次へ
初期セットアップが終わったら、このスキルの役割は終了です。
`PROGRESS.md` の STEP1 を `[x]` に更新し、`start-orchestrator` で残タスクを表示する。
以降はFigma読み込み・LP実装へ進みます（`lp-implementation` スキル、または手順Final.md の STEP2 以降）。

### 送るメッセージ例
```
このプロジェクトの初期セットアップをしてください。

- Vite を導入する
- .gitignore を追加する（node_modules / dist / .env を除外）
- リセットCSS（または box-sizing: border-box）を用意する
- Lint を導入する：stylelint / eslint / htmlhint
- pre-commit フックで、コミット前に上記Lintが自動で走るようにする

まだLPの中身は実装しないでください。土台の構築のみお願いします。
```
