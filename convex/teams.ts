import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getTeamForUser } from './lib'

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('teams').collect()
  }
})

export const getMyTeam = query({
  args: {},
  handler: async (ctx) => {
    return await getTeamForUser(ctx)
  }
})

export const setSocials = mutation({
  args: {
    hackerrankUsername: v.optional(v.string()),
    githubUsername: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const teamAndUser = await getTeamForUser(ctx)
    if (!teamAndUser) throw new Error('No team found')

    await ctx.db.patch(teamAndUser._id, {
      hackerUsername: args.hackerrankUsername,
      githubUsername: args.githubUsername
    })
  }
})
