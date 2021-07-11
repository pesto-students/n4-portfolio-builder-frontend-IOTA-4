import Link from 'next/link'
import Device from '../../helpers/Device'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faMoon,
  faPassport,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useTheme } from '../../hoc/ThemeProvider'

const Navbar = (): JSX.Element => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { theme, setTheme } = useTheme()!
  const toggleNavbarOpen = () => {
    setNavbarOpen(!navbarOpen)
  }
  const toggleDarkMode = () => {
    if (theme == 'dark') setTheme('light')
    if (theme == 'light') setTheme('dark')
  }

  useEffect(() => {
    const bodyNode = document.querySelector('body')
    // TODO: make it close by tapping anywhere on the screen outside of menu
    if (bodyNode) {
      if (navbarOpen) {
        bodyNode.style.overflow = 'hidden'
      } else {
        bodyNode.style.overflow = 'auto'
      }
    }
  }, [navbarOpen])
  return (
    <>
      <header className="navbar">
        <div className="container">
          <Link href="/" passHref>
            <a className="logo"></a>
          </Link>
          <Device>
            {({ isMobile, isDesktop }) => (
              <>
                {((isMobile && navbarOpen) || isDesktop) && (
                  <div className="navbar-menu">
                    <ul className="navbar-menu__list">
                      <li className="navbar-menu__list-item">
                        <Link href="/" passHref>
                          <a>
                            {isMobile && (
                              <FontAwesomeIcon
                                className="navbar-menu__list-item-icon"
                                icon={faPassport}
                              />
                            )}
                            Create your portfolio
                          </a>
                        </Link>
                      </li>
                      <li className="navbar-menu__list-item">
                        <Link href="/users/login" passHref>
                          <a>
                            {isMobile && (
                              <FontAwesomeIcon
                                className="navbar-menu__list-item-icon"
                                icon={faUser}
                              />
                            )}
                            Login
                          </a>
                        </Link>
                      </li>
                      <li className="navbar-menu__list-item">
                        <label
                          htmlFor="toggle-dark-mode"
                          title="Toggle Dark Mode"
                        >
                          <input
                            type="checkbox"
                            name="toggle-dark-mode"
                            id="toggle-dark-mode"
                            onChange={toggleDarkMode}
                            checked={theme == 'dark'}
                            className="hidden"
                          />
                          <FontAwesomeIcon
                            icon={theme == 'dark' ? faMoon : faSun}
                            style={{
                              color: theme == 'dark' ? 'grey' : '#ff5e00',
                            }}
                            className="navbar-menu__list-item-icon navbar-menu__list-item-icon--theme"
                          />
                          {isMobile && <>Toggle Dark Mode</>}
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
                {isMobile && (
                  <button
                    className="navbar-menu__btn"
                    onClick={toggleNavbarOpen}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                )}
              </>
            )}
          </Device>
        </div>
      </header>
    </>
  )
}

export default Navbar
