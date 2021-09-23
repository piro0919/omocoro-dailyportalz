import "ress";
import "../styles/global.scss";
import type { AppProps } from "next/app";
import React from "react";
import dynamic from "next/dynamic";
import usePwa2 from "use-pwa2";

const Wrapper = dynamic(() => import("components/Wrapper"), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  const { enabledInstall, enabledUpdate, installPwa, updatePwa } = usePwa2();

  return (
    <Wrapper
      enabledInstall={enabledInstall}
      enabledUpdate={enabledUpdate}
      handleInstall={installPwa}
      handleUpdate={updatePwa}
    >
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
