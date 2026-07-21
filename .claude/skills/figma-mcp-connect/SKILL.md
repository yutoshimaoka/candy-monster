---
description: Figma MCP サーバーへの接続を行うときに使うスキル。まず接続状態を確認し、すでに接続済みなら作業をスキップ、未接続のときだけ接続をセットアップする。「FigmaをMCP接続して」「Figmaと繋げて」「MCP接続を確認して」「MCPが繋がらない」といった依頼で使う。接続の確認・確立とトラブル対応が担当で、実際のデザイン読み込み・実装は別スキル（figma-read / lp-implementation）が担当する。
---

## Figma MCP 接続スキル（接続専用）

> このスキルは **Figma と Claude Code の接続を確立する専用**です。
> デザインの読み込み・実装は担当外です（`figma-read` / `lp-implementation` が担当）。

### このスキルを使うタイミング
- 初期セットアップ後、Figmaのデータを読み込む前
- MCP接続が切れた・認識されないとき

### このスキルでやらないこと（担当外）
- Figma URL / バリアブルの読み込み → `figma-read` スキル
- LPの実装 → `lp-implementation` スキル

### 手順

**0. まず接続状態を確認する（最初に必ず行う）**
- `/plugin`（または `/mcp`）を実行し、`figma` が `connected` になっているか確認する
- **すでに `connected` の場合**：接続作業は不要。「Figma MCP は接続済みです」と伝え、`PROGRESS.md` の STEP2 を `[x]` に更新して、このスキルを終了する（手順1以降はスキップ）
- **未接続の場合**：手順1以降で接続する

**1. リモート版MCPサーバーを接続する（推奨）**
```bash
claude plugin install figma@claude-plugins-official
```
- Claude Code を再起動する
- `/plugin` → **Installed** タブ → `figma` を選択 → 認証ページで **Allow access**
- 再度 `/plugin` を実行し `connected` 表示を確認する

**2. 失敗した場合のフォールバック**
- `Plugin "figma" not found in marketplace` エラーが出たら、先にマーケットプレイスを追加する：
```bash
/plugin marketplace add anthropics/claude-plugins-official
```
- その後、手順1をやり直す

**3. デスクトップ版を使う場合（代替手段）**
- Figmaデスクトップアプリを Dev Mode にし、MCPサーバーを有効化してURLを取得
```bash
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```
- Claude Code を再起動し `/mcp` で接続を確認する

**4. 接続を確認する**
- `/plugin`（または `/mcp`）で `connected` が表示されることを確認する

### つまずいたときの記録
- 接続で問題が起きたら `TROUBLESHOOTING.md` に「症状／原因／対処法」で記録する（CLAUDE.md参照）

### 完了条件（Definition of Done）
- [ ] 最初に接続状態を確認した
- [ ] 接続済みだった場合はスキップし、STEP2 を `[x]` にした
- [ ] 未接続だった場合は接続し、Figma MCP が `connected` 状態になった
- [ ] （接続した場合）認証（Allow access）が完了している

### 完了したら次へ
接続できたら `PROGRESS.md` の STEP2 を `[x]` に更新し、`start-orchestrator` で残タスクを表示する。
その後、`figma-read` スキル（Figma読み込み）へ進む。

### 送るメッセージ例
```
Figma MCPサーバーを接続してください。
接続できているか確認し、繋がっていなければ原因と対処法を教えてください。
```
