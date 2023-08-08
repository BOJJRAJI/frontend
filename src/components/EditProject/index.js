import {Component} from 'react'
import Header from '../Header'
import './index.css'

class EditProject extends Component {
  state = {
    proId: '',
    project: '',
    description: '',
    clientName: '',
    staffName: '',
    isShowError: false,
  }

  componentDidMount() {
    this.getProjectDetailsToEdit()
  }

  getProjectDetailsToEdit = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({proId: id})
    const projectsResponce = await fetch(
      `http://localhost:8005/projectsdata/${id}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    )

    if (projectsResponce.ok) {
      const data = await projectsResponce.json()
      this.setState({
        proId: data.proId,
        project: data.project,
        clientName: data.clientName,
        staffName: data.staffName,
        description: data.description,
      })
    }
  }

  getProId = event => {
    this.setState({proId: event.target.value})
  }

  getProject = event => {
    this.setState({project: event.target.value})
  }

  getClientName = event => {
    this.setState({clientName: event.target.value})
  }

  getStaffName = event => {
    this.setState({staffName: event.target.value})
  }

  getDescription = event => {
    this.setState({description: event.target.value})
  }

  editProjectToDb = async event => {
    event.preventDefault()
    const {proId, project, description, clientName, staffName} = this.state

    if (
      proId === '' ||
      project === '' ||
      clientName === '' ||
      description === '' ||
      staffName === ''
    ) {
      this.setState({isShowError: true})
    } else {
      const res = await fetch(`http://localhost:8005/updateproject/${proId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project,
          description,
          clientName,
          staffName,
        }),
      })

      console.log(res.ok)

      if (res.ok) {
        alert('Successfully edited')
        const {history} = this.props
        history.replace('/projects')
      } else {
        alert('Something Went Wrong')
      }
      this.setState({
        staffName: '',
        project: '',
        description: '',
        proId: '',
        clientName: '',
        isShowError: '',
      })
    }
  }

  render() {
    const {
      proId,
      project,
      description,
      clientName,
      staffName,
      isShowError,
    } = this.state
    return (
      <div className="projects-header-container">
        <Header />
        <div className="edit-project-container">
          <h1 className="project-edit-heading">Edit Project</h1>
          <form onSubmit={this.editProjectToDb}>
            <div className="name-input-container">
              <label className="label" htmlFor="1">
                Project Id
              </label>
              <br />
              <input
                type="text"
                id="1"
                placeholder="Project Id"
                className="input"
                value={proId}
                onChange={this.getProId}
              />
            </div>
            <div className="name-input-container">
              <label className="name-label" htmlFor="2">
                Staff Name
              </label>
              <br />
              <input
                type="text"
                placeholder="Project Id"
                className="name-input"
                value={staffName}
                onChange={this.getStaffName}
                id="2"
              />
            </div>
            <div className="name-input-container">
              <label className="name-label" htmlFor="3">
                Client Name
              </label>
              <br />
              <input
                type="text"
                placeholder="Project Id"
                className="name-input"
                value={clientName}
                onChange={this.getClientName}
                id="3"
              />
            </div>
            <div className="name-input-container">
              <label className="name-label" htmlFor="4">
                Project
              </label>
              <br />
              <input
                type="text"
                placeholder="Project"
                className="name-input"
                value={project}
                onChange={this.getProject}
                id="4"
              />
            </div>
            <div className="name-input-container">
              <label className="name-label" htmlFor="5">
                Description
              </label>
              <br />
              <input
                type="text"
                placeholder="Description"
                className="name-input"
                value={description}
                onChange={this.getDescription}
                id="5"
              />
            </div>
            {isShowError && <p className="error-ms">* Fill The All Fields</p>}
            <button className="add-button" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default EditProject
