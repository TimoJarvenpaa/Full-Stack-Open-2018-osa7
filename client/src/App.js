import React from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/loginReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginVisible: false
    }
  }

  componentDidMount = async () => {
    this.props.initializeBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser(user)
    }
  }

  render() {

    if (this.props.user === null) {
      return (
        <div>
          <Notification />
          <Togglable buttonLabel="sign in">
            <LoginForm />
          </Togglable>
        </div>
      )
    }

    return (
      <div>
        <Notification />
        <h2>Blog list application</h2>
        <p>{this.props.user.name} is currently logged in </p>
        <button onClick={() => this.props.logout()}>logout</button>
        <BlogForm />
        <BlogList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  notify,
  initializeBlogs,
  setUser,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
