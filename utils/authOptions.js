// https://next-auth.js.org/configuration/callbacks

import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    // Invoked on successful signin
    async signIn({ account, profile }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if the user exists
      const userExist = await User.findOne({ email: profile.email });
      // 3. If not, then add the user to the database
      if (!userExist) {
        // Truncate user name if too long
        const userName = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username: userName,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },

    // Modifies the session object

    async session({ session }) {
      // 1. Get the user from the database
      const user = await User.findOne({
        email: session.user.email,
      });
      // 2. Assign the user id to the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
