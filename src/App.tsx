import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Chat } from './Components/Chat/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Chat />
      </header>
    </div>
  );
}

export default App;
