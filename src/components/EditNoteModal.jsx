import React, { useState, useEffect } from "react";
import {
  MdClose,
  MdPushPin,
  MdColorLens,
  MdArchive,
  MdDeleteOutline,
  MdAddAlert,
} from "react-icons/md";
import { useNotes } from "../context/NotesContext";

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

const EditNoteModal = ({ note, onClose }) => {
  const { updateNote, deleteNote, archiveNote } = useNotes();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);
  const [isPinned, setIsPinned] = useState(note.isPinned);
  const [reminder, setReminder] = useState(note.reminder || "");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showReminderInput, setShowReminderInput] = useState(false);

 

  const handleSave = () => {
    updateNote(note.id, {
      title,
      content,
      color,
      isPinned,
      reminder,
    });
    onClose();
  };

  const handleDelete = () => {
    deleteNote(note.id);
    onClose();
  };

  const handleArchive = () => {
    archiveNote(note.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleSave}>
      <div
        className="modal-content"
        style={{ backgroundColor: color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="modal-title-input"
          />
          <button
            className={`icon-btn small ${isPinned ? "active" : ""}`}
            onClick={() => setIsPinned(!isPinned)}
          >
            <MdPushPin size={22} />
          </button>
        </div>

        <div className="modal-body">
          <textarea
            placeholder="Note"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="modal-content-input"
          />
          {reminder && (
            <div className="note-chip">
              <MdAddAlert size={14} />
              <span>{new Date(reminder).toLocaleString()}</span>
              <MdClose
                size={14}
                style={{ cursor: "pointer", marginLeft: 4 }}
                onClick={() => setReminder("")}
              />
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="modal-tools">
            
            <div className="reminder-wrapper" style={{ position: "relative" }}>
              <button
                className={`icon-btn small ${reminder ? "active" : ""}`}
                onClick={() => setShowReminderInput(!showReminderInput)}
                title="Edit reminder"
              >
                <MdAddAlert size={18} />
              </button>
              {showReminderInput && (
                <div className="reminder-popup">
                  <input
                    type="datetime-local"
                    value={reminder}
                    onChange={(e) => setReminder(e.target.value)}
                    className="reminder-input-field"
                  />
                </div>
              )}
            </div>

        
            <div
              className="color-picker-wrapper"
              style={{ position: "relative" }}
            >
              <button
                className="icon-btn small"
                onClick={() => setShowColorPicker(!showColorPicker)}
                title="Change color"
              >
                <MdColorLens size={18} />
              </button>
              {showColorPicker && (
                <div className="color-palette top-pop">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      className="color-circle"
                      style={{
                        backgroundColor: c.hex,
                        border:
                          color === c.hex
                            ? "2px solid #5f6368"
                            : "1px solid #dadce0",
                      }}
                      onClick={() => {
                        setColor(c.hex);
                        setShowColorPicker(false);
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              className="icon-btn small"
              onClick={handleArchive}
              title="Archive"
            >
              <MdArchive size={18} />
            </button>
            <button
              className="icon-btn small"
              onClick={handleDelete}
              title="Delete"
            >
              <MdDeleteOutline size={18} />
            </button>
          </div>

          <button className="close-text-btn" onClick={handleSave}>
            Close
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(32,33,36,0.6);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-content {
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,0.6), 0 2px 6px 2px rgba(0,0,0,0.3);
            border: 1px solid var(--border-color);
            padding: 16px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            background-color: #202124; 
        }
        /* Mobile Modal */
        @media (max-width: 600px) {
            .modal-content {
                max-width: 100%;
                width: 95%; /* Almost full width with small margin */
                height: 90%; /* Higher height */
                border-radius: 8px;
            }
            .modal-title-input {
                font-size: 18px;
            }
            .modal-content-input {
                font-size: 15px;
            }
            .modal-tools {
                gap: 4px; /* Tighter toolbar */
            }
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }
        .modal-title-input {
            flex: 1;
            font-size: 22px;
            font-weight: 500;
            border: none;
            background: transparent;
            color: var(--text-primary);
        }
        .modal-body {
            flex: 1;
            margin-bottom: 16px;
        }
        .modal-content-input {
            width: 100%;
            font-size: 16px;
            line-height: 1.5;
            color: var(--text-primary);
            border: none;
            background: transparent;
            resize: none;
            min-height: 100px;
        }
        .modal-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap; 
            gap: 12px; 
        }
        .modal-tools {
            display: flex;
            gap: 12px;
        }
        .close-text-btn {
            font-weight: 500;
            padding: 8px 24px;
            border-radius: 4px;
            color: var(--text-primary);
        }
        .close-text-btn:hover {
            background-color: rgba(0,0,0,0.05);
        }
        .top-pop {
            top: -120px !important;
        }
        @media (max-width: 600px) {
            .top-pop {
                 left: -50px; /* Shift a bit if needed */
            }
        }
      `}</style>
    </div>
  );
};

export default EditNoteModal;
