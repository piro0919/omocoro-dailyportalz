import Top from "components/Top";
import { GetStaticProps } from "next";
import React from "react";
import scrapeIt from "scrape-it";
import dayjs from "dayjs";

type Entry = {
  category: string;
  date: string;
  staffs: string[];
  title: string;
  url: string;
};

type OmocoroEntry = Entry;

type DailyPortalZEntry = Omit<Entry, "category" | "staffs"> & {
  staff: string;
};

export type PagesProps = {
  entries: Entry[];
};

function Pages({ entries }: PagesProps) {
  return (
    <Top entries={entries} />
  );
}

export type StaticProps = PagesProps;

/** 取りに行く相手に、誰が何のために来ているかを名乗る。 */
const USER_AGENT =
  "omocoro-dailyportalz (+https://github.com/piro0919/omocoro-dailyportalz)";
/** 同じサイトへ続けて取りに行くときの間隔。 */
const REQUEST_INTERVAL_MS = 1000;
const OMOCORO_NEWPOST_PAGES = 5;

const omocoroEntryOptions = {
  category: {
    selector: ".category",
  },
  date: {
    selector: ".date",
  },
  staffs: {
    listItem: ".staffs a",
  },
  title: {
    selector: ".title",
  },
  url: {
    attr: "href",
    selector: ".image a",
  },
};

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// scrape-it はリダイレクトを追わず、200 以外でも空の結果を返す。
// 状態を確かめ、黙って空のページを作らないようにする。
async function scrape<T>(
  url: string,
  options: scrapeIt.ScrapeOptions,
): Promise<T> {
  const { data, response } = await scrapeIt<T>(
    { headers: { "User-Agent": USER_AGENT }, url },
    options,
  );
  const status: number | undefined = response?.statusCode;

  if (status !== 200) {
    throw new Error(`${url} responded ${status}`);
  }

  return data;
}

// 1 ページ目は /newpost/ が正。/newpost/page/1 は 301 で、
// 末尾の / がない URL もリダイレクトされる。
function omocoroNewpostUrl(page: number): string {
  return page === 1
    ? "https://omocoro.jp/newpost/"
    : `https://omocoro.jp/newpost/page/${page}/`;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const { entries: latestOmocoroEntries } = await scrape<{
    entries: OmocoroEntry[];
  }>("https://omocoro.jp/", {
    entries: {
      data: omocoroEntryOptions,
      listItem: ".new-entries .box:not(.ad)",
    },
  });
  const omocoroEntries: OmocoroEntry[] = [];

  // 一度に投げず、間を空けて 1 ページずつ取る。
  for (let page = 1; page <= OMOCORO_NEWPOST_PAGES; page += 1) {
    await wait(REQUEST_INTERVAL_MS);

    const { entries } = await scrape<{ entries: OmocoroEntry[] }>(
      omocoroNewpostUrl(page),
      {
        entries: {
          data: omocoroEntryOptions,
          listItem: ".category-entries .box:not(.ad)",
        },
      },
    );

    omocoroEntries.push(...entries);
  }

  const { entries: dailyPortalZEntries } = await scrape<{
    entries: DailyPortalZEntry[];
  }>("https://dailyportalz.jp/kiji", {
    entries: {
      // 1 行に「(書いた人) [2026/10/01]」が地の文で並ぶ。そこから抜き出す。
      data: {
        date: {
          convert: (text: string) => {
            const matched = /\[(\d{4})\/(\d{1,2})\/(\d{1,2})\]\s*$/.exec(text);

            return matched
              ? `${matched[1]}-${matched[2].padStart(2, "0")}-${matched[3].padStart(2, "0")}`
              : "";
          },
          selector: ".tx-format",
        },
        staff: {
          convert: (text: string) =>
            /\(([^()]*)\)\s*\[[^\]]*\]\s*$/.exec(text)?.[1] ?? "",
          selector: ".tx-format",
        },
        title: {
          selector: ".headline",
        },
        url: {
          attr: "href",
          selector: ".headline",
        },
      },
      listItem: ".backnumberIndex .headline-row",
    },
  });

  // 構造が変わると scrape-it は黙って空を返す。ここで投げれば、
  // ISR は前回うまく作れたページを出し続ける。
  if (omocoroEntries.length === 0) {
    throw new Error("no entries found on the omocoro newpost pages");
  }

  if (!dailyPortalZEntries.some(({ title }) => title)) {
    throw new Error("no entries found on the daily portal z backnumber page");
  }

  const entries = [
    ...latestOmocoroEntries.filter(
      ({ title }) =>
        !omocoroEntries.find(({ title: title2 }) => title === title2),
    ),
    ...omocoroEntries,
    ...dailyPortalZEntries.map(({ staff, url, ...entry }) => {
      let category = "";

      if (url.includes("/tv/")) {
        category = "プープーテレビ";
      } else if (url.includes("/dpq/")) {
        category = "編集部日記";
      } else {
        category = "特集など";
      }

      return {
        ...entry,
        category,
        // 読者投稿の行には書いた人が載らない。
        staffs: staff ? staff.split("・") : [],
        url: `${url.startsWith("/") ? "https://dailyportalz.jp" : ""}${url}`,
      };
    }),
  ]
    .filter(({ title }) => title)
    .map(({ date, ...entry }) => ({
      ...entry,
      date: dayjs(date),
    }))
    // 新しい日付が先。読めない日付は最後に回す。同じ日付どうしは
    // 取ってきた順（おもコロのトップ、新着、デイリーポータルZ）のまま並ぶ。
    .sort(
      ({ date: dateA }, { date: dateB }) =>
        (dateB.isValid() ? dateB.valueOf() : -Infinity) -
          (dateA.isValid() ? dateA.valueOf() : -Infinity) || 0,
    )
    .filter((_, index) => index < 100)
    .map(({ date, ...entry }) => ({
      ...entry,
      date: date.format("YYYY.MM.DD"),
    }));

  return {
    props: {
      entries,
    },
    // 6 時間ごとに更新
    revalidate: 60 * 60 * 6,
  };
};

export default Pages;
