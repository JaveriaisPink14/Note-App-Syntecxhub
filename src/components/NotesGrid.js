import React from 'react';
import NoteCard from './NoteCard';
import './NotesGrid.css';

const NotesGrid = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="notes-grid empty">
        <div className="empty-state">
          <p>No notes yet. Click "Add Note" to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
