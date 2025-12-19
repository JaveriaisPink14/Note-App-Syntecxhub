import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NotesGrid from './components/NotesGrid';
import NoteModal from './components/NoteModal';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    const newNote = { ...note, id: Date.now(), date: new Date().toLocaleDateString() };
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  const editNote = (updatedNote) => {
    setNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const openModal = (note = null) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Header onAddNote={() => openModal()} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NotesGrid notes={filteredNotes} onEdit={openModal} onDelete={deleteNote} />
      {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          note={editingNote}
          onSave={editingNote ? editNote : addNote}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
