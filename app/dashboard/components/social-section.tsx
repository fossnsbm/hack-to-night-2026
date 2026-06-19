'use client'

import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'

export default function SocialSection(props: {
  preloadedTeam: Preloaded<typeof api.teams.getMyTeam>
}) {
  const team = usePreloadedQuery(props.preloadedTeam)
  const [isSaving, setIsSaving] = useState(false)
  const setSocials = useMutation(api.teams.setSocials)
  const handleSave = async (formdata: FormData) => {
    try {
      setIsSaving(true)
      const githubUsername = formdata.get('githubUsername') as string
      const hackerrankUsername = formdata.get('hackerrankUsername') as string
      await setSocials({ githubUsername, hackerrankUsername })
      toast.success('Saved Socials')
    } catch (err) {
      console.log(err)
      toast.error('Failed to save Socials')
    } finally {
      setIsSaving(false)
    }
  }
  return (
    <section>
      <form action={handleSave}>
        <div className="rounded-2xl border border-border bg-panel/50 p-6 backdrop-blur-xl sticky top-24">
          <h2 className="mb-2 text-lg font-display tracking-[0.16em] text-white text-glow">
            HACKERRANK
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="hackerrank-username"
                className="block text-xs uppercase tracking-[0.12em] text-cyan-100/60 mb-3"
              >
                HackerRank Username
              </label>
              <div className="flex justify-between gap-2">
                <input
                  id="hackerrank-username"
                  name="hackerrankUsername"
                  type="text"
                  placeholder="Enter your HackerRank username"
                  defaultValue={team?.hackerUsername}
                  className="w-full rounded-xl border border-neon/20 bg-white/5 px-4 py-3 text-cyan-50 placeholder-cyan-100/30 transition-all duration-300 focus:border-neon/50 focus:bg-white/10 focus:outline-none focus:shadow-glow"
                />
              </div>
            </div>
          </div>
          <h2 className="mb-2 mt-10 text-lg font-display tracking-[0.16em] text-white text-glow">
            GITHUB
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="github-username"
                className="block text-xs uppercase tracking-[0.12em] text-cyan-100/60 mb-3"
              >
                GitHub Username
              </label>
              <div className="flex justify-between gap-2">
                <input
                  id="github-username"
                  type="text"
                  name="githubUsername"
                  placeholder="Enter your GitHub username"
                  defaultValue={team?.githubUsername}
                  className="w-full rounded-xl border border-neon/20 bg-white/5 px-4 py-3 text-cyan-50 placeholder-cyan-100/30 transition-all duration-300 focus:border-neon/50 focus:bg-white/10 focus:outline-none focus:shadow-glow"
                />
              </div>
            </div>
          </div>
          <button
            disabled={isSaving}
            className="w-full rounded-xl border border-neon/30 bg-neon/20 py-3 mt-4 font-semibold uppercase tracking-[0.12em] text-neon transition-all duration-300 hover:border-neon/50 hover:bg-neon/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:gap-3"
          >
            {isSaving ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-neon border-t-transparent px-2 py-2"></div>
              </>
            ) : (
              <>
                <span>Save</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
  {
  }
}
