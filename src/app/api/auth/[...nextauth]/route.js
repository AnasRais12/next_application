import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handle = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid profile email https://www.googleapis.com/auth/user.phonenumbers.read",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post("https://fakestoreapi.com/auth/login", {
            username: credentials.username,
            password: credentials.password,
          });
          if (response.data.token) {
            return {
              name: credentials.username,
              password: credentials.password,
              token: response.data.token,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token, account, }) {
      if (account) {
        token.accesToken = account.access_token
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + (account.expires_at || 0) * 1000
      }
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
        token.phoneNumber = user.phoneNumber;
      }
    return token

        
      // const refreshedToken = await GeneratedAccesToken(token.refresh_token)
      // console.log('Token HAS Expiryyyyyyyyyyyyyyyyyyyyyyyyyyy')
      // console.log('Token HAS Expiryyyyyyyyyyyyyyyyyyyyyyyyyyy')
      // console.log('Token HAS Expiryyyyyyyyyyyyyyyyyyyyyyyyyyy')
      // console.log('Token HAS Expiryyyyyyyyyyyyyyyyyyyyyyyyyyy')
      // return {
      //   ...token,
      //   accesToken: refreshedToken.accessToken,
      //   accessTokenExpires: refreshedToken.accesTokenExpires,
      //   refreshToken: refreshedToken.refreshToken
      // }

    },

    async session({ token, session }) {
      session.user = {
        name: token.name,
        email: token.email,
        token: token.token,
        phoneNumber: token.phoneNumber,


      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handle as GET, handle as POST };
