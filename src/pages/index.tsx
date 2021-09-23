import Top from "components/Top";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import scrapeIt from "scrape-it";

type Entry = {
  category: string;
  date: string;
  staffs: string[];
  title: string;
  url: string;
};

export type PagesProps = {
  entries: Entry[];
};

function Pages({ entries }: PagesProps) {
  return (
    <>
      <Head>
        <title>オモコロ非公式リーダー</title>
      </Head>
      <Top entries={entries} />
    </>
  );
}

export type StaticProps = PagesProps;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  // const items = await Promise.all(
  //   Array(5)
  //     .fill(undefined)
  //     .map((_, index) =>
  //       scrapeIt<{ entries: Entry[] }>(
  //         `https://omocoro.jp/newpost/page/${index + 1}`,
  //         {
  //           entries: {
  //             data: {
  //               category: {
  //                 selector: ".category",
  //               },
  //               date: {
  //                 selector: ".date",
  //               },
  //               staffs: {
  //                 listItem: ".staffs a",
  //               },
  //               title: {
  //                 selector: ".title",
  //               },
  //               url: {
  //                 attr: "href",
  //                 selector: ".image a",
  //               },
  //             },
  //             listItem: ".category-entries .box:not(.ad)",
  //           },
  //         }
  //       )
  //     )
  // );
  // const entries = items.map(({ data: { entries } }) => entries).flat();
  const entries = [
    {
      category: "ブロス",
      date: "2021.09.23",
      staffs: ["ストーム叉焼"],
      title:
        "MTGとD＆Dがコラボした「フォーゴトン・レルム探訪」はTRPGテイスト満載で楽しい！",
      url: "https://omocoro.jp/bros/kiji/305896",
    },
    {
      category: "4コマ",
      date: "2021.09.23",
      staffs: ["ニャロメロン"],
      title: "【４コマ漫画】耳元カユイ　今日の切り抜き",
      url: "https://omocoro.jp/comic/309689/",
    },
    {
      category: "特集",
      date: "2021.09.23",
      staffs: ["山下ラジ男"],
      title: "【令和・平成】仮面ライダーのバイクシーン全部数えた",
      url: "https://omocoro.jp/kiji/306957/",
    },
    {
      category: "ラジオ",
      date: "2021.09.23",
      staffs: [],
      title:
        "【273】ARuFa・恐山の匿名ラジオ「偉人伝みたいに幼少期のエピソードを現在の活動に強引にヒモ付けよう！」",
      url: "https://omocoro.jp/radio/309653/",
    },
    {
      category: "4コマ",
      date: "2021.09.22",
      staffs: ["ショルダー肩美"],
      title: "【4コマ漫画】ゼリー百物語『るな』",
      url: "https://omocoro.jp/comic/309678/",
    },
    {
      category: "ブロス",
      date: "2021.09.22",
      staffs: ["JUNERAY"],
      title: "タカラトミー製インスタントカメラ「Pixtoss」が面白い！",
      url: "https://omocoro.jp/bros/kiji/309050",
    },
    {
      category: "おにぎりクラブ限定",
      date: "2021.09.22",
      staffs: ["オモコロ編集部"],
      title: "【ほかおに限定】プレゼントキャンペーンのお知らせ【9月分】",
      url: "https://omocoro.jp/onigiri/kiji/309430",
    },
    {
      category: "特集",
      date: "2021.09.22",
      staffs: ["のやつ"],
      title: "【まんが】技覚えたけど今はダメだろってやつ",
      url: "https://omocoro.jp/kiji/303163/",
    },
    {
      category: "ラジオ",
      date: "2021.09.22",
      staffs: ["加藤 亮", "長島"],
      title:
        "【172】長島・加藤のイうてるマにイっちゃってる「ソシャゲ広告に騙されチゃってる」",
      url: "https://omocoro.jp/radio/309513/",
    },
    {
      category: "4コマ",
      date: "2021.09.21",
      staffs: ["長イキアキヒコ"],
      title: "【4コマ】最後の食事",
      url: "https://omocoro.jp/comic/309639/",
    },
    {
      category: "おにぎりクラブ限定",
      date: "2021.09.21",
      staffs: ["ダ・ヴィンチ・恐山", "マンスーン"],
      title: "【いくら座談会】BGMが作れるサービス「スキマサウンド」の裏話",
      url: "https://omocoro.jp/onigiri/pro/309367",
    },
    {
      category: "動画",
      date: "2021.09.21",
      staffs: [],
      title: "知恵と工夫でママをあざむけ！エロ本隠し選手権２！",
      url: "https://youtu.be/aeWMmSgsm1I",
    },
    {
      category: "特集",
      date: "2021.09.21",
      staffs: ["金輪財 雑魚"],
      title: "【お嬢様】２０歳になったので経費でお酒を飲むわよ！",
      url: "https://omocoro.jp/kiji/304367/",
    },
    {
      category: "ラジオ",
      date: "2021.09.21",
      staffs: [],
      title:
        "【92】マンスーン・ヤスミノの音声放送「クーポンのために生まれてきたわけじゃない」",
      url: "https://omocoro.jp/radio/309268/",
    },
    {
      category: "おにぎりクラブ限定",
      date: "2021.09.20",
      staffs: ["リックェ", "店長"],
      title:
        "【ほかおに限定】店長・リックェの変えるラジオ〜多様性を尊重できないと死の時代【17】",
      url: "https://omocoro.jp/onigiri/kiji/309001",
    },
    {
      category: "ブロス",
      date: "2021.09.20",
      staffs: ["みくのしん"],
      title:
        "実家に帰れねーから、おふくろの味自分で作って食ってごちそうさま言う伝",
      url: "https://omocoro.jp/bros/kiji/306575",
    },
    {
      category: "4コマ",
      date: "2021.09.20",
      staffs: ["地球のお魚ぽんちゃん"],
      title: "【4コマ漫画】サボり先輩84",
      url: "https://omocoro.jp/comic/309244/",
    },
    {
      category: "特集",
      date: "2021.09.20",
      staffs: ["石垣りょう"],
      title: "漫画「転生したと思ったら地獄でした」",
      url: "https://omocoro.jp/kiji/304213/",
    },
    {
      category: "おにぎりクラブ限定",
      date: "2021.09.20",
      staffs: ["原宿"],
      title: "【毎日更新】2021年9月後半の日記",
      url: "https://omocoro.jp/onigiri/kiji/308980",
    },
    {
      category: "ラジオ",
      date: "2021.09.20",
      staffs: ["原宿", "室木おすし"],
      title: "ありっちゃありスパーク・マシュ010「ラビリンス　～迷宮～」",
      url: "https://omocoro.jp/radio/309220/",
    },
    {
      category: "ブロス",
      date: "2021.09.19",
      staffs: ["ナ月"],
      title: "子供の頃の愚行を振り返ろうぜ！！PART4",
      url: "https://omocoro.jp/bros/kiji/299669",
    },
    {
      category: "ラジオ",
      date: "2021.09.19",
      staffs: ["凸ノ"],
      title:
        "ラジオ漫画犬咆哮編10「100年ぶりにナイトスクープの話をしようの巻」",
      url: "https://omocoro.jp/radio/309141/",
    },
    {
      category: "4コマ",
      date: "2021.09.18",
      staffs: ["キューライス"],
      title: "【4コマ漫画】夜の訪問者2021年9月18日",
      url: "https://omocoro.jp/comic/293218/",
    },
    {
      category: "連載",
      date: "2021.09.18",
      staffs: ["オモコロ編集部"],
      title: "【30分チャット】9月第3週のオモコロまとめ",
      url: "https://omocoro.jp/rensai/309124/",
    },
    {
      category: "ラジオ",
      date: "2021.09.18",
      staffs: ["モンゴルナイフ", "ヤスミノ"],
      title:
        "【078】ラジオ・モンゴルナイトフィーバー 「冥府の入口の番犬ケンべンス」",
      url: "https://omocoro.jp/radio/309087/",
    },
    {
      category: "動画",
      date: "2021.09.17",
      staffs: [],
      title: "お味噌汁にはね、何を入れてもええんですわ",
      url: "https://youtu.be/reYcGO1EZws",
    },
    {
      category: "4コマ",
      date: "2021.09.17",
      staffs: ["ポテチ光秀"],
      title: "【4コマ漫画】HOLDER",
      url: "https://omocoro.jp/comic/309041/",
    },
    {
      category: "記事広告",
      date: "2021.09.17",
      staffs: ["ARuFa"],
      title:
        "【検証】うどん生地をプロレスの試合に投入したら攻撃の圧力で美味くなるのか？",
      url: "https://omocoro.jp/kiji/305778/",
    },
    {
      category: "ジモコロ",
      date: "2021.09.17",
      staffs: ["ジモコロ編集部"],
      title: "雑念日記｜あいみょんの分裂、他",
      url: "https://www.e-aidem.com/ch/jimocoro/entry/ueda25",
    },
    {
      category: "ラジオ",
      date: "2021.09.17",
      staffs: ["かまど", "みくのしん"],
      title: "【25】作業用かまみく「ドリンクバーで悩むならビールを飲め」",
      url: "https://omocoro.jp/radio/308861/",
    },
    {
      category: "4コマ",
      date: "2021.09.16",
      staffs: ["寺田大熊猫楠"],
      title: "条件反射",
      url: "https://omocoro.jp/comic/308963/",
    },
    {
      category: "ブロス",
      date: "2021.09.16",
      staffs: ["はじめ"],
      title: "【二次創作】公式から非公式で夢小説発表します（悲恋有）",
      url: "https://omocoro.jp/bros/kiji/307656",
    },
    {
      category: "特集",
      date: "2021.09.16",
      staffs: ["雨穴"],
      title: "中古住宅で発見された、不気味なビデオテープの正体",
      url: "https://omocoro.jp/kiji/303180/",
    },
    {
      category: "ラジオ",
      date: "2021.09.16",
      staffs: [],
      title:
        "【272】ARuFa・恐山の匿名ラジオ「俺たちは何としてでも料理バトルで勝利した～い！！」",
      url: "https://omocoro.jp/radio/308885/",
    },
    {
      category: "4コマ",
      date: "2021.09.15",
      staffs: ["ショルダー肩美"],
      title: "【4コマ漫画】ゼリー百物語『ゆるキャラ』",
      url: "https://omocoro.jp/comic/308936/",
    },
    {
      category: "おにぎりクラブ限定",
      date: "2021.09.15",
      staffs: ["オモコロ編集部"],
      title: "【会議ログ】俺たちもCMに出たい",
      url: "https://omocoro.jp/onigiri/kiji/307621",
    },
    {
      category: "ブロス",
      date: "2021.09.15",
      staffs: ["モンゴルナイフ"],
      title:
        "【3アイテム】ほぼ合計5,000円で全身からキンモクセイを香らせてみる秋",
      url: "https://omocoro.jp/bros/kiji/308348",
    },
    {
      category: "特集",
      date: "2021.09.15",
      staffs: ["dtcn"],
      title: "【漫画】dtcnのスーパーダイナミックDオリジナル4コマ",
      url: "https://omocoro.jp/kiji/305281/",
    },
    {
      category: "ラジオ",
      date: "2021.09.15",
      staffs: ["加藤 亮", "長島"],
      title:
        "【171】長島・加藤のイうてるマにイっちゃってる「きっと譲られちゃってる」",
      url: "https://omocoro.jp/radio/308631/",
    },
    {
      category: "4コマ",
      date: "2021.09.14",
      staffs: ["長イキアキヒコ"],
      title: "【4コマ】ギャル医者あやっぺ３－２１",
      url: "https://omocoro.jp/comic/308838/",
    },
    {
      category: "動画",
      date: "2021.09.14",
      staffs: [],
      title: "言葉の七並べ「ソコウメ！！」でずーっとややギレする大人たち",
      url: "https://youtu.be/U71lZAxtuY0",
    },
    {
      category: "特集",
      date: "2021.09.14",
      staffs: ["オケモト"],
      title: "【大学いも】いろいろな食べ物を大学に入れよう",
      url: "https://omocoro.jp/kiji/301692/",
    },
    {
      category: "ジモコロ",
      date: "2021.09.14",
      staffs: ["ジモコロ編集部"],
      title: "アイドルのファンはどうやって生活してるの？【ドルオタ達の伝説】",
      url: "https://www.e-aidem.com/ch/jimocoro/entry/koenuma12",
    },
    {
      category: "ラジオ",
      date: "2021.09.14",
      staffs: [],
      title:
        "【91】マンスーン・ヤスミノの音声放送「自分のグッズが売れ残る事とホラーについて」",
      url: "https://omocoro.jp/radio/308465/",
    },
    {
      category: "おにぎりクラブ限定",
      date: "2021.09.13",
      staffs: ["オモコロ編集部"],
      title:
        "【ほかおに会員限定イベント】「ほかおにリモート飲み会」開催のお知らせ【第42回】",
      url: "https://omocoro.jp/onigiri/kiji/308429",
    },
    {
      category: "おにぎりクラブ限定",
      date: "2021.09.13",
      staffs: ["リックェ", "店長"],
      title:
        "【ほかおに限定】店長・リックェの変えるラジオ〜My First Stunning【16】",
      url: "https://omocoro.jp/onigiri/kiji/306516",
    },
    {
      category: "ブロス",
      date: "2021.09.13",
      staffs: ["天野アマゾネス"],
      title: "横浜中華街の冷やし中華を食べ比べて最高の冷やし中華を作った",
      url: "https://omocoro.jp/bros/kiji/304415",
    },
    {
      category: "4コマ",
      date: "2021.09.13",
      staffs: ["鴻池剛"],
      title: "【4コマ漫画】アナログならでは",
      url: "https://omocoro.jp/comic/308436/",
    },
    {
      category: "特集",
      date: "2021.09.13",
      staffs: ["鬼谷"],
      title: "生わさびの味を知りました",
      url: "https://omocoro.jp/kiji/305368/",
    },
    {
      category: "おにぎりクラブ限定",
      date: "2021.09.13",
      staffs: ["原宿"],
      title: "2021年9月前半の日記",
      url: "https://omocoro.jp/onigiri/kiji/306532",
    },
  ];

  return {
    props: {
      entries,
    },
    // 12 時間ごとに更新
    revalidate: 60 * 60 * 12,
  };
};

export default Pages;
