import {Component} from 'react'
import Header from '../Header'
import './index.css'

class AddStaff extends Component {
  state = {
    name: '',
    email: '',
    mobile: '',
    empId: '',
    description: '',
    isShowError: false,
  }

  getName = event => {
    this.setState({name: event.target.value})
  }

  getEmail = event => {
    this.setState({email: event.target.value})
  }

  getMobile = event => {
    this.setState({mobile: event.target.value})
  }

  getDescription = event => {
    this.setState({description: event.target.value})
  }

  getEmpId = event => {
    this.setState({empId: event.target.value})
  }

  addStaff = () => {
    const {name, email, empId, description, mobile} = this.state

    if (
      name === '' ||
      email === '' ||
      empId === '' ||
      description === '' ||
      mobile === ''
    ) {
      this.setState({isShowError: true})
    } else {
      const staffDetails = {
        name,
        email,
        empId,
        description,
        mobile,
      }
      console.log(staffDetails)
      this.setState({
        name: '',
        email: '',
        mobile: '',
        description: '',
        empId: '',
        isShowError: '',
      })
    }
  }

  render() {
    const {name, email, mobile, empId, description, isShowError} = this.state

    return (
      <div className="staff-header-container">
        <Header />
        <div className="staff-container">
          <form>
            <h1>Add Staff</h1>
            <div className="label-name-container">
              <label htmlFor="empId" className="name-label">
                Employee Id:
              </label>
              <br />
              <input
                id="empId"
                type="text"
                placeholder="EmpId"
                className="name-input"
                value={empId}
                onChange={this.getEmpId}
              />
            </div>
            <div className="label-name-container">
              <label htmlFor="name" className="name-label">
                Full Name:
              </label>
              <br />
              <input
                id="name"
                type="text"
                placeholder="Fullname"
                className="name-input"
                value={name}
                onChange={this.getName}
              />
            </div>
            <div className="label-name-container">
              <label htmlFor="email" className="name-label">
                Email Id:
              </label>
              <br />
              <input
                id="email"
                type="text"
                placeholder="EmailId"
                className="name-input"
                value={email}
                onChange={this.getEmail}
              />
            </div>
            <div className="label-name-container">
              <label htmlFor="mobile" className="name-label">
                Phone No:
              </label>
              <br />
              <input
                id="mobile"
                type="text"
                placeholder="EmpId"
                className="name-input"
                value={mobile}
                onChange={this.getMobile}
              />
            </div>
            <div className="label-name-container">
              <label htmlFor="empId" className="name-label">
                Description:
              </label>
              <br />
              <input
                id="empId"
                type="text"
                placeholder="Description"
                className="name-input"
                value={description}
                onChange={this.getDescription}
              />
            </div>
            {isShowError && <p className="error-msg">* Fill The All Fields</p>}
            <button
              className="add-button"
              type="button"
              onClick={this.addStaff}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddStaff
