import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'semantic-ui-react'

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

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>username:</label>
            <input
              name="username"
            />
          </Form.Field>
          <Form.Field>
            <label>password:</label>
            <input
              type="password"
              name="password"
            />
          </Form.Field>
          <Button type="submit">login</Button>
        </Form>
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