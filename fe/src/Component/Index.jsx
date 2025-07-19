import React from "react";
import logo from "./../logo.svg";

const Index = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="/login" rel="noopener noreferrer">
          Login
        </a>
      </header>
    </div>
  );
};

export default Index;
