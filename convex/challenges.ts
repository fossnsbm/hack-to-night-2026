import { ConvexError, v } from 'convex/values'
import { env, mutation, query } from './_generated/server'
import { getTeamForUser } from './lib'

export const storeChallenges = mutation({
  args: {
    secret: v.string(),
    challenges: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        category: v.string(),
        difficulty: v.union(
          v.literal('easy'),
          v.literal('medium'),
          v.literal('hard')
        ),
        preview: v.string(),
        max_score: v.number()
      })
    )
  },
  handler: async (ctx, { secret, challenges }) => {
    if (secret != env.SCRAPER_SECRET) {
      throw new ConvexError({
        success: false,
        message: 'Unauthorized'
      })
    }

    for (const challenge of challenges) {
      const existing = await ctx.db
        .query('challenges')
        .filter((q) => q.eq(q.field('slug'), challenge.slug))
        .first()

      if (!existing) {
        await ctx.db.insert('challenges', challenge)
      }
    }
  }
})
