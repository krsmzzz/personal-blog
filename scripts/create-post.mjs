import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "bvoy8xc8",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const post = {
  _id: "from-banking-to-ai-agent",
  _type: "post",
  title: "从银行系统到 AI Agent — 我的技术之旅",
  slug: { _type: "slug", current: "from-banking-to-ai-agent" },
  description: "从构建银行反洗钱系统到独立开发 AI Agent 产品，这一路的技术选择与思考。",
  publishedAt: "2025-05-28T00:00:00.000Z",
  body: [
    { _type: "block", style: "h2", children: [{ _type: "span", text: "起点：银行系统" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "2021 年，我加入了一个银行核心系统团队。任务是构建反洗钱（AML）交易监控平台——实时风控、可疑交易识别、监管报送。这是我第一次真正接触大规模分布式系统。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "在银行系统中学到的最重要一课：" }, { _type: "span", text: "正确性比速度更重要", marks: ["strong"] }, { _type: "span", text: "。一笔交易的处理结果必须 100% 准确，延迟可以优化，但错误不可接受。" }] },
    { _type: "block", style: "h2", children: [{ _type: "span", text: "转向：AI 自动化" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "2023 年，GPT-4 的发布改变了一切。我开始探索如何将 LLM 引入金融场景——智能风控决策、自动报告生成、合规审查辅助。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "最大的发现是：AI 不是替代规则引擎，而是增强它。传统规则处理 80% 的明确场景，AI 处理剩下 20% 的模糊边界。" }] },
    { _type: "block", style: "h2", children: [{ _type: "span", text: "现在：独立构建" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "2025 年，我决定走出银行，作为独立开发者构建自己的产品。当前在做的：AI 自动求职助手、Agent 工作流框架，以及一个轻量级 API 网关。" }] },
    { _type: "block", style: "blockquote", children: [{ _type: "span", text: "从企业级系统到个人产品，核心不变：简洁、性能、工程美学。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "独立开发最大的挑战不是技术，而是节奏。我的经验是：每天固定 4 小时深度工作，剩下的时间阅读、思考和迭代。" }] },
  ],
};

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.log("请先获取 API Token:");
    console.log("https://www.sanity.io/manage → 你的项目 → API → Tokens → Add API token (Editor 权限)");
    console.log("\n然后运行:");
    console.log("SANITY_WRITE_TOKEN=你的token node scripts/create-post.mjs");
    process.exit(1);
  }
  try {
    await client.createOrReplace(post);
    console.log("✅ 文章创建成功! 访问 http://localhost:3000/blog/from-banking-to-ai-agent");
  } catch (err) {
    console.error("❌ 失败:", err.message);
  }
}

main();
