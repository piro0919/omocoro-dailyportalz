import Footer from "components/Footer";
import Header, { HeaderProps } from "components/Header";
import { ReactNode } from "react";
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
  return (
    <div className={styles.wrapper}>
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
