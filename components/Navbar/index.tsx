import Link from 'next/link'
import Device from '../../helpers/Device'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPassport, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const Navbar = (): JSX.Element => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const toggleNavbarOpen = () => {
    setNavbarOpen(!navbarOpen)
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
                        <Link href="/" passHref>
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
