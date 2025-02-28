import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asSeoCollection } from '@nuxtjs/seo/content';

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSeoCollection({
        schema: z.object({
          date_created: z.string().optional(),
          date_modified: z.string().optional(),
        }),
        source: '**/*.md',
        type: 'page',
      }),
    ),
  },
});
