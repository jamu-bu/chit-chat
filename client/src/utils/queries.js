import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      fullname
      photo
      bio
    }
  }
`

export const QUERY_USER = gql`
  query Query($id: ID!) {
    user(_id: $id) {
      _id
      username
      fullname
      photo
      bio
    }
  }
`

export const QUERY_ME = gql`
  query me {
    me {
      username
      fullname
      photo
      bio
    }
  }
`

export const QUERY_FRIENDS = gql`
  query Me {
    me {
      username
      friends {
        _id
        username
        photo
        bio
        fullname
      }
    }
  }
`

export const QUERY_CHAT = gql`
  query chat($id: ID!) {
    chat(_id: $id) {
      text {
        sender
        textContent
      }
      user1 {
        _id
      }
      user2 {
        _id
      }
    }
  }
`

export const CHAT_EXISTS = gql`
  query ChatExists($user2: ID!) {
    chatExists(user2: $user2) {
      _id
      user1 {
        _id
      }
      user2 {
        _id
      }
      text {
        sender
        textContent
      }
    }
  }
`