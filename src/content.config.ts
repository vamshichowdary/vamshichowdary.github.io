import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDatetime: z.date(),
        author: z.string().default("Vamshi Madala"),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
        ogImage: image().optional(),
    }),
});

export const collections = { blog };
