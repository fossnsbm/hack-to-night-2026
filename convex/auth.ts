import CustomPassword from "./CustomProfile";
import { convexAuth } from "@convex-dev/auth/server";
import { internal } from './_generated/api'
import { MutationCtx } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomPassword],
  callbacks: {
    async createOrUpdateUser(ctx: MutationCtx, args) {
      if (args.existingUserId) {
        return args.existingUserId;
      }

      const profile = args.profile as {
        email: string;
        role?: 'admin' | 'user';
        phone?: string;
        teamName?: string;
        teamLeaderName?: string;
        teamMembers?: { name: string; studentId: string }[];
      };

      const userId = await ctx.db.insert("users", {
        email: profile.email,
        role: 'user',
        phone: profile.phone!,
      });

      if (profile.teamName && profile.teamLeaderName && profile.teamMembers) {
        await ctx.db.insert("teams", {
          userId,
          teamName: profile.teamName,
          teamLeaderName: profile.teamLeaderName,
          teamMembers: profile.teamMembers,
        });

      }

      return userId;
    },
  },
});
