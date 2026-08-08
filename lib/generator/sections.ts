// ===========================================================================
// note記事ジェネレーター — 型ごとの本文セクション生成
// ===========================================================================

import type { Length, Preset } from "./types";
import type { AudienceMeta, ToneMeta } from "./content";
import { LENGTH_LIST_ITEMS } from "./content";
import { pick, shuffle, type Rng } from "./rng";

export interface BuildCtx {
  rng: Rng;
  /** テーマ（整形済み） */
  T: string;
  keywords: string[];
  audience: AudienceMeta;
  tone: ToneMeta;
  length: Length;
}

export interface Built {
  heading: string;
  body: string;
}

// --- markdown 小道具 -------------------------------------------------------

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");
const numbered = (items: string[]) =>
  items.map((i, idx) => `${idx + 1}. ${i}`).join("\n");
const callout = (label: string, text: string) => `> **${label}**｜${text}`;
const para = (...s: (string | false | undefined)[]) =>
  s.filter(Boolean).join("");

/** i番目のキーワード（無ければテーマにフォールバック） */
function kw(ctx: BuildCtx, i: number): string {
  return ctx.keywords[i] ?? ctx.T;
}

// ===========================================================================
// ノウハウ / How-to
// ===========================================================================

function howtoModules(ctx: BuildCtx): Built[] {
  const { T, rng, audience, tone } = ctx;

  const whyNow: Built = {
    heading: `なぜ今、「${T}」なのか`,
    body: [
      para(
        pick(rng, [
          `結論から言えば、${T}に取り組む価値は年々高まっています。`,
          `${T}は、一部の人だけのものではなくなりました。`,
          `${T}を「知っている」と「できる」の差は、これから大きく開いていきます。`,
        ]),
        pick(rng, [
          `理由はシンプルで、環境が整い、始めるハードルが下がったからです。`,
          `情報も道具も出そろい、あとは正しい順番で動くだけになりました。`,
        ]),
      ),
      "",
      bullets([
        `やる人とやらない人の差が、目に見えて開き始めている`,
        `早く始めた人ほど、経験という複利が効いてくる`,
        `${audience.reader}にとって、今が動きやすいタイミング`,
      ]),
    ].join("\n"),
  };

  const basics: Built = {
    heading: `そもそも${T}とは？──最初に押さえる前提`,
    body: [
      para(
        `${pick(rng, tone.connectors)}${T}の全体像です。`,
        pick(rng, [
          `細かいテクニックの前に、地図を持っておくと迷いません。`,
          `枝葉から入ると必ず迷子になります。まず幹をつかみましょう。`,
        ]),
      ),
      "",
      bullets([
        `目的：何のために${T}に取り組むのかを一言で言えるようにする`,
        `前提：最低限、これだけは用意しておきたいもの（【あなたの環境に合わせて追記】）`,
        `ゴール：${pick(rng, audience.goals)}`,
      ]),
      "",
      callout("ポイント", "最初に「ゴール」を決めると、途中の選択で迷わなくなります。"),
    ].join("\n"),
  };

  const steps: Built = {
    heading: `${T}を実践する5ステップ`,
    body: [
      para(
        pick(rng, [
          `ここからは、実際の手順に落とし込みます。`,
          `全体像がつかめたら、あとは順番どおりに進めるだけです。`,
        ]),
        `上から順に、一つずつで大丈夫です。`,
      ),
      "",
      numbered([
        `**現状を書き出す**：いまの立ち位置と、使える時間・道具を棚卸しする`,
        `**ゴールを一つに絞る**：${pick(rng, audience.goals)}`,
        `**最小の一歩を決める**：今日15分でできることまで小さくする`,
        `**とにかく試す**：完璧を捨て、まず形にして世に出す`,
        `**振り返って直す**：結果を見て、次の一手を1つだけ変える`,
      ]),
      "",
      callout("コツ", "ステップ3の「小さくする」が肝です。大きすぎる一歩は、始まる前に折れます。"),
    ].join("\n"),
  };

  const tips: Built = {
    heading: `成果を伸ばすための3つのコツ`,
    body: [
      para(
        pick(rng, [
          `同じ手順でも、ここを意識すると伸び方が変わります。`,
          `あと少しで差がつく、実践的なコツをまとめます。`,
        ]),
      ),
      "",
      bullets([
        `**続けられる形にする**：気合ではなく仕組みで回す（時間・場所を固定）`,
        `**1つの指標を追う**：あれこれ見ず、いま伸ばす数字を1つに絞る`,
        `**先人を真似る**：ゼロから考えず、うまくいっている型をなぞる（${kw(ctx, 0)}など）`,
      ]),
    ].join("\n"),
  };

  const mistakes: Built = {
    heading: `よくある失敗と、その回避法`,
    body: [
      para(
        pick(rng, [
          `多くの人が、同じ場所でつまずきます。先に知っておけば避けられます。`,
          `失敗のパターンは、実はそう多くありません。`,
        ]),
      ),
      "",
      bullets([
        `**情報収集で満足する**→ 集めるより、小さく試すを優先する`,
        `**完璧を目指しすぎる**→ 60点で世に出し、反応を見て直す`,
        `**一人で抱える**→ 発信して仲間やフィードバックを得る`,
      ]),
      "",
      callout("注意", "「準備が終わったら始める」は、多くの場合いつまでも始まりません。"),
    ].join("\n"),
  };

  const toolsEnv: Built = {
    heading: `${T}に役立つツール・環境`,
    body: [
      para(
        pick(rng, [
          `道具を整えると、同じ努力でも成果が変わります。`,
          `凝りすぎる必要はありません。最低限これだけ、から始めましょう。`,
        ]),
      ),
      "",
      bullets([
        `作業を進める中心の道具（【あなたが使うものを記入】）`,
        `記録・振り返り用のメモ（${kw(ctx, 1)}など）`,
        `続けるための仲間・コミュニティ`,
      ]),
    ].join("\n"),
  };

  const roadmap: Built = {
    heading: `今日から始める30日ロードマップ`,
    body: [
      para(`迷ったら、この順で進めれば大丈夫です。`),
      "",
      bullets([
        `**1〜7日目**：全体像の把握と、最小の一歩を毎日1つ`,
        `**8〜21日目**：試して直すを反復し、自分の型を見つける`,
        `**22〜30日目**：うまくいったやり方を仕組み化して固定する`,
      ]),
    ].join("\n"),
  };

  const ordered = [whyNow, basics, steps, tips, mistakes, toolsEnv, roadmap];
  return ordered;
}

