export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg text-white">
      <div className="relative rounded-[2rem] border border-neon/20 bg-white/5 px-8 py-10 shadow-glow backdrop-blur-xl">
        <div className="absolute inset-x-6 top-5 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
        <div className="mx-auto h-24 w-24 rounded-full border border-neon/30">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-neon border-t-transparent" />
          </div>
        </div>
        <p className="mt-6 text-center font-display text-sm uppercase tracking-[0.36em] text-neon text-glow">
          Initializing the Grid
        </p>
      </div>
    </div>
  )
}
