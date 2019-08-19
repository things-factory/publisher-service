import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const deletePublisher = {
  async deletePublisher(_, { id }) {
    const repository = getRepository(Publisher)

    return await repository.delete(id)
  }
}
