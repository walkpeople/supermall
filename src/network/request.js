import axios from 'axios'

export function request(config) {
    const instance = axios.create( {
        baseURL: 'https://httpbin.org',
        timeout: 5000
    })
    return instance(config)
}

