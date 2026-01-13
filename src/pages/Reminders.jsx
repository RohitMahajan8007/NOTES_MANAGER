import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import NoteInput from "../components/NoteInput";
import NoteCard from "../components/NoteCard";
import EditNoteModal from "../components/EditNoteModal";
import { useNotes } from "../context/NotesContext";

const Reminders = () => {
  const { notes } = useNotes();
  const { searchTerm } = useOutletContext();
  const [selectedNote, setSelectedNote] = useState(null);

  const reminderNotes = notes.filter(
    (note) =>
      !note.isDeleted &&
      !note.isArchived &&
      note.reminder &&
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="dashboard">
      <NoteInput />

    

      <h6 className="section-label">UPCOMING</h6>

      <div className="notes-grid">
        {reminderNotes.map((note) => (
          <div key={note.id} onClick={() => setSelectedNote(note)}>
            <NoteCard note={note} />
          </div>
        ))}
      </div>

      {reminderNotes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔔</div>
          <p>Notes with upcoming reminders appear here</p>
        </div>
      )}

      {selectedNote && (
        <EditNoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}

      <style>{`
        .dashboard {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .07272727em;
          text-transform: uppercase;
          color: #5f6368;
          margin: 24px 0 12px 16px;
        }
        .notes-grid {
          column-count: 4;
          column-gap: 16px;
          padding: 0 16px; 
          margin-bottom: 32px;
        }
        @media (max-width: 1024px) {
          .notes-grid { column-count: 3; }
        }
        @media (max-width: 768px) {
          .notes-grid { column-count: 2; }
        }
        @media (max-width: 480px) {
          .notes-grid { column-count: 1; }
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 100px;
          color: #5f6368;
        }
        .empty-icon {
          font-size: 100px;
          opacity: 0.1;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Reminders;
