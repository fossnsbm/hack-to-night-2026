import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { preloadedQueryResult, preloadQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import SocialSection from '../components/social-section'
import TeamProfileSection from '../components/team-profile-section'

export default async function ProfilePage() {
  const team = await preloadQuery(
    api.teams.getMyTeam,
    {},
    { token: await convexAuthNextjsToken() }
  )

  const teamData = preloadedQueryResult(team)

  if (!teamData) redirect('/signin')

  return (
    <div className="p-6">
      {/* Page Title */}
      <section className="mb-8">
        <h1 className="text-3xl font-display tracking-[0.32em] text-white text-glow">
          TEAM PROFILE
        </h1>
        <p className="mt-2 text-sm uppercase tracking-[0.16em] text-cyan-100/50">
          Manage your team information
        </p>
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Team Information Section */}
        <TeamProfileSection preloadedTeam={team} />
        <SocialSection preloadedTeam={team} />
      </div>
    </div>
  )
}
