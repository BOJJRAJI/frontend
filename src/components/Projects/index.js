import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Projects extends Component {
  state = {
    activeClient: '',
    activeStaff: '',
    projectName: '',
    description: '',
    isAddProject: false,
    isProjectNameEmpty: false,
    isProjectDescriptionEmpty: false,
  }

  getProjectName = event => {
    this.setState({projectName: event.target.value})
  }

  getProjectDescription = event => {
    this.setState({description: event.target.value})
  }

  getStaffName = event => {
    this.setState({activeStaff: event.target.value})
  }

  getClientName = event => {
    this.setState({activeClient: event.target.value})
  }

  addProject = () => {
    const {projectName, description, activeClient, activeStaff} = this.state

    if (projectName === '') {
      this.setState({isProjectNameEmpty: true})
    }
    if (description === '') {
      this.setState({isProjectDescriptionEmpty: true})
    }
    if (description !== '' && projectName !== '') {
      const projectDetails = {
        name: projectName,
        description,
        staffName: activeStaff,
        clientName: activeClient,
      }
      console.log(projectDetails)
      this.setState({
        isProjectNameEmpty: false,
        isProjectDescriptionEmpty: false,
      })
    }
  }

  toggleProject = () => {
    this.setState(prevState => ({
      isAddProject: !prevState.isAddProject,
      isProjectNameEmpty: false,
      isProjectDescriptionEmpty: false,
    }))
  }

  renderAddProject = () => {
    const {
      description,
      projectName,
      isProjectNameEmpty,
      isProjectDescriptionEmpty,
    } = this.state
    return (
      <div className="add-projects-container">
        <input
          value={projectName}
          type="text"
          className="project-name"
          placeholder="Project"
          onChange={this.getProjectName}
        />
        {isProjectNameEmpty ? (
          <p className="error-msg">* Required Field</p>
        ) : (
          <br />
        )}

        <textarea
          value={description}
          type="text"
          cols="40"
          rows="10"
          className="project-description"
          placeholder="Description"
          onChange={this.getProjectDescription}
        />
        {isProjectDescriptionEmpty ? (
          <p className="error-msg">* Required Field</p>
        ) : (
          <br />
        )}

        <button className="add-button" type="button" onClick={this.addProject}>
          Add
        </button>
      </div>
    )
  }

  render() {
    const {isAddProject, activeClient, activeStaff} = this.state

    return (
      <div className="projects-header-container">
        <Header />
        <div className="projects-container">
          <h1>Projects</h1>
          <div className="select-button-container">
            <div className="client-select-container">
              <p>Client</p>
              <select
                className="client-select-element"
                value={activeClient}
                onChange={this.getClientName}
              >
                <option>Raji</option>
                <option>Satya</option>
              </select>
            </div>
            <div
              className="client-select-container"
              value={activeStaff}
              onChange={this.getStaffName}
            >
              <p>Staff</p>
              <select className="staff-select-element">
                <option>Anjali</option>
                <option>Vijay</option>
              </select>
            </div>
            <button
              className="add-project-button"
              type="button"
              onClick={this.toggleProject}
            >
              Add Project
            </button>
          </div>
          {isAddProject && this.renderAddProject()}
        </div>
      </div>
    )
  }
}

export default Projects
