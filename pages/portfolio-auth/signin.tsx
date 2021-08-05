import { getSession } from 'next-auth/client'
import Login from '../users/login'
import { GetServerSideProps } from 'next'
import type { Session } from 'next-auth'
export default function SignIn() {
  return (
    <div>
      <Login></Login>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
