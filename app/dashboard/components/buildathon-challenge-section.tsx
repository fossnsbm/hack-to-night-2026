'use client'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import { Circle, Lock } from 'lucide-react'
import { api } from '@/convex/_generated/api'

export default function BuildathonChallengeSection(props: {
  preloadedChallenges: Preloaded<typeof api.challenges.getChallenges>
  preloadedSolvedChallenges: Preloaded<typeof api.challenges.getTeamChallenges>
}) {
  const solvedCount =
    usePreloadedQuery(props.preloadedSolvedChallenges)?.length ?? 0
  const challengeCount = usePreloadedQuery(props.preloadedChallenges).length
  const threshold = Math.round(challengeCount / 2)
  const isLockedBuildathon = solvedCount < threshold

  return (
    <section>
      <h2 className="mb-6 text-2xl font-display tracking-[0.24em] text-white text-glow">
        BUILDATHON CHALLENGE
      </h2>

      {isLockedBuildathon ? (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-8 backdrop-blur-xl text-center">
          <Lock className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-amber-50 mb-2">
            Challenge Locked
          </h3>
          <p className="text-sm text-amber-100/70 mb-6">
            Complete {threshold - solvedCount} more{' '}
            {threshold - solvedCount === 1 ? 'challenge' : 'challenges'} to
            unlock the buildathon challenge
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400/10 border border-amber-400/30">
            <Circle className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-200">
              {solvedCount}/{threshold} requirements met
            </span>
          </div>
        </div>
      ) : (
        <div className="group block rounded-2xl border border-neon/30 bg-gradient-to-br from-neon/20 to-cyan-400/10 p-8 backdrop-blur-xl transition-all duration-300 hover:border-neon/50 hover:from-neon/30 hover:to-cyan-400/20 hover:shadow-glow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-display tracking-[0.2em] text-neon text-glow mb-2 uppercase">
                fix a cruicial system, make it your own
              </h3>
              <p className="text-md text-cyan-100/70">
                Identify, Re Design and implement the given online banking
                solution providing your own features.
                <br />
                <a
                  className="text-neon hover:text-cyan-500"
                  target="_blank"
                  href="https://github.com/fossnsbm/hack-to-night-2026-challenge.git"
                >
                  Access it here
                </a>
              </p>

              <p className="text-xs">
                You have been given read access to the challenge repostitory.
                Check your emails to accept the invitation.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon/10 border border-neon/30 group-hover:border-neon/50 group-hover:bg-neon/20 transition-all">
            <span className="text-xs font-semibold text-neon uppercase tracking-[0.1em]">
              Unlocked
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
