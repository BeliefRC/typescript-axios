import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'
const mergeMap = Object.create(null)
function defaultMerge(val1: any, val2: any): any {
  return typeof val2 !== undefined ? val2 : val1
}
function fromVal2Merge(val1: any, val2: any): any {
  if (typeof val2 !== undefined) {
    return val2
  }
}

function mergeDeepProperties(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
const mergeKeysFromVal2 = ['url', 'data', 'params']

mergeKeysFromVal2.forEach(key => {
  mergeMap[key] = fromVal2Merge
})

const mergeDeepPropertiesKeys = ['headers']
mergeDeepPropertiesKeys.forEach(key => {
  mergeMap[key] = mergeDeepProperties
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const merge = mergeMap[key] || defaultMerge
    config[key] = merge(config1[key], config2![key])
  }
  return config
}
