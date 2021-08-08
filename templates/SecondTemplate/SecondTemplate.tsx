import {
  getLargestAreaFromAddress,
  getLatestExperienceTitle,
} from '../../helpers/utils'
import ParsedResume from '../../types/ParsedResume'

interface propType extends ParsedResume {
  resumeUrl?: string
  aboutMe?: string
}

const SecondTemplate = ({ data }: { data: propType }) => {
  const {
    name,
    experience,
    address,
    skills,
    education,
    email,
    resumeUrl,
    aboutMe,
  } = data

  return (
    <div id="second-template">
      {/* Move to up button */}
      <div className="scroll-button">
        <a href="#home">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
      {/* navgaition menu */}
      <nav>
        <div className="template-navbar">
          <div className="logo">
            <a href="#">Portfolio.</a>
          </div>
          <ul className="menu">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#education">Education</a>
            </li>
            <li>
              <a href="#experiences">Experience</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <div className="cancel-btn">
              <i className="fas fa-times"></i>
            </div>
          </ul>
          <div className="media-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </nav>

      {/* Home Section Start */}
      <section className="home" id="home">
        <div className="home-content">
          <div className="text">
            <div className="text-one">Hello,</div>
            <div className="text-two">I&apos;m {name}</div>
            <div className="text-three">
              {getLatestExperienceTitle(experience)}
            </div>
            <div className="text-four">
              From {getLargestAreaFromAddress(address)}
            </div>
          </div>
          <div className="button">
            <button>Hire Me</button>
          </div>
        </div>
      </section>

      {/* About Section Start */}
      <section className="about" id="about">
        <div className="content">
          <div className="title">
            <span>About Me</span>
          </div>
          <div className="about-details">
            <div className="left">
              <img src="/portfolios/secondTemplate/about.jpg" alt="" />
            </div>
            <div className="right">
              <p>{aboutMe}</p>
              <div className="button">
                <a href={resumeUrl} target="_blank" rel="noreferrer">
                  <button>Download my resume</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Skill Section Start
Section Tag and Other Div will same where we need to put same CSS */}
      <section className="skills" id="skills">
        <div className="content">
          <div className="title">
            <span>My Skills</span>
          </div>
          <div className="skills-details">
            <div className="text">
              <div className="topic">Skills Reflects Our Knowledge</div>
              <div className="experience">
                <div className="num">10</div>
                <div className="exp">
                  Years Of <br /> Experience
                </div>
              </div>
            </div>
            <div className="boxes">
              {skills.map((skill) => {
                return (
                  <div className="box" key={skill}>
                    <div className="topic">{skill}</div>
                    <div className="per">
                      {Math.floor(Math.random() * 100)}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* My Education Section Start */}
      <section className="descriptions" id="education">
        <div className="content">
          <div className="title">
            <span>My Education</span>
          </div>
          <div className="boxes">
            {education.map((ed) => {
              return (
                <div className="box" key={ed.name}>
                  <div className="icon">
                    <i className="fas fa-desktop"></i>
                  </div>
                  <div className="topic">{ed.name}</div>
                  <p>
                    {ed.date_start || ed.dates?.[0]} -{' '}
                    {ed.date_end || ed.dates?.reverse()[0]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* My Experiences Section Start */}
      <section className="descriptions" id="experiences">
        <div className="content">
          <div className="title">
            <span>My Experience</span>
          </div>
          <div className="boxes">
            {experience.map((ed) => {
              return (
                <div className="box" key={ed.title}>
                  <div className="icon">
                    <i className="fas fa-desktop"></i>
                  </div>
                  <div className="topic">{ed.title}</div>
                  <h4>{ed.organization}</h4>
                  <p>
                    {ed.date_start || ed.dates?.[0]} -{' '}
                    {ed.date_end || ed.dates?.reverse()[0]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Me section Start */}
      <section className="contact" id="contact">
        <div className="content">
          <div className="title">
            <span>Contact Me</span>
          </div>
          <div className="text">
            <div className="topic">Interested in working with me?</div>
            <p>Please don&apos;t hesitate to reach out to me</p>
            <div className="button">
              <a href={`mailto:${email}`}>
                <button>Let&apos;s Chat</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section Start */}
      <footer>
        <div className="text">
          <span>&#169; 2021 All Rights Reserved</span>
        </div>
      </footer>
    </div>
  )
}

export default SecondTemplate
