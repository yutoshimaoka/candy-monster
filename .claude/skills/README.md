# .claude/skills — スキル一覧

このディレクトリには、Claude Code がオンデマンドで参照するスキル（`SKILL.md`）を置きます。
依頼内容に応じて Claude Code が自動で該当スキルを選びます（コマンド起動ではなく、自然な依頼文で発動します）。

---

## 収録スキル

STEPの流れに沿って、工程ごとにスキルを分けています。依頼に応じて Claude Code が自動で該当スキルを選びます。

まず全体の進行管理を担うのが **start-orchestrator** です。「lp-start」と言うと全STEPと現在地が表示され、次にやるスキルへ案内されます（`lp-status` で進捗確認、`lp-next` で次へ）。

| 順 | スキル | 場所 | 役割 | 対応STEP |
|----|--------|------|------|---------|
| ★ | **start-orchestrator** | `start-orchestrator/SKILL.md` | 進行管理・道案内（lp-startで全STEP表示、完了ごとに残タスク表示） | 全体 |
| 1 | **project-setup** | `project-setup/SKILL.md` | 初期セットアップ専用（Vite / .gitignore / リセットCSS / Lint / pre-commit） | STEP1 |
| 2 | **figma-mcp-connect** | `figma-mcp-connect/SKILL.md` | Figma MCP 接続の確立・トラブル対応 | STEP2 |
| 3 | **figma-read** | `figma-read/SKILL.md` | Figma読み込み・要約承認・DESIGN.md反映 | STEP3〜5 |
| 4 | **lp-implementation** | `lp-implementation/SKILL.md` | セクション単位の実装・スクショ比較 | STEP6 |
| 5 | **lighthouse-check** | `lighthouse-check/SKILL.md` | Lighthouse計測・アクセシビリティ改善 | STEP7 |
| 6 | **deploy-preview** | `deploy-preview/SKILL.md` | デプロイ確認・GitHubリポジトリ作成/アップロード（gh導入含む） | STEP8 |
| 7 | **github-review** | `github-review/SKILL.md` | PR作成・レビュワーとやりとり・マージ | STEP9 |
| 7' | **review-response** | `review-response/SKILL.md` | レビュー指摘の反映・スレッド返信・再レビュー依頼（Slack共有サマリ出力） | STEP9（レビュー対応） |

> 進捗は `PROGRESS.md`（プロジェクトルート）で管理します。各STEPが完了すると start-orchestrator が `[x]` に更新し、残タスクを表示します。
> STEP0（Figma整理）は人が手作業で行う工程のため、スキル化していません。
> スキルは役割ごとに1つに分け、担当を明確に分離するのが原則です。

---

## 新しいスキルを追加する手順

1. `.claude/skills/<スキル名>/SKILL.md` を作る（スキル名はケバブケース推奨。例：`ogp-generator`）
2. 冒頭に必ず YAMLフロントマターの `description` を書く（これが無いと発動しない）
3. 「このスキルを使うタイミング」「やらないこと（担当外）」「手順」「完了条件」を書く
4. この一覧表に1行追加する
5. 既存スキルと役割が重ならないか確認する（重なる場合はどちらかに寄せる）

### 新規スキルのひな形

```markdown
---
description: 〈何をするスキルか〉。〈どんな依頼で使うか（発動キーワードを具体的に）〉。〈担当外のこと〉には使わない。
---

## 〈スキル名〉スキル

### このスキルを使うタイミング
〈いつ使うか〉

### このスキルでやらないこと（担当外）
- 〈別スキルが担当する範囲〉

### 手順
**1. …**
- …（目的：…）

### 完了条件（Definition of Done）
- [ ] …

### 送るメッセージ例
（省略可）
```

---

## 追加候補（今後作れるスキルの例）

必要になったら、それぞれ独立したスキルとして切り出せます。

- **ogp-generator**：OGPタグ（og:title / og:description / og:image）の生成に特化
- **variable-extract**：Figmaバリアブルの一覧化を figma-read から切り出して単独化
- **a11y-audit**：アクセシビリティ監査に特化（lighthouse-check から独立させる場合）

> それぞれ「project-setup」と同じ粒度感（1目的・完了条件つき）で作ると、迷いなく使えるスキル群になります。
