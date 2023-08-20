

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

    return  <div className="container mt-5">
        <ul className="list-group mb-3">
            {messages.map((message, index) => (
                <li key={index} className="list-group-item">
                    {message}
                </li>
            ))}
        </ul>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Send Message</button>
            </div>
        </form>
    </div>
}


export default Chatio