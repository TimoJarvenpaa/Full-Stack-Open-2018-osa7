import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE': {
      const old = state.filter(b => b.id !== action.id)
      const liked = state.find(b => b.id === action.id)
      return [...old, { ...liked, likes: liked.likes + 1 }]
    }
    case 'COMMENT': {
      const old = state.filter(b => b.id !== action.id)
      const commented = state.find(b => b.id === action.id)
      return [...old, { ...commented, comments: commented.comments.concat(action.comment) }]
    }
    case 'CREATE':
      return [...state, action.data]
    case 'REMOVE': {
      const blogs = state.filter(b => b.id !== action.id)
      return blogs
    }
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
    dispatch(notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 5))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      id
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const liked = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      id: liked.id
    })
    dispatch(notify(`You liked '${liked.title}'`, 5))
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT',
      id,
      comment
    })
    dispatch(notify(`comment '${comment}'`, 5))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer