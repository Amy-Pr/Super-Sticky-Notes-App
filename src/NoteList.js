import React from "react";
import Note from "./Note.js";

//Added props as a parameter and made it a function with the bracket.
const NoteList = ({onType, removeNote, notesProps}) => {
  //renderNote is a callback function. "noteObj" refers to each object in the array "notes." We assigned "key" and "note" attributes in the component. Can call these anything, but need to match the prop passed from the Note component for it to work.
  const renderNote = (noteObj) => (
    <Note
      note={noteObj}
      key={noteObj.id}
      onType={onType}
      removeNote={removeNote}
    />
  );

  //We took the "notes" array (passed as props from App) and produced a new array "noteElements" built of the
  //values returned by calling renderNote callback function (above) on each of the original array items.
  //We got this: const noteElements = props.notesProps.map(renderNote);

  //Now we are writing a function to filter the notes array to just include search matches (doesMatchSearch) that are true and saving it to a new array.
  const searchMatches = notesProps.filter(
    (noteObj) => noteObj.doesMatchSearch
  );
  //now rewrite our noteElements array to map over searchMatches instead.
  const noteElements = searchMatches.map(renderNote);

  return (
    <ul className="notes-list">
      {/*<Note />*/}
      {/*<Note />*/}
      {/*<Note />*/}
      {noteElements}
      {/*Individual <Note/> components replaced by the brand new array*/}
    </ul>
  );
};

export default NoteList;
