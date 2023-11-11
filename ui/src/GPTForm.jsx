import React, { useState } from 'react';
import axios from 'axios';

const GPTForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/query', { prompt });
      setResponse(res.message);
      console.log(res.data.message)
    } catch (error) {
      console.error('Error fetching GPT-3 response: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your prompt for GPT-3"
        />
        <button type="submit">Submit</button>
      </form>
      {response && <div><h3>Response:</h3><p>{response}</p></div>}
    </div>
  );
};

export default GPTForm;