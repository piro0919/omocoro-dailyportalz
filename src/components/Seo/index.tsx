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
    description: "オモコロとデイリーポータルＺから最新の記事を取得します",
    indexable: true,
    title: SITE_NAME,
  },
  "/preferences": {
    description: "表示の設定を変更します。",
    indexable: false,
    title: "設定",
  },
};

/**
 * _app は Wrapper を ssr:false の dynamic で読んでいる。
 * その内側にあるページの next/head はサーバーで描画されないため、
 * ページ側に <title> を書いても HTML に出ない。
 * Wrapper の外側にあたるここでまとめて出す。
 */
function Seo(): JSX.Element {
  const { pathname } = useRouter();
  const page = pages[pathname] || pages["/"];
  const url = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const title =
    page.title === SITE_NAME ? SITE_NAME : `${page.title} | ${SITE_NAME}`;

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
