import React, { useState, useRef, useEffect } from 'react';
import withAuth from './withAuth';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    // Add user message to the UI
    const updatedMessages = [...messages, { sender: 'user', content: userInput }];
    setMessages(updatedMessages);
    // Clear input field
    setUserInput('');

    try {
      // Send user message to the backend
      const response = await fetch('http://localhost:5001/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      // Receive response from the backend
      const data = await response.json();
      // Add bot response to the UI
      setMessages([...updatedMessages, { sender: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.sender}`}>
            <div className="message">
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default withAuth(Chatbot);
