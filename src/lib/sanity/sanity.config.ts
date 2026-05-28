import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./schemas";
import { projectId, dataset } from "./client";

export default defineConfig({
  name: "ruikang-blog",
  title: "ruikang Blog",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schema },
});
