'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { Crown, Mail, Users } from 'lucide-react'
import { api } from '@/convex/_generated/api'

export default function TeamProfileSection(props: {
  preloadedTeam: Preloaded<typeof api.teams.getMyTeam>
}) {
  const teamData = usePreloadedQuery(props.preloadedTeam)

  if (!teamData) return

  return (
    <section className="lg:col-span-2">
      <div className="space-y-6">
        {/* Team Name Card */}
        <div className="rounded-2xl border border-border bg-panel/50 p-8 backdrop-blur-xl">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-neon"></div>
            <label className="text-xs uppercase tracking-[0.12em] text-cyan-100/60">
              Team Name
            </label>
          </div>
          <p className="text-2xl font-display tracking-[0.16em] text-white text-glow">
            {teamData.teamName}
          </p>
        </div>

        {/* Email Card */}
        <div className="rounded-2xl border border-border bg-panel/50 p-8 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <Mail className="h-4 w-4 text-neon" />
            <label className="text-xs uppercase tracking-[0.12em] text-cyan-100/60">
              Email Address
            </label>
          </div>
          <p className="text-lg font-semibold text-cyan-50">{teamData.email}</p>
        </div>

        {/* Team Members Section */}
        <div className="rounded-2xl border border-border bg-panel/50 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-neon" />
            <h2 className="text-lg font-display tracking-[0.16em] text-white text-glow">
              TEAM MEMBERS
            </h2>
          </div>

          <div className="space-y-4">
            {teamData.teamMembers.map((member, index) => (
              <div
                key={index}
                className="rounded-xl border border-neon/20 bg-neon/10 p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-cyan-50">
                    {index === 0 ? (
                      <span className="flex gap-2 items-center">
                        {member.name} <Crown className="h-4 w-4" />
                      </span>
                    ) : (
                      member.name
                    )}
                  </p>
                  <p className="text-xs uppercase tracking-[0.1em] text-cyan-100/50 mt-1">
                    ID: {member.studentId}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neon/30 bg-neon/10">
                  <span className="text-lg font-display text-neon">
                    {member.name.charAt(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
