import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    case 'SET':
      return action.data
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(credentials)
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })
    } catch (exception) {
      dispatch(notify('invalid username or password', 5))
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  blogService.setToken(null)
  return {
    type: 'LOGOUT'
  }
}

export const setUser = (user) => {
  return {
    type: 'SET',
    data: user
  }
}

export default reducer