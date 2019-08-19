import { gql } from 'apollo-server-koa'

export const PublisherPatch = gql`
  input PublisherPatch {
    name: String
    description: String
    intervalExpr: String
    apiUrl: String
    repeatCount: Int
    status: Int
  }
`
