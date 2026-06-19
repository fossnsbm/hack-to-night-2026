import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect
} from '@convex-dev/auth/nextjs/server'

const isSignInPage = createRouteMatcher(['/signin'])
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const hasStarted = JSON.parse(process.env.NEXT_PUBLIC_HAS_STARTED!)

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (!hasStarted)
    if (isSignInPage(request) || isProtectedRoute(request)) {
      return nextjsMiddlewareRedirect(request, '/')
    }
  if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, '/dashboard')
  }
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, '/signin')
  }
})

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
