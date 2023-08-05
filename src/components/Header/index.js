import {Link} from 'react-router-dom'
import {BiSolidDashboard} from 'react-icons/bi'
import {MdPeopleAlt} from 'react-icons/md'
import {AiOutlineFileAdd} from 'react-icons/ai'
import {FaPeopleGroup} from 'react-icons/fa6'
import {GoProjectRoadmap} from 'react-icons/go'

import './index.css'

const Header = () => (
  <div className="header-container">
    <h1 className="header-heading">Projects</h1>
    <div className="types-container">
      <Link to="/dashboard" className="link">
        <BiSolidDashboard className="icon" />
        <p className="text">Dashboard</p>
      </Link>

      <Link to="/clients" className="link">
        <MdPeopleAlt className="icon" />
        <p className="text">Client</p>
      </Link>

      <Link to="/input" className="link">
        <AiOutlineFileAdd className="icon" />
        <p className="text">Input</p>
      </Link>
      <Link to="/projects" className="link">
        <GoProjectRoadmap className="icon" />
        <p className="text">Projects</p>
      </Link>
      <Link to="/staff" className="link">
        <FaPeopleGroup className="icon" />
        <p className="text">Staff</p>
      </Link>
    </div>
  </div>
)

export default Header
