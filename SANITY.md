# Sanity CMS 接入指南

## 1. 创建 Sanity 项目

```bash
npm create sanity@latest -- --template clean --create-project "ruikang-blog" --dataset production
```

记下输出的 `projectId` 和 `dataset`。

## 2. 配置环境变量

复制 `.env.example` → `.env.local`：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=
```

## 3. 启用 Studio

将 `src/app/_studio` 重命名为 `src/app/studio`：

```bash
mv src/app/_studio src/app/studio
```

访问 `http://localhost:3000/studio` 打开管理后台。

## 4. 数据模型

| Schema | 用途 |
|---|---|
| **Post** | 博客文章（title, slug, description, tags, cover, body） |
| **Project** | 项目展示（title, slug, description, tags, github, demo, body） |
| **Tag** | 标签分类（title, slug, description） |

## 5. 架构说明

- **双数据源**：配置 Sanity 后自动使用，否则回退本地 MDX
- **统一桥接层**：`src/lib/content-bridge.ts` 封装数据获取
- **PortableText**：Sanity 富文本通过 `src/components/mdx/portable-text.tsx` 渲染
- **图片**：支持 Sanity CDN 图片 + `next/image` 优化

## 6. 部署

设置 Vercel 环境变量后，网站自动使用 Sanity 数据。
