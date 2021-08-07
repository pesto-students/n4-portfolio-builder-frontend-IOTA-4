import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId:
        '544449301521-g2c39kei9j1sogn5ngjjdu99okjj19cv.apps.googleusercontent.com',
      clientSecret: 'TKWajA5GYkrSZjK09TW3a_Wm',
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
