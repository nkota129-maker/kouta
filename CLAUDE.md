# AI副業2.0 Bonus Box

面談突破者だけの実践型AIライブラリ。PDF配布ではなく「学びながら・コピペしながら」その場で使えるWebサービス。

## 技術スタック

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3（`darkMode: "class"`、CSS変数でカラートークン）
- Framer Motion（アニメーション）
- Lucide Icons（`components/common/Icon.tsx` で名前文字列→アイコン解決）
- Fuse.js（全文検索）
- 永続化はすべて localStorage（`lib/store.tsx`）。バックエンドなし・SSG前提。

## ディレクトリ

- `app/` … ルート。`/`（トップ）, `/vault/[bonusId]`（特典詳細）, `/favorites`, `/history`, `/search`
- `components/` … `layout/` `home/` `vault/` `common/` `search/`
- `lib/data/` … 全コンテンツのデータソース（下記）＋ `index.ts` で集約・検索インデックス構築
- `lib/store.tsx` … お気に入り/履歴/コピー数/テーマの状態管理
- `types/index.ts` … 型定義

## 5つの特典とレイアウト種別（`lib/data/bonuses.ts`）

1. `agent-encyclopedia` … カテゴリ型（`CategoryVault`）
2. `ai-staff` … 組織図型（`OrgVault`）
3. `revenue-system` … フロー型（`FlowVault`）
4. `claude-code` … カテゴリ型
5. `workflows` … カテゴリ型（各アイテムに flow 図を内包）

`app/vault/[bonusId]/page.tsx` が `bonus.layout` を見て `CategoryVault` / `OrgVault` / `FlowVault` を出し分ける。

## コンテンツの追加・編集

- ①④⑤：`lib/data/{agent-encyclopedia,claude-code,workflows}.ts` の `Category[]`。
  `ContentItem` は存在するフィールドだけ描画（`components/vault/ContentSections.tsx`）。
- ②：`lib/data/ai-staff.ts` の `OrgUnit[]`（`parentId` でツリー）。
- ③：`lib/data/revenue-system.ts` の `FlowStep[]`（各 `detail` に `ContentItem`）。
- データを追加すると検索インデックス（`lib/data/index.ts` の `buildSearchIndex`）へ自動反映。

※ 現状のコンテンツはすべてサンプル（実データではない）。同じ型で差し替え・拡張していく想定。

## デザイン規約

- 背景 `#050816`、アクセントはゴールド `#e7c873` / シアン `#38e1d6` / ブルー `#4f7cff`。
- ガラスUIは `.glass` + `.hairline`（`app/globals.css`）。
- アニメーション variants は `lib/motion.ts` に集約。`prefers-reduced-motion` を尊重。
- 安っぽさ・ゲーム感・教材感はNG。「AIの高級サービス」の世界観を保つ。

## コマンド

```bash
npm run dev     # 開発
npm run build   # 本番ビルド（SSG）
npm run start   # 本番サーバ
```

## レスポンシブ注意点

横スクロール要素（`CategoryNav` のモバイル表示など）は、grid/flex の親に `min-w-0` を付けないと
ページ全体が横に溢れる。新しい2カラムレイアウトを足すときは要注意。
