import React, { createContext, useState, useEffect } from 'react';
import {
    createTables,
    addNotes as dbAddNotes,
    getNotes as dbGetNotes,
    getArchivedNotes as dbGetArchivedNotes, 
    getCategories as dbGetCategories,
    addCategory as dbAddCategory,
    updateCategory as dbUpdateCategory,
    deleteCategory as dbDeleteCategory,
    clearDatabase as dbClearDatabase,
    updateDatabase as dbUpdateDatabase,
    deleteNote as dbDeleteNote,
    archiveNote as dbArchiveNote,
    deleteTables 
} from '../data/notesData';

export const NotesContext = createContext();

export const NotesProvider: React.FC = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]); 
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        createTables();
        loadNotes();
        loadArchivedNotes();
        loadCategories();
    }, []);

    const loadNotes = () => {
        dbGetNotes((fetchedNotes) => {
            setNotes(fetchedNotes);
        });
    };

    const loadArchivedNotes = () => {
        dbGetArchivedNotes((fetchedArchivedNotes) => {
            setArchivedNotes(fetchedArchivedNotes);
        });
    };

    const loadCategories = () => {
        dbGetCategories((fetchedCategories) => {
            setCategories(fetchedCategories);
        });
    };

    const addNotes = (name, note, category) => {
        return dbAddNotes(name, note, category)
            .then(() => {
                loadNotes();
            })
            .catch(error => {
                console.error('Error adding note', error);
            });
    };

    const addCategory = (name) => {
        return dbAddCategory(name)
            .then(() => {
                loadCategories();
            })
            .catch(error => {
                console.error('Error adding category', error);
            });
    };

    const updateCategory = (oldCategory, newCategory) => {
        return dbUpdateCategory(oldCategory, newCategory)
            .then(() => {
                loadCategories();
            })
            .catch(error => {
                console.error('Error updating category', error);
            });
    };

    const deleteCategory = (category) => {
        return dbDeleteCategory(category)
            .then(() => {
                loadCategories();
            })
            .catch(error => {
                console.error('Error deleting category', error);
            });
    };
  
    const deleteNote = (note) => {
        return dbDeleteNote(note)
            .then(() => {
                loadNotes();
                loadArchivedNotes(); 
            })
            .catch(error => {
                console.error('Error deleting note', error);
            });
    };

    const updateDatabase = (name, note, category, id) => {
        return dbUpdateDatabase(name, note, category, id)
            .then(() => {
                loadNotes();
                loadArchivedNotes();
            })
            .catch(error => {
                console.error('Error updating notes', error);
            });
    };

    const clearDatabase = () => {
        return dbClearDatabase()
            .then(() => {
                loadNotes();
                loadArchivedNotes(); 
                loadCategories();
            })
            .catch(error => {
                console.error('Error clearing database', error);
            });
    };

    const archiveNote = (noteId, isArchived) => {
        return dbArchiveNote(noteId, isArchived)
            .then(() => {
                loadNotes();
                loadArchivedNotes(); 
            })
            .catch(error => {
                console.error('Error archiving note', error);
            });
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                archivedNotes, 
                addNotes,
                deleteNote,
                categories,
                archiveNote,
                deleteTables,
                addCategory,
                updateCategory,
                deleteCategory,
                clearDatabase,
                updateDatabase,
                getNotes: loadNotes,
                getArchivedNotes: loadArchivedNotes, 
                getCategories: loadCategories
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
