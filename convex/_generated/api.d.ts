/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as CustomProfile from "../CustomProfile.js";
import type * as addEmailContacts from "../addEmailContacts.js";
import type * as auth from "../auth.js";
import type * as challenges from "../challenges.js";
import type * as github from "../github.js";
import type * as googleSheets from "../googleSheets.js";
import type * as http from "../http.js";
import type * as lib_index from "../lib/index.js";
import type * as sendEmails from "../sendEmails.js";
import type * as teams from "../teams.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  CustomProfile: typeof CustomProfile;
  addEmailContacts: typeof addEmailContacts;
  auth: typeof auth;
  challenges: typeof challenges;
  github: typeof github;
  googleSheets: typeof googleSheets;
  http: typeof http;
  "lib/index": typeof lib_index;
  sendEmails: typeof sendEmails;
  teams: typeof teams;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  resend: import("@convex-dev/resend/_generated/component.js").ComponentApi<"resend">;
};
