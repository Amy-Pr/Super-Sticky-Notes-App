import React from "react";
import Note from "./Note.js";


const NoteList = ({onType, removeNote, notesProps}) => {
  //renderNote is a callback function. "noteObj" refers to each object in the array "notes." 
  const renderNote = (noteObj) => (
    <Note
      note={noteObj}
      key={noteObj.id}
      onType={onType}
      removeNote={removeNote}
    />
  );

  
  const searchMatches = notesProps.filter(
    (noteObj) => noteObj.doesMatchSearch
  );
  const noteElements = searchMatches.map(renderNote);

  return (
    <ul className="notes-list">
      {noteElements}
    </ul>
  );
};

export default NoteList;
