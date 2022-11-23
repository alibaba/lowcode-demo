import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
const appHelper = {
  requestHandlersMap: {
    fetch: createFetchHandler()
  },
  utils: {
    demoUtil: (...params: any[]) => { console.log(`this is a demoUtil with params ${params}`)}
  },
  constants: {
    ConstantA: 'ConstantA',
    ConstantB: 'ConstantB'
  }
};
export default appHelper;