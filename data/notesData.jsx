import SQLite from 'react-native-sqlite-storage'

const db = SQLite.openDatabase(
    {
        name: 'IdeaCloudDB',
        location: 'default',
    },
    () => {},
)

export const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                note TEXT,
                category TEXT,
                isArchived INTEGER DEFAULT 0 -- Новий стовпчик
            )`,
            [],
            () => {
                console.log("Table created");
            },
            error => {
                console.log('ERROR' + error.message);
            }
        );
        
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE
            )`,
            [],
            () => {
                console.log("Categories table created");
            },
            error => {
                console.log('ERROR' + error.message);
            }
        );
    });
}
export const archiveNote = (id, isArchived) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE notes SET isArchived = ? WHERE id = ?`,
                [isArchived ? 0 : 1, id],
                () => {
                    console.log(isArchived ? "Note unarchived" : "Note archived");
                    resolve();
                },
                error => {
                    console.log("Error updating note " + error.message);
                    reject(error);
                }
            );
        });
    });
};


export const addCategory = (name) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO categories (name) VALUES (?)`,
                [name],
                () => {
                    console.log("Category added");
                    resolve();
                },
                error => {
                    console.log("Error adding category " + error.message);
                    reject(error);
                }
            )
        })
    });
};

export const updateCategory = (oldCategory, newCategory) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE categories SET name = ? WHERE name = ?`,
                [newCategory, oldCategory],
                () => resolve(),
                error => reject(error)
              );
            });
          });
        };
        
export const deleteCategory = (category) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
        txn.executeSql(
            `DELETE FROM categories WHERE name = ?`,
            [category],
            () => resolve(),
            error => reject(error)
        );
        });
    });
    };
export const getCategories = (setCategories) => {
    db.transaction(txn => {
        txn.executeSql(
            `SELECT * FROM categories`,
            [],
            (tx, results) => {
                let categories = [];
                for (let i = 0; i < results.rows.length; i++) {
                    let row = results.rows.item(i);
                    categories.push(row.name);
                }
                setCategories(categories);
            }
        );
    });
};


export const addNotes = (name, note, category) => {
    return new Promise((resolve,reject) => {
        console.log(`Adding note: ${name}, ${note}, ${category}`);
        db.transaction(txn => {
            txn.executeSql(
                `INSERT into notes(name, note, category) VALUES (?, ?, ?)`,
                [name,note,category],
                () => {
                    console.log("Note added");
                    resolve();
                },
                error => {
                    console.log("Error adding note " + error.message);
                    reject(error);
                }
            )
        })
    })
}
export const updateDatabase = (id, name, note, category) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE notes SET name = ?, note = ?, category = ? WHERE id = ?`,
                [name, note, category, id],
                () => {
                    console.log("Note updated successfully");
                    resolve();
                },
                error => {
                    console.log("Error updating note " + error.message);
                    reject(error);
                }
            );
        });
    });
};

export const getNotes = (setNotes) => {
    db.transaction(txn => {
        txn.executeSql(
            `SELECT * FROM notes WHERE isArchived = 0`,  
            [],
            (tx, results) => {
                let notes = [];
                for (let i = 0; i < results.rows.length; i++) {
                    let row = results.rows.item(i);
                    notes.push({
                        id: row.id,
                        name: row.name,
                        note: row.note,
                        category: row.category,
                        isArchived: row.isArchived
                    });
                }
                setNotes(notes);
            },
            error => {
                console.log("Error fetching notes " + error.message);
            }
        );
    });
};
export const getArchivedNotes = (setArchivedNotes) => {
    db.transaction(txn => {
        txn.executeSql(
            `SELECT * FROM notes WHERE isArchived = 1`,  
            [],
            (tx, results) => {
                let archivedNotes = [];
                for (let i = 0; i < results.rows.length; i++) {
                    let row = results.rows.item(i);
                    archivedNotes.push({
                        id: row.id,
                        name: row.name,
                        note: row.note,
                        category: row.category,
                        isArchived: row.isArchived
                    });
                }
                setArchivedNotes(archivedNotes);
            },
            error => {
                console.log("Error fetching archived notes " + error.message);
            }
        );
    });
};

  export const deleteNote = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM notes WHERE id = ?`,
          [id],
          () => {
            console.log("Note deleted successfully");
            resolve();
          },
          error => {
            console.log("Error deleting note " + error.message);
            reject(error);
          }
        );
      });
    });
  };
 