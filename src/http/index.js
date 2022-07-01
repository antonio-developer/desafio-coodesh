import axios from 'axios'

const config = {
  baseURL: 'https://randomuser.me/api/'
}

const request = axios.create(config)

export default request
