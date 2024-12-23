import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
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
                const StoredUser = JSON.parse(localStorage.getItem('User'))

                if (StoredUser?.username === credentials.username && StoredUser?.password === credentials.password) {
                    return { id: StoredUser?.email, name: StoredUser?.username, password: StoredUser?.password }
                }
                else {
                    throw new Error('Invalid Credentials')
                }
            }
        })

    ],
    secret: process.env.NEXTAUTH_SECRET,

})


export { handle as GET, handle as POST }