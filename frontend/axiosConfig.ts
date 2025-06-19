import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
// import store from '@/store'
import { baseApiUrl } from './global'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseApiUrl,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError<any>) => {
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || 'Ocorreu um erro'

    //   if (status === 401 || status === 419) {
    //     store.dispatch('setError', { message })

    //     // Redirecionar para o login se necessário
    //     // window.location.href = `${deployPath}/login`
    //   } else if (status === 403) {
    //     store.dispatch('setError', { message })
    //   }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
