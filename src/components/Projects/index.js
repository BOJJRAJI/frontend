import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  empty: 'EMPTY',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Projects extends Component {
  state = {
    projectsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProjectsData()
  }

  getProjectsData = async () => {
    const projectsResponce = await fetch('http://localhost:8005/projectsdata', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    if (projectsResponce.ok) {
      const allProjectsData = await projectsResponce.json()
      if (allProjectsData.length === 0) {
        this.setState({apiStatus: apiStatusConstants.empty})
      } else {
        this.setState({
          projectsData: allProjectsData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  addProjectButton = () => {
    const {history} = this.props
    history.replace('/addproject')
  }

  renderProjectsListView = () => {
    const {projectsData} = this.state
    return (
      <div className="staff-view-container">
        <div className="button-container">
          <button
            className="no-staff-button"
            type="button"
            onClick={this.addProjectButton}
          >
            Add Project
          </button>
        </div>
        <table className="table">
          <thead>
            <tr className="table-row">
              <th scope="col" className="table-row-content-id">
                ProId
              </th>
              <th scope="col" className="table-row-content">
                ClientName
              </th>
              <th scope="col" className="table-row-content">
                StaffName
              </th>
              <th scope="col" className="table-row-content">
                Project
              </th>
              <th scope="col" className="table-row-content">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map(element => (
              <>
                <tr>
                  <th scope="row" className="td">
                    {element.proId}
                  </th>
                  <td className="table-column">{element.clientName}</td>
                  <td className="table-column">{element.staffName}</td>
                  <td className="table-column">{element.project}</td>
                  <td className="table-column">{element.description}</td>
                  <td className="edit-button-container">
                    <Link to={`/editproject/${element.proId}`}>
                      <button className="edit-button" type="button">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="staff-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="staff-failure-img"
      />
      <h1 className="staff-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="staff-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderNoProjectsView = () => (
    <div className="no-staff-container">
      <h1 className="no-staff-heading">No Projects Present</h1>
      <button
        className="no-staff-button"
        type="button"
        onClick={this.addProjectButton}
      >
        Add Project
      </button>
    </div>
  )

  renderProjectsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjectsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.empty:
        return this.renderNoProjectsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="projects-header-container">
        <Header />
        {this.renderProjectsView()}
      </div>
    )
  }
}

export default Projects
