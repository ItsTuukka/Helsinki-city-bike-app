import axios from 'axios'
const baseUrl = 'https://citybike-app.herokuapp.com/api/journeys'

const getAll = async (page) => {
  const response = await axios.get(baseUrl, {
    params: {
      page: page,
    },
  })
  return response.data
}

export default { getAll }
