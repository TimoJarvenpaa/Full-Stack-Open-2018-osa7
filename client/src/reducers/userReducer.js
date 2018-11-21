import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'ADD_BLOG': {
      const old = state.filter(u => u.id !== action.data.user._id)
      const user = state.find(u => u.id === action.data.user._id)
      return [...old, { ...user, blogs: user.blogs.concat(action.data) }]
    }
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const addBlogToUser = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: blog
  }
}

export default reducer