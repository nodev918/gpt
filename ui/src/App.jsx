import React, { useState } from 'react';
import axios from 'axios';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Chat from './components/Chat';

function App() {
 
  return (
    <div className="App">
      
      
      <Chat />

      <Signup />
      <Signin />

    </div>
  );
}

export default App;