// ===========================================================================
// リスト（◯選）
// ===========================================================================

function listSections(ctx: BuildCtx): Built[] {
  const { T, rng } = ctx;
  const n = LENGTH_LIST_ITEMS[ctx.length];

  const criteria: Built = {
    heading: `選ぶときに見た3つの基準`,
    body: [
      para(
        pick(rng, [
          `数ある中から選ぶとき、私はこの3点を基準にしました。`,
          `やみくもに並べても選べません。まず基準をそろえます。`,
        ]),
      ),
      "",
      bullets([
        `**再現性**：誰がやっても、ある程度の成果につながるか`,
        `**始めやすさ**：今日から、無理なく取りかかれるか`,
        `**伸びしろ**：続けた先に、大きく育つ余地があるか`,
      ]),
    ].join("\n"),
  };

  const openers = [
    "定番だが、やはり外せない一つ。",
    "知る人ぞ知る、コスパの高い選択肢。",
    "最初の一つに、特におすすめしたい。",
    "地味だが、効果が長く続くタイプ。",
    "伸び盛りで、今のうちに押さえたい。",
    "迷ったら、まずこれから。",
  ];
  const notes = [
    "始めやすさと効果のバランスが良い。",
    "続けるほど複利で効いてくる。",
    "初期コストが低く、失敗してもダメージが小さい。",
    "他と組み合わせると効果が跳ね上がる。",
    `「${T}」の入り口として最適。`,
  ];

  const items: string[] = [];
  const openerPool = shuffle(rng, openers);
  const notePool = shuffle(rng, notes);
  for (let i = 1; i <= n; i++) {
    items.push(
      [
        `### ${i}. 【項目${i}のタイトルを記入】`,
        para(openerPool[(i - 1) % openerPool.length]),
        "",
        `- ポイント：${notePool[(i - 1) % notePool.length]}`,
        `- こんな人に：${pick(rng, ctx.audience.goals)}を目指す人`,
        `- 詳しく：【具体的な説明・体験を1〜2行で記入】`,
      ].join("\n"),
    );
  }

  const list: Built = {
    heading: `${T}｜厳選${n}選`,
    body: [
      para(
        pick(rng, [
          `お待たせしました。ここからが本題です。`,
          `それでは、基準を満たしたものを順に紹介します。`,
        ]),
        `順位は目安なので、気になったものから試してください。`,
      ),
      "",
      items.join("\n\n"),
    ].join("\n"),
  };

  const howToUse: Built = {
    heading: `どう使い分ける？迷ったときの選び方`,
    body: [
      para(`全部やる必要はありません。今のあなたに一番効くものから。`),
      "",
      bullets([
        `**時間がないなら**：始めやすさ重視で1〜3番から`,
        `**しっかり伸ばしたいなら**：伸びしろ重視で後半の項目を`,
        `**すでに動いているなら**：組み合わせて掛け算にする`,
      ]),
      "",
      callout("ポイント", "一度に手を広げず、まず1つを『やり切る』のが結局いちばんの近道です。"),
    ].join("\n"),
  };

  if (ctx.length === "short") return [criteria, list];
  return [criteria, list, howToUse];
}

// ===========================================================================
// 体験談 / ストーリー
// ===========================================================================

function storySections(ctx: BuildCtx): Built[] {
  const { T, rng, audience, tone } = ctx;

  const start: Built = {
    heading: `きっかけは、小さな違和感だった`,
    body: para(
      pick(rng, [
        `当時の私は、${pick(rng, audience.pains)}という状態でした。`,
        `${pick(rng, audience.pains)}——それが、当時の正直な気持ちです。`,
      ]),
      pick(rng, [
        `そんなある日、ふと「${T}」という選択肢が目に留まりました。`,
        `転機は、【あなたのきっかけを記入】でした。そこで初めて${T}を意識したのです。`,
      ]),
    ),
  };

  const wall: Built = {
    heading: `最初にぶつかった、大きな壁`,
    body: [
      para(
        `もちろん、順風満帆ではありませんでした。`,
        pick(rng, [
          `始めてすぐ、現実の壁にぶつかります。`,
          `理想と現実のギャップに、何度もくじけそうになりました。`,
        ]),
      ),
      "",
      bullets([
        `思っていたより、うまくいかない`,
        `【具体的につまずいたことを記入】`,
        `やめる理由なら、いくらでも見つかった`,
      ]),
    ].join("\n"),
  };

  const turning: Built = {
    heading: `流れが変わった、ひとつの決断`,
    body: para(
      `${pick(rng, tone.connectors)}あることを境に、少しずつ景色が変わり始めます。`,
      pick(rng, [
        `それは、「完璧を目指すのをやめる」という決断でした。`,
        `やり方をすべて変えたのではありません。たった一つ、【変えたことを記入】を変えただけでした。`,
      ]),
      `大きなことではありません。でも、それが確かな分岐点になりました。`,
    ),
  };

  const change: Built = {
    heading: `今、手にしているもの`,
    body: [
      para(`あれから、状況はこう変わりました。`),
      "",
      bullets([
        `${pick(rng, audience.goals)}に、少しずつ近づけている`,
        `【あなたが得た変化・数字を記入】`,
        `何より、「自分にもできる」と思えるようになった`,
      ]),
    ].join("\n"),
  };

  const lesson: Built = {
    heading: `振り返って、いちばん伝えたいこと`,
    body: para(
      pick(rng, [
        `もし過去の自分に一言だけ声をかけられるなら、こう言います。`,
        `${T}を通して学んだことは、結局とてもシンプルでした。`,
      ]),
      `「小さくていいから、今日始めよう」。`,
      pick(rng, [
        `完璧なタイミングは、待っていても来ません。`,
        `動きながら考えれば、道は後からついてきます。`,
      ]),
    ),
  };

  const all = [start, wall, turning, change, lesson];
  return all;
}

// ===========================================================================
// 比較・レビュー
// ===========================================================================

