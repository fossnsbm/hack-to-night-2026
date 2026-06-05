import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

export default Password<DataModel>({
  profile(params, _ctx) {
    return {
      email: params.email as string,
      role: params.role as 'admin' | 'user',
      phone: params.phone as string,
      // Extra fields passed through
      teamName: params.teamName as string,
      teamLeaderName: params.teamLeaderName as string | undefined,
      teamMembers: params.teamMembers
        ? JSON.parse(params.teamMembers as string)
        : undefined,
    };
  },
});
