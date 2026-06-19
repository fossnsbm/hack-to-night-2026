'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function ChallengeProgressSection(props: {
  preloadedChallenges: Preloaded<typeof api.challenges.getChallenges>
  preloadedSolvedChallenges: Preloaded<typeof api.challenges.getTeamChallenges>
}) {
  const challengesCount = usePreloadedQuery(props.preloadedChallenges).length
  const solvedChallengesCount =
    usePreloadedQuery(props.preloadedSolvedChallenges)?.length ?? 0

  return (
    <section className="mb-8">
      <div className="rounded-2xl border border-neon/20 bg-neon/10 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-display tracking-[0.24em] text-white text-glow">
              CHALLENGE PROGRESS
            </h2>
            <p className="mt-2 text-sm text-cyan-100/60">
              Complete challenges to unlock the buildathon challenge
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-display tracking-[0.08em] text-neon text-glow">
              {solvedChallengesCount}/{challengesCount}
            </p>
            <p className="text-xs uppercase tracking-[0.12em] text-cyan-100/50 mt-1">
              Challenges Solved
            </p>
          </div>
        </div>
        <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden border border-neon/20">
          <div
            className="h-full bg-gradient-to-r from-neon to-cyan-400 transition-all duration-500"
            style={{
              width: `${(solvedChallengesCount / challengesCount) * 100}%`
            }}
          />
        </div>
      </div>
    </section>
  )
}
