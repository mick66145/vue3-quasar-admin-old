
import { FileResource } from '@/api'
import reduce from 'lodash-es/reduce'

const fileResource = new FileResource()
export default function useBatchUpload () {
  const batchUpload = async (payload) => {
    const resUpload = {}
    const errors = []
    await reduce(payload, async (req, value, key) => {
      if (req) await req
      return new Promise(resolve => {
        if (!value) {
          resUpload[key] = value
          resolve(value)
        } else if (value.raw) {
          fileResource.upload({ file: value.raw })
            .then(res => res.data)
            .then(res => {
              resUpload[key] = res.data
              resolve(res)
            })
            .catch(error => {
              console.log('🚀 ~ awaitreduce ~ error', error)
              resUpload[key] = value
              resolve(error)
              errors.push(error)
            })
        } else {
          resUpload[key] = value
          resolve(value)
        }
      })
    }, Promise.resolve())
    return [resUpload, errors]
  }
  return {
    batchUpload,
  }
}
