/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 設定ページは中身がまだ入っていないので、検索結果には出さない
  exclude: ["/preferences"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ allow: "/", disallow: ["/preferences"], userAgent: "*" }],
  },
  siteUrl: "https://omocoro-daily.kkweb.io",
};
