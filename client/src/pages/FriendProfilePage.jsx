import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_USER, CHAT_EXISTS, QUERY_FRIENDS } from '../utils/queries';
import { NEW_CHAT, ADD_FRIEND } from '../utils/mutations';
import FriendHeader from '../components/FriendHeader';
import Auth from '../utils/auth';
import UpdateTheme from '../components/UpdateTheme';

// Component for notification when friend is added

const AddFriendNotification = ({ onClose }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 1000);
        return () => clearTimeout(timeout);
    });

    return (
        <h3>New Friend Added!</h3>
    )
};

// Component for notification when friend is already on friends list

const AlreadyFriendNotification = ({ onClose }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 1000);
        return () => clearTimeout(timeout);
    });

    return (
        <h3>Already Friends!</h3>
    )
};

export default function FriendProfilePage() {

    UpdateTheme();

    const { userID } = useParams();
    const [friendExists, setFriendExists] = useState(false);
    const [showAddFriendNotification, setAddFriendNotification] = useState(false);
    const [showAlreadyFriendNotification, setAlreadyFriendNotification] = useState(false);

    const hideNotification = () => {
        setAddFriendNotification(false);
        setAlreadyFriendNotification(false);
    };

    // Query for searched user's data and checks if they are a friend

    const [searchFriends, { loading: friendsLoading, data: friendsData }] = useLazyQuery(QUERY_FRIENDS);
    const [searchUser, { loading: userLoading, data: userData }] = useLazyQuery(QUERY_USER, {
        variables: { id: userID }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await searchUser();
                await searchFriends();

                if (userData) {
                    const user2ID = userData?.user._id;
                    const allFriends = friendsData?.me.friends;
                    const friend = allFriends.filter(friend => friend._id === user2ID);

                    if (friend.length) {
                        setFriendExists(true);
                    } else {
                        console.log('not friends');
                    }
                } else {
                    console.log('still loading friends data');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

    }, [userData, friendsData]);

    // Add friend button handler

    const [addFriend, { friendErr }] = useMutation(ADD_FRIEND);

    const handleAddFriend = async (ID) => {

        if (friendExists) {

            setAlreadyFriendNotification(true);
            return;

        } else if (!friendExists) {

            try {
                await addFriend({
                    variables: { friend: ID }
                });
                setFriendExists(true);
                setAddFriendNotification(true);
                
            } catch (e) {
                console.log(e);
                console.log(friendErr);
            }
        }
    };

    // New Chat Handler

    const [addChat, { chatErr }] = useMutation(NEW_CHAT);

    const { loading: chatLoading, data: chatData, refetch } = useQuery(CHAT_EXISTS, {
        variables: { user2: userID }
    });

    const handleNewChat = async (ID, ifExists) => {
        try {
            if (ifExists) {
                console.log('found exists');
                console.log(chatData.chatExists._id)
                const chatID = chatData.chatExists._id;
                document.location.replace(`/chat/${chatID}`);
                return ifExists;
            } else {
                const { data } = await addChat({
                    variables: { user2: ID }
                })
                const newChatID = data?.newChat._id;
                document.location.replace(`/chat/${newChatID}`);
                console.log('new chat created');
                refetch();
                return data;
            }

        } catch (e) {
            console.log(e);
            console.log(chatErr);
        }
    };

    if (Auth.loggedIn()) {
        if (userLoading || chatLoading) {
            return (
                <div>Loading User Profile...</div>
            )
        } else if (userData && chatData) {

            const user = userData?.user;
            const ifExists = chatData?.chatExists;

            return (
                <main className='centered'>
                    <FriendHeader userID={userID} />
                    <div>
                        <img className="profilePicture" src={user.photo}></img>
                        <div>{user.fullname}</div>
                        <div>{user.bio}</div>
                    </div>
                    <button id="add-friend" onClick={() => handleAddFriend(user._id)}>
                        <img src="../src/assets/plus.png" id="editImg" />
                    </button>
                    <button id="start-chat" onClick={() => handleNewChat(user._id, ifExists)}>
                        <img src="../src/assets/start-chat.svg" id="chatImg"></img>
                    </button>
                    {showAddFriendNotification && (
                        <AddFriendNotification onClose={hideNotification} />
                    )}
                    {showAlreadyFriendNotification && (
                        <AlreadyFriendNotification onClose={hideNotification} />
                    )}
                </main>
            )
        }
    } else {
        document.location.replace('/');
    }
}