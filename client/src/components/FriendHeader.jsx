import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

export default function FriendHeader(props) {
    
        const { loading, data } = useQuery(QUERY_USER, {
            variables: { id: props.userID }
        });

        if (loading) {
            return <div>Loading...</div>;
        } else {
            const username = data.user.username;
            const photo = data.user.photo;
    
            return (
                <header>
                    <img id ="pfp" src={photo} alt={username}/>
                    <h2> @{username}</h2>
                </header>
            )
    }
}