import { gql } from 'apollo-server-koa'

export const PublisherList = gql`
  type PublisherList {
    items: [Publisher]
    total: Int
  }
`
