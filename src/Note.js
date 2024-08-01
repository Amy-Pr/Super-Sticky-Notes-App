import React from "react";

const Note = ({note, onType, removeNote}) => {
  const updateTitle = (event) => {
    const updatedValue = event.target.value; //interrogate the event (What's this event? Oh a value was typed!) and save it to a variable
    const editMeId = note.id;
    onType(editMeId, "title", updatedValue); //we just called the onType function from App and fed it specific parameters
  };

  const updateDescription = (event) => {
    const updatedValue = event.target.value;
    const editMeId = note.id;
    onType(editMeId, "description", updatedValue);
  };

  const clickDelete = () => {
    removeNote(note.id);
  };

  return (
    <li className="note">
      <input
        value={note.title} 
        type="text"
        className="note__title"
        placeholder="Title"
        onChange={updateTitle}
      />
      <textarea
        value={note.description}
        className="note__description"
        placeholder="Description..."
        onChange={updateDescription}
      />
      <span onClick={clickDelete} className="note__delete hover">
        X
      </span>
    </li>
  );
};

export default Note;
