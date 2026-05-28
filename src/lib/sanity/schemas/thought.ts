import { defineType, defineField } from "sanity";

export const thoughtType = defineType({
  name: "thought",
  title: "Thought / 近期思考",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "content", subtitle: "date" },
    prepare({ title, subtitle }) {
      return {
        title: (title || "").slice(0, 60) + ((title || "").length > 60 ? "…" : ""),
        subtitle,
      };
    },
  },
  orderings: [
    { title: "Date", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
