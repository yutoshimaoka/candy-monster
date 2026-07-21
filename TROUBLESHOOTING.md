# TROUBLESHOOTING.md

Figma → Claude Code でのLP実装中につまずいた点と、その対処法を記録するファイルです。
STEP1（環境構築・MCP接続）の段階から、つまずくたびに追記していきます。
チームで共有し、同じ問題に当たったときの参照先にします。

## 記録フォーマット

```
## [日付] 問題のタイトル
**症状**：どんなエラー・挙動だったか
**原因**：わかっていれば原因（不明なら「不明」）
**対処法**：実際に解決した方法
**発生STEP**：STEP1〜8のどこで起きたか
```

---

## 既知の問題（テンプレート初期収録）

## [初期収録] MCPが接続したのに `/plugin` のリストに出てこない
**症状**：Figmaプラグインをインストール・接続したのに、`/plugin` のリストに `figma` が表示されない
**原因**：MCP接続はClaude Codeの起動時にしか初期化されない
**対処法**：Claude Codeを完全に再起動する
**発生STEP**：STEP1

## [初期収録] `claude plugin install figma@claude-plugins-official` が失敗する
**症状**：`Plugin "figma" not found in marketplace "claude-plugins-official"` と表示されてインストールできない
**原因**：`claude-plugins-official` マーケットプレイスが環境によって自動登録されていない
**対処法**：`/plugin marketplace add anthropics/claude-plugins-official` を先に実行してから再インストールする
**発生STEP**：STEP1

## [初期収録] Figmaと全く違う見た目で実装される
**症状**：実装結果がFigmaのデザインとまったく異なる
**原因**：権限エラーで実際にはFigmaデータを取得できておらず、レイヤー名から推測して実装された
**対処法**：STEP2の要約確認を徹底する。「推測しました」と返ってきたらFigmaの閲覧権限を確認して再実行する
**発生STEP**：STEP2

## [初期収録] デザイン変更のたびに複数箇所を修正することになる
**症状**：色やサイズを変えると、あちこちのファイルを直す必要がある
**原因**：直値（マジックナンバー）でスタイルが書かれている
**対処法**：`DESIGN.md` の `:root` 変数を必ず使うルールを徹底する
**発生STEP**：STEP5

## [初期収録] SPが低解像度スクショ・推測で実装され、順番/サイズ/改行/注記がずれる
**症状**：SP版がFigmaと大きく異なる（並び順・サイズ・改行位置・注記位置）
**原因**：SP版の `get_design_context`（正データ）を取得せず、低解像度スクショと推測で実装した
**対処法**：PC・SP両方とも必ず `get_design_context` で正データを取得してから実装する。取得できないうちは実装に進まない（figma-read スキルで必須化）
**発生STEP**：STEP3〜6

## [初期収録] デバイス画像・背景に不要な矩形背景が焼き込まれる
**症状**：デバイスモックアップやFVの背景に、青い矩形などの装飾背景が焼き込まれて書き出された
**原因**：Figmaの DeviceImage ノード等に装飾矩形背景があり、ノードごと書き出したため
**対処法**：必要な画像だけを選択し、透過で書き出す。フレーム/親ノードごと書き出さない（assets.md のルール参照）
**発生STEP**：STEP3〜6

## [初期収録] ボタン文言を装飾と誤読する
**症状**：ボタンのラベルが実際の文言と異なって実装された
**原因**：ぼかしグロー装飾（半透明＋blur）を低解像度スクショで実ラベルと誤読した
**対処法**：テキストはスクショでなく `get_design_context` の実テキストから取る。装飾を文言と混同しない
**発生STEP**：STEP3〜6

## [初期収録] 修正したのに反映されない（旧CSSで検証してしまう）
**症状**：CSSを直したのに画面に反映されず、古い状態で検証してしまう
**原因**：Vite dev の `@import` した CSS が HMR で更新されなかった
**対処法**：`@import` を使わず `<link>` 分割かビルドで読み込む。検証前にハードリロード／キャッシュクリアする
**発生STEP**：STEP6〜7

---

## プロジェクトで発生した問題（ここから追記）

<!-- Claude Codeが自動で追記します。手動追記も可 -->

## [2026-07-21] 個人アカウントで gh repo create --visibility internal が使えない
**症状**：STEP8のスキル手順どおり `--visibility internal` で作ろうとすると個人アカウントでは作成できない
**原因**：internal 可視性は Organization 所有のリポジトリ専用。ログインアカウント `yutoshimaoka` は User（org所属なし）のため internal を選べない
**対処法**：個人アカウントでは `--private` で作成する（公開せず最も安全）。org運用に移す場合は後から visibility を変更する。`gh api user --jq .type` と `gh api user/orgs` で事前に判別できる
**発生STEP**：STEP8

