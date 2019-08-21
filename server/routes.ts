import { publishers } from './controllers/publishers'
import { startPublisher } from './controllers/start-publisher'
import { stopPublisher } from './controllers/stop-publisher'
import path from 'path'
import { path as appRootPath } from 'app-root-path'

// var mqttConfig = require(path.resolve(appRootPath, 'mqttconfig'))
// try {
//   mqttConfig = require(path.resolve(appRootPath, 'mqttconfig'))
// } catch (e) {
//   mqttConfig = require('@things-factory/publisher-service/mqttconfig')
// }

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  fallbackOption.whiteList.push('/publishers', '/start-publisher', '/stop-publisher')
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  routes.get('/publishers', async (context, next) => {
    context.body = {
      success: true,
      ...(await publishers())
    }
  })

  routes.get('/start-publisher/:id', async (context, next) => {
    var id = context.params.id
    context.body = {
      success: true,
      ...(await startPublisher(id, context))
    }
  })
  routes.get('/stop-publisher/:id', async (context, next) => {
    var id = context.params.id
    context.body = {
      success: true,
      ...(await stopPublisher(id, context))
    }
  })
})
