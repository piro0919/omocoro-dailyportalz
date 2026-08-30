import Seo from "components/Seo";
import "ress";
import "../styles/global.scss";
import type { AppProps } from "next/app";
import React from "react";
import usePwa2 from "use-pwa2";
import Wrapper from "components/Wrapper";

function MyApp({ Component, pageProps }: AppProps) {
  const { enabledInstall, enabledUpdate, installPwa, updatePwa } = usePwa2();

  return (
    <>
      <Seo />
      <Wrapper
        enabledInstall={enabledInstall}
        enabledUpdate={enabledUpdate}
        handleInstall={installPwa}
        handleUpdate={updatePwa}
      >
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
}

export default MyApp;
