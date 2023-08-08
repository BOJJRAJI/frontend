import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DiscussionItem from '../DiscussionItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  empty: 'EMPTY',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Input extends Component {
  state = {
    discussionsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDiscussionsData()
  }

  getDiscussionsData = async () => {
    const projectsResponce = await fetch(
      'http://localhost:8005/discussionsData',
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    )
    if (projectsResponce.ok) {
      const allProjectsData = await projectsResponce.json()
      if (allProjectsData.length === 0) {
        this.setState({apiStatus: apiStatusConstants.empty})
      } else {
        this.setState({
          discussionsData: allProjectsData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  addDiscussionButton = () => {
    const {history} = this.props
    history.replace('/adddiscussion')
  }

  deleteDiscussion = async id => {
    const responce = await fetch(
      `http://localhost:8005/discussionsdelete/${id}`,
      {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      },
    )
    if (responce.ok) {
      alert('Discussion Deleted Once Refresh The Page')
      const {history} = this.props
      history.replace('/input')
    }
  }

  renderDiscussionsListView = () => {
    const {discussionsData} = this.state
    console.log(discussionsData)
    return (
      <div className="staff-view-container">
        <div className="button-container">
          <button
            className="no-staff-button"
            type="button"
            onClick={this.addDiscussionButton}
          >
            Add Discussion
          </button>
        </div>
        <table className="table">
          <thead>
            <tr className="table-row">
              <th scope="col" className="table-row-content-id">
                DisId
              </th>
              <th scope="col" className="table-row-content">
                ClientName
              </th>
              <th scope="col" className="table-row-content">
                StaffName
              </th>
              <th scope="col" className="table-row-content">
                Discussion
              </th>
              <th scope="col" className="table-row-content">
                DateTime
              </th>
            </tr>
          </thead>
          <tbody>
            {discussionsData.map(element => (
              <DiscussionItem
                element={element}
                key={element.dissId}
                deleteDiscussion={this.deleteDiscussion}
              />
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
      <h1 className="no-staff-heading">No Discussions Present</h1>
      <button
        className="no-staff-button"
        type="button"
        onClick={this.addDiscussionButton}
      >
        Add Discussion
      </button>
    </div>
  )

  renderProjectsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDiscussionsListView()
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

export default Input
