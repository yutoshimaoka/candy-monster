// Y2K パステル・パレットのコントラスト検証（styles/base.css と対応）
// 実行：npm run check:contrast
const hex = (h) => {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const lum = (h) =>
  hex(h)
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const T = {
  peach: '#FBEBDD',
  pink: '#F7D4E6',
  white: '#FFFFFF',
  ink: '#1A1A1A',
  sub: '#575163',
  // vivid / accent（黒文字を乗せる面）
  candyPink: '#F3A9D0',
  coral: '#F6B38C',
  lime: '#ECEE5F',
  mint: '#8FD7C0',
  periVivid: '#A9B8F0',
  lavender: '#B7A3EA',
  peri: '#8E7EE0',
  // soft ティント
  pinkSoft: '#FBDCEC',
  coralSoft: '#FBDBCB',
  limeSoft: '#F5F6B8',
  mintSoft: '#D5EFE4',
  periSoft: '#DCE3F8',
  lavenderSoft: '#E4DAF7',
  cream: '#FCEFDD',
  neutralSoft: '#EFE9EF',
  // 濃色（白文字）
  discord: '#5865F2',
  focus: '#6551EE',
};

// [ラベル, 前景, 背景, 必要比]
const checks = [
  // 黒文字 on 地・面
  ['ink on peach(base)', T.ink, T.peach, 4.5],
  ['ink on pink(section)', T.ink, T.pink, 4.5],
  ['ink on white(card)', T.ink, T.white, 4.5],
  ['ink on lavender(AI/community)', T.ink, T.lavenderSoft, 4.5],
  // 黒文字 on アクセント（ボタン・ラベル・ハイライト）
  ['ink on lime(CTA/highlight)', T.ink, T.lime, 4.5],
  ['ink on lavender-accent(AIボタン)', T.ink, T.lavender, 4.5],
  ['ink on candyPink', T.ink, T.candyPink, 4.5],
  ['ink on coral(peach)', T.ink, T.coral, 4.5],
  ['ink on mint', T.ink, T.mint, 4.5],
  ['ink on periVivid', T.ink, T.periVivid, 4.5],
  // 黒文字 on soft ティント（ラベル地・アイコン背景）
  ['ink on pinkSoft', T.ink, T.pinkSoft, 4.5],
  ['ink on coralSoft', T.ink, T.coralSoft, 4.5],
  ['ink on limeSoft', T.ink, T.limeSoft, 4.5],
  ['ink on mintSoft', T.ink, T.mintSoft, 4.5],
  ['ink on periSoft', T.ink, T.periSoft, 4.5],
  ['ink on cream', T.ink, T.cream, 4.5],
  ['ink on neutralSoft', T.ink, T.neutralSoft, 4.5],
  // 副次テキスト
  ['sub on peach', T.sub, T.peach, 4.5],
  ['sub on white', T.sub, T.white, 4.5],
  ['sub on pink', T.sub, T.pink, 4.5],
  ['sub on lavenderSoft', T.sub, T.lavenderSoft, 4.5],
  ['sub on cream', T.sub, T.cream, 4.5],
  // 白文字（Discord）
  ['white on discord', T.white, T.discord, 4.5],
  // フォーカスリング（非文字なので3:1）
  ['focus ring on peach', T.focus, T.peach, 3.0],
  ['focus ring on white', T.focus, T.white, 3.0],
];

let fail = 0;
for (const [label, fg, bg, min] of checks) {
  const r = ratio(fg, bg);
  const pass = r >= min;
  if (!pass) fail++;
  console.log(`${pass ? '✅' : '❌'} ${label.padEnd(30)} ${r.toFixed(2)}:1 (要${min})`);
}
console.log(fail === 0 ? '\n✅ すべて基準を満たしています' : `\n❌ ${fail}件が基準未達`);
if (fail > 0) process.exitCode = 1;
