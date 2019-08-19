import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'
import { ListParam, buildQuery } from '@things-factory/shell'

export const publishersResolver = {
  async publishers(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Publisher).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
