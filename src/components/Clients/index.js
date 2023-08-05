import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Clients extends Component {
  state = {
    isFormShow: false,
    name: '',
    email: '',
    mobile: '',
    clientId: '',
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

  getClientId = event => {
    this.setState({clientId: event.target.value})
  }

  addClient = () => {
    this.setState(prevState => ({isFormShow: !prevState.isFormShow}))
  }

  addClientToDb = () => {
    const {name, email, mobile, clientId, description} = this.state

    if (
      name === '' ||
      email === '' ||
      mobile === '' ||
      clientId === '' ||
      description === ''
    ) {
      this.setState({isShowError: true})
    } else {
      const clientDetails = {name, email, mobile, clientId, description}
      console.log(clientDetails)
      this.setState({
        name: '',
        email: '',
        mobile: '',
        clientId: '',
        description: '',
        isShowError: false,
      })
    }
  }

  renderAddClient = () => {
    const {name, email, mobile, clientId, description, isShowError} = this.state
    return (
      <div className="add-client-container">
        <div className="name-input-container">
          <label htmlFor="id" className="name-label">
            Client ID:
          </label>
          <br />
          <input
            id="id"
            type="text"
            placeholder="ClientId"
            className="name-input"
            value={clientId}
            onChange={this.getClientId}
          />
        </div>
        <div className="name-input-container">
          <label htmlFor="firstname" className="name-label">
            Full Name:
          </label>
          <br />
          <input
            id="firstname"
            type="text"
            placeholder="Fullname"
            className="name-input"
            value={name}
            onChange={this.getName}
          />
        </div>
        <div className="name-input-container">
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
        <div className="name-input-container">
          <label htmlFor="mobile" className="name-label" placeholder="Emailid">
            Phone No:
          </label>
          <br />
          <input
            id="mobile"
            type="text"
            className="name-input"
            placeholder="Phoneno"
            value={mobile}
            onChange={this.getMobile}
          />
        </div>

        <div className="name-input-container">
          <label
            htmlFor="Description"
            className="name-label"
            placeholder="Emailid"
          >
            Description
          </label>
          <br />
          <input
            id="Description"
            type="text"
            className="name-input"
            placeholder="Description"
            value={description}
            onChange={this.getDescription}
          />
        </div>
        {isShowError && <p className="error-msg">* Fill The All Fields</p>}
        <button
          className="add-button"
          type="button"
          onClick={this.addClientToDb}
        >
          Add
        </button>
      </div>
    )
  }

  render() {
    const {isFormShow} = this.state

    return (
      <div className="header-client-container">
        <Header />
        <div className="clients-container">
          <h1>Client</h1>
          <button
            className="add-client-button"
            type="button"
            onClick={this.addClient}
          >
            Add Client
          </button>

          {isFormShow && this.renderAddClient()}
        </div>
      </div>
    )
  }
}

export default Clients
