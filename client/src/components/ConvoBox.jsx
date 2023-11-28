import { useEffect, useState } from 'react';
import Auth from '../utils/auth';

export default function ConvoBox({ chat, fooEvents, setFooEvents, socket }) {
    
  // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('chat message', (data) => {
            setFooEvents((state) => [
                ...state,
                {
                    textContent: data.message,
                    sender: data.user,
                },
            ]);
        });
        // Remove event listener on component unmount
        return () => socket.off('chat message');
    }, [socket]);

    return (
        <section id="convoBox">
            {chat.text.map((message, index) => message.sender === Auth.getProfile().data._id ? (
                    <p key={index} className="senderTxt">{message.textContent}</p>
                ) : (
                    <p key={index} className="receiverTxt">{message.textContent}</p>
                )
            )}
            {fooEvents.map((message, index) => message.sender === Auth.getProfile().data._id ? (
                <p key={index} className="senderTxt">{message.textContent}</p>
            ) : (
                <p key={index} className="receiverTxt">{message.textContent}</p>
            )
            )}
        </section>
    )
}