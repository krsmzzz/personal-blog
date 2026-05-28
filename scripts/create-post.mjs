import { createClient } from "@sanity/client";
import { execSync } from "child_process";

const raw = execSync("npx sanity debug --secrets 2>&1", { encoding: "utf-8" });
const match = raw.match(/Auth token: (\S+)/);
const TOKEN = match[1];

const client = createClient({
  projectId: "2coiw8kw",
  dataset: "production",
  token: TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const doc = {
  _type: "post",
  title: "失业后的 30 天：重建一个开发者的自我认知",
  slug: { _type: "slug", current: "unemployment-30-days" },
  description: "离开银行系统后，我用一个月时间重新思考：我是谁、我要做什么、什么才是真正的生产力。",
  publishedAt: "2025-05-20",
  body: [
    { _type: "block", style: "normal", children: [{ _type: "span", text: "一周前，我正式离开了工作三年的银行系统团队。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "没有欢送会，没有 farewell email。只是在最后一个日常站会之后，合上电脑，走出办公室。三年来第一次，我的日程表空了。" }] },
    { _type: "block", style: "h2", children: [{ _type: "span", text: "第一周：空白是最大的敌人" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "第一天的感觉很奇怪。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "早上 9 点自然醒，没有 Slack 消息，没有待处理的 PR，没有站会提醒。过去三年建立的所有习惯和节奏，在一瞬间失效了。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "作为一个长期在银行系统里做高并发、反洗钱、实时风控的工程师，我习惯于在严密的流程和紧凑的排期中运转。突然之间，所有外部约束消失了。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "这听起来像自由，但实际上是深渊。" }] },
    { _type: "block", style: "normal", children: [
      { _type: "span", text: "自由意味着你需要自己定义一切：今天做什么、这个月交付什么、你是谁。我发现" },
      { _type: "span", marks: ["strong"], text: "最可怕的不是没有选择，而是选择太多" },
      { _type: "span", text: "。" },
    ]},
    { _type: "block", style: "normal", children: [
      { _type: "span", text: "📷 " },
      { _type: "span", marks: ["em"], text: "（建议插入：空荡荡的日历 / 办公桌收拾干净后的照片）" },
    ]},
    { _type: "block", style: "h2", children: [{ _type: "span", text: "第二周：焦虑是真实的物理感受" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "失眠。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "凌晨 3 点醒来，脑子里全是自我怀疑的句子：" }] },
    { _type: "block", style: "blockquote", children: [{ _type: "span", text: "我的技能还值钱吗？Rust 要学吗？Go 是不是比 Java 更好找工作？要不要去考个云架构师证书？大模型会替代我吗？我是不是应该去送外卖？" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "我看着朋友圈里的前同事们在发新公司的工牌、新项目的上线庆祝。每一个点赞都在提醒我：你落后了。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "这一周我投了 37 份简历，收到了 4 个面试邀请，通过了一个，然后发现薪资只有之前的 60%。" }] },
    { _type: "block", style: "normal", children: [
      { _type: "span", text: "但也是在这一周，我开始注意到一些变化。我早上有时间跑步了。我重新开始写博客。我修复了一个开源项目的 bug。这些事情在过去三年里我从来没时间做。" },
    ]},
    { _type: "block", style: "normal", children: [
      { _type: "span", text: "📷 " },
      { _type: "span", marks: ["em"], text: "（建议插入：晨跑时拍的天空 / 重新整理的工位照片）" },
    ]},
    { _type: "block", style: "h2", children: [{ _type: "span", text: "第三周：拒绝的第一份 offer" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "第三周收到了两个 offer。一个是大厂的基础架构岗，薪资比之前还高 15%。另一个是创业公司的全栈岗位，薪资只有 70%。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "我差点就接了大厂的 offer。毕竟，稳定、钱多、体面。但签约前一晚，我突然发现自己在看大厂的「加班文化」和「内卷」帖子，而不是在看技术博客。" }] },
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "我意识到我害怕的不是失业，而是回到那个让我感到「安全但窒息」的系统里。" },
    ]},
    { _type: "block", style: "normal", children: [{ _type: "span", text: "第二天我拒绝了它。打电话给 HR 的时候手在抖，但挂断电话后长舒了一口气。那是我一个月以来最轻松的一刻。" }] },
    { _type: "block", style: "normal", children: [
      { _type: "span", text: "📷 " },
      { _type: "span", marks: ["em"], text: "（建议插入：在咖啡馆工作的照片 / 一杯咖啡 + 电脑）" },
    ]},
    { _type: "block", style: "h2", children: [{ _type: "span", text: "第四周：重新定义「工作」" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "最后一周，我做了一个决定：给自己三个月时间，专注于构建自己的东西。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "不是创业，不是自由职业。只是在探索一个问题：" }] },
    { _type: "block", style: "blockquote", children: [{ _type: "span", text: "如果我只做我认为有价值的事，三个月后我的生活是什么样子？" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "这四周里我学到的东西，比过去三年加起来都多：" }] },
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "1. 身份不等于职位。" },
      { _type: "span", text: " 我不是「XX 银行高级工程师」，我是一个擅长系统设计、会写代码、能独立交付产品的人。职位只是标签，能力才是本质。" },
    ]},
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "2. 节奏比速度重要。" },
      { _type: "span", text: " 过去三年我处于永久加速状态，但回头一看，大部分时间是在追逐别人的优先级。现在每天只做两三件事，但每一件都是我自己定义的。" },
    ]},
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "3. 只工作，不展示，等于没有工作。" },
      { _type: "span", text: " 银行项目再复杂，关在防火墙后面就没有人能看见。过去一个月我写了博客、做了开源贡献、建了这个网站——虽然收入还没上来，但已经有人在联系我。" },
    ]},
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "4. 焦虑不会消失，但可以被转化成生产力。" },
      { _type: "span", text: " 凌晨 3 点醒来这件事没有好转。但我不再躺着刷焦虑，而是爬起来写代码。我的 AI 求职助手项目的大部分代码，都是在凌晨 3 到 5 点写的。" },
    ]},
    { _type: "block", style: "normal", children: [
      { _type: "span", text: "📷 " },
      { _type: "span", marks: ["em"], text: "（建议插入：凌晨写代码时拍的桌面 / 夜灯下的键盘照片）" },
    ]},
    { _type: "block", style: "h2", children: [{ _type: "span", text: "我现在在做什么" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "目前主要在三个方向：" }] },
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "AI 自动求职助手" },
      { _type: "span", text: "：聚合职位、AI 匹配简历、自动投递。因为我自己需要。" },
    ]},
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "Agent 工作流框架" },
      { _type: "span", text: "：轻量级 Multi-Agent 编排，基于我过去在银行做规则引擎的经验。" },
    ]},
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "个人产品与写作" },
      { _type: "span", text: "：这个博客、开源项目、以及每天 600 字的公开输出。" },
    ]},
    { _type: "block", style: "h2", children: [{ _type: "span", text: "如果你也在经历这个阶段" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "我想说：失业不是终点，它是一个强制性的暂停。利用这个暂停重新看向自己，而不是看向别人。" }] },
    { _type: "block", style: "normal", children: [{ _type: "span", text: "把焦虑变成代码。把简历变成产品。把自己在做的事情公开展示出来。" }] },
    { _type: "block", style: "normal", children: [
      { _type: "span", marks: ["strong"], text: "你不只是一个求职者。你是一个 Builder。" },
    ]},
  ],
};

try {
  const created = await client.create(doc);
  console.log("✅ 文章创建成功！");
  console.log(`   Slug: ${created.slug.current}`);
  console.log(`   标题: ${created.title}`);
} catch (err) {
  console.error("❌ 创建失败:", err.message);
}
