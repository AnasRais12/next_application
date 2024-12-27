import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handle = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
         await axios.post("https://fakestoreapi.com/auth/login",   
         {
          username: credentials.username,
          password: credentials.password
        }).then((response) => {
          const data = response.data;
          if (data && data.token) {
            return {
              name: credentials.username,
              password: credentials.password,
              token: data.token
            };
          }
        })
        .catch((error) => {
          console.log(error, 'Error++++++++++++++++++++++++++++')
          throw new Error("Invalid credentials");
        });
      }
    })
  ],
  callbacks: {

    async jwt({ user, token }) {
      if (user) {
        token.name = user.name
        token.password = user.password
        token.token = user.token
      }
      return token
    },
    async session({ token, session }) {
      session.user = {
        name: token.name,
        password: token.password,
        token: token.token

      }
      return session;
    },
    // async session({ session, token }) {
    //   session.user = {
    //     id: token.id,
    //     name: token.name,
    //     token: token.token
    //   };
    //   return session;
    // }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handle as GET , handle as POST };


fetch('https://fakestoreapi.com/auth/login"',{
  method:'post',
  
  // headers:{
    

  // },
  body:JSON.stringify({

  })
  
})