import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Header from '../components/Header';
import UpdateTheme from '../components/UpdateTheme';

export default function UsersListPage() {
    
    UpdateTheme();

    // Query for all users to display

    const { loading, data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    if (Auth.loggedIn()) {
        return (
            <main className="usersListPage">
                <Header />
                <h2>Users:</h2>
                <div className='centered'>
                    {loading ? (
                        <div>Loading Users...</div>
                    ) : (
                        <div>
                            {users.map((user) => (user._id !== Auth.getProfile().data._id ? (
                                <section key={user._id} className='padding'>
                                    <div><img id="userPfp" src={user.photo} alt="friendProfile" /></div>
                                    <div><h3>@ {user.username}</h3></div>
                                    <Link to={`/user/${user._id}`}><button id="view-profile-btn">view profile</button></Link>
                                </section>
                            ) : null))}
                        </div>
                    )}
                </div>
            </main>
        )
    } else {
        document.location.replace('/');
    }
    
}