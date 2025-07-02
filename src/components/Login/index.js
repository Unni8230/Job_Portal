import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoginFailed: false,
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    const {history} = this.props
    history.replace('/')
  }

  onFormLoginSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === undefined) {
      this.setState({
        errMsg: 'Username is Required',
      })
    }
    if (password === undefined) {
      this.setState({
        errMsg: 'Password is Required',
      })
    }

    if (username && password) {
      const apiUrl = 'https://apis.ccbp.in/login'
      const body = {username, password}
      const options = {
        method: 'POST',
        body: JSON.stringify(body),
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      const jwt = data.jwt_token
      console.log(data)
      if (response.ok === true) {
        this.submitSuccess(jwt)
      } else {
        this.setState({
          isLoginFailed: true,
          errMsg: data.error_msg,
        })
      }
    }
  }

  render() {
    const {username, password, isLoginFailed, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-form-container">
          <img
            className="jobby-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="login-form-section">
            <form onSubmit={this.onFormLoginSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="input-box"
                value={username}
                id="username"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="input-box"
                value={password}
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
              <button type="submit" className="login-form-submit-btn">
                Login
              </button>
              {isLoginFailed && <p className="error-msg">{errMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
