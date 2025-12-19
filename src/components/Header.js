import React from 'react';
import './Header.css';

const Header = ({ onAddNote }) => {
  return (
    <div className="header">
      <h1>Note App</h1>
      <button className="add-note-btn" onClick={onAddNote}>
        Add Note
      </button>
    </div>
  );
};

export default Header;
