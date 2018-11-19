import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'

class LoginForm extends React.Component {

  handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    event.target.username.value = ''
    const password = event.target.password.value
    event.target.password.value = ''
    const user = {
      username,
      password
    }
    this.props.login(user)
  }

  render() {
    return (
      <div>
        <h2>Log in to the application</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            username:
          <input
              name="username"
            />
          </div>
          <div>
            password:
          <input
              type="password"
              name="password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  login
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)