// import { UserForm } from '../../types/UserForm'
// import { themes, useTheme, withTheme } from '../../hoc/ThemeProvider'
// import { useTheme } from '../../hoc/ThemeProvider'
// import Image from 'next/image'

import Link from 'next/link'

interface propTypes {
  // userDetails: UserForm
  // templateData: {
  //   defaultTheme: themes
  //   sectionOrdering: Record<string, unknown>[]
  // }
  showDetails: boolean
  template: {
    image: string
    name?: string
    price?: string
  }
}

const TestTemplate = ({
  showDetails,
  template: { image, name, price },
}: propTypes): JSX.Element => {
  // const { theme } = useTheme()!
  return (
    <Link href="/portfolios/create" passHref>
      <a
        className={`test-template ${
          showDetails ? '' : 'test-template--fixed'
        } reset-link`}
      >
        <div className="test-template-image-wrap">
          {/* <Image
          src={placeholderImage}
          alt="sample portfolio"
          layout="fill"
          objectFit="cover"
        /> */}
          <img src={image} loading="lazy" alt="test"></img>
        </div>
        {showDetails && (
          <div className="test-template-details">
            <div className="test-template-details__title">{name}</div>
            <div className="test-template-details__price">{price}</div>
          </div>
        )}
      </a>
    </Link>
  )
}

export default TestTemplate
