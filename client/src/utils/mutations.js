import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!, $fullname: String, $photo: String) {
        addUser(username: $username, email: $email, password: $password, fullname: $fullname, photo: $photo) {
        token
        user {
            _id
            username
        }
        }
    }
`

export const NEW_CHAT = gql`
    mutation newChat($user2: ID!) {
        newChat(user2: $user2) {
        _id
        }
    }
    
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`

export const EDIT_USER = gql`
    mutation editUser($username: String, $fullname: String, $bio: String, $photo: String) {
        editUser(username: $username, fullname: $fullname, bio: $bio, photo: $photo) {
        username
        fullname
        bio
        photo
        }
    }
`

export const ADD_FRIEND = gql`
    mutation AddFriend($friend: ID) {
        addFriend(friend: $friend) {
        username
        friends {
            _id
        }
        }
    }
`

export const SAVE_MESSAGE = gql`
    mutation saveMessage($id: ID!, $sender: ID, $textContent: String) {
        saveMessage(_id: $id, sender: $sender, textContent: $textContent) {
        text {
                sender
                textContent
            }
        }
    }
`