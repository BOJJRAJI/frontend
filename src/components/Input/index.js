import {Component} from 'react'
import Header from '../Header'
import './index.css'

const users = ['Raji', 'Satya', 'Asha', 'Kranthi']
class Input extends Component {
  state = {
    usersData: users,
    userName: users[0],
    discussion: '',
    isAddDiscussion: false,
    dateTime: '',
    isErrorShow: '',
  }

  getDiscussion = event => {
    this.setState({discussion: event.target.value})
  }

  getUserName = event => {
    this.setState({userName: event.target.value})
  }

  toggleAddDiscussion = () => {
    const showdate = new Date()
    const format = ` ${showdate.getDate()}/${showdate.getMonth()}/${showdate.getFullYear()}   ${showdate.getHours()}:${showdate.getMinutes()}:${showdate.getSeconds()}`

    this.setState(prevState => ({
      isAddDiscussion: !prevState.isAddDiscussion,
      dateTime: format,
    }))
  }

  addDiscussion = () => {
    const {userName, discussion, dateTime} = this.state
    if (discussion === '') {
      this.setState({isErrorShow: true})
    } else {
      const discussionDetails = {
        userName,
        discussion,
        dateTime,
      }
      console.log(discussionDetails)
      this.setState({userName: users[0], discussion: '', isErrorShow: false})
    }
  }

  renderAddDiscussion = () => {
    const {dateTime, isErrorShow, discussion} = this.state

    return (
      <div className="discussion-container">
        <textarea
          cols="30"
          rows="9"
          className="text-area-element"
          placeholder="Descussion"
          value={discussion}
          onChange={this.getDiscussion}
        />
        {isErrorShow ? <p className="error-msg">* Required Field</p> : <br />}
        <input
          type="text"
          value={dateTime}
          readOnly="true"
          className="date-time-input"
        />
        <br />
        <button
          className="add-button"
          type="button"
          onClick={this.addDiscussion}
        >
          Add
        </button>
      </div>
    )
  }

  render() {
    const {usersData, userName, isAddDiscussion} = this.state

    console.log(userName)

    return (
      <div className="header-input-container">
        <Header />
        <div className="input-container">
          <h1>Input</h1>
          <div className="select-button-container">
            <select
              onChange={this.getUserName}
              className="select-element"
              value={userName}
            >
              {usersData.map(user => (
                <option key={user}>{user}</option>
              ))}
            </select>
            <button
              className="add-discussion-button"
              type="button"
              onClick={this.toggleAddDiscussion}
            >
              Add Discussion
            </button>
          </div>
          {isAddDiscussion && this.renderAddDiscussion()}
        </div>
      </div>
    )
  }
}

export default Input
