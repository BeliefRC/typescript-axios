export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'
  | 'option'
  | 'OPTION'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params: any
}
