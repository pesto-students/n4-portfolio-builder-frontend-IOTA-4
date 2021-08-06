import parsedResumeResponses from '../../mockData/mockData'
import FirstTemplate from '../../templates/SecondTemplate'

const TemplateView = () => {
  return <FirstTemplate.component data={parsedResumeResponses[0]} />
}

export default TemplateView
