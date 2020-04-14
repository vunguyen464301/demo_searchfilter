import axios from 'axios';
import { mockupAPI } from './URL';

const API_URL = () => `${mockupAPI}`

const addHeaders = async (url, options) => {
    let headers = new Headers({
        'content-type': 'application/json',
        ...options.headers
    })
    //   let token = await AsyncStorage.getItem('user_token').then(token => {
    //     return token
    //   })
    //   if (token) {
    //     axios.defaults.headers.common['Authorization'] = token;
    //   }
    return axios({ url: API_URL(), headers: headers, ...options })
}

const apiWithoutPayload = method => url => {
    return new Promise((resolve, reject) => {
        addHeaders(url, { method })
            .then(response => {
                if (response === 204) {
                    resolve()
                    return
                }
                resolve(response.data)
            })
            .catch(err => reject(err.response.data))
    })
}

export const api = {
    // setToken,
    get: apiWithoutPayload('GET')
}
