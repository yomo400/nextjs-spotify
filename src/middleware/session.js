import { withIronSession } from "next-iron-session";

const withSession = (handler) => {
  return withIronSession(handler, {
    cookieName: 'app_session',
    password: `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
  });
}

export default withSession;