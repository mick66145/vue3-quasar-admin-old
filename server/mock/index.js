import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from './user'
import companyMock from './company'
export function setupProdMockServer () {
  createProdMockServer([...userMock, ...companyMock])
}
