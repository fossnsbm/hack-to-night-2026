import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { preloadedQueryResult, preloadQuery } from 'convex/nextjs'
import {
  CheckCircle2,
  CircleDashed,
  Code2,
  Github,
  Lock,
  UserRoundCog,
  Users,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { SubmissionCountdown } from './components/submission-countdown'

type NextAction = {
  title: string
  description: string
  href: string
  cta: string
  icon: React.ReactNode
}

export default async function Page() {
  const token = await convexAuthNextjsToken()
  const [teamQuery, challengesQuery, solvedChallengesQuery] = await Promise.all(
    [
      preloadQuery(api.teams.getMyTeam, {}, { token }),
      preloadQuery(api.challenges.getChallenges),
      preloadQuery(api.challenges.getTeamChallenges, {}, { token })
    ]
  )

  const team = preloadedQueryResult(teamQuery)
  const challenges = preloadedQueryResult(challengesQuery)
  const solvedChallenges = preloadedQueryResult(solvedChallengesQuery) ?? []

  if (!team) redirect('/signin')

  const challengesCount = challenges.length
  const solvedCount = solvedChallenges.length
  const unlockThreshold = Math.round(challengesCount / 2)
  const progressPercent =
    challengesCount > 0 ? Math.round((solvedCount / challengesCount) * 100) : 0
  const remainingToUnlock = Math.max(unlockThreshold - solvedCount, 0)
  const hasHackerrank = Boolean(team.hackerUsername)
  const hasGithub = Boolean(team.githubUsername)
  const isBuildathonUnlocked =
    Boolean(team.buildathonUnlocked) ||
    (challengesCount > 0 && solvedCount >= unlockThreshold)

  const challengeBySlug = new Map(
    challenges.map((challenge) => [challenge.slug, challenge])
  )
  const recentlySolved = [...solvedChallenges]
    .sort((a, b) => b.solvedAt - a.solvedAt)
    .slice(0, 4)

  const setupItems = [
    {
      label: 'Hackerrank username',
      complete: hasHackerrank,
      value: team.hackerUsername
    },
    {
      label: 'GitHub username',
      complete: hasGithub,
      value: team.githubUsername
    }
  ]

  const nextActionCandidates: Array<NextAction | null> = [
    !hasHackerrank || !hasGithub
      ? {
          title: 'Complete your profile',
          description:
            'Add your Hackerrank and GitHub usernames so progress tracking and repo access work correctly.',
          href: '/dashboard/profile',
          cta: 'Update profile',
          icon: <UserRoundCog className="h-5 w-5" />
        }
      : null,
    remainingToUnlock > 0
      ? {
          title: 'Unlock the buildathon challenge',
          description: `Solve ${remainingToUnlock} more ${
            remainingToUnlock === 1 ? 'challenge' : 'challenges'
          } to unlock the final buildathon task.`,
          href: '/dashboard/tasks',
          cta: 'View tasks',
          icon: <Code2 className="h-5 w-5" />
        }
      : null,
    isBuildathonUnlocked
      ? {
          title: 'Start the buildathon task',
          description:
            'Your team has access to the repository. Accept the GitHub invitation and begin the implementation.',
          href: 'https://github.com/fossnsbm/hack-to-night-2026-challenge.git',
          cta: 'Open repository',
          icon: <Github className="h-5 w-5" />
        }
      : null
  ]
  const nextActions = nextActionCandidates.filter(
    (action): action is NextAction => Boolean(action)
  )

  return (
    <div className="p-6">
      <section className="mb-8">
        <div className="rounded-2xl border border-border bg-panel/50 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/50">
                Team overview
              </p>
              <h2 className="mt-2 text-3xl font-display tracking-[0.2em] text-white text-glow">
                {team.teamName}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-cyan-100/60">
                Use this page as your starting point: check profile setup, track
                challenge progress, and jump into the next task.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[32rem]">
              <SummaryTile
                label="Members"
                value={String(team.teamMembers.length)}
                icon={<Users className="h-5 w-5" />}
              />
              <SummaryTile
                label="Solved"
                value={`${solvedCount}/${challengesCount}`}
                icon={<CheckCircle2 className="h-5 w-5" />}
              />
              <SummaryTile
                label="Progress"
                value={`${progressPercent}%`}
                icon={<Zap className="h-5 w-5" />}
              />
              <SummaryTile
                label="Buildathon"
                value={isBuildathonUnlocked ? 'Unlocked' : 'Locked'}
                icon={
                  isBuildathonUnlocked ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-display tracking-[0.24em] text-white text-glow">
                NEXT ACTIONS
              </h2>
              <Link
                href="/dashboard/tasks"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-neon hover:text-cyan-300"
              >
                View tasks
              </Link>
            </div>
            <div className="grid gap-4 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(0,1fr))] md:auto-rows-fr">
              {nextActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    action.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group rounded-2xl border border-border bg-panel/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-neon/40 hover:bg-neon/10"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-neon/20 bg-neon/10 text-neon transition-all group-hover:border-neon/50 group-hover:shadow-glow">
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-cyan-50">{action.title}</h3>
                  <p className="mt-2 text-sm text-cyan-100/60">
                    {action.description}
                  </p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-neon">
                    {action.cta}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-display tracking-[0.24em] text-white text-glow">
              CHALLENGE PROGRESS
            </h2>
            <div className="rounded-2xl border border-neon/20 bg-neon/10 p-6 backdrop-blur-xl">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-cyan-100/70">
                    Complete half of the coding challenges to unlock the
                    buildathon challenge.
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-cyan-100/50">
                    Unlock requirement: {unlockThreshold} solved
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-3xl font-display tracking-[0.08em] text-neon text-glow">
                    {solvedCount}/{challengesCount}
                  </p>
                  <p className="text-xs uppercase tracking-[0.12em] text-cyan-100/50">
                    Challenges solved
                  </p>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full border border-neon/20 bg-white/5">
                <div
                  className="h-full bg-gradient-to-r from-neon to-cyan-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-display tracking-[0.24em] text-white text-glow">
              RECENT SOLVES
            </h2>
            <div className="space-y-4">
              {recentlySolved.length > 0 ? (
                recentlySolved.map((solvedChallenge) => {
                  const challenge = challengeBySlug.get(
                    solvedChallenge.challengeSlug
                  )

                  return (
                    <div
                      key={solvedChallenge._id}
                      className="rounded-2xl border border-border bg-panel/50 p-6 backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <h3 className="font-semibold text-cyan-50">
                              {challenge?.name ?? solvedChallenge.challengeSlug}
                            </h3>
                          </div>
                          {challenge && (
                            <p className="mt-2 text-sm capitalize text-cyan-100/60">
                              {challenge.difficulty} challenge
                            </p>
                          )}
                        </div>
                        <span className="text-xs uppercase tracking-[0.1em] text-cyan-100/40">
                          {new Date(
                            solvedChallenge.solvedAt
                          ).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="rounded-2xl border border-border bg-panel/50 p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <CircleDashed className="h-5 w-5 text-cyan-100/50" />
                    <h3 className="font-semibold text-cyan-50">
                      No solved challenges yet
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-cyan-100/60">
                    Start with the HackerRank tasks and your solved challenges
                    will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <section>
          <h2 className="mb-4 text-xl font-display tracking-[0.24em] text-white text-glow">
            EVENT INFO
          </h2>
          <div className="space-y-4">
            <SubmissionCountdown />
            <div className="rounded-2xl border border-border bg-panel/50 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.12em] text-cyan-100/60">
                Profile setup
              </p>
              <div className="mt-4 space-y-3">
                {setupItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 rounded-xl border border-neon/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-cyan-50">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs text-cyan-100/45">
                        {item.value ?? 'Not added'}
                      </p>
                    </div>
                    {item.complete ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                    ) : (
                      <CircleDashed className="h-5 w-5 shrink-0 text-amber-300" />
                    )}
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/profile"
                className="mt-5 inline-flex items-center text-xs font-semibold uppercase tracking-[0.12em] text-neon hover:text-cyan-300"
              >
                Manage profile
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function SummaryTile({
  label,
  value,
  icon
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-neon/20 bg-neon/10 p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-neon/20 bg-neon/10 text-neon">
        {icon}
      </div>
      <p className="text-xs uppercase tracking-[0.12em] text-cyan-100/50">
        {label}
      </p>
      <p className="mt-1 text-lg font-display tracking-[0.08em] text-neon text-glow">
        {value}
      </p>
    </div>
  )
}
