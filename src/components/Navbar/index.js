// Write your code here
import {BsGithub} from 'react-icons/bs'

import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

const Navbar = () => (
  <div className="navbar">
    <div className="github-icon-container">
      <BsGithub height="100" width="100" />
      <h1 className="github-heading">Issues</h1>
    </div>
    <GiHamburgerMenu height="100" width="100" />
  </div>
)

export default Navbar
