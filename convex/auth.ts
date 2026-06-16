import { convexAuth } from '@convex-dev/auth/server'
import { ConvexError } from 'convex/values'
import { internal } from './_generated/api'
import { MutationCtx } from './_generated/server'
import CustomPassword from './CustomProfile'

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomPassword],
  callbacks: {
    async createOrUpdateUser(ctx: MutationCtx, args) {
      if (args.existingUserId) {
        return args.existingUserId
      }

      if (process.env.NEXT_PUBLIC_REGISTRAION_CLOSED) {
        throw new ConvexError({
          success: false,
          message: 'Registration has been closed'
        })
      }

      const profile = args.profile as {
        email: string
        role?: 'admin' | 'user'
        phone?: string
        teamName?: string
        teamLeaderName?: string
        teamMembers?: { name: string; studentId: string }[]
      }

      const userId = await ctx.db.insert('users', {
        email: profile.email,
        role: 'user',
        phone: profile.phone!
      })

      if (profile.teamName && profile.teamLeaderName && profile.teamMembers) {
        await ctx.db.insert('teams', {
          userId,
          teamName: profile.teamName,
          teamLeaderName: profile.teamLeaderName,
          teamMembers: profile.teamMembers
        })

        console.log('running google sheets log')
        await ctx.scheduler.runAfter(0, internal.googleSheets.addUserToSheet, {
          teamLeaderName: profile.teamLeaderName,
          teamMembers: profile.teamMembers,
          teamName: profile.teamName,
          teamLeaderEmail: profile.email,
          teamLeaderPhone: profile.phone!
        })

        console.log('sending onboaring email')
        await ctx.scheduler.runAfter(0, internal.sendEmails.sendConfirmation, {
          teamEmail: profile.email,
          teamName: profile.teamName
        })

        console.log('Adding to contacts')
        await ctx.scheduler.runAfter(5, internal.addEmailContacts.addContact, {
          name: profile.teamName,
          email: profile.email
        })
      }

      return userId
    }
  }
})
