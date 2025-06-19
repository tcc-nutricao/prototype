import axiosInstance from './axiosConfig'
// import store from './store'

// Tipos auxiliares
interface ApiResponse<T = any> {
  status: number
  error?: boolean
  data?: T
  [key: string]: any
}

const get = async (route: string, params: Record<string, any> = {}): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.get(route, { params })
    return { ...res.data, status: res.status }
  } catch (err: any) {
    return { error: true, ...err.response, status: err.response?.status }
  }
}

const search = async (route: string, objectParams: Record<string, any>): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.get(route, { params: objectParams })
    return { ...res.data, status: res.status }
  } catch (err: any) {
    return { error: true, ...err.response, status: err.response?.status }
  }
}

const insert = async (
  route: string,
  object: Record<string, any>,
  itemMessage?: string
): Promise<ApiResponse> => {
  let headers: Record<string, string> = {}

  for (const key in object) {
    if (object[key] instanceof File) {
      headers['Content-Type'] = 'multipart/form-data'
      break
    }
  }

  try {
    const res = await axiosInstance.post(route, object, { headers })

    // if (itemMessage) {
    //   store.dispatch('setSuccess', {
    //     message: `Sucesso ao cadastrar ${itemMessage}!`,
    //   })
    // }

    return { ...res.data, status: res.status }
  } catch (err: any) {
    // if (itemMessage) {
    //   store.dispatch('setError', {
    //     message: `Erro ao cadastrar ${itemMessage}!`,
    //   })
    // }
    return { error: true, ...err.response, status: err.response?.status }
  }
}

const update = async (
  route: string,
  id: string | number,
  object: Record<string, any>,
  itemMessage?: string
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.patch(`/${route}/${id}`, object)

    // if (itemMessage) {
    //   store.dispatch('setSuccess', {
    //     message: `Sucesso ao atualizar ${itemMessage}!`,
    //   })
    // }

    return { ...res.data, status: res.status }
  } catch (err: any) {
    // if (itemMessage) {
    //   store.dispatch('setError', {
    //     message: `Erro ao atualizar ${itemMessage}!`,
    //   })
    // }
    return { error: true, ...err.response, status: err.response?.status }
  }
}

const remove = async (
  route: string,
  id: string | number,
  itemMessage?: string
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.delete(`/${route}/${id}`)

    // if (itemMessage) {
    //   store.dispatch('setSuccess', {
    //     message: `Sucesso ao remover ${itemMessage}!`,
    //   })
    // }

    return { ...res.data, status: res.status }
  } catch (err: any) {
    // if (itemMessage) {
    //   store.dispatch('setError', {
    //     message: `Erro ao remover ${itemMessage}!`,
    //   })
    // }
    return { error: true, ...err.response, status: err.response?.status }
  }
}

export { get, search, insert, update, remove }
