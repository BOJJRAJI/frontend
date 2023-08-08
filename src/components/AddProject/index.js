import {Component} from 'react'
import Header from '../Header'
import './index.css'

class AddProject extends Component {
  state = {
    activeClient: '',
    activeStaff: '',
    projectName: '',
    description: '',
    isAddProject: false,
    isProjectNameEmpty: false,
    isProjectDescriptionEmpty: false,
    clientsData: [],
    staffData: [],
    isShowError: '',
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

      console.log(initialClientsData)
      console.log(initialStaffData)
    }
  }

  toggleAddProject = () => {
    this.setState(prevState => ({
      isAddProject: !prevState.isAddProject,
    }))
  }

  getStaffName = event => {
    this.setState({activeStaff: event.target.value})
  }

  getClientName = event => {
    this.setState({activeClient: event.target.value})
  }

  getProjectName = event => {
    this.setState({projectName: event.target.value})
  }

  getProjectDescription = event => {
    this.setState({description: event.target.value})
  }

  addProjectToDb = async () => {
    const {projectName, description, activeClient, activeStaff} = this.state
    if (
      projectName === '' ||
      description === '' ||
      activeClient === '' ||
      activeStaff === ''
    ) {
      this.setState({isShowError: true})
    } else {
      console.log(projectName, description, activeClient, activeStaff)
      const res = await fetch('http://localhost:8005/addproject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project: projectName,
          staffName: activeStaff,
          clientName: activeClient,
          description,
        }),
      })
      if (res.ok) {
        alert('Project Added Successfully')
        this.setState({
          projectName: '',
          description: '',
          activeClient: '',
          activeStaff: '',
          isShowError: false,
        })
        const {history} = this.props
        history.replace('/projects')
      } else {
        alert('Somthing Went Wrong .. Try Again')
      }
    }
  }

  renderAddProjectView = () => {
    const {projectName, description, isShowError} = this.state
    return (
      <div className="project-name-description-container">
        <input
          className="project-name"
          type="text"
          placeholder="Project"
          value={projectName}
          onChange={this.getProjectName}
        />
        <br />
        <textarea
          cols="50"
          rows="10"
          type="text"
          placeholder="Description"
          value={description}
          onChange={this.getProjectDescription}
          className="project-description"
        />
        <br />
        {isShowError && <p className="error-msg">*Fill The All Fields</p>}
        <button
          className="add-button"
          type="button"
          onClick={this.addProjectToDb}
        >
          Add
        </button>
      </div>
    )
  }

  render() {
    const {clientsData, staffData, isAddProject} = this.state

    return (
      <div className="projects-header-main-container">
        <Header />
        <div className="add-project-container">
          <h1 className="add-project-text">Add Project</h1>
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
              onClick={this.toggleAddProject}
            >
              Add Project
            </button>
            <br />
          </div>
          {isAddProject && this.renderAddProjectView()}
        </div>
      </div>
    )
  }
}

export default AddProject
