import resend from '@convex-dev/resend/convex.config'
import { defineApp } from 'convex/server'
import { v } from 'convex/values'

const app = defineApp({
  env: {
    GOOGLE_SERVICE_ACCOUNT_KEY: v.string(),
    GOOGLE_SPREADSHEET_ID: v.string()
  }
})
app.use(resend)

export default app
