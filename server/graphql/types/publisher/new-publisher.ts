import { gql } from 'apollo-server-koa'

export const NewPublisher = gql`
  input NewPublisher {
    name: String!
    description: String!
    intervalExpr: String!
    apiUrl: String!
    repeatCount: Int
    status: Int
  }
`
