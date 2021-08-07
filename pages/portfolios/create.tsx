import { useState } from 'react'
import UserForm from '../../components/UserForm'
import parsedResumeResponses from '../../mockData/mockData'
import SecondTemplate from '../../templates/SecondTemplate/SecondTemplate'
import ParsedResume from '../../types/ParsedResume'

const PortfolioCreate = () => {
  const [userData, setUserData] = useState<ParsedResume | void>()
  return (
    <>
      <div className="fluid-grid create-portfolio">
        <div className="col-50 create-portfolio__form">
          <UserForm onDataUpdate={(data: ParsedResume) => setUserData(data)} />
        </div>
        <div className="col-50 create-portfolio__preview user-form">
          <div className="user-form__title h3">Preview</div>
          <div className="create-portfolio__preview-window">
            <SecondTemplate data={userData || parsedResumeResponses[0]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PortfolioCreate
