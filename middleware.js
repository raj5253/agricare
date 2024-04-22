import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks(.*)"],
  ignoredRoutes: [], //clerk ignore this route
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// By default, clerkMiddleware will not protect any routes.
// Use auth().protect() if you want to redirect unauthenticated users to the sign-in route automatically.
