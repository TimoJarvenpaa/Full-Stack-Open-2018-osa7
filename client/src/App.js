import React from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import User from './components/User'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser, logout } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SingleBlogView from './components/SingleBlogView';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginVisible: false
    }
  }

  componentDidMount = async () => {
    await Promise.all([
      this.props.initializeBlogs(),
      this.props.initializeUsers()
    ])
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser(user)
    }
  }

  render() {

    const Home = () => (
      <div>
        <Notification />
        <h2>Blog list application</h2>
        <p>{this.props.user.name} is currently logged in </p>
        <button onClick={() => this.props.logout()}>logout</button>
        <Togglable buttonLabel="create new">
          <BlogForm />
        </Togglable>
        <BlogList />
      </div>
    )

    const Users = () => (
      <div>
        <Notification />
        <h2>Blog list application</h2>
        <p>{this.props.user.name} is currently logged in </p>
        <button onClick={() => this.props.logout()}>logout</button>
        <Togglable buttonLabel="create new">
          <BlogForm />
        </Togglable>
        <UserList />
      </div>
    )

    const UserView = ({ match }) => (
      <div>
        <Notification />
        <h2>Blog list application</h2>
        <p>{this.props.user.name} is currently logged in </p>
        <button onClick={() => this.props.logout()}>logout</button>
        <Togglable buttonLabel="create new">
          <BlogForm />
        </Togglable>
        <User user={userById(match.params.id)} />
      </div>
    )

    const userById = (id) => this.props.users.find(user => user.id === id)

    const BlogView = ({ match, history }) => (
      <div>
        <Notification />
        <h2>Blog list application</h2>
        <p>{this.props.user.name} is currently logged in </p>
        <button onClick={() => this.props.logout()}>logout</button>
        <Togglable buttonLabel="create new">
          <BlogForm />
        </Togglable>
        <SingleBlogView blog={blogById(match.params.id)} history={history} />
      </div>
    )

    const blogById = (id) => this.props.blogs.find(blog => blog.id === id)

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
        <Router>
          <div>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <UserView match={match} />}
            />
            <Route exact path="/blogs/:id" render={({ match, history }) =>
              <BlogView match={match} history={history} />}
            />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  setUser,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
