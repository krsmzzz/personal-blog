import { defineType, defineField } from "sanity";

export const ideaType = defineType({
  name: "idea",
  title: "Idea / 想法",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "date",
      title: "Date & Time",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "content", subtitle: "datetime" },
    prepare({ title, subtitle }) {
      const text = title?.[0]?.children?.[0]?.text || "";
      return {
        title: text.slice(0, 60) + (text.length > 60 ? "…" : ""),
        subtitle,
      };
    },
  },
  orderings: [
    { title: "Date", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
