import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', passwordType: 'password'}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  togglePasswordType = () => {
    const {passwordType} = this.state
    if (passwordType === 'password') {
      this.setState({passwordType: 'text'})
    } else {
      this.setState({passwordType: 'password'})
    }
  }

  submitForm = event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === 'pabbas' && password === 'pabbas12') {
      this.setState({errorMsg: ''})
      const {history} = this.props
      history.replace('/dashboard')
    } else {
      this.setState({errorMsg: 'Invalid Login Details'})
    }
  }

  render() {
    const {username, password, passwordType, errorMsg} = this.state

    return (
      <div className="app-container">
        <form className="login-form-container" onSubmit={this.submitForm}>
          <h1 className="heading">Login</h1>
          <div className="username-input-label-container">
            <label htmlFor="username" className="label-element">
              USERNAME
            </label>
            <br />
            <input
              className="input-element"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.getUsername}
            />
          </div>
          <div className="password-input-label-container">
            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <br />
            <input
              className="input-element"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.getPassword}
              type={passwordType}
            />
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.togglePasswordType}
              className="show-password-input"
            />
            <p className="show-password-text" htmlFor="checkbox">
              Show Password
            </p>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          {errorMsg !== '' && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
