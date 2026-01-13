import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const useNotes = () => {
  return useContext(NotesContext);
};

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (user) {
      const allNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      const userNotes = allNotes.filter((note) => note.userId === user.id);
      setNotes(userNotes);
    } else {
      setNotes([]);
    }
  }, [user]);

  const saveToLocalStorage = (updatedNotes) => {
    const allNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const otherNotes = allNotes.filter((note) => note.userId !== user.id);
    const newAllNotes = [...otherNotes, ...updatedNotes];
    localStorage.setItem("notes", JSON.stringify(newAllNotes));
    setNotes(updatedNotes);
  };

  const addNote = (note) => {
    const newNote = {
      id: uuidv4(),
      userId: user.id,
      title: note.title,
      content: note.content,
      color: note.color || "#ffffff",
      isPinned: note.isPinned || false,
      reminder: note.reminder || null,
      isArchived: false,
      isDeleted: false,
      labels: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveToLocalStorage([newNote, ...notes]);
  };

  const updateNote = (id, updates) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    );
    saveToLocalStorage(updatedNotes);
  };

  const deleteNote = (id) => {
  
    updateNote(id, { isDeleted: true, isPinned: false, isArchived: false });
  };

  const permanentlyDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveToLocalStorage(updatedNotes);
  };

  const restoreNote = (id) => {
    updateNote(id, { isDeleted: false });
  };

  const archiveNote = (id) => {
    updateNote(id, { isArchived: true, isPinned: false, isDeleted: false });
  };

  const unarchiveNote = (id) => {
    updateNote(id, { isArchived: false });
  };

  const togglePin = (id) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      updateNote(id, {
        isPinned: !note.isPinned,
        isArchived: false,
        isDeleted: false,
      });
    }
  };

  const value = {
    notes,
    addNote,
    updateNote,
    deleteNote,
    permanentlyDeleteNote,
    restoreNote,
    archiveNote,
    unarchiveNote,
    togglePin,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
