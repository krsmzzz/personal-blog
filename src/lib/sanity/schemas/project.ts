import { defineType, defineField } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "demo", title: "Demo URL", type: "url" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "cover", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
  ],
  preview: {
    select: { title: "title", media: "cover", featured: "featured" },
    prepare({ title, media, featured }) {
      return { title, media, subtitle: featured ? "★ Featured" : undefined };
    },
  },
});
