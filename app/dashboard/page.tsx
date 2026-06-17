'use client'
import { useAuthActions } from '@convex-dev/auth/react'

export default function Page() {
  const { signOut } = useAuthActions()
  return (
    <>
      <h1>dashboard</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  )
}
