# LP実装テンプレート（Figma → Claude Code）

Figmaデザインから Claude Code でプロレベルのLPを実装するための**スターターテンプレート**です。
このリポジトリをクローン（または「Use this template」）して始めると、実装ガイドライン一式が最初から配置された状態でスタートできます。

---

## 使い方

### 1. テンプレートから新しいリポジトリを作る

**GitHubの場合（推奨）**：このリポジトリの「Use this template」→「Create a new repository」から新規作成する。

**クローンする場合**：

```bash
git clone <このテンプレートのURL> my-lp-project
cd my-lp-project
rm -rf .git && git init   # テンプレートの履歴を切り離して新規リポジトリにする
```

### 2. Claude Code を起動して「lp-start」と言う

Claude Code を起動したら、まず次のように送ります。

```
lp-start
```

すると全STEPの一覧と現在地（スタンプラリー形式）が表示され、次にやるべきSTEPと対応スキルへ案内されます。各STEPが完了するたびに進捗（`PROGRESS.md`）が更新され、残りのタスクが表示されます。

> 💡 起動ワードは `lp-start`（開始・現在地）/ `lp-status`（進捗確認）/ `lp-next`（次へ）です。`START` などでも反応しますが、**確実に動かすなら固有ワードの `lp-start` を使ってください**。

手順の詳細は同梱の `手順Final.md` を参照してください。実装ガイドラインは配置済みなので、Claude Codeが自動で参照します。

```
🗺️ LP実装 進行状況

[ ] STEP1  初期セットアップ           → project-setup     ← 👈 次はここ
[ ] STEP2  Figma MCP 接続            → figma-mcp-connect
[ ] STEP3  Figma URL を読み込む       → figma-read
...
```

---

## 同梱ファイルの構成

```
.
├── CLAUDE.md                          毎セッション自動で読まれる行動指示（配置済み・編集不要）
├── DESIGN.md                          デザイントークン（★STEP4〜5でFigmaの実値に置き換える）
├── PROGRESS.md                        進行状況（lp-start 時に表示・自動更新される）
└── .claude/
    ├── skills/
    │   ├── README.md                 スキル一覧・新規追加のルール
    │   ├── start-orchestrator/       「lp-start」で進行管理・道案内（スタンプラリー）
    │   ├── project-setup/            初期セットアップ専用（Vite/Lint等）
    │   ├── figma-mcp-connect/        Figma MCP 接続
    │   ├── figma-read/               Figma読み込み・DESIGN.md反映
    │   ├── lp-implementation/        セクション単位の実装
    │   ├── lighthouse-check/         Lighthouse計測・改善
    │   ├── deploy-preview/           デプロイ確認・GitHubアップロード（gh導入含む）
    │   └── github-review/            PR作成・レビュー・マージ
    └── rules/
        ├── html.md                    HTMLファイルを触るとき自動で読まれる（配置済み）
        ├── css.md                     CSSファイルを触るとき自動で読まれる（配置済み）
        ├── js.md                      JSファイルを触るとき自動で読まれる（配置済み）
        └── assets.md                  画像を扱うとき自動で読まれる（配置済み）
```

### 各ファイルの役割

| ファイル | 役割 | 触るタイミング |
|---------|------|--------------|
| `CLAUDE.md` | 常に守る短い行動指示 | 基本そのまま。プロジェクト固有の規約があれば追記 |
| `DESIGN.md` | カラー・余白などの実値 | **STEP4〜5で必ず埋める**（初期状態はプレースホルダー） |
| `.claude/skills/*` | 工程ごとのスキル（6種） | 依頼に応じて自動発動。そのまま |
| `.claude/skills/README.md` | スキル一覧・新規追加のルール | スキルを追加するとき参照 |
| `.claude/rules/*.md` | HTML/CSS/JS/画像の詳細ルール | そのまま |

> 💡 スキルは工程ごとに6つに分かれています（初期セットアップ / MCP接続 / 読み込み / 実装 / 計測 / デプロイ）。一覧と役割は `.claude/skills/README.md` を参照してください。

> ⚠️ **`DESIGN.md`だけは初期値がプレースホルダー**です。Figmaから取得した実際のカラー・サイズに置き換えないと、正しい色で実装されません。

---

## 実装の進め方（概要）

詳細は `手順Final.md` を参照してください。おおまかな流れは以下の通りです。

```
STEP 0  Figmaを整理する
STEP 1  プロジェクトの初期セットアップ（クローン → Vite / Lint 導入）
STEP 2  Figma MCPを接続する
STEP 3  セクションごとに読み込ませる → 要約させて確認
STEP 4  バリアブルを読み込ませる → DESIGN.md を埋める
STEP 5  README / CLAUDE / DESIGN を更新する
STEP 6  セクションごとに実装 → スクショ比較 → コミット
STEP 7  Lighthouse計測
STEP 8  プレビュー環境にデプロイ → レビュー
```

---

## プロジェクトごとにカスタムしたい場合

- プロジェクト固有の規約は `CLAUDE.md` に追記する（ただし増やしすぎない）
- 特定ディレクトリだけのルールは `.claude/rules/` にファイルを追加する
- 共通ルール自体を改善したい場合は、このテンプレートリポジトリ側を更新して全体へ反映する
