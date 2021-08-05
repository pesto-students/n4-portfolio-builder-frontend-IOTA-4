import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { Field, Form } from 'react-final-form'
import GoogleLogin from 'react-google-login'
import TextField from '../../components/inputs/TextField'
import {
  combineValidations,
  presence,
  validEmailValidation,
} from '../../helpers/validationHelpers'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'

const Login = ({}) => {
  const [session] = useSession()
  const [, setLoading] = useState(false)
  //redirect to home page
  if (session && session.user) {
    console.log('print session info', session)
  } // Anamay define your route here where you want to redirect user after login

  function handleGoogleSIgnIn() {
    setLoading(true)
    signIn('google')
  }

  return (
    <div className="auth-form">
      <div className="auth-form__title h1 h1--accented">Login</div>
      <div className="auth-form__caption">We are happy to see you back!</div>
      <div className="auth-form__options">
        <div
          onClick={handleGoogleSIgnIn}
          className="bg-[#DE5246] px-8 py-2 rounded-md flex items-center space-x-5 w-full cursor-pointer"
        >
          <img
            loading="lazy"
            className="w-8 h-8"
            src="https://img.icons8.com/ios-filled/150/ffffff/gmail-new.png"
          />
          <h1 className="text-white text-sm lg:text-base font-semibold">
            Continue with Google
          </h1>
        </div>
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
  const [currentActiveForm, setCurrentActiveForm] =
    useState<loginForms>('loginOptions')
  const responseFacebook = (response: unknown) => {
    console.log(response)
  }
  const responseGoogle = (response: unknown) => {
    console.log(response)
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
            <GoogleLogin
              clientId="313799699218-vk96os8t5e4odds9tcehjamskjir942r.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              className="btn btn--google"
              cookiePolicy={'single_host_origin'}
              buttonText="Google"
            />
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
