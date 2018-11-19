const NotificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

const setMessage = (message, id) => {
  return {
    type: 'SET_NOTIFICATION',
    message,
    id
  }
}

const resetMessage = (id) => {
  return {
    type: 'RESET_NOTIFICATION',
    id
  }
}

let nextNotificationId = 0
export const notify = (message, time) => {
  return (dispatch) => {
    const id = nextNotificationId++
    dispatch(setMessage(message, id))

    setTimeout(() => {
      dispatch(resetMessage(id))
    }, time * 1000)
  }
}

export default NotificationReducer