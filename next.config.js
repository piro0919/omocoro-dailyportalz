// next-pwa は 5.6 で呼び方が変わった。設定を先に渡してから包む形でないと、
// pwa の中身がそのまま Workbox へ流れ、'pwa' property is not expected と言われる。
const withPWA = require("next-pwa")({
  // Next 15 以降、webpack の出力に dynamic-css-manifest.json が混ざるが、
  // 配信はされず 404 になる。precache に1つでも 404 があると
  // Service Worker のインストールごと失敗するので外す。
  buildExcludes: [/dynamic-css-manifest\.json$/],
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  // next-pwa は webpack のプラグインで、Turbopack では sw.js が作られない。
  // そのため build は --webpack で走らせる。dev では PWA を切っているので
  // Turbopack のままでよく、空の設定を置いて webpack 設定への警告を黙らせる。
  turbopack: {},
});
