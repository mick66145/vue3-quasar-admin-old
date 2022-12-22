import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from './user'
import companyMock from './company'
import companyJobMock from './company-job'
export function setupProdMockServer () {
  createProdMockServer([...userMock, ...companyMock, ...companyJobMock])
}
