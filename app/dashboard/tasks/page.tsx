import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import BuildathonChallengeSection from '../components/buildathon-challenge-section'
import ChallengeProgressSection from '../components/challenges-progress-section'
import ChallengesSection from '../components/challenges-section'

export default async function DashboardTasks() {
  const challenges = await preloadQuery(api.challenges.getChallenges)
  const solvedChallenges = await preloadQuery(
    api.challenges.getTeamChallenges,
    {},
    { token: await convexAuthNextjsToken() }
  )

  return (
    <div className="p-6">
      {/* Progress Section */}
      <ChallengeProgressSection
        preloadedChallenges={challenges}
        preloadedSolvedChallenges={solvedChallenges}
      />

      {/* HackerRank Challenges Section */}
      <ChallengesSection
        preloadedChallenges={challenges}
        preloadedSolvedChallenges={solvedChallenges}
      />

      {/* Buildathon Challenge Section */}
      <BuildathonChallengeSection
        preloadedChallenges={challenges}
        preloadedSolvedChallenges={solvedChallenges}
      />
    </div>
  )
}
