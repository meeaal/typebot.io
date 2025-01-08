import { mockedUser } from "@typebot.io/lib/mockedUser"; // Use existing mocked user for simplicity
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";

// Dummy session object representing a logged-in user
const dummySession = {
  user: {
    id: "dummy-user-id",
    name: "Guest User",
    email: "guest@example.com",
    image: null,
  },
  expires: "2100-01-01T00:00:00.000Z", // Arbitrary far-future date for expiration
};

// Simplified AuthOptions with no providers
const getAuthOptions = (): AuthOptions => ({
  providers: [], // Remove all providers, so no external login options are available
  session: {
    strategy: "jwt", // Simplify to JWT for easy session handling
  },
  callbacks: {
    // Always return the dummy session
    session: async () => {
      return dummySession;
    },
    // Automatically allow all sign-in attempts
    signIn: async () => true,
  },
  pages: {
    signIn: "/", // Optionally redirect to the main page, avoiding unnecessary login screens
  },
});

// Simplified handler that uses the dummy options
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, getAuthOptions());
};

export default handler;
