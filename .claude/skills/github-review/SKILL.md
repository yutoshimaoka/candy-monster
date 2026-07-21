---
description: 2回目以降の変更を作業ブランチで出し、GitHubでPRを作成してレビュワーとやりとりし、マージまで一括で行うときに使うスキル（STEP9）。「PRを作って」「レビューコメントに対応して」「マージして」「再レビュー依頼して」といった依頼で使う。ブランチ作成・push・PR作成・レビュー対応・マージまでClaude Codeが担当する。初回のmainアップロード・リポジトリ作成は deploy-preview（STEP8）が担当する。gh(GitHub CLI)を使う。
---

## PR作成・レビュー対応・マージ スキル（STEP9）

> このスキルは **2回目以降の変更を PR で出し、レビューを経てマージするまで**を担当します（STEP9）。
> 9-1〜9-4（ブランチ作成・PR作成・レビュー対応・マージ）はすべて Claude Code が `gh` で実行できます。
> 初回のリポジトリ作成・main への直接アップロードは `deploy-preview` スキル（STEP8）が担当します。

### 位置づけ（STEP8 との関係）
- **初回アップロードも含めて、すべての変更を PR 経由で main に入れる**（案B：レビューを必ず通す運用）
  - STEP8 で作業ブランチに push 済み。`main` には直接入れない
  - このスキル（STEP9）で PR を作成し、レビューを経て `main` にマージする
- 初回・2回目以降を問わず、**作業ブランチ → PR → レビュー → マージ**の流れで進める
- 変更のたびにこのスキルを繰り返し使う（1変更＝1PR が基本）
- **初回マージ後**に、GitHub Pages を有効化してチーム共有用URLを発行する（9-5）

### 担当範囲
- **Claude Code が担当**：9-1 PR作成 ／ 9-2 レビュー依頼 ／ 9-3 レビュー対応（返信・修正・再レビュー依頼・resolve）／ 9-4 マージ ／ 9-5 共有URL発行
- **人間が担当**：レビュワーとしてレビューコメントを書くこと、および 9-4 マージ前の最終承認（YES / NO）

### 前提
- STEP8（`deploy-preview`）で作業ブランチへの push が完了し、GitHub にリポジトリがある
- `gh`（GitHub CLI）がインストール・認証済み（未確認なら `gh --version` / `gh auth status`。未導入なら `deploy-preview` の手順0を参照）

### 手順（9-1〜9-5 を Claude Code が通しで実行）

> 作業ブランチの作成・push は STEP8（`deploy-preview`）で完了済み。このスキルは PR 作成から始める。

**9-1. Pull Request を作成する**
  ```bash
  gh pr create --base main --title "<変更内容>" --body "$(cat <<'BODY'
## 変更概要
- <変更したセクション・内容>

## チェックリスト（該当項目）
- [ ] ...

## 参考
- Figma：<URL>

## レビュー観点
- <特に見てほしい点>
BODY
)"
  ```
- タイトルは変更内容がわかるように書く（例：「Hero：見出し余白を修正」／初回なら「LP初版：Hero〜Footer」）

**9-2. レビューを依頼する**
- レビュワーを指定し、PRのURLを連絡する（PRを作っただけではレビュワーは気づかない）
  ```bash
  gh pr edit <PR番号> --add-reviewer <レビュワー名>
  gh pr view <PR番号> --json url --jq .url        # 連絡用のPR URLを取得
  ```
- 取得した PR URL を Slack 等でレビュワーに送り、レビューを依頼する
- **レビュワーのコメントは、この PR 上に書いてもらう**（Pages URL ではなく PR に集約する）

**9-3. レビュワーのコメントURLを Claude Code に渡して対応する**
> 指摘の仕分け・1件ずつの返信・再レビュー依頼・Slack共有サマリの出力は、`review-response` スキルに詳しい手順があります。込み入ったレビュー対応はそちらを使ってください。
- レビュワーが付けたコメント（またはPR）のURLを Claude Code に渡す
  ```bash
  gh pr view <PR番号またはURL> --comments        # 指摘を全件洗い出す
  ```
