import { useMemo } from "react";
import styles from "./style.module.scss";

type Entry = {
  category: string;
  date: string;
  staffs: string[];
  title: string;
  url: string;
};

export type TopProps = {
  entries: Entry[];
};

function Top({ entries }: TopProps): JSX.Element {
  const items = useMemo(
    () =>
      entries.map(({ category, date, staffs, title, url }, index) => (
        <>
          {index > 0 ? <hr className={styles.hr} /> : null}
          <a className={styles.anchor} href={url} key={url} target="_blank">
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.category}>{category}</div>
            <ul className={styles.staffList}>
              {staffs.map((staff) => (
                <li key={staff}>
                  <div className={styles.staff}>{staff}</div>
                </li>
              ))}
            </ul>
            <div className={styles.date}>{date}</div>
          </a>
        </>
      )),
    [entries]
  );

  return <div>{items}</div>;
}

export default Top;