function reviewSections(ctx: BuildCtx): Built[] {
  const { T, rng, audience } = ctx;

  const verdict: Built = {
    heading: `結論：${T}はこんな人におすすめ`,
    body: [
      para(`先に結論をお伝えします。時間のない方は、ここだけでもOKです。`),
      "",
      bullets([
        `**総合評価**：★★★★☆（4.0 / 5.0）※あくまで個人の評価`,
        `**一言で言うと**：【一言レビューを記入】`,
        `**向いている人**：${pick(rng, audience.goals)}を目指す人`,
      ]),
    ].join("\n"),
  };

  const good: Built = {
    heading: `使ってみて良かった点`,
    body: [
      para(
        pick(rng, [
          `実際に試して、特に良かったのは次の点です。`,
          `期待以上だったポイントを挙げます。`,
        ]),
      ),
      "",
      bullets([
        `**期待どおりの効果**：【良かった点を記入】`,
        `**始めやすさ**：思ったより導入のハードルが低かった`,
        `**コスパ**：かけた時間・費用に対して、得られたものが大きい`,
      ]),
    ].join("\n"),
  };

  const bad: Built = {
    heading: `気になった点・注意したいこと`,
    body: [
      para(`良いことばかりではありません。正直な弱点も共有します。`),
      "",
      bullets([
        `**人を選ぶ**：【どんな人には合わないかを記入】`,
        `**最初のハードル**：慣れるまでは少し戸惑う場面もある`,
        `**期待しすぎ注意**：魔法ではないので、続ける前提で`,
      ]),
      "",
      callout("注意", "弱点を理解したうえで選べば、後悔はぐっと減ります。"),
    ].join("\n"),
  };

  const compare: Built = {
    heading: `他の選択肢との比較`,
    body: [
      para(`${T}を、他の選択肢と並べて整理してみます。`),
      "",
      bullets([
        `**手軽さで選ぶなら**：【比較対象A】`,
        `**本格的にやるなら**：${T}`,
        `**コスト最優先なら**：【比較対象B】`,
      ]),
    ].join("\n"),
  };

  const forWhom: Built = {
    heading: `総評：買い（やる価値）か？`,
    body: para(
      pick(rng, [
        `結論として、条件が合う人には十分におすすめできます。`,
        `迷っているなら、小さく試してから判断するのが賢明です。`,
      ]),
      `${pick(rng, audience.pains)}という状態なら、試す価値は大きいはずです。`,
    ),
  };

  const all = [verdict, good, bad, compare, forWhom];
  return all;
}

// ===========================================================================
// 考察・オピニオン
// ===========================================================================

function opinionSections(ctx: BuildCtx): Built[] {
  const { T, rng, audience, tone } = ctx;

  const claim: Built = {
    heading: `私の主張：${T}をこう捉えるべきだ`,
    body: para(
      pick(rng, [
        `いきなり結論から言います。`,
        `この記事で伝えたい主張は、一つだけです。`,
      ]),
      `「${T}は、【あなたの主張を一文で記入】だ」。`,
      `——なぜそう考えるのか、順を追って説明します。`,
    ),
  };

  const why: Built = {
    heading: `そう考えるようになった背景`,
    body: para(
      `${pick(rng, tone.connectors)}この考えに至った背景です。`,
      pick(rng, [
        `多くの情報や事例に触れる中で、共通する構造が見えてきました。`,
        `${pick(rng, audience.pains)}という声を、あまりに多く見てきたからです。`,
      ]),
    ),
  };

  const grounds: Built = {
    heading: `主張を支える3つの根拠`,
    body: [
      para(`感覚論で終わらせないために、根拠を挙げます。`),
      "",
      numbered([
        `**構造的な理由**：仕組みとして、そうなりやすい`,
        `**事例**：【具体的な事例・データを記入】`,
        `**再現性**：一部の例外ではなく、多くの場面で当てはまる`,
      ]),
    ].join("\n"),
  };

  const counter: Built = {
    heading: `「でも、こうじゃない？」への回答`,
    body: [
      para(`当然、反論もあると思います。主なものにお答えします。`),
      "",
      bullets([
        `**「一部の人だけの話では？」**→ 前提を満たせば、多くの人に当てはまります`,
        `**「もう遅いのでは？」**→ 始めるのに最適なのは、いつも「今」です`,
        `**「例外もあるはず」**→ 例外はあります。だからこそ原則を押さえる価値があります`,
      ]),
    ].join("\n"),
  };

  const soWhat: Built = {
    heading: `だから、私たちは何をすべきか`,
    body: para(
      `主張が正しいとして、では明日から何を変えるか。`,
      `答えはシンプルです。${pick(rng, audience.goals)}に向けて、`,
      pick(rng, [
        `まず一つ、小さく動き出すことです。`,
        `考えるより先に、手を動かすことです。`,
      ]),
    ),
  };

  const all = [claim, why, grounds, counter, soWhat];
  return all;
}

// ===========================================================================
// エントリポイント
// ===========================================================================

const LENGTH_N: Record<Length, number> = { short: 3, standard: 5, long: 7 };

export function buildSections(preset: Preset, ctx: BuildCtx): Built[] {
  const n = LENGTH_N[ctx.length];
  switch (preset) {
    case "howto":
      return howtoModules(ctx).slice(0, n);
    case "list":
      return listSections(ctx);
    case "story":
      return storySections(ctx).slice(0, Math.max(3, Math.min(n, 5)));
    case "review":
      return reviewSections(ctx).slice(0, Math.max(3, Math.min(n, 5)));
    case "opinion":
      return opinionSections(ctx).slice(0, Math.max(3, Math.min(n, 5)));
    default:
      return howtoModules(ctx).slice(0, n);
  }
}
