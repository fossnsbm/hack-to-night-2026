import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { auth } from './auth'
import { resend } from './sendEmails'

const http = httpRouter()

http.route({
  path: '/resend-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, req) => {
    return await resend.handleResendEventWebhook(ctx as any, req)
  })
})

auth.addHttpRoutes(http)

export default http
