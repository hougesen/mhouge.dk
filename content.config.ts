import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content: defineCollection({
      schema: z.object({
        date_created: z.string().optional(),
        date_modified: z.string().optional(),
      }),
      source: '**/*.md',
      type: 'page',
    }),
  },
});
