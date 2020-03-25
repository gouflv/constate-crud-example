import _ from 'lodash'
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios'
import { history } from 'umi'

export const API_BASE = '/api'

interface ajaxOptions {
  baseURL?: string
  headers?: object
  method?: Method
  data?: any
  timeout?: number
}

export interface ServerResponseData {
  code: number
  data: any
  message: string
}

export interface AJAXError extends ServerResponseData {
  handled: boolean
}

export const ajax = (url: string, options: ajaxOptions) => {
  const axiosOptions: AxiosRequestConfig = {
    baseURL: options.baseURL || API_BASE,
    headers: {
      token: localStorage.getItem('token'),
      ...options.headers
    },
    method: options.method || 'GET',
    timeout: options.timeout || 10 * 1000
  }
  if (options.data && ~['get', 'delete'].indexOf(options.method as string)) {
    axiosOptions.params = options.data
  } else {
    axiosOptions.data = options.data
  }

  return new Promise<ServerResponseData>((resolve, reject) => {
    axios(url, axiosOptions)
      .then((res: AxiosResponse<ServerResponseData>) => {
        resolve(res.data)
      })
      .catch((err: AxiosError) => {
        console.error(err)
        if (!err.response) {
          serverErrorHandler()
          reject({ ...err, handled: true })
        } else if (err.response.status === 401) {
          history.push('/login')
        } else if (err.response.status === 400) {
          reject({
            data: err.response.data,
            message: err.response.data && err.response.data.msg,
            handled: false
          })
        } else {
          serverErrorHandler()
          reject({ ...err, handled: true })
        }
      })
  })
}

export const GET = (url: string, options: ajaxOptions) =>
  ajax(url, {
    ...options,
    method: 'get'
  })
export const PUT = (url: string, options: ajaxOptions) =>
  ajax(url, {
    ...options,
    method: 'put'
  })
export const POST = (url: string, options: ajaxOptions) =>
  ajax(url, {
    ...options,
    method: 'post'
  })
export const DELETE = (url: string, options: ajaxOptions) =>
  ajax(url, {
    ...options,
    method: 'delete'
  })

const serverErrorHandler = () => {
  alert('服务繁忙，请稍后重试')
}
