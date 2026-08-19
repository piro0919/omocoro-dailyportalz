import React, { MouseEventHandler } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { AiOutlineSetting } from "react-icons/ai";
import { BsBoxArrowInDown } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";

export type HeaderProps = {
  enabledInstall: boolean;
  enabledUpdate: boolean;
  handleInstall: MouseEventHandler<HTMLButtonElement>;
  handleUpdate: MouseEventHandler<HTMLButtonElement>;
};

function Header({
  enabledInstall,
  enabledUpdate,
  handleInstall,
  handleUpdate,
}: HeaderProps): JSX.Element {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">
          <a>オモコロ&デイリーポータルＺ非公式リーダー</a>
        </Link>
      </h1>
      <div className={styles.iconsWrapper}>
        {/* <Link href="/preferences">
          <a>
            <AiOutlineSetting size={18} />
          </a>
        </Link> */}
        {enabledInstall ? (
          <button aria-label="アプリをインストール" onClick={handleInstall}>
            <BsBoxArrowInDown size={20} />
          </button>
        ) : null}
        {enabledUpdate ? (
          <button aria-label="最新に更新" onClick={handleUpdate}>
            <GrUpdate className={styles.updateIcon} size={14} />
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
