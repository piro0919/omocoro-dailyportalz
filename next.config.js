// next-pwa は 5.6 で呼び方が変わった。設定を先に渡してから包む形でないと、
// pwa の中身がそのまま Workbox へ流れ、'pwa' property is not expected と言われる。
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({});
