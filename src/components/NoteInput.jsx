import React, { useState, useRef, useEffect } from "react";
import { useNotes } from "../context/NotesContext";
import {
  MdColorLens,
  MdArchive,
  MdPushPin,
  MdAddAlert,
  MdCheckBox,
  MdBrush,
  MdImage,
} from "react-icons/md";

const COLORS = [
  { name: "Default", hex: "#202124" }, // Dark background
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

const NoteInput = () => {
  const { addNote } = useNotes();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#202124"); // Default to Dark BG
  const [isPinned, setIsPinned] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [reminder, setReminder] = useState("");
  /* ... existing state ... */
  const [showReminderInput, setShowReminderInput] = useState(false);
  const [image, setImage] = useState(null); // State for image

  const formRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for file input

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    if (title.trim() || content.trim() || image) {
      // Check for image too
      addNote({
        title,
        content,
        color: color === "#202124" ? "#202124" : color,
        isPinned,
        reminder,
        image, // Add image to payload
      });
    }
    // Reset
    setTitle("");
    setContent("");
    setColor("#202124");
    setIsPinned(false);
    setIsExpanded(false);
    setShowColorPicker(false);
    setReminder("");
    setShowReminderInput(false);
    setImage(null); // Reset image
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content, isExpanded]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (isExpanded) {
          handleClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, title, content, color, isPinned, reminder]); // Dep array important to capture latest state

  return (
    <div className="note-input-container">
      <div
        className={`note-input-card ${isExpanded ? "expanded" : "collapsed"}`}
        ref={formRef}
        style={{ backgroundColor: color }}
        onClick={() => {
          if (!isExpanded) setIsExpanded(true);
        }}
      >
        {!isExpanded ? (
          /* COLLAPSED VIEW */
          <div className="collapsed-view">
            <span className="collapsed-placeholder">Take a note...</span>
            <div className="collapsed-icons">
              <button className="icon-btn" title="New List">
                <MdCheckBox size={20} />
              </button>
              <button className="icon-btn" title="New Note with Drawing">
                <MdBrush size={20} />
              </button>
            </div>
          </div>
        ) : (
          /* EXPANDED VIEW */
          <div className="expanded-view">
            <div className="note-input-header">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="note-title-input"
              />
              <button
                className={`icon-btn small pin-btn ${isPinned ? "active" : ""}`}
                onClick={() => setIsPinned(!isPinned)}
                title="Pin note"
              >
                <MdPushPin size={20} />
              </button>
            </div>

            {image && (
              <div className="note-image-preview">
                <img src={image} alt="Note attachment" />
                <button
                  className="remove-image-btn"
                  onClick={() => setImage(null)}
                  title="Remove image"
                >
                  &times;
                </button>
              </div>
            )}

            <textarea
              ref={textareaRef}
              placeholder="Take a note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="note-content-input"
              rows={1}
            />

            <div className="note-input-footer">
              <div className="input-tools">
                <div
                  className="reminder-wrapper"
                  style={{ position: "relative" }}
                >
                  <button
                    className={`icon-btn small ${reminder ? "active" : ""}`}
                    onClick={() => setShowReminderInput(!showReminderInput)}
                    title="Remind me"
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
                  {/* ... color picker JSX ... */}
                  {showColorPicker && (
                    <div className="color-palette">
                      {COLORS.map((c) => (
                        <button
                          key={c.name}
                          className="color-circle"
                          style={{
                            backgroundColor: c.hex,
                            border:
                              color === c.hex
                                ? "2px solid #fff"
                                : "1px solid transparent",
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

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

                <button className="icon-btn small" title="Archive">
                  <MdArchive size={18} />
                </button>
              </div>

              <button
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .note-input-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin: 32px 0;
          padding: 0 16px; 
          box-sizing: border-box;
        }
        @media (max-width: 600px) {
            .note-input-container {
                margin: 16px 0;
                padding: 0 8px;
            }
        }
        .note-input-card {
          width: 100%;
          max-width: 600px;
          background: #202124;
          border-radius: 8px;
          border: 1px solid #5f6368; 
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.6), 0 2px 6px 2px rgba(0,0,0,0.3);
          position: relative;
          transition: all 0.2s ease-in-out;
        }
        /* Collapsed View Styles */
        .collapsed-view {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            cursor: text;
        }
        .collapsed-placeholder {
            font-size: 16px;
            font-weight: 500;
            color: #9aa0a6;
        }
        .collapsed-icons {
            display: flex;
            gap: 12px;
        }

        /* Expanded View Styles */
        .expanded-view {
            display: flex;
            flex-direction: column;
        }

        .note-input-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 12px 16px 0 16px;
        }
        .note-title-input {
           flex: 1;
           font-weight: 500;
           font-size: 16px;
           color: #ffffff; 
           padding: 10px 0;
           margin-bottom: 8px;
           border: none;
           background: transparent;
           outline: none;
        }
        .note-title-input::placeholder {
            color: #9aa0a6;
        }
        .note-content-input {
          width: 100%;
          padding: 0 16px 12px 16px; 
          font-size: 14px; 
          color: #ffffff; 
          resize: none;
          min-height: 46px; 
          border: none;
          background: transparent; 
          line-height: 1.5;
          outline: none;
        }
        .note-content-input::placeholder {
            color: #9aa0a6;
        }
        .note-input-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 16px 12px 16px;
          flex-wrap: wrap; /* Allow wrapping if absolutely necessary */
          gap: 8px;
        }
        .input-tools {
            display: flex;
            flex-direction: row;
            gap: 4px;
            align-items: center;
            /* Allow scrolling on very narrow screens instead of breaking */
            overflow-x: auto;
            max-width: 100%;
            scrollbar-width: none; /* Firefox */
        }
        .input-tools::-webkit-scrollbar {
            display: none; /* Chrome/Safari */
        }
        
        .close-btn {
          font-weight: 500;
          color: #ffffff; 
          padding: 8px 24px;
          border-radius: 4px;
          font-size: 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }
        .close-btn:hover {
          background-color: rgba(255,255,255,0.1); 
        }
        .icon-btn {
          color: #9aa0a6;
          border-radius: 50%;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          background: transparent;
          border: none;
          cursor: pointer;
          flex-shrink: 0; /* Prevent icons from shrinking */
        }
        .icon-btn:hover {
           background-color: rgba(255,255,255,0.1);
           color: #ffffff;
        }
        .icon-btn.small {
          width: 32px;
          height: 32px;
          padding: 6px;
        }
        .icon-btn.active {
            color: #ffffff;
        }
        
        .color-palette {
          position: absolute;
          top: -110px; 
          left: 0;
          background: #202124;
          border: 1px solid #5f6368;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.6), 0 2px 6px 2px rgba(0,0,0,0.3);
          padding: 8px;
          border-radius: 4px;
          display: flex;
          gap: 4px;
          width: 156px;
          flex-wrap: wrap;
          z-index: 20;
        }
        .color-circle {
           width: 25px;
           height: 25px;
           border-radius: 50%;
           cursor: pointer;
           background-color: transparent;
           border: 1px solid transparent;
        }
        .color-circle:hover {
           border-color: #e8eaed !important;
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
        .note-image-preview {
            position: relative;
            padding: 0 16px; 
            margin-bottom: 8px;
        }
        .note-image-preview img {
            max-width: 100%;
            max-height: 300px;
            border-radius: 4px;
            object-fit: contain;
        }
        .remove-image-btn {
            position: absolute;
            bottom: 8px;
            right: 24px;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            border: none;
            border-radius: 4px;
            width: 28px;
            height: 28px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        .remove-image-btn:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        
        @media (max-width: 600px) {
            .note-input-footer {
                padding: 4px 8px 8px 8px;
            }
            .close-btn {
                padding: 6px 16px;
            }
        }
      `}</style>
    </div>
  );
};

export default NoteInput;
