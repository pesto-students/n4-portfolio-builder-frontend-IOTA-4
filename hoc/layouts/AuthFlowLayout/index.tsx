import { ReactNode } from 'react'

const AuthFlowLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <div className="auth">
        <div className="container">{children}</div>
      </div>
    </>
  )
}

export default AuthFlowLayout
