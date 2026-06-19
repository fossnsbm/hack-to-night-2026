import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    emailVerificationTime: v.optional(v.number()),
    role: v.optional(v.union(v.literal('admin'), v.literal('user'))),
    phone: v.string(),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean())
  }).index('email', ['email']),

  teams: defineTable({
    userId: v.id('users'),
    teamName: v.string(),
    teamLeaderName: v.string(),
    teamMembers: v.array(
      v.object({
        name: v.string(),
        studentId: v.string()
      })
    ),
    hackerUsername: v.optional(v.string()),
    githubUsername: v.optional(v.string()),
    buildathonUnlocked: v.optional(v.boolean())
  })
    .index('by_userId', ['userId'])
    .index('by_hackerUsername', ['hackerUsername'])
    .index('by_githubUsername', ['githubUsername'])
})

export default schema
