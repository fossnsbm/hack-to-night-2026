'use node'

import { internalAction, env } from './_generated/server'
import { v } from 'convex/values'
import { google } from 'googleapis'

const credentials = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY)
const spreadsheetId = env.GOOGLE_SPREADSHEET_ID

export const addUserToSheet = internalAction({
  args: {
    teamName: v.string(),
    teamLeaderName: v.string(),
    teamLeaderEmail: v.string(),
    teamLeaderPhone: v.string(),
    teamMembers: v.array(
      v.object({
        name: v.string(),
        studentId: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const values = [
      [
        args.teamName,
        args.teamLeaderName,
        args.teamLeaderEmail,
        args.teamLeaderPhone,
        JSON.stringify(args.teamMembers),
      ],
    ]

    try {
      const result = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values },
      })
      console.log('cells updated: ', result.data.updates?.updatedCells)
    } catch (err) {
      console.error('The API returned an error: ' + err)
    }
  },
})
