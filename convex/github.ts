import { Octokit as OctokitCore } from '@octokit/core'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'
import { v } from 'convex/values'
import { env, internalAction } from './_generated/server'

export const inviteToChallenge = internalAction({
  args: { githubUsername: v.string() },
  handler: async (_ctx, { githubUsername }) => {
    const Octokit = OctokitCore.plugin(restEndpointMethods)
    const octokit = new Octokit({
      auth: env.GITHUB_TOKEN
    })

    try {
      await octokit.rest.repos.addCollaborator({
        owner: 'fossnsbm',
        repo: 'hack-to-night-2026-challenge',
        username: githubUsername,
        permission: 'pull'
      })
      console.log('Successfully sent the invite')
    } catch (err) {
      console.log(`Failed to invite: ${err}`)
    }
  }
})
