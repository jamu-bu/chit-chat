import { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";
import { SAVE_MESSAGE } from '../utils/mutations';
import { socket } from '../socket';
import AudioRecorder from '../components/AudioRecorder';
import Auth from '../utils/auth';

export default function SendBox({ chatID, fooEvents, setFooEvents }) {

    const [isLoading, setIsLoading] = useState(false);
    const [saveMessage] = useMutation(SAVE_MESSAGE);
    const [audioData, setAudioData] = useState(null);
    const [input, setInput] = useState('');

    // Displays response from mic recording transcription in send message box

    useEffect(() => {
        if (audioData) {
            setInput(audioData)
        }
    }, [audioData]);

    const handleEmoji = (event) => {
        event.preventDefault();
        setInput(input + ' ' + event.target.textContent);
    }

    const handleText = event => {
        event.preventDefault();
        setInput(event.target.value);
    }

    const handleSendMsg = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        const message = input.trim();

        if (message !== '') {
            socket.emit('chat message', { user: Auth.getProfile().data._id, message });
            try {
                const { data } = await saveMessage({
                    variables: {
                        id: chatID,
                        sender: Auth.getProfile().data._id,
                        textContent: message,
                    }
                })
                setInput('')
                setIsLoading(false);

            } catch (err) {
                console.log(err)
            }
        }
    };

    return (
        <section>
            <form id="chatForm" onSubmit={handleSendMsg}>        
                <div id="sendBox">
                    <li><AudioRecorder newAudioData={(data) => setAudioData(data)} /></li>
                    <ul id="emojis">
                        <li className="emoji" onClick={handleEmoji}>❤️</li>
                        <li className="emoji" onClick={handleEmoji}>😊</li>
                        <li className="emoji" onClick={handleEmoji}>😭</li>
                        <li className="emoji" onClick={handleEmoji}>😂</li>
                        <li className="emoji" onClick={handleEmoji}>😡</li>
                        <li className="emoji" onClick={handleEmoji}>🎉</li>
                    </ul>
                    <input className="pill" id="messageInput" value={input} onChange={handleText} type="text" />
                    <input className='pill' id="submitBtn" type="submit" value="SEND" />
                </div>
            </form>
        </section>
    )
}