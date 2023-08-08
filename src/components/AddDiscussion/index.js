import {Component} from 'react'
import Header from '../Header'
import './index.css'

class AddDiscussion extends Component {
  state = {
    activeClient: '',
    activeStaff: '',
    dateTime: '',
    discussion: '',
    isAddDiscussion: false,
    isDiscussionEmpty: false,
    clientsData: [],
    staffData: [],
  }

  componentDidMount() {
    this.getClientStaffData()
  }

  getClientStaffData = async () => {
    const staffResponse = await fetch('http://localhost:8005/staffdata', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(staffResponse)

    const clientsResponse = await fetch('http://localhost:8005/clientsdata', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })

    if (clientsResponse.ok && staffResponse.ok) {
      const initialClientsData = await clientsResponse.json()
      const initialStaffData = await staffResponse.json()
      this.setState({
        clientsData: initialClientsData,
        staffData: initialStaffData,
        activeClient: initialClientsData[0].name,
        activeStaff: initialStaffData[0].name,
      })
    }
  }

  toggleAddDiscussion = () => {
    const showdate = new Date()
    const format = ` ${showdate.getDate()}/${showdate.getMonth()}/${showdate.getFullYear()}  ${showdate.getHours()}:${showdate.getMinutes()}:${showdate.getSeconds()}`

    this.setState(prevState => ({
      isAddDiscussion: !prevState.isAddDiscussion,
      dateTime: format,
    }))
  }

  getStaffName = event => {
    this.setState({activeStaff: event.target.value})
  }

  getClientName = event => {
    this.setState({activeClient: event.target.value})
  }

  getDateTime = event => {
    this.setState({dateTime: event.target.value})
  }

  getDiscussion = event => {
    this.setState({discussion: event.target.value})
  }

  addDiscussionToDb = async () => {
    const {dateTime, discussion, activeClient, activeStaff} = this.state
    if (
      dateTime === '' ||
      discussion === '' ||
      activeClient === '' ||
      activeStaff === ''
    ) {
      this.setState({isDiscussionEmpty: true})
    } else {
      const res = await fetch('http://localhost:8005/adddiscussion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateTime,
          staffName: activeStaff,
          clientName: activeClient,
          discussion,
        }),
      })
      console.log(res)
      if (res.ok) {
        alert('Discussion Added Successfully')
        this.setState({
          activeClient: '',
          activeStaff: '',
          dateTime: '',
          discussion: '',
          isAddDiscussion: false,
          isDiscussionEmpty: false,
        })
        const {history} = this.props
        history.replace('/input')
      } else {
        alert('Somthing Went Wrong .. Try Again')
      }
    }
  }

  renderAddProjectView = () => {
    const {dateTime, discussion, isDiscussionEmpty} = this.state
    return (
      <div className="project-name-description-container">
        <input
          className="project-name"
          type="text"
          placeholder="Project"
          value={dateTime}
          disabled
        />
        <br />
        <textarea
          cols="50"
          rows="10"
          type="text"
          placeholder="Description"
          value={discussion}
          onChange={this.getDiscussion}
          className="project-description"
        />
        <br />
        {isDiscussionEmpty && <p className="error-msg">*Fill The All Fields</p>}
        <button
          className="add-button"
          type="button"
          onClick={this.addDiscussionToDb}
        >
          Add
        </button>
      </div>
    )
  }

  render() {
    const {clientsData, staffData, isAddDiscussion} = this.state

    return (
      <div className="projects-header-main-container">
        <Header />
        <div className="add-project-container">
          <h1 className="add-project-text">Add Discussion</h1>
          <div className="select-elements-container">
            <div className="name-select-element-container">
              <p>Staff</p>
              <select className="select-element" onChange={this.getStaffName}>
                {staffData.map(user => (
                  <option key={user.empId} className="option-element">
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="name-select-element-container">
              <p>Clients</p>
              <select className="select-element" onChange={this.getClientName}>
                {clientsData.map(user => (
                  <option key={user.clientId} className="option-element">
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="add-project-button"
              onClick={this.toggleAddDiscussion}
            >
              Add Discussion
            </button>
            <br />
          </div>
          {isAddDiscussion && this.renderAddProjectView()}
        </div>
      </div>
    )
  }
}

export default AddDiscussion
