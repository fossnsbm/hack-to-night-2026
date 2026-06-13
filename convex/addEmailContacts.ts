'use node'

import { v } from 'convex/values'
import { Resend } from 'resend'
import { env, internalAction } from './_generated/server'

const resend: Resend = new Resend(env.RESEND_API_KEY)

export const addContact = internalAction({
  args: { email: v.string(), name: v.optional(v.string()) },
  handler: async (_ctx, args) => {
    if (!resend) {
      console.log('Invalid resend instance. Contact addition aborted')
      return
    }

    const { error } = await resend.contacts.create({
      email: args.email,
      firstName: args.name,
      unsubscribed: false
    })

    if (!error) {
      console.log('Contact added')
    } else {
      console.log(error.message)
    }
  }
})
