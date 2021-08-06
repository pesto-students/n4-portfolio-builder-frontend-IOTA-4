import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

const Login = () => {
  return (
    <div className="auth-form">
      <div className="auth-form__title h1 h1--accented">Sign Up</div>
      <div className="auth-form__caption">
        Let&apos;s get your new account set up!
      </div>
      <div className="auth-form__options">
        <LoginOptions />
      </div>
      <div className="auth-form__subtext">
        I already have an account —{' '}
        <Link href="/users/login" passHref>
          <a>Login</a>
        </Link>
      </div>
    </div>
  )
}

const LoginOptions = () => {
  const responseFacebook = (response: unknown) => {
    console.log(response)
  }
  const responseGoogle = (response: unknown) => {
    console.log(response)
  }

  return (
    <>
      <div className="login-options fluid-grid">
        <div className="login-options__option">
          <FacebookLogin
            appId=""
            autoLoad={true}
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
            clientId=""
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="btn btn--google"
            cookiePolicy={'single_host_origin'}
            buttonText="Google"
          />
        </div>
        <div className="login-options__option">
          <button className="btn btn--email">
            <FontAwesomeIcon
              icon={faEnvelope}
              // className="navbar-menu__list-item-icon navbar-menu__list-item-icon--theme"
            />
            Email
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
