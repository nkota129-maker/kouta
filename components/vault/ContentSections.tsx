"use client";

import type { ContentItem, ChatTurn, FlowStep } from "@/types";
import { PromptBlock } from "@/components/common/PromptBlock";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Tag } from "@/components/common/Tag";
import { Icon } from "@/components/common/Icon";
import { ArrowDown } from "lucide-react";

function TextSection({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body?: string;
}) {
  if (!body) return null;
  return (
    <div className="space-y-2">
      <SectionTitle icon={icon}>{title}</SectionTitle>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-[color:var(--fg)]/85">
        {body}
      </p>
    </div>
  );
}

function ChatExample({ turns }: { turns: ChatTurn[] }) {
  return (
    <div className="space-y-2">
      <SectionTitle icon="MessagesSquare">チャット例</SectionTitle>
      <div className="space-y-2.5">
        {turns.map((t, i) => (
          <div
            key={i}
            className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                t.role === "user"
                  ? "rounded-br-sm bg-neon-blue/15 text-[color:var(--fg)]"
                  : "rounded-bl-sm border border-white/8 bg-white/5 text-[color:var(--fg)]/85"
              }`}
            >
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[color:var(--muted)]">
                {t.role === "user" ? "You" : "AI"}
              </span>
              {t.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="space-y-2">
      <SectionTitle icon="Workflow">フロー図</SectionTitle>
      <div className="flex flex-col items-stretch gap-1.5">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center">
            <div className="hairline flex w-full items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-cyan/15 text-neon-cyan">
                <Icon name={s.icon ?? "Circle"} className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{s.label}</span>
              <span className="font-en ml-auto text-xs text-[color:var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ArrowDown className="my-0.5 h-4 w-4 text-neon-cyan/50" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** ContentItem の存在するフィールドだけを順に描画 */
export function ContentSections({ item }: { item: ContentItem }) {
  return (
    <div className="space-y-6">
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}

      {item.tools && item.tools.length > 0 && (
        <div className="space-y-2">
          <SectionTitle icon="Cpu">使用AI・ツール</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {item.tools.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-lg border border-neon-cyan/25 bg-neon-cyan/10 px-2.5 py-1 text-xs font-medium text-neon-cyan"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <TextSection icon="UserCog" title="役割" body={item.role} />
      <TextSection icon="BookOpen" title="使い方・運用方法" body={item.usage} />

      {item.prompt && <PromptBlock snippet={item.prompt} />}

      {item.chatExample && item.chatExample.length > 0 && (
        <ChatExample turns={item.chatExample} />
      )}

      {item.flow && item.flow.length > 0 && <MiniFlow steps={item.flow} />}

      <TextSection icon="PenSquare" title="入力例" body={item.input} />
      <TextSection icon="Sparkles" title="実例・完成例" body={item.example} />
      <TextSection icon="AlertTriangle" title="注意点" body={item.cautions} />
      <TextSection icon="Rocket" title="応用" body={item.application} />
    </div>
  );
}
