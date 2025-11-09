import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({
  locals: { session, adminUser },
}) => {
  // hooks.server.ts already handles the authentication check
  // Just return the data here
  return {
    session,
    adminUser,
  };
};
