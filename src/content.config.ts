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

// Guides — the SEO/AEO/GEO content moat. Pillar + cluster articles.
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pillar: z.string(),                 // e.g. "Bespoke Suits"
    pillarHref: z.string().optional(),  // link for the pillar (service/guide)
    eyebrow: z.string().default('The Guide'),
    updated: z.coerce.date(),
    order: z.number().default(50),
    faqCats: z.array(z.string()).optional(), // pull matching FAQs from the bank
    related: z.array(z.string()).optional(),  // sibling guide slugs
  }),
});

export const collections = { journal, guides };
