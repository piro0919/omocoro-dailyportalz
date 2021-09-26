import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            content="オモコロ&デイリーポータルＺ非公式リーダー"
            name="application-name"
          />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta
            content="default"
            name="apple-mobile-web-app-status-bar-style"
          />
          <meta
            content="オモコロ&デイリーポータルＺ非公式リーダー"
            name="apple-mobile-web-app-title"
          />
          <meta
            content="オモコロとデイリーポータルＺから最新の記事を取得します"
            name="description"
          />
          <meta content="telephone=no" name="format-detection" />
          <meta content="yes" name="mobile-web-app-capable" />
          {/* <meta content="/browserconfig.xml" name="msapplication-config" /> */}
          <meta content="#2B5797" name="msapplication-TileColor" />
          <meta content="no" name="msapplication-tap-highlight" />
          <meta content="#000000" name="theme-color" />
          <link href="/logo512.png" rel="apple-touch-icon" />
          {/* <link
            href="/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/touch-icon-ipad.png"
            rel="apple-touch-icon"
            sizes="152x152"
          />
          <link
            href="/touch-icon-ipad-retina.png"
            rel="apple-touch-icon"
            sizes="167x167"
          />
          <link
            href="/touch-icon-iphone-retina.png"
            rel="apple-touch-icon"
            sizes="180x180"
          /> */}
          <link href="/manifest.json" rel="manifest" />
          {/* <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" /> */}
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta content="summary" name="twitter:card" />
          <meta
            content="https://omocoro-daily.kk-web.link"
            name="twitter:url"
          />
          <meta
            content="オモコロ&デイリーポータルＺ非公式リーダー"
            name="twitter:title"
          />
          <meta
            content="オモコロとデイリーポータルＺから最新の記事を取得します"
            name="twitter:description"
          />
          <meta
            content="https://omocoro-daily.kk-web.link/logo192.png"
            name="twitter:image"
          />
          {/* <meta content="@DavidWShadow" name="twitter:creator" /> */}
          <meta content="website" property="og:type" />
          <meta
            content="オモコロ&デイリーポータルＺ非公式リーダー"
            property="og:title"
          />
          <meta
            content="オモコロとデイリーポータルＺから最新の記事を取得します"
            property="og:description"
          />
          <meta
            content="オモコロ&デイリーポータルＺ非公式リーダー"
            property="og:site_name"
          />
          <meta content="https://omocoro-daily.kk-web.link" property="og:url" />
          <meta
            content="https://omocoro-daily.kk-web.link/logo512.png"
            property="og:image"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
