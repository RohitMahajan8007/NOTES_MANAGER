import React, { useState } from "react";
import { useNotes } from "../context/NotesContext";
import {
  MdColorLens,
  MdArchive,
  MdDeleteOutline,
  MdPushPin,
  MdRestoreFromTrash,
  MdDeleteForever,
  MdUnarchive,
  MdAccessTime,
  MdAddAlert,
} from "react-icons/md";

const COLORS = [
  { name: "Default", hex: "#202124" },
  { name: "Red", hex: "#5c2b29" },
  { name: "Orange", hex: "#614a19" },
  { name: "Yellow", hex: "#635d19" },
  { name: "Green", hex: "#345920" },
  { name: "Teal", hex: "#16504b" },
  { name: "Blue", hex: "#2d555e" },
  { name: "DarkBlue", hex: "#1e3a5f" },
  { name: "Purple", hex: "#42275e" },
  { name: "Pink", hex: "#5b2245" },
  { name: "Brown", hex: "#442f19" },
  { name: "Gray", hex: "#3c4043" },
];

const NoteCard = ({ note }) => {
  const {
    updateNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    restoreNote,
    permanentlyDeleteNote,
    togglePin,
  } = useNotes();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showReminderInput, setShowReminderInput] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleColorChange = (color) => {
    updateNote(note.id, { color });
    setShowColorPicker(false);
  };

  const handleReminderUpdate = (newReminder) => {
    updateNote(note.id, { reminder: newReminder });
   
  };

  return (
    <div
      className="note-card"
      style={{ backgroundColor: note.color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowColorPicker(false);
        setShowReminderInput(false);
      }}
    >
      <div className="note-card-content">
        <div className="note-header">
          <h3 className="note-title">{note.title}</h3>
          
          {!note.isDeleted && (
            <button
              className={`icon-btn small pin-btn ${
                note.isPinned ? "active" : ""
              } ${!isHovered && !note.isPinned ? "hidden" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                togglePin(note.id);
              }}
            >
              <MdPushPin size={20} />
            </button>
          )}
        </div>
        <p className="note-body">{note.content}</p>

        {note.reminder && (
          <div className="note-chip">
            <MdAccessTime size={14} />
            <span>{new Date(note.reminder).toLocaleString()}</span>
          </div>
        )}
      </div>

      <div
        className={`note-card-footer ${
          showColorPicker || showReminderInput ? "force-visible" : ""
        }`}
      >
        {!note.isDeleted ? (
          <>
            <div className="reminder-wrapper" style={{ position: "relative" }}>
              <button
                className={`icon-btn small ${note.reminder ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReminderInput(!showReminderInput);
                  setShowColorPicker(false);
                }}
                title="Remind me"
              >
                <MdAddAlert size={18} />
              </button>
              {showReminderInput && (
                <div
                  className="reminder-popup"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="datetime-local"
                    value={note.reminder || ""}
                    onChange={(e) =>
                      updateNote(note.id, { reminder: e.target.value })
                    }
                    className="reminder-input-field"
                  />
                </div>
              )}
            </div>
            <div className="color-picker-wrapper">
              <button
                className="icon-btn small"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(!showColorPicker);
                  setShowReminderInput(false);
                }}
                title="Change color"
              >
                <MdColorLens size={18} />
              </button>

              {showColorPicker && (
                <div className="color-palette mini">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      className="color-circle"
                      style={{
                        backgroundColor: c.hex,
                        border:
                          note.color === c.hex
                            ? "2px solid #5f6368"
                            : "1px solid #dadce0",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleColorChange(c.hex);
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {note.isArchived ? (
              <button
                className="icon-btn small"
                onClick={() => unarchiveNote(note.id)}
                title="Unarchive"
              >
                <MdUnarchive size={18} />
              </button>
            ) : (
              <button
                className="icon-btn small"
                onClick={() => archiveNote(note.id)}
                title="Archive"
              >
                <MdArchive size={18} />
              </button>
            )}

            <button
              className="icon-btn small"
              onClick={() => deleteNote(note.id)}
              title="Delete"
            >
              <MdDeleteOutline size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              className="icon-btn small"
              onClick={() => restoreNote(note.id)}
              title="Restore"
            >
              <MdRestoreFromTrash size={18} />
            </button>
            <button
              className="icon-btn small"
              onClick={() => permanentlyDeleteNote(note.id)}
              title="Delete forever"
            >
              <MdDeleteForever size={18} />
            </button>
          </>
        )}
      </div>

      <style>{`
        .note-card {
          border-radius: 8px;
          border: 1px solid #d3d3d3;
          padding: 12px;
          background: #fff;
          width: 100%;
          display: inline-flex;
          break-inside: avoid;
          margin-bottom: 16px;
          flex-direction: column;
          justify-content: space-between;
          transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out; 
          position: relative;
        }
        .note-card:hover {
          box-shadow: 0 4px 6px rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15);
        }
        .note-chip {
             display: inline-flex;
             align-items: center;
             gap: 6px;
             margin-top: 12px;
             padding: 4px 10px;
             border-radius: 16px;
             border: 1px solid #e0e0e0;
             background: rgba(0,0,0,0.03);
             font-size: 11px;
             color: var(--text-secondary);
             width: fit-content;
        }
        .note-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          min-height: 24px;
        }
        .note-title {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 8px 0;
          word-wrap: break-word;
          max-width: 85%;
        }
        .note-body {
          font-size: 14px;
          margin: 0;
          white-space: pre-wrap; 
          word-wrap: break-word;
          line-height: 1.5;
        }
        .note-card-footer {
          display: flex;
          align-items: center;
          margin-top: 12px;
          height: 30px;
          gap: 4px;
          opacity: 0; /* Hidden by default on desktop */
          transition: opacity 0.2s ease-in-out;
        }
        /* Show footer on hover OR if a valid popup is open */
        .note-card:hover .note-card-footer,
        .note-card-footer.force-visible {
          opacity: 1;
        }
        /* Always show footer on touch devices/mobile */
        @media (max-width: 768px) {
          .note-card-footer {
            opacity: 1 !important;
          }
        }
        .icon-btn.small {
          width: 30px; 
          height: 30px;
          opacity: 0.7;
          color: var(--text-secondary); /* Ensure visible against bg */
        }
        .icon-btn.small:hover {
          opacity: 1;
          color: var(--text-primary);
          background-color: rgba(95,99,104, 0.157);
        }
        .pin-btn {
          position: absolute;
          top: 8px;
          right: 8px;
        }
        .icon-btn.active,
        .pin-btn.active {
          opacity: 1;
          color: var(--text-primary);
        }
        .color-palette.mini {
          width: 130px;
          top: -100px;
          z-index: 10; 
          position: absolute;
          background: #202124;
          padding: 8px;
          border-radius: 4px;
          display: flex;
          flex-wrap: wrap; 
          gap: 4px;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.6), 0 2px 6px 2px rgba(0,0,0,0.3);
        }
        .color-circle {
           width: 20px;
           height: 20px;
           border-radius: 50%;
           cursor: pointer;
           border: 1px solid transparent;
        }
        .reminder-popup {
          position: absolute;
          top: -60px;
          left: 0;
          background: #202124;
          padding: 8px;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.6), 0 2px 6px 2px rgba(0,0,0,0.3);
          border-radius: 4px;
          z-index: 20;
          border: 1px solid #5f6368;
        }
        .reminder-input-field {
            padding: 4px;
            border: 1px solid #5f6368;
            background: #202124;
            color: #ffffff;
            border-radius: 4px;
            font-size: 12px;
            outline: none;
        }
      `}</style>
    </div>
  );
};

export default NoteCard;
