import { Resend } from '@convex-dev/resend'
import { v } from 'convex/values'
import { components } from './_generated/api'
import { env, internalMutation } from './_generated/server'

export const resend: Resend = new Resend(components.resend, { testMode: false })

export const sendConfirmation = internalMutation({
  args: {
    teamName: v.string(),
    teamEmail: v.string()
  },
  handler: async (ctx, args) => {
    if (!env.RESEND_API_KEY) {
      console.log('Resend API not send. Aborting!')
      return
    }
    await resend.sendEmail(ctx, {
      from: 'FOSS Community <htn25@updates.fossnsbm.org>',
      to: args.teamEmail,
      subject: 'Welcome to HackToNight 3.0',
      template: {
        id: env.RESEND_ONBOARDING_TEMPLATE!,
        variables: {
          team_name: args.teamName
        }
      }
    })
  }
})
