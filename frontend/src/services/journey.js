import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/journeys'

const getAll = async (page) => {
  const response = await axios.get(baseUrl, {
    params: {
      page: page,
    },
  })
  return response.data
}

export default { getAll }
