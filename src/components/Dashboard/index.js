import {Component} from 'react'
import {Link} from 'react-router-dom'
import {GoProjectRoadmap} from 'react-icons/go'
import {MdPeopleAlt} from 'react-icons/md'
import {GiDiscussion} from 'react-icons/gi'
import Header from '../Header'
import './index.css'

class Dashboard extends Component {
  state = {
    projectsCount: 0,
    clientCount: 0,
    staffCount: 0,
  }

  componentDidMount() {
    this.getAllDetails()
  }

  getAllDetails = async () => {
    const projectsResponce = await fetch('http://localhost:8005/projectsdata', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(projectsResponce)

    const staffResponse = await fetch('http://localhost:8005/staffdata', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(staffResponse)

    const clientsResponse = await fetch('http://localhost:8005/clientsdata', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(clientsResponse)

    if (clientsResponse.ok && projectsResponce.ok && staffResponse.ok) {
      const projectsData = await projectsResponce.json()
      const clientsData = await clientsResponse.json()
      const staffData = await staffResponse.json()
      this.setState({
        projectsCount: projectsData.length,
        clientCount: clientsData.length,
        staffCount: staffData.length,
      })
    } else {
      this.setState({
        projectsCount: 0,
        clientCount: 0,
        staffCount: 0,
      })
    }
  }

  render() {
    const {projectsCount, clientCount, staffCount} = this.state

    return (
      <div className="header-dashboard-container">
        <Header />
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <ul className="list-cards-container">
            <li className="card-list">
              <Link to="/clients" className="link-element">
                <h1 className="card-heading">TOTAL CLIENTS</h1>
                <div className="count-icon-container">
                  <MdPeopleAlt className="card-icon" />
                  <p className="count">{clientCount}</p>
                </div>
              </Link>
            </li>
            <li className="card-list">
              <Link to="/projects" className="link-element">
                <h1 className="card-heading">TOTAL PROJECTS</h1>
                <div className="count-icon-container">
                  <GoProjectRoadmap className="card-icon" />
                  <p className="count">{projectsCount}</p>
                </div>
              </Link>
            </li>
            <li className="card-list">
              <Link to="/staff" className="link-element">
                <h1 className="card-heading">TOTAL STAFF</h1>
                <div className="count-icon-container">
                  <GiDiscussion className="card-icon" />
                  <p className="count">{staffCount}</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Dashboard