## [2026-07-21] Lighthouseのモバイルパフォーマンスが56点、FCP/LCPが9.9秒
**症状**：実装は軽量なのにモバイルのパフォーマンスが56点。FCP/LCPが9.9秒（TBT=0・CLS=0）と、描画開始だけが極端に遅い
**原因**：Google Fonts の `<link rel="stylesheet">` がレンダーブロッキングになっていた。低速回線エミュレーションでは外部フォントCSSの取得完了まで描画が始まらず、FCPが押し出された
**対処法**：フォントCSSを非同期読み込みに変更（`rel="preload" as="style"` + `media="print" onload="this.media='all'"` + `<noscript>` フォールバック）。フォールボントに `system-ui` を指定済みのため描画を待つ必要がない。結果 FCP/LCP 1.0秒、モバイル・PCとも4項目100点
**発生STEP**：STEP7

## [2026-07-21] favicon.ico が404・robots.txt が無くSEO/ベストプラクティスが減点
**症状**：コンソールに `favicon.ico 404`、Lighthouseの robots-txt 監査が0点
**原因**：案件切り替えの掃除で `public/`（favicon一式・robots.txt）ごと削除していた
**対処法**：`public/favicon.svg`（Candy Monsterのマーク）と `public/robots.txt` を作成し、`apple-touch-icon.png` はSVGをヘッドレスChromeでPNG化して生成。`<link rel="icon">` を明示するとブラウザは `/favicon.ico` を自動要求しなくなり404も解消
**発生STEP**：STEP7

## [2026-07-21] ヘッドレスChromeのスクショで --window-size=390 が約500pxに広がる
**症状**：`--window-size=390` でSPスクショを撮ると、ヘッダー右のハンバーガーが写らず「消えている」ように見えた
**原因**：ヘッドレスChromeが最小ウィンドウ幅を約500pxにクランプし、390px想定より広い幅でレンダリングしていた。トグルは実際にはビューポート右端（500px基準でx≈434）に正しく配置されており、390px幅のクロップから外れて写らなかっただけ
**対処法**：DOMにgetBoundingClientRectを出力するprobeを注入して実ジオメトリを確認。スクショ検証時は実レンダリング幅（約500px）でクロップする。要素の有無はスクショだけで判断せず座標も確認する
**発生STEP**：STEP7

## [2026-07-21] 別案件を複製したリポジトリで、設計ドキュメントと実装の案件が食い違う
**症状**：`lp-start` 時点で `PROGRESS.md` は全STEP未完了だったが、実際にはVite・記事9本・WordPressテーマまで実装済みだった。しかも設計ドキュメント（00〜15）はCandy Monster、実装は旧案件「リフォ活」と、中身が別案件で混在していた
**原因**：別案件のリポジトリを複製して新案件を始めたが、書き換えたのが設計ドキュメントのみで、実装・設定ファイル・gitリモートが旧案件のまま残っていた
**対処法**：`lp-start` で次STEPを実行する前に実態を確認し、旧案件の実装を全削除してから設計ドキュメントを起点に作り直す方針に切り替えた。`README.md` / `package.json` / `vite.config.js` / `deploy-pages.yml` も新案件用に書き換えた。経緯は `PROGRESS.md` の「案件切り替えの記録」に残している
**発生STEP**：STEP1

## [2026-07-21] 画像52点が消えてサイトの画像が全て404になる
**症状**：`images/` 配下の画像52点がディスクから消え、`index.html` の47箇所の画像参照がすべて404になっていた
**原因**：WordPressテーマ化の作業途中で画像を `wp-content/themes/.../assets/images/` へ移動したが、HTML側の参照パスを更新していなかった
**対処法**：SHA照合で移動先に実体が残っている（消失ではない）ことを確認。今回は案件切り替えで作り直すため復元せず削除した。参照パスを伴う移動は、移動とHTML側の書き換えを必ず同じコミットで行う
**発生STEP**：STEP6

## [2026-07-21] stylelint --fix がベンダー接頭辞を落として宣言が重複する
**症状**：`stylelint --fix` 実行後、リセットCSSの `html` が `text-size-adjust: 100%;` を2行続けて持つ壊れた状態になった
**原因**：`stylelint-config-standard` の `property-no-vendor-prefix` が `-webkit-text-size-adjust` を自動修正で接頭辞なしに書き換え、元からあった接頭辞なしの宣言と重複した
**対処法**：iOS Safari は接頭辞なしの `text-size-adjust` に未対応のため接頭辞は必要。該当行に `/* stylelint-disable-next-line property-no-vendor-prefix */` を付けて残した。`--fix` 実行後は差分を必ず目視確認する
**発生STEP**：STEP1

## [2026-07-21] 複製リポジトリのgitリモートが旧案件を指したままになっている
**症状**：新案件の作業をしているのに `origin` が旧案件の `rifokatsubook.git` を指しており、pushすると旧案件のリポジトリに新案件の内容が入る状態だった
**原因**：リポジトリを複製した際、`origin` の付け替えを行っていなかった
**対処法**：STEP8でCandy Monster用の新リポジトリを作成し `origin` を差し替えるまでpushしない運用にした。複製で案件を始めるときは、最初に `git remote -v` を確認する
**発生STEP**：STEP1
