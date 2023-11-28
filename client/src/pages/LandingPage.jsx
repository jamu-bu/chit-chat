import { useState } from 'react';
import Auth from '../utils/auth';
import Header from '../components/Header';
import Login from '../components/Login';
import Signup from '../components/Signup';
import UpdateTheme from '../components/UpdateTheme';

const LandingPage = () => {

    UpdateTheme();

    // Using state variable to switch between login and signup page
    
    const [form, setForm] = useState(null);

    const handleLogin = () => {
        setForm('login');
    };

    const handleSignup = () => {
        setForm('signup');
    };

    if (Auth.loggedIn()) {
        document.location.replace('/dashboard')
    } else {
        return (
            <main className='centered'>
                <Header />
                {form === null && (
                    <div>
                        <div>
                            <button onClick={handleLogin}>Login</button>
                        </div>
                        <div>
                            <button onClick={handleSignup}>Signup</button>
                        </div>
                    </div>
                )}
                <div>
                    {form === 'login' && <Login handleSignup={handleSignup} />}
                    {form === 'signup' && <Signup handleLogin={handleLogin} />}
                </div>
                <div className='design-container'>
                    <img className='design' src ="/chitchatlogo.png"></img>
                </div>
            </main>
        );
    }
};

export default LandingPage;