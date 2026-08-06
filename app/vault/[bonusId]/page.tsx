import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BONUSES, getBonus, getCategories } from "@/lib/data";
import { VaultHeader } from "@/components/vault/VaultHeader";
import { CategoryVault } from "@/components/vault/CategoryVault";
import { OrgVault } from "@/components/vault/OrgVault";
import { FlowVault } from "@/components/vault/FlowVault";

export function generateStaticParams() {
  return BONUSES.map((b) => ({ bonusId: b.id }));
}

export function generateMetadata({
  params,
}: {
  params: { bonusId: string };
}): Metadata {
  const bonus = getBonus(params.bonusId);
  if (!bonus) return { title: "Not Found" };
  return { title: bonus.title, description: bonus.description };
}

export default function VaultPage({
  params,
}: {
  params: { bonusId: string };
}) {
  const bonus = getBonus(params.bonusId);
  if (!bonus) notFound();

  return (
    <div>
      <VaultHeader bonus={bonus} />
      <Suspense fallback={<div className="py-20" />}>
        {bonus.layout === "category" && (
          <CategoryVault bonus={bonus} categories={getCategories(bonus.id)} />
        )}
        {bonus.layout === "org" && <OrgVault bonus={bonus} />}
        {bonus.layout === "flow" && <FlowVault bonus={bonus} />}
      </Suspense>
    </div>
  );
}
