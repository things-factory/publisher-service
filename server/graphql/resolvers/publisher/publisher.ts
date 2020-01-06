import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const publisherResolver = {
  async publisher(_, { id }, context, info) {
    return await getRepository(Publisher).findOne({
      where: { domain: context.state.domain, id, relations: ['domain', 'creator', 'updater'] }
    })
  }
}
