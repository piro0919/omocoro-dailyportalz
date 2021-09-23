import Footer from "components/Footer";
import Header, { HeaderProps } from "components/Header";
import { CSSProperties, ReactNode, useMemo } from "react";
import { useWindowHeight } from "@react-hook/window-size";
import styles from "./style.module.scss";

export type WrapperProps = Pick<
  HeaderProps,
  "enabledInstall" | "enabledUpdate" | "handleInstall" | "handleUpdate"
> & {
  children: ReactNode;
};

function Wrapper({
  children,
  enabledInstall,
  enabledUpdate,
  handleInstall,
  handleUpdate,
}: WrapperProps): JSX.Element {
  const onlyHeight = useWindowHeight();
  const style = useMemo<CSSProperties>(
    () => ({
      minHeight: `${onlyHeight}px`,
    }),
    [onlyHeight]
  );

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.headerWrapper}>
        <Header
          enabledInstall={enabledInstall}
          enabledUpdate={enabledUpdate}
          handleInstall={handleInstall}
          handleUpdate={handleUpdate}
        />
      </div>
      <main className={styles.main}>{children}</main>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
}

export default Wrapper;
