'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { CheckCircle2 } from 'lucide-react'
import { api } from '@/convex/_generated/api'

export default function ChallengesSection(props: {
  preloadedChallenges: Preloaded<typeof api.challenges.getChallenges>
  preloadedSolvedChallenges: Preloaded<typeof api.challenges.getTeamChallenges>
}) {
  const challenges = usePreloadedQuery(props.preloadedChallenges)
  const loadedSolvedChallenges = usePreloadedQuery(
    props.preloadedSolvedChallenges
  )

  const solvedChallenges =
    loadedSolvedChallenges?.map((challenge) => challenge.challengeSlug) ?? []

  const getDifficultyColor = (
    difficulty: 'easy' | 'medium' | 'hard' | 'advanced' | 'expert'
  ) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'hard':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'advanced':
        return 'text-red-500 bg-red-400/10 border-red-400/20'
      case 'expert':
        return 'text-red-800 bg-red-400/10 border-red-400/20'
    }
  }

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-display tracking-[0.24em] text-white text-glow">
        HACKERRANK CHALLENGES
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {challenges.map((challenge) => (
          <a
            key={challenge.slug}
            href={`https://hackerrank.com/contests/${process.env.NEXT_PUBLIC_CONTEST_SLUG}/challenges/${challenge.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl border border-border bg-panel/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-neon/40 hover:bg-neon/10"
          >
            {/* Solved Badge */}
            {solvedChallenges.includes(challenge.slug) && (
              <div className="absolute top-3 right-3">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
            )}
            {/* Content */}
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-cyan-50 mb-3 group-hover:text-neon transition-colors">
                  {challenge.name}
                </h3>
              </div>

              {/* Difficulty Badge */}
              <div
                className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${getDifficultyColor(challenge.difficulty)}`}
              >
                {challenge.difficulty}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
