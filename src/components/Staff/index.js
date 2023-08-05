import {Component} from 'react'
import Header from '../Header'

import './index.css'

const initialStaffDetails = [
  {
    empId: 1,
    name: 'Vishal',
    email: 'vishal@gmail.com',
    mobile: '954125651',
    description: 'Software Developer',
  },
  {
    empId: 1,
    name: 'Raji',
    email: 'raji@gmail.com',
    mobile: '954126543',
    description: 'Software Developer Intern',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Staff extends Component {
  state = {staffDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getStaffDetails()
  }

  getStaffDetails = () => {
    this.setState({
      staffDetails: initialStaffDetails,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderStaffListView = () => {
    const {staffDetails} = this.state
    return (
      <div className="staff-view-container">
        <div className="button-container">
          <button
            className="no-staff-button"
            type="button"
            onClick={this.addStaffButton}
          >
            Add Staff
          </button>
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">EmpId</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {staffDetails.map(element => (
              <>
                <tr>
                  <th scope="row" className="td">
                    {element.empId}
                  </th>
                  <td className="td">{element.name}</td>
                  <td className="td">{element.email}</td>
                  <td className="td">{element.mobile}</td>
                  <td className="td">{element.description}</td>
                  <td className="edit-button-container">
                    <button
                      className="edit-button"
                      type="button"
                      onClick={this.editStaff}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  editStaff = () => {
    const {history} = this.props
    history.replace('/editstaff')
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

  renderStaffView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStaffListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  addStaffButton = () => {
    const {history} = this.props
    history.replace('/addstaff')
  }

  renderNoStaffView = () => (
    <div className="no-staff-container">
      <h1 className="no-staff-heading">No Staff Present</h1>
      <button
        className="no-staff-button"
        type="button"
        onClick={this.addStaffButton}
      >
        Add Staff
      </button>
    </div>
  )

  render() {
    const {staffDetails} = this.state
    return (
      <div className="staff-header-main-container">
        <Header />

        {staffDetails.length === 0
          ? this.renderNoStaffView()
          : this.renderStaffView()}
      </div>
    )
  }
}

export default Staff
