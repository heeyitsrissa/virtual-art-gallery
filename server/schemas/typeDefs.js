const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Artwork {
    id: ID!
    title: String!
    artist_titles: String
    description: String!
    image_id: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    artwork: [Artwork]!
    artworkById(id: ID!): Artwork
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    deleteArtwork(id: ID!): Artwork
  }
`;

module.exports = typeDefs;
