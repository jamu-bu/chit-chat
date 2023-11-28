import { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { EDIT_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import UpdateTheme from '../components/UpdateTheme';


export default function EditProfile() {

    UpdateTheme();

    // Handling update and submission of form for editing user's profile data

    const [formState, setFormState] = useState({ username: '', fullname: '', photo: '', bio: '' });

    const [editUser, { error }] = useMutation(EDIT_USER);

    const [findUsername, { loading, data }] = useLazyQuery(QUERY_ME);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await findUsername();
                console.log('searching for username');

                if (data) {
                    const username = data?.me.username;
                    const fullname = data?.me.fullname;
                    const bio = data?.me.bio;
                    setFormState({ username: username, fullname: fullname, bio: bio });
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, [data]);

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

    const setTheme = (event) => {
        const { id } = event.target;
        console.log(id)

        if (id === 'night') {
            document.body.style.backgroundImage = "linear-gradient(to bottom, rgba(2,0,36,1) 0%, #5543E6 100%)";
            document.body.style.color = "white";
            Array.from(document.querySelectorAll('h2')).map(function (h2) {
                h2.style.color = "#C1A2FF";
            })
            Array.from(document.querySelectorAll('button')).map(function (button) {
                button.style.backgroundColor = "#8C52FF";
            })

            localStorage.setItem("bgImage", "linear-gradient(to bottom, rgba(2,0,36,1) 0%, #5543E6 100%)");
            localStorage.setItem("bodyColor", "white");
            localStorage.setItem("h2Color", "#C1A2FF");
            localStorage.setItem("btnColor", "#8C52FF");
            localStorage.setItem("headerImg", "../src/assets/chitchatheader.png")

            localStorage.setItem("senderTxtColor","#7843E6");
            localStorage.setItem("senderBgColor","#C1A2FF");
            localStorage.setItem("receiverTxtColor","white");
            localStorage.setItem("receiverBgColor","#8C52FF");
        }

        if (id === 'day') {
            document.body.style.backgroundImage = "linear-gradient(to bottom, #93B1F4  0%, #A1C7FF 100%)";
            document.body.style.color = "white";
            Array.from(document.querySelectorAll('h2')).map(function (h2) {
                h2.style.color = "white";
            })
            Array.from(document.querySelectorAll('button')).map(function (button) {
                button.style.backgroundColor = "#43ABE6";
            })
            Array.from(document.getElementsByClassName('senderTxt')).map(function (senderTxt) {
                senderTxt.style.backgroundColor = "#D2E5FF";
            })
            localStorage.setItem("bgImage", "linear-gradient(to bottom, #93B1F4  0%, #A1C7FF 100%)");
            localStorage.setItem("bodyColor", "white");
            localStorage.setItem("h2Color", "white");
            localStorage.setItem("btnColor", "#43ABE6");
            localStorage.setItem("headerImg", "../src/assets/chitchatheader-white.png");
            localStorage.setItem("senderTxtColor","#43ABE6");
            localStorage.setItem("senderBgColor","#D2E5FF");
            localStorage.setItem("receiverTxtColor","white");
            localStorage.setItem("receiverBgColor","#43ABE6");


        }
        if (id === 'dawn') {
            document.body.style.backgroundImage = "linear-gradient(to bottom, #FFB3E2 0%, #FFC6C6 100%)";
            document.body.style.color = "white";
            Array.from(document.querySelectorAll('h2')).map(function (h2) {
                h2.style.color = "white";
            })
            Array.from(document.querySelectorAll('button')).map(function (button) {
                button.style.backgroundColor = "#FF66C4";
            })
            localStorage.setItem("bgImage", "linear-gradient(to bottom, #FFB3E2 0%, #FFC6C6 100%)");
            localStorage.setItem("bodyColor", "white");
            localStorage.setItem("h2Color", "white");
            localStorage.setItem("btnColor", "#FF66C4");
            localStorage.setItem("headerImg", "../src/assets/chitchatheader-white.png");
            localStorage.setItem("senderTxtColor","#FF66C4");
            localStorage.setItem("senderBgColor","#FFE8F6");
            localStorage.setItem("receiverTxtColor","white");
            localStorage.setItem("receiverBgColor","#FF66C4");
        }
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'radio' && name === 'photo') {
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
            await editUser({
                variables: { ...formState }
            });

            await setFormState({
                username: '',
                fullname: '',
                photo: '',
                bio: '',
            });

            await document.location.replace('/profile');

        } catch (e) {
            console.error(e);
            console.log(error);
        }
    };

    if (Auth.loggedIn()) {

        if (loading) {
            <div>Loading...</div>

        } else {
            return (
                <div className='centered'>
                    <h2>EDIT PROFILE</h2>
                    <div className="form-container">
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label>Change Your Username</label>
                                <div>
                                    <input
                                        className='pill'
                                        placeholder="username"
                                        name="username"
                                        type="text"
                                        value={formState.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Change Your Name</label>
                                <div>
                                    <input
                                        className='pill'
                                        placeholder="name"
                                        name="fullname"
                                        type="text"
                                        value={formState.fullname}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Change Your Bio</label>
                                <div>
                                    <input
                                        className='pill'
                                        placeholder="bio"
                                        name="bio"
                                        type="text"
                                        value={formState.bio}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Choose a New Profile Pic</label>
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
                                <button id="save" type="submit">Save Changes</button>
                            </div>
                        </form>
                    </div>
                    <h2>THEMES</h2>
                    <div className="theme-container">
                        <div className="themes">
                            <div>
                                <button className="theme" id="night" onClick={setTheme}>
                                    night mode
                                </button>
                            </div>
                            <div>
                                <button className="theme" id="day" onClick={setTheme}>
                                    day mode
                                </button>
                            </div>
                            <div>
                                <button className="theme" id="dawn" onClick={setTheme}>
                                    dawn mode
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        document.location.replace('/');
    }
}