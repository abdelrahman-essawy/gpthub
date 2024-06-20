import { gql } from '@apollo/client';
const REGISTER_USER = gql`
  mutation RegisterUser($userInfo: RegisterUserDto!) {
    register(userInfo: $userInfo) {
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
export default REGISTER_USER;
