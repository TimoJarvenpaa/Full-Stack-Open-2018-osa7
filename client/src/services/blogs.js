import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const id = newObject.id
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const comment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default {
  getAll, create, setToken, update, remove, comment
}