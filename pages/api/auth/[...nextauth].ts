import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId:
        '313799699218-vk96os8t5e4odds9tcehjamskjir942r.apps.googleusercontent.com',
      clientSecret: 'ipFGYqpzsdLVz7D_dVHNGsz6',
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/portfolio-auth/signin',
    // signUp: '/portfolio-auth/signup',
    error: '/portfolio-auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/portfolio-auth/verify-request', // (used for check email message)
    // newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,

  callbacks: {
    async signIn() {
      return true
    },
    // async redirect(url, baseUrl) {
    //     return 'http://localhost:3000/auth/google/callback'
    // },
    async jwt(token) {
      return token
    },
  },
})
