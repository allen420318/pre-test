import axios from 'axios'
axios.defaults.baseURL = '/'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

export const fetcher = async (APIUrl, httpVerb = 'POST', payload) => {
  axios.defaults.headers.common.Authorization = localStorage.getItem('token')
  const axiosConfig = {
    method: httpVerb.toLowerCase(),
    url: APIUrl,
    data: payload,
  }
  return await axios(axiosConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      Promise.reject(error)
    })
}
