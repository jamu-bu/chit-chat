import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Signup({ handleLogin }) {

    // Import photos for profile pic selection

    const imagePaths = [
        '/profile-pics/astronaut.png',
        '/profile-pics/avocado.png',
        '/profile-pics/cat.png',
        '/profile-pics/gamer.png',
        '/profile-pics/icecream.png',
        '/profile-pics/livingroom.png',
        '/profile-pics/man.png',
        '/profile-pics/paperplane.png',
        '/profile-pics/rain.png',
        '/profile-pics/river.png',
        '/profile-pics/rubberduck.png',
        '/profile-pics/watermelon.png',
        '/profile-pics/woman.png',
        '/profile-pics/zebra.png',
    ];

    // Handling signup form

    const [formState, setFormState] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        photo: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'radio' && name === 'photo') {
            console.log('photo selected');
            setFormState({
                ...formState,
                [name]: value,
            });
        } else {
            setFormState({
                ...formState,
                [name]: value,
            });
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div className="centered">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input
                        className='pill'
                        placeholder="Full Name"
                        name="fullname"
                        type="text"
                        value={formState.fullname}
                        onChange={handleChange}
                    />
                </div>
               <div>
                    <input
                        className='pill'
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
               </div>
                <div>
                    <input
                        className='pill'
                        placeholder="Username"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className='pill'
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                <div id="profile-pic-div">
                    <label>Choose a Profile Pic</label>
                    <div className="profile-pic-container">
                        {imagePaths.map((pic, index) => (
                            <div key={index}>
                                <input type="radio" name="photo" value={pic} onChange={handleChange} />
                                <img src={pic} />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <button
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Create
                    </button>
                </div>
                <div>
                    <button
                        style={{ cursor: 'pointer' }}
                        onClick={handleLogin}
                    >
                        Login Instead
                    </button>
                </div>
            </form>
        </div>
    )
}