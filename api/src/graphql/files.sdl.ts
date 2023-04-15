export const schema = gql`
  type File {
    id: Int!
    name: String!
    path: String!
    size: Int!
    type: String!
    createdAt: DateTime!
  }

  type Query {
    files: [File!]! @requireAuth
    file(id: Int!): File @requireAuth
  }

  input CreateFileInput {
    name: String!
    path: String!
    size: Int!
    type: String!
  }

  input UpdateFileInput {
    name: String
    path: String
    size: Int
    type: String
  }

  type Mutation {
    createFile(input: CreateFileInput!): File! @requireAuth
    updateFile(id: Int!, input: UpdateFileInput!): File! @requireAuth
    deleteFile(id: Int!): File! @requireAuth
  }
`
