import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation LoginUser($credentials: Credentials!) {
    login(credentials: $credentials) {
      accessToken
      refreshToken
      user {
        id
        firstName
        lastName
        username
        email
        verified
        birthday
        role
        createdAt
        updatedAt
      }
    }
  }
`;
export default LOGIN_USER;
