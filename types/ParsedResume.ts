interface ParsedResume {
  name: string
  email: string
  phone?: string
  address: string
  skills: string[]
  education: {
    dates: string[]
    name: string
  }[]
  experience: {
    dates?: string[]
    title: string
    organization: string
    location?: string
    date_end?: string
    date_start?: string
  }[]
}

export default ParsedResume
