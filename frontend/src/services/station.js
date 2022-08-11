import axios from 'axios'
const baseUrl = 'https://citybike-app.herokuapp.com/api/stations'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(baseUrl + '/' + id)
  return response.data
}

export default { getAll, getOne }
