import { BASE_API_URL } from "@/config/endpoint"
import useSessiontore from "@/store/useSessionStore"
import axios, { AxiosHeaders, AxiosInstance } from "axios"

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Accept: "application/json"
  },
  withCredentials: true
})

const FetchToken = () => {
  const { sessionId } = useSessiontore()

  if (!sessionId) return

  return sessionId
}

apiClient.interceptors.request.use(
  async (request) => {
    // const token = getToken();

    // if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // if (token) {
    const sessionId = await FetchToken()
    if (sessionId) {
      ;(request.headers as AxiosHeaders).set(`sessionid ${sessionId}`)
    }
    ;(request.headers as AxiosHeaders).set("accept", `application/json`)
    // }
    return request
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

const apiCall = {
  get(resource: string, params?: any) {
    return apiClient.get(resource, params)
  },
  post(resource: string, params: any, config?: any) {
    return apiClient.post(resource, params, config)
  },
  put(resource: string, params: string) {
    return apiClient.put(resource, params)
  },
  patch(resource: string, params: any) {
    return apiClient.patch(resource, params)
  },
  delete(resource: string) {
    return apiClient.delete(resource)
  }
}

export default apiCall
