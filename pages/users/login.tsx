import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { Field, Form } from 'react-final-form'
import TextField from '../../components/inputs/TextField'
import {
  combineValidations,
  presence,
  validEmailValidation,
} from '../../helpers/validationHelpers'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'

const Login = ({}) => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (!loading && session && session.user) {
    router.push('/portfolios/select-template')
    return <></>
  } else
    return (
      <div className="auth-form">
        <div className="auth-form__title h1 h1--accented">Login</div>
        <div className="auth-form__caption">We are happy to see you back!</div>
        <div className="auth-form__options">
          <LoginOptions />
        </div>
        <div className="auth-form__subtext">
          I am not registered —{' '}
          <Link href="/users/signup" passHref>
            <a>Sign Up</a>
          </Link>
        </div>
      </div>
    )
}

const LoginOptions = () => {
  type loginForms = 'loginOptions' | 'loginViaEmail'
  const [, setLoading] = useState(false)
  const [currentActiveForm, setCurrentActiveForm] =
    useState<loginForms>('loginOptions')
  const responseFacebook = (response: unknown) => {
    console.log(response)
  }

  function handleGoogleSignIn() {
    setLoading(true)
    signIn('google')
  }

  return (
    <>
      <div className={`login-wrap login-wrap--active-${currentActiveForm}`}>
        <div className="login-options">
          <div className="login-options__option">
            <FacebookLogin
              appId="1088597931155576"
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="btn btn--facebook"
              icon="fa-facebook"
              size="small"
              textButton="Facebook"
            />
          </div>
          <div className="login-options__option">
            <button onClick={handleGoogleSignIn} className="btn btn--google">
              <img
                loading="lazy"
                className="login-google-icon"
                src="https://img.icons8.com/ios-filled/150/ffffff/gmail-new.png"
              />
              Google
            </button>
          </div>
          <div className="login-options__option">
            <button
              className="btn btn--email"
              onClick={() => {
                setCurrentActiveForm('loginViaEmail')
              }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                // className="navbar-menu__list-item-icon navbar-menu__list-item-icon--theme"
              />
              Email
            </button>
          </div>
        </div>
        <Form
          onSubmit={(values) => {
            console.log('values', values)
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="login-form">
              <Field
                name="email"
                labelName="Email"
                component={TextField}
                validate={(value) =>
                  combineValidations(value, [presence, validEmailValidation])
                }
              />
              <Field
                name="password"
                type="password"
                labelName="Password"
                component={TextField}
                validate={(value) => combineValidations(value, [presence])}
              />
              <div className="login-form__actions">
                <a
                  onClick={() => {
                    setCurrentActiveForm('loginOptions')
                  }}
                >
                  Go back
                </a>
                <button className="btn btn--md">Login</button>
              </div>
            </form>
          )}
        />
      </div>
    </>
  )
}

export default Login
