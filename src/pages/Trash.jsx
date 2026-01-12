import React from "react";
import { useOutletContext } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../context/NotesContext";
import { MdDelete } from "react-icons/md";

const Trash = () => {
  const { notes } = useNotes();
  const { searchTerm } = useOutletContext();

  const deletedNotes = notes.filter(
    (note) =>
      note.isDeleted &&
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="dashboard">
      <div className="trash-header">
        <i>Notes in Trash are deleted after 7 days (mock).</i>
      </div>
      <div className="notes-grid" style={{ marginTop: "32px" }}>
        {deletedNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {deletedNotes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <MdDelete size={120} />
          </div>
          <p>No notes in Trash</p>
        </div>
      )}

      <style>{`
        .dashboard {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .trash-header {
           text-align: center;
           padding: 16px; 
           font-style: italic;
           color: #5f6368;
        }
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
          padding: 0 16px; 
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
          opacity: 0.1;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Trash;
