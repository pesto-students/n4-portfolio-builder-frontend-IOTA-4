import ParsedResume from '../types/ParsedResume'

const parsedResumeResponses: ParsedResume[] = [
  {
    address: 'Orlando,\nFL, 32804, United\nStates',
    education: [
      {
        dates: ['December 2000'],
        name: 'New York University',
      },
    ],
    email: 'email@example.com',
    experience: [
      {
        dates: ['August 1932'],
        location: 'Orlando',
        organization: 'Jacky Smith',
        title: 'Project Manager',
      },
      {
        dates: ['March 2007'],
        location: 'New York, New York',
        organization: 'Scholastic',
        title: 'IT Project Manager',
      },
      {
        date_end: 'January 2007',
        date_start: 'January 2002',
        dates: ['January 2002', 'January 2007'],
        location: 'New York, New York',
        organization: 'Viacom',
        title: 'Project Manager',
      },
      {
        dates: ['January 2010'],
        organization: 'Profile',
        title: 'Project Manager',
      },
      {
        location: 'New York, New York',
        organization: 'NBA',
        title: 'Project Manager',
      },
      {
        dates: ['March 2007'],
        location: 'New York, New York',
        organization: 'Employment History',
        title: 'Project Manager',
      },
    ],
    name: 'Jacky Smith',
    phone: '890-555-0401',
    skills: [
      'Forecasting',
      'Ms project',
      'Improvement',
      'Agile',
      'Process',
      'Analytical',
      'Budget',
      'Project management',
      'Administration',
    ],
  },
  {
    address: '177 Great Portland Street, London',
    education: [
      {
        dates: ['January 2014'],
        name: 'Columbia University',
      },
    ],
    email: 'christoper.morgan@gmail.com',
    experience: [
      {
        date_end: 'February 2001',
        date_start: 'February 2001',
        dates: ['February 2001', 'February 2001'],
        location: 'New York',
        organization: 'Luna Web Design',
        title: 'Web Developer',
      },
      {
        date_end: 'February 2001',
        date_start: 'February 2001',
        dates: ['February 2001', 'February 2001'],
        location: 'New York',
        organization: 'Experience',
        title: 'Web Developer',
      },
    ],
    name: 'CHRISTOPHER MORGAN',
    skills: [
      'Spanish',
      'Javascript',
      'Php',
      'Project management',
      'Html5',
      'Programming',
      'Email',
      'Design',
      'Sql',
      'Mysql',
      'Css',
    ],
  },
]

export default parsedResumeResponses
