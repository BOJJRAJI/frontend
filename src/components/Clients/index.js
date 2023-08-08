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

class Clients extends Component {
  state = {clientsDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getClientsDetails()
  }

  getClientsDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const res = await fetch('http://localhost:8005/clientsdata', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(res)
    if (res.ok) {
      const data = await res.json()
      if (data.length === 0) {
        this.setState({
          apiStatus: apiStatusConstants.empty,
        })
      } else {
        this.setState({
          clientsDetails: data,
          apiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderClientsListView = () => {
    const {clientsDetails} = this.state
    return (
      <div className="staff-view-container">
        <div className="button-container">
          <button
            className="no-staff-button"
            type="button"
            onClick={this.addStaffButton}
          >
            Add Client
          </button>
        </div>
        <table className="clients-table">
          <thead>
            <tr className="table-row">
              <th scope="col" className="clients-table-row-content-id">
                ClientId
              </th>
              <th scope="col" className="table-row-content">
                Name
              </th>
              <th scope="col" className="table-row-content">
                Email
              </th>
              <th scope="col" className="table-row-content">
                Mobile
              </th>
              <th scope="col" className="table-row-content">
                Description
              </th>
              <th scope="col" className="table-row-content">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {clientsDetails.map(element => (
              <>
                <tr>
                  <th scope="row" className="td">
                    {element.clientId}
                  </th>
                  <td className="table-column">{element.name}</td>
                  <td className="table-column">{element.email}</td>
                  <td className="table-column">{element.mobile}</td>
                  <td className="table-column">{element.description}</td>
                  <td className="table-column">{element.address}</td>
                  <td className="edit-button-container">
                    <Link to={`/editclient/${element.clientId}`}>
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

  renderClientsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderClientsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.empty:
        return this.renderNoStaffView()
      default:
        return null
    }
  }

  addStaffButton = () => {
    const {history} = this.props
    history.replace('/addclient')
  }

  renderNoStaffView = () => (
    <div className="no-staff-container">
      <h1 className="no-staff-heading">No Clients Present</h1>
      <button
        className="no-staff-button"
        type="button"
        onClick={this.addStaffButton}
      >
        Add Client
      </button>
    </div>
  )

  render() {
    return (
      <div className="staff-header-main-container">
        <Header />
        {this.renderClientsView()}
      </div>
    )
  }
}

export default Clients
