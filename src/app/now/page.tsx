import type { Metadata } from "next";
import { Circle } from "lucide-react";

export const metadata: Metadata = {
  title: "近况",
  description: "当前正在构建与思考的方向。",
};

const building = [
  { label: "AI Job Agent", detail: "多平台自动投递 + 智能匹配", status: "active" },
  { label: "Agent Workflow", detail: "Multi-Agent 协作框架", status: "active" },
  { label: "Banking Architecture", detail: "反洗钱系统 v2 重构", status: "paused" },
];

const learning = [
  { label: "AI Infra", detail: "GPU 调度 / 推理优化" },
  { label: "Multi-Agent Systems", detail: "CrewAI / AutoGen / LangGraph" },
  { label: "System Design", detail: "分布式系统 / 高并发架构" },
];

const thoughts = [
  "2025-05-20 — 最近在思考 Agent 之间的通信协议设计。REST 太静态，gRPC 太重，也许需要一个更轻量的消息总线。",
  "2025-05-10 — 重构了一个银行项目的核心模块，删除了 2000 行代码。功能不变，但维护成本降低了一半。少即是多从来不是口号。",
  "2025-04-25 — 开始用 Go 写一个轻量 API 网关。Rust 也很好，但 Go 的简单性在团队协作中更有优势。",
];

export default function NowPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      {/* Header */}
      <div className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
          Now
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          现在
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground/70">
          当前专注的方向 — 2025 年 5 月更新。
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-16">
        {/* Building */}
        <section>
          <h2 className="mb-6 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
            正在构建
          </h2>
          <div className="space-y-4">
            {building.map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4">
                <Circle
                  className={`mt-0.5 size-2 shrink-0 ${
                    item.status === "active"
                      ? "fill-accent-blue text-accent-blue"
                      : "fill-muted-foreground/30 text-muted-foreground/30"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground/85">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground/60">{item.detail}</p>
                </div>
                {item.status === "paused" && (
                  <span className="ml-auto shrink-0 rounded-md border border-border px-2 py-0.5 font-mono text-[9px] text-muted-foreground/40">
                    paused
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Learning */}
        <section>
          <h2 className="mb-6 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
            正在学习
          </h2>
          <div className="space-y-3">
            {learning.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                <div>
                  <p className="text-sm text-foreground/80">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground/50">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Thoughts */}
        <section>
          <h2 className="mb-6 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
            近期思考
          </h2>
          <div className="space-y-4">
            {thoughts.map((t, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-muted-foreground/70"
              >
                {t}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
