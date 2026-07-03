import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Journal (blog) — markdown files in src/content/journal/.
// Add a new post by dropping a .md file in that folder with the frontmatter below.
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().default('From the notebook'),
    excerpt: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
  }),
});

export const collections = { journal };
