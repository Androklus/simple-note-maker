const fs = require('fs');
const NOTES_STORAGE = 'notes.json';

const fetchNotes = () => {
  try {
    const noteString = fs.readFileSync(NOTES_STORAGE);
    return JSON.parse(noteString);
    } catch(e) {
      return []
    }
};

const saveNotes = notes => {
  fs.writeFileSync(NOTES_STORAGE, JSON.stringify(notes))
};

const addNote = (title, body) => {
  // console.log('Adding new note')
  // console.log(`title: ${title}`)
  // console.log(`body: ${body}`)
  let notes = fetchNotes();
  const note = {
    title: title,
    body: body
  };

  const doubles = notes.filter((note) => {
    return note.title === title
  });

  if (doubles.length === 0 && title.trim().length > 0) {
    notes.unshift(note);
    saveNotes(notes);
    return note
  }
};

const removeNote = (title, body) => {
  //console.log(`Removing note: ${title}`)
    let notes = fetchNotes();
    const note = {
        title: title,
        body: body
    };

    const doubles = notes.filter((note) => {
        return note.title === title
    });

    if (doubles.length > 0) {
      for (let i in notes) {
        if (note.title === notes[i].title) {
          notes.splice(i, 1);
        }
      }
      saveNotes(notes);
        return note
    }
};

const getNote = () => {
  //console.log(`Getting note: ${title}`)
    let notes = fetchNotes();
    return notes
};


module.exports = {
  addNote,
  fetchNotes,
  getNote,
  removeNote
};
