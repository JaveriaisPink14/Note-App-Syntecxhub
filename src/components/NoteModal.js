import React, { useState, useEffect } from 'react';
import './NoteModal.css';

const NoteModal = ({ isOpen, onClose, onSave, note }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');
  const [colorTag, setColorTag] = useState('#e1bee7');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setCategory(note.category || 'Personal');
      setColorTag(note.colorTag || '#e1bee7');
    } else {
      setTitle('');
      setDescription('');
      setCategory('Personal');
      setColorTag('#e1bee7');
    }
  }, [note, isOpen]);

  const handleSave = () => {
    if (title.trim() || description.trim()) {
      const finalTitle = title.trim() || 'Untitled';
      const finalDescription = description.trim() || title.trim() || 'No description';
      onSave({
        id: note ? note.id : Date.now(),
        title: finalTitle,
        description: finalDescription,
        category,
        colorTag,
        date: new Date().toLocaleDateString(),
      });
      onClose();
    }
  };

  const colorOptions = ['#e1bee7', '#c8e6c9', '#b3e5fc', '#fff3e0', '#fce4ec'];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{note ? 'Edit Note' : 'Add New Note'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              maxLength={50}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter note description"
              maxLength={500}
            />
            <div className="char-counter">{description.length}/500</div>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
            </select>
          </div>
          <div className="form-group">
            <label>Color Tag</label>
            <div className="color-tags">
              {colorOptions.map((color) => (
                <div
                  key={color}
                  className={`color-tag ${colorTag === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setColorTag(color)}
                />
              ))}
            </div>
          </div>
        </form>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
