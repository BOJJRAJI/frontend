import {Component} from 'react'
import Header from '../Header'
import './index.css'

class EditClient extends Component {
  state = {
    name: '',
    email: '',
    mobile: '',
    clientId: '',
    description: '',
    address: '',
    isShowError: false,
  }

  componentDidMount() {
    this.getClientsDetails()
  }

  getClientsDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const projectsResponce = await fetch(
      `http://localhost:8005/clientsdata/${id}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    )

    if (projectsResponce.ok) {
      const data = await projectsResponce.json()
      this.setState({
        clientId: data.clientId,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        description: data.description,
        address: data.address,
      })
    }
  }

  getName = event => {
    this.setState({name: event.target.value})
  }

  getAddress = event => {
    this.setState({address: event.target.value})
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

  getEmpId = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({clientId: id})
  }

  addStaff = async event => {
    event.preventDefault()
    const {name, email, clientId, description, mobile, address} = this.state
    if (
      name === '' ||
      email === '' ||
      clientId === '' ||
      description === '' ||
      mobile === ''
    ) {
      this.setState({isShowError: true})
    } else {
      const res = await fetch(
        `http://localhost:8005/updateclient/${clientId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            description,
            address,
          }),
        },
      )

      console.log(res.ok)

      if (res.ok) {
        alert('Successfully edited')
        const {history} = this.props
        history.replace('/clients')
      } else {
        alert('Something Went Wrong')
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
            <h1>Edit Client</h1>
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
              <label htmlFor="description" className="name-label">
                Description:
              </label>
              <br />
              <input
                id="description"
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
            <button
              className="add-button"
              type="submit"
              onClick={this.addStaff}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default EditClient
