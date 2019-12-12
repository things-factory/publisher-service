import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Publisher } from '../../../entities'

export const publishersResolver = {
  async publishers(_: any, params: ListParam, context: any) {
    var convertedParams = convertListParams(params, context.state.domain.id)
    const [items, total] = await getRepository(Publisher).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })

    return { items, total }
  }
}
