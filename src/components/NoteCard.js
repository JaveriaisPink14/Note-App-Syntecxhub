import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-preview">{note.description.substring(0, 100)}...</p>
      <p className="note-date">{note.date}</p>
      <div className="note-actions">
        <button className="edit-btn" onClick={() => onEdit(note)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
