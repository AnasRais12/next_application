import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// import Credentials from "next-auth/providers/credentials";/
const handle = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post('https://fakestoreapi.com/auth/login', {
                        username: credentials.username,
                        password: credentials.password
                    },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    const data = response.data
                    const token = data.token
                    const decoded = jwtDecode(token)
                    console.log(decoded, '________________________________________-DECODED');
                    console.log(data, '_______________________--Dataaaaaaaaaaaaa')
                    console.log(token, '_______________________--token')

                    if (data.token) {
                        return { id: decoded?.sub, name: decoded?.user, password: credentials.password, token: data.token }
                    }
                    else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error) {
                    console.error("API Error:", error.response?.data || error.message);
                }
            }
        })

    ],
    callbacks: {

        async jwt(user, token) {
            if (user) {
                user.token = token.token
                user.id = token.id
                user.name = token.name
                user.password = token.password
            }
            return token
        },
        async session(session, token) {
            if (session) {
                session.token = token.token
                session.id = token.id
                session.name = token.name
                session.password = token.password
            }
            return session
        }

    },
    secret: process.env.NEXTAUTH_SECRET,

})


export { handle as GET, handle as POST }