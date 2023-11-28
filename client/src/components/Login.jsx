import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login({ handleSignup }) {

    // Handling login form

    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('logging in');

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            console.log(data);

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            username: '',
            password: '',
        });
    };

    return (
        <div className='centered'>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input className='pill'
                        placeholder="Username"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input className='pill'
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className='pill'
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Login
                    </button>
                </div>

                <div>
                    <button className='pill'
                        style={{ cursor: 'pointer' }}
                        onClick={handleSignup}
                    >
                        Sign Up Instead
                    </button>
                </div>
                
            </form>
        </div>
    )
}