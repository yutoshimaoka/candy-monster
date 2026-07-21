## JavaScript ルール

- ハンバーガーメニュー・アコーディオンには `aria-expanded` / `aria-controls` を付ける
- `addEventListener` は関数化して1箇所で管理し、重複登録を避ける
- セクションを追加するたびにイベントを再定義しない（イベント委譲を活用する）
