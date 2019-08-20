import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const updatePublisher = {
  async updatePublisher(_, { id, patch }, context) {
    const repository = getRepository(Publisher)

    const publisher = await repository.findOne({ id })

    if (patch.model) {
      const { width, height } = JSON.parse(patch.model)

      patch.width = width
      patch.height = height
    }

    return await repository.save({
      ...publisher,
      ...patch,
      updater: context.state.user
    })
  }
}
