import { CronJob } from 'cron'
import fetch from 'node-fetch'
import { URL } from 'url'
import { publisherResolver } from '../graphql/resolvers/publisher/publisher'
import { updatePublisher } from '../graphql/resolvers/publisher/update-publisher'

export async function startPublisher(id, context) {
  var globalObject = global as any
  if (!globalObject.jobs) globalObject.jobs = {}

  var publisher = await publisherResolver.publisher(null, { id }, null, null)
  var { intervalExpr, apiUrl, status } = publisher
  var timezone = 'Asia/Seoul'

  var url = new URL(apiUrl, context.origin)

  if (status == 1) return publisher

  try {
    globalObject.jobs[id] = new CronJob(
      intervalExpr,
      async () => {
        var json = await fetch(url.toString()).then(async res => await res.json())
        console.log(json)
      },
      () => {
        publisher.status = 1
        updatePublisher.updatePublisher(
          null,
          {
            id,
            patch: publisher
          },
          context
        )
        console.log('scheduler stoped')
      },
      true,
      timezone
    )
    publisher.status = 1
  } catch (e) {
    publisher.status = 2
  } finally {
    updatePublisher.updatePublisher(
      null,
      {
        id,
        patch: publisher
      },
      context
    )
  }

  return publisher
}
