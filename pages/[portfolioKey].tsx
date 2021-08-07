import SecondTemplate from '../templates/SecondTemplate'
import { useEffect, useState } from 'react'
import ParsedResume from '../types/ParsedResume'

const PortfolioShow = () => {
  const [inputResumeData, setInputResumeData] = useState<ParsedResume>()
  useEffect(() => {
    const parsedResumeData = JSON.parse(
      localStorage.getItem('inputResume') || ''
    )
    setInputResumeData(parsedResumeData)
  }, [])
  return (
    <div className="__themed-light__">
      {inputResumeData && <SecondTemplate.component data={inputResumeData} />}
    </div>
  )
}

export default PortfolioShow
