import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="font-en text-7xl font-extrabold text-gradient-gold">
        404
      </span>
      <p className="mt-4 text-lg font-semibold">ページが見つかりません</p>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        お探しの特典は移動または削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-6 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
      >
        <Home className="h-4 w-4" />
        トップへ戻る
      </Link>
    </div>
  );
}
