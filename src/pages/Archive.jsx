import React from "react";
import { useOutletContext } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../context/NotesContext";
import { MdArchive } from "react-icons/md";

const Archive = () => {
  const { notes } = useNotes();
  const { searchTerm } = useOutletContext();

  const archivedNotes = notes.filter(
    (note) =>
      !note.isDeleted &&
      note.isArchived &&
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="dashboard">
      <div className="notes-grid" style={{ marginTop: "32px" }}>
        {archivedNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {archivedNotes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <MdArchive size={120} />
          </div>
          <p>Your archived notes appear here</p>
        </div>
      )}

      <style>{`
        .dashboard {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .notes-grid {
          column-count: 4;
          column-gap: 16px;
          padding: 0 16px; 
        }
        @media (max-width: 1024px) { .notes-grid { column-count: 3; } }
        @media (max-width: 768px) { .notes-grid { column-count: 2; } }
        @media (max-width: 480px) { .notes-grid { column-count: 1; } }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 100px;
          color: #5f6368;
        }
        .empty-icon {
          opacity: 0.1;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Archive;
