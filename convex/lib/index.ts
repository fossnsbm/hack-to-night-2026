import { getAuthUserId } from '@convex-dev/auth/server'
import { QueryCtx } from '../_generated/server'

export async function getTeamForUser(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx)
  if (!userId) return null

  const user = await ctx.db.get(userId)
  if (!user) return null

  const team = await ctx.db
    .query('teams')
    .withIndex('by_userId', (q) => q.eq('userId', userId))
    .unique()
  if (!team) return null

  return { ...team, email: user.email }
}
