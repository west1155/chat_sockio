

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://54.224.31.231:3000',  {transports : ['websocket'] }); // Update the URL if needed

const Chatio = (props) => {

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages([...messages, msg]);
        });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageInput.trim() !== '') {
            socket.emit('chat message', messageInput);
            setMessageInput('');
        }
    };

    return <div>

        <ul id="messages">
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </ul>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>

    </div>
}


export default Chatio