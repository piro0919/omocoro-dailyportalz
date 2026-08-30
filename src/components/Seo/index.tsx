import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const SITE_URL = "https://omocoro-daily.kkweb.io";
const SITE_NAME = "オモコロ&デイリーポータルＺ非公式リーダー";

type PageSeo = {
  description: string;
  indexable: boolean;
  title: string;
};

const pages: { [pathname: string]: PageSeo } = {
  "/": {
    description:
      "オモコロとデイリーポータルZの新着記事を、1つの画面にまとめて読めます。2サイトを行き来せず、最新100件を公開日順に追えます。",
    indexable: true,
    // 検索されるのは半角 Z の「デイリーポータルZ」。本家の表記に合わせる
    title: "オモコロとデイリーポータルZの新着記事まとめ｜非公式リーダー",
  },
  "/preferences": {
    description: "表示の設定を変更します。",
    indexable: false,
    title: "設定",
  },
};

/** ページごとの title と description をここでまとめて出す。 */
function Seo(): JSX.Element {
  const { pathname } = useRouter();
  const page = pages[pathname] || pages["/"];
  const url = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  // トップの title はそれ自体で完結しているので、サイト名を足さない
  const title =
    page === pages["/"] ? page.title : `${page.title} | ${SITE_NAME}`;

  return (
    <Head>
      <title>{title}</title>
      <meta content={page.description} name="description" />
      <link href={url} rel="canonical" />
      <meta content={title} property="og:title" />
      <meta content={page.description} property="og:description" />
      <meta content={url} property="og:url" />
      <meta content={title} name="twitter:title" />
      <meta content={page.description} name="twitter:description" />
      {page.indexable ? null : (
        <meta content="noindex, nofollow" name="robots" />
      )}
    </Head>
  );
}

export default Seo;
