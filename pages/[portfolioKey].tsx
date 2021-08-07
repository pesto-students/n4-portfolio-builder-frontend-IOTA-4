import templates from '../templates/'
import { useEffect, useState } from 'react'
import ParsedResume from '../types/ParsedResume'
import { useRouter } from 'next/dist/client/router'

const PortfolioShow = () => {
  const router = useRouter()
  const [inputResumeData, setInputResumeData] = useState<ParsedResume>()
  const [selectedTemplateKey, setSelectedTemplate] = useState<string>()
  const [SelectedTemplateComponent, setSelectedTemplateComponent] =
    useState<any>()
  useEffect(() => {
    const parsedResumeData = JSON.parse(
      localStorage.getItem('inputResume') || ''
    )
    setInputResumeData(parsedResumeData)

    const selectedTemplateKey = localStorage.getItem('selectedTemplate') || ''
    setSelectedTemplate(selectedTemplateKey)

    if (!parsedResumeData || !selectedTemplateKey) {
      router.push('/portfolios/select-template')
    }
  }, [])

  useEffect(() => {
    const SelectedTemplate = Object.values(templates).filter(
      (template) => template.key == selectedTemplateKey
    )[0]
    setSelectedTemplateComponent(SelectedTemplate)
  }, [selectedTemplateKey])

  return (
    <>
      <div className="__themed-light__">
        {inputResumeData && SelectedTemplateComponent && (
          <SelectedTemplateComponent.component data={inputResumeData} />
        )}
      </div>
    </>
  )
}

export default PortfolioShow
