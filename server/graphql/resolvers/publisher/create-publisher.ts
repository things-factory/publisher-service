import { getRepository } from 'typeorm'
import uuid from 'uuid/v4'
import { Publisher } from '../../../entities'

export const createPublisher = {
  async createPublisher(_, { publisher: attrs }) {
    const repository = getRepository(Publisher)
    const newPublisher = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newPublisher)
  }
}
