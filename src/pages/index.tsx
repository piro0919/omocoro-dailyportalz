import Top from "components/Top";
import { GetStaticProps } from "next";
import Head from "next/head";
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
    <>
      <Head>
        <title>オモコロ&デイリーポータルＺ非公式リーダー</title>
      </Head>
      <Top entries={entries} />
    </>
  );
}

export type StaticProps = PagesProps;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const {
    data: { entries: latestOmocoroEntries },
  } = await scrapeIt<{ entries: OmocoroEntry[] }>("https://omocoro.jp", {
    entries: {
      data: {
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
      },
      listItem: ".new-entries .box:not(.ad)",
    },
  });
  const items = await Promise.all([
    ...Array(4)
      .fill(undefined)
      .map((_, index) =>
        scrapeIt<{ entries: OmocoroEntry[] }>(
          `https://omocoro.jp/newpost/page/${index}`,
          {
            entries: {
              data: {
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
              },
              listItem: ".category-entries .box:not(.ad)",
            },
          }
        )
      ),
  ]);
  const omocoroEntries = items.map(({ data: { entries } }) => entries).flat();
  const {
    data: { entries: dailyPortalZEntries },
  } = await scrapeIt<{ entries: DailyPortalZEntry[] }>(
    "https://dailyportalz.jp/kiji",
    {
      entries: {
        data: {
          date: {
            selector: "b font",
          },
          staff: {
            selector: ".gray10",
          },
          title: {
            selector: "a",
          },
          url: {
            attr: "href",
            selector: "a",
          },
        },
        listItem: ".backnumberIndex tr",
      },
    }
  );
  const entries = Array.from(
    new Set(
      [
        ...latestOmocoroEntries.sort(() => 0.5 - Math.random()),
        ...omocoroEntries.sort(() => 0.5 - Math.random()),
        ...dailyPortalZEntries
          .sort(() => 0.5 - Math.random())
          .map(({ staff, url, ...entry }) => {
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
              staffs: staff.replace("（", "").replace("）", "").split("・"),
              url: `${
                url.startsWith("/") ? "https://dailyportalz.jp" : ""
              }${url}`,
            };
          }),
      ].filter(({ title }) => title)
    )
  )
    .map(({ date, ...entry }) => ({
      ...entry,
      date: dayjs(date),
    }))
    .sort(({ date: dateA }, { date: dateB }) =>
      dayjs(dateA).isBefore(dayjs(dateB)) ? 1 : -1
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