- コメントには **1件ずつ対応**する
  - 修正する場合：修正 → コミット → push（同じブランチに積む）→ 「対応しました（コミット）」と返信
  - 判断に迷う場合：勝手に解決せず、相談として人間に確認する
- 対応が完了した会話（conversation）は resolve する（基本はレビュワーに委ねる）
- 対応後、**まとめて1回**再レビューを依頼し、Slack共有サマリ（PR URL＋対応概要 各1〜2行）を出力する
  ```bash
  gh pr edit <PR番号> --add-reviewer <レビュワー名>   # 再依頼（Re-request review）
  ```

**9-4. マージする**
- **マージ前に必ずユーザーに確認する**：
  「レビューが完了しました。この PR をマージしますか？（YES / NO）」
  - **NO** → マージせず待機
  - **YES** → 次を確認してからマージする
    - 必要な Approve が揃っている（`gh pr view` で確認）
    - レビュー指摘がすべて解消（または相談済み）で、会話が resolve されている
    - CI が通っている（`gh pr checks`）
  ```bash
  gh pr checks                            # CI/Lint の結果を確認
  gh pr merge --squash --delete-branch    # squashマージし、マージ済みブランチを削除
  ```
- マージ方式はリポジトリの運用に合わせる（`--squash` / `--merge` / `--rebase`）。指定が無ければ `--squash` を既定とする

**9-5. チーム共有用URLを発行する（初回マージ後に一度）**
- 初回の PR が `main` にマージされたら、GitHub Pages を有効化して共有URLを発行する（2回目以降は既に有効なので不要）
  ```bash
  # main ブランチのルートを公開ソースにして Pages を有効化
  gh api -X POST repos/<Organization名>/<リポジトリ名>/pages \
    -f "source[branch]=main" -f "source[path]=/"

  # 公開URL / リポジトリURL を取得
  gh api repos/<Organization名>/<リポジトリ名>/pages --jq .html_url
  gh repo view <Organization名>/<リポジトリ名> --json url --jq .url
  ```
- 取得した2つのURLをチームに共有する：
  - GitHub URL（リポジトリ）：`https://github.com/<Organization名>/<リポジトリ名>`（コード確認用）
  - Pages URL（公開ページ）：`https://<Organization名>.github.io/<リポジトリ名>/`（表示物の確認用）
- 反映には数十秒〜数分かかることがある。Internal のため公開範囲は Organization 内に限定される

### レビュー対応のコツ
- コーディング規約に関する指摘（直値・BEM・セマンティックタグ等）は、`.claude/rules/` と Lint で防げるものが多い。同じ指摘が繰り返し出る場合は、**ルール側に反映して再発を防ぐ**

### つまずいたときの記録
- PR・レビュー・マージ・Pages公開で問題が起きたら `TROUBLESHOOTING.md` に記録する

### 完了条件（Definition of Done）
- [ ] PR が作成され、説明欄に必要情報（変更概要・チェックリスト・Figma URL・レビュー観点）が記載されている
- [ ] レビュワーを指定し、PR URL で依頼した
- [ ] レビュー指摘にすべて対応（または相談）済みで、会話が resolve されている
- [ ] 再レビューをまとめて1回依頼し、Slack共有サマリ（PR URL＋対応概要）を出力した
- [ ] 必要な Approve と CI 通過を確認した
- [ ] ユーザーの YES を得てからマージした
- [ ] （初回のみ）マージ後に GitHub Pages を有効化し、共有URL（GitHub / Pages）を発行した

### 完了したら
`PROGRESS.md` の STEP9 を `[x]` に更新し、`start-orchestrator` で全STEP完了（🎉）を表示する。
（以降の変更も、その都度このスキルで PR → レビュー → マージを繰り返す）
