import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import UserForm from '../../components/UserForm'
import Device from '../../helpers/Device/Device'
import parsedResumeResponses from '../../mockData/mockData'
import SecondTemplate from '../../templates/SecondTemplate/SecondTemplate'
import ParsedResume from '../../types/ParsedResume'

const PortfolioCreate = () => {
  const [userData, setUserData] = useState<ParsedResume | void>()
  const router = useRouter()
  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading && !!!session?.user) {
      router.push('/users/login')
    }
  }, [loading, session])

  if (!!session?.user)
    return (
      <>
        <Device>
          {({ isMobile, isDesktop }) => (
            <div className="fluid-grid create-portfolio">
              <div
                className={`col-${
                  isMobile ? '100' : '50'
                } create-portfolio__form`}
              >
                <UserForm
                  onDataUpdate={(data: ParsedResume) => setUserData(data)}
                />
              </div>
              {isDesktop && (
                <div className="col-50 create-portfolio__preview user-form">
                  <div className="user-form__title h3">Preview</div>
                  <div className="create-portfolio__preview-window">
                    <SecondTemplate
                      data={userData || parsedResumeResponses[0]}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </Device>
      </>
    )

  return <></>
}

export default PortfolioCreate
