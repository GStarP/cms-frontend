import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '/api/'

const globalConfig = {
  baseURL,
  timeout: 10 * 1000
}

const globalAxios = axios.create(globalConfig)

export default globalAxios
