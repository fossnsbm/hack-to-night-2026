import { ConvexError, v } from 'convex/values'
import { internal } from './_generated/api'
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

export const updateChallengeProgress = mutation({
  args: {
    secret: v.string(),
    submissions: v.array(
      v.object({
        hackerUsername: v.string(),
        challengeSlug: v.string(),
        solvedAt: v.number()
      })
    )
  },
  handler: async (ctx, { secret, submissions }) => {
    if (secret !== process.env.SCRAPER_SECRET) throw new Error('Unauthorized')

    for (const sub of submissions) {
      const team = await ctx.db
        .query('teams')
        .withIndex('by_hackerUsername', (q) =>
          q.eq('hackerUsername', sub.hackerUsername)
        )
        .first()

      if (!team) continue

      const existing = await ctx.db
        .query('teamChallenges')
        .withIndex('by_teamId_and_slug', (q) =>
          q.eq('teamId', team._id).eq('challengeSlug', sub.challengeSlug)
        )
        .first()

      if (!existing) {
        await ctx.db.insert('teamChallenges', {
          teamId: team._id,
          challengeSlug: sub.challengeSlug,
          solvedAt: sub.solvedAt
        })
      }

      const solvedCount = (
        await ctx.db
          .query('teamChallenges')
          .withIndex('by_teamId', (q) => q.eq('teamId', team._id))
          .collect()
      ).length

      const threshold = Math.round(
        (await ctx.db.query('challenges').collect()).length / 2
      )

      if (solvedCount >= threshold) {
        const t = await ctx.db.get('teams', team._id)
        if (t?.buildathonUnlocked) {
          return
        } else {
          console.log(`Buildathon unlocked for ${team.teamName}`)
          await ctx.db.patch('teams', team._id, { buildathonUnlocked: true })
        }

        if (!team.githubUsername) {
          console.log(
            `Invitation skipped since github username of ${team.teamName}  is not submitted`
          )
          return
        }

        console.log(`Inviting ${team.githubUsername} to the repo`)
        await ctx.scheduler.runAfter(0, internal.github.inviteToChallenge, {
          githubUsername: team.githubUsername
        })
      }
    }
  }
})

export const getChallenges = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('challenges').collect()
  }
})

export const getTeamChallenges = query({
  args: {},
  handler: async (ctx) => {
    const teamAndUser = await getTeamForUser(ctx)
    if (!teamAndUser) return null
    const teamId = teamAndUser._id

    const solvedChallenges = await ctx.db
      .query('teamChallenges')
      .withIndex('by_teamId', (q) => q.eq('teamId', teamId))
      .collect()

    return solvedChallenges
  }
})
