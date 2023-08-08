import {Component} from 'react'
import Header from '../Header'
import './index.css'

class AddStaff extends Component {
  state = {
    name: '',
    email: '',
    mobile: '',
    clientId: '',
    description: '',
    address: '',
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

  getAddress = event => {
    this.setState({address: event.target.value})
  }

  getDescription = event => {
    this.setState({description: event.target.value})
  }

  getEmpId = event => {
    this.setState({clientId: event.target.value})
  }

  addStaff = async event => {
    event.preventDefault()
    const {name, email, clientId, description, mobile, address} = this.state
    console.log(typeof clientId)
    if (
      name === '' ||
      email === '' ||
      clientId === '' ||
      description === '' ||
      mobile === '' ||
      address === ''
    ) {
      this.setState({isShowError: true})
    } else {
      const res = await fetch('http://localhost:8005/addclient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          clientId,
          description,
          mobile,
          address,
        }),
      })
      if (res.ok) {
        alert('Successfully Added')
        const {history} = this.props
        history.replace('/clients')
      } else {
        alert('Somthing Went Wrong .. Try Again')
      }

      this.setState({
        name: '',
        email: '',
        mobile: '',
        description: '',
        clientId: '',
        address: '',
        isShowError: '',
      })
    }
  }

  render() {
    const {
      name,
      email,
      mobile,
      clientId,
      description,
      isShowError,
      address,
    } = this.state

    return (
      <div className="staff-header-container">
        <Header />
        <div className="staff-container">
          <form onSubmit={this.addStaff}>
            <h1 className="project-edit-heading">Add Client</h1>
            <div className="label-name-container">
              <label htmlFor="empId" className="name-label">
                Client Id:
              </label>
              <br />
              <input
                id="empId"
                type="text"
                placeholder="ClientId"
                className="name-input"
                value={clientId}
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
                placeholder="Mobile"
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
            <div className="label-name-container">
              <label htmlFor="Address" className="name-label">
                Address:
              </label>
              <br />
              <input
                id="Address"
                type="text"
                placeholder="Address"
                className="name-input"
                value={address}
                onChange={this.getAddress}
              />
            </div>
            {isShowError && <p className="error-msg">* Fill The All Fields</p>}
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddStaff
