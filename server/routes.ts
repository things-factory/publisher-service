import { publishers } from './controllers/publishers'
process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  fallbackOption.whiteList.push('/publishers')
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  routes.get('/publishers', async (context, next) => {
    context.body = {
      success: true,
      ...(await publishers())
    }
  })
})
