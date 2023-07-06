import { ApiHandler } from "sst/node/api";
import { AuthHandler, GoogleAdapter } from "sst/node/auth";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
      // For a multi-tenant setup
      // tenantID: string
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID:
        "629795944145-ae1jikt5kbml7g491q5ceiu6t6vpshrv.apps.googleusercontent.com",
      onSuccess: async (tokenset) => {
        return {
          statusCode: 200,
          body: JSON.stringify(tokenset.claims()),
        };
      },
    }),
  },
});
