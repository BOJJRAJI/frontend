import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    passwordType: 'password',
    isAccountThere: false,
    email: '',
    signInError: '',
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getEmail = event => {
    this.setState({email: event.target.value})
  }

  togglePasswordType = () => {
    const {passwordType} = this.state
    if (passwordType === 'password') {
      this.setState({passwordType: 'text'})
    } else {
      this.setState({passwordType: 'password'})
    }
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    if (password === '' || username === '') {
      this.setState({errorMsg: 'Fill The All Fields'})
    } else {
      const res = await fetch('http://localhost:8005/usersData', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })

      if (res.ok) {
        const data = await res.json()
        const filterData = data.filter(
          item => item.password === password && item.username === username,
        )
        console.log(filterData)
        if (filterData.length === 0) {
          this.setState({errorMsg: 'Invalid Login Details'})
        } else {
          const jwtToken = username + password
          console.log(jwtToken)
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
          })
          const {history} = this.props
          history.replace('/dashboard')
          this.setState({errorMsg: '', signInError: ''})
        }
      } else {
        alert('Something Went Wrong....')
      }
    }
  }

  toggleSignOrLogin = () => {
    this.setState({isAccountThere: true})
  }

  renderLoginForm = () => {
    const {username, password, passwordType, errorMsg} = this.state
    return (
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
        {errorMsg !== '' && <p className="error-msg">*{errorMsg}</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
        <button
          className="already-account-button"
          onClick={this.doNotHaveAccount}
          type="button"
        >
          Don’t have an account?
        </button>
      </form>
    )
  }

  doNotHaveAccount = () => {
    this.setState({isAccountThere: false})
  }

  haveAccount = () => {
    this.setState({isAccountThere: true})
  }

  submitSignInForm = async event => {
    event.preventDefault()
    const {username, password, passwordType, email} = this.state
    if (username === '' || email === '' || password === '') {
      this.setState({signInError: 'Fill The All Fields'})
    } else if (password.length < 8) {
      this.setState({signInError: 'Password Length Must be 8 Characters'})
    } else {
      const res = await fetch('http://localhost:8005/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      })
      if (res.ok) {
        alert('Sign Up Successfully')
        this.setState({isAccountThere: true, signInError: '', errorMsg: ''})
      } else {
        alert('Somthing Went Wrong .. Try Again')
      }
    }
  }

  renderSignForm = () => {
    const {username, password, passwordType, signInError, email} = this.state

    return (
      <form className="login-form-container" onSubmit={this.submitSignInForm}>
        <h1 className="heading">Sign Up</h1>
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

        <div className="password-input-label-container">
          <label htmlFor="email" className="label-element">
            Email
          </label>
          <br />
          <input
            className="input-element"
            id="email"
            placeholder="Email"
            value={email}
            onChange={this.getEmail}
            type="text"
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
        {signInError !== '' && <p className="error-msg">*{signInError}</p>}

        <button type="submit" className="sign-in-submit-button">
          Submit
        </button>
        <br />
        <button
          className="already-account-button"
          onClick={this.haveAccount}
          type="button"
        >
          Already have an account?
        </button>
      </form>
    )
  }

  render() {
    const {
      username,
      password,
      passwordType,
      errorMsg,
      isAccountThere,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="app-container">
        {isAccountThere ? this.renderLoginForm() : this.renderSignForm()}
      </div>
    )
  }
}

export default Login
