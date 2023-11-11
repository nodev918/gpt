import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chat.css'

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'responder', content: 'Hello! How can I assist you today?' },
    // Add more default messages here if needed
  ]);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom every time messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = { id: Date.now(), role: 'user', content: input };
    setMessages([...messages, newUserMessage]); // Add the user message to the conversation

    try {
      // Replace '/api/message' with your actual endpoint
      let temp = input
      console.log(input)
      setInput(''); // Clear input after sending
      const response = await axios.post('http://localhost:3000/query', { prompt:temp });
      const gptResponse = { id: Date.now() + 1, role: 'responder', content: response.data.message };
      setMessages(messages => [...messages, gptResponse]); // Add responder's response to the conversation
  
    } catch (error) {
      console.error('Error sending message:', error);
    }

  };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e)=>{

          }}
          placeholder="Type a message..."
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
