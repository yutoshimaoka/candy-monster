// エディトリアル・ニュートラルのコントラスト検証（styles/base.css と対応）
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
  base: '#F5EFE7',
  subtle: '#EBDCD4',
  white: '#FFFFFF',
  ink: '#2A2622',
  sub: '#635B52',
  cta: '#262220', // = discord も同値（チャコール）
  aiFill: '#E3D9CB',
  aiBg: '#EFE7DD',
  // ニュアンス・アクセント面
  rose: '#D9B9AD',
  sand: '#D8C3AE',
  gold: '#E4D9C4',
  sage: '#BFC9BE',
  mist: '#B9C0CB',
  mauve: '#C6BBC7',
  // soft ティント
  pinkSoft: '#EAD9D1',
  coralSoft: '#E9E1D2',
  sunnySoft: '#EDE6D5',
  turquoiseSoft: '#DFE3DB',
  skySoft: '#DEE1E6',
  lavenderSoft: '#E7E0E7',
  cream: '#F5EFE6',
  neutralSoft: '#ECE7E0',
};

// [ラベル, 前景, 背景, 必要比]
const checks = [
  // 黒（チャコール）文字 on 地・面
  ['ink on base', T.ink, T.base, 4.5],
  ['ink on subtle(section)', T.ink, T.subtle, 4.5],
  ['ink on white(card)', T.ink, T.white, 4.5],
  ['ink on aiBg(section)', T.ink, T.aiBg, 4.5],
  // 黒文字 on アクセント（ラベル・チップ・AIボタン）
  ['ink on aiFill(AIボタン)', T.ink, T.aiFill, 4.5],
  ['ink on rose', T.ink, T.rose, 4.5],
  ['ink on sand', T.ink, T.sand, 4.5],
  ['ink on gold', T.ink, T.gold, 4.5],
  ['ink on sage', T.ink, T.sage, 4.5],
  ['ink on mist', T.ink, T.mist, 4.5],
  ['ink on mauve', T.ink, T.mauve, 4.5],
  // 黒文字 on soft ティント
  ['ink on pinkSoft', T.ink, T.pinkSoft, 4.5],
  ['ink on coralSoft', T.ink, T.coralSoft, 4.5],
  ['ink on sunnySoft', T.ink, T.sunnySoft, 4.5],
  ['ink on turquoiseSoft', T.ink, T.turquoiseSoft, 4.5],
  ['ink on skySoft', T.ink, T.skySoft, 4.5],
  ['ink on lavenderSoft', T.ink, T.lavenderSoft, 4.5],
  ['ink on cream', T.ink, T.cream, 4.5],
  ['ink on neutralSoft', T.ink, T.neutralSoft, 4.5],
  // 副次テキスト
  ['sub on base', T.sub, T.base, 4.5],
  ['sub on white', T.sub, T.white, 4.5],
  ['sub on subtle', T.sub, T.subtle, 4.5],
  ['sub on aiBg', T.sub, T.aiBg, 4.5],
  ['sub on cream', T.sub, T.cream, 4.5],
  // 白文字（CTA / Discord＝チャコール面）
  ['white on cta/discord', T.white, T.cta, 4.5],
  // フォーカスリング（非文字なので3:1）
  ['focus(ink) ring on base', T.ink, T.base, 3.0],
];

let fail = 0;
for (const [label, fg, bg, min] of checks) {
  const r = ratio(fg, bg);
  const pass = r >= min;
  if (!pass) fail++;
  console.log(`${pass ? '✅' : '❌'} ${label.padEnd(28)} ${r.toFixed(2)}:1 (要${min})`);
}
console.log(fail === 0 ? '\n✅ すべて基準を満たしています' : `\n❌ ${fail}件が基準未達`);
if (fail > 0) process.exitCode = 1;
