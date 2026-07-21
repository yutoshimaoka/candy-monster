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

const BASE = '#FFFBF5',
  W = '#FFFFFF',
  INK = '#2B2430';

// トークン（base.css / DESIGN.md と対応）
const T = {
  pinkSoft: '#FDEEF2',
  coralSoft: '#FDE9E3',
  sunnySoft: '#FDF0DC',
  turquoiseSoft: '#E6F6F5',
  skySoft: '#E7F0FB',
  lavenderSoft: '#F0EDFE',
  cream: '#FDF8EE',
  neutralSoft: '#F1EEF0',
  candyStrong: '#E21D5F',
  coralStrong: '#DA3910',
  turquoiseStrong: '#0C837C',
  skyStrong: '#157BB6',
  aiStrong: '#715FEF',
  candyText: '#D31B59',
  coralText: '#C6340F',
  turquoiseText: '#0B7B74',
  skyText: '#1371A8',
  aiText: '#6551EE',
  sunnyText: '#8A5A00',
  textSecondary: '#6B6270',
};

// [ラベル, 前景, 背景, 必要比]
const checks = [
  ['本文 on 地', INK, BASE, 4.5],
  ['副次テキスト on 地', T.textSecondary, BASE, 4.5],
  ['本文 on 淡いピンク', INK, T.pinkSoft, 4.5],
  ['本文 on カード白', INK, W, 4.5],
  ['白 on CTAコーラル', W, T.coralStrong, 4.5],
  ['白 on CTAホバー', W, '#B82F0D', 4.5],
  ['白 on キャンディピンク', W, T.candyStrong, 4.5],
  ['白 on ターコイズ', W, T.turquoiseStrong, 4.5],
  ['白 on スカイブルー', W, T.skyStrong, 4.5],
  ['白 on ラベンダー(AI)', W, T.aiStrong, 4.5],
  ['白 on AIホバー', W, '#5C48E8', 4.5],
  ['白 on Discord', W, '#5865F2', 4.5],
  ['白 on Discordホバー', W, '#4450E0', 4.5],
  ['記事:悩み解決 candyText/pinkSoft', T.candyText, T.pinkSoft, 4.5],
  ['記事:試してみる coralText/coralSoft', T.coralText, T.coralSoft, 4.5],
  ['記事:AI aiText/lavenderSoft', T.aiText, T.lavenderSoft, 4.5],
  ['記事:安心 turqText/turqSoft', T.turquoiseText, T.turquoiseSoft, 4.5],
  ['記事:体験 skyText/skySoft', T.skyText, T.skySoft, 4.5],
  ['体験:できた turqText/turqSoft', T.turquoiseText, T.turquoiseSoft, 4.5],
  ['体験:少し変えた amber/sunnySoft', T.sunnyText, T.sunnySoft, 4.5],
  ['体験:合わなかった 副次/neutralSoft', T.textSecondary, T.neutralSoft, 4.5],
  ['本文 on AI背景', INK, T.lavenderSoft, 4.5],
  ['本文 on cream', INK, T.cream, 4.5],
  ['本文 on neutralSoft', INK, T.neutralSoft, 4.5],
  ['本文 on sunnySoft', INK, T.sunnySoft, 4.5],
  ['本文 on skySoft', INK, T.skySoft, 4.5],
  ['フォーカスリング on 地', '#157BB6', BASE, 3.0],
];

let fail = 0;
for (const [label, fg, bg, min] of checks) {
  const r = ratio(fg, bg);
  const pass = r >= min;
  if (!pass) fail++;
  console.log(`${pass ? '✅' : '❌'} ${label.padEnd(34)} ${r.toFixed(2)}:1 (要${min}:1)`);
}
console.log(fail === 0 ? '\nすべて基準を満たしています' : `\n${fail}件が基準未達`);
if (fail > 0) process.exitCode = 1;
