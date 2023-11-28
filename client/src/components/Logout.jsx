import Auth from '../utils/auth';

export default function Logout() {

    const logoutHandler = () => {
        Auth.logout();
        document.location.replace('/');
    };

    return (
        <>
            <button id='logout' onClick={logoutHandler}><img src ="../src/assets/logout.svg" id="logoutImg"></img></button>
        </>
    )
}