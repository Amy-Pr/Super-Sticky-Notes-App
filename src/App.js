import { useState, useEffect } from "react";
import Header from "./Header.js";
import NoteList from "./NoteList.js";

const App = () => {
  
  const [state, setState] = useState({
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  });
  
/*UseEffects: Save and retrieve notes from local storage upon initializing app*/ 

  useEffect(()=> {
    const savedNotesString = localStorage.getItem("savedNotes");
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      setState({ notes: savedNotes });
    }
  }, [])
  

  useEffect(() => {
    const savedNotesString = JSON.stringify(state.notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }, [state.notes]);


 const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };

    const newNoteArray = [newNote, ...state.notes];
    setState({ notes: newNoteArray });
  };

  const removeNote = (clickedNote) => {
    const filterCallback = (note) => note.id !== clickedNote;
    const updatedNotes = state.notes.filter(filterCallback);
    setState({ notes: updatedNotes });
  };


  /* this event handler updates sticky note text fields
      - editMeId: the id of the note that the user is typing in
      - updatedKey: which field was edited? 'title' or 'description'
      - updatedValue: new value of edited field */
  const onType = (editMeId, updatedKey, updatedValue) => {
    const updateIdMatch = (note) => {
      if (note.id !== editMeId) {
        return note; 
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue; 
          return note; 
        }
      }
    };
    const updatedNotes = state.notes.map(updateIdMatch); 
    setState({ notes: updatedNotes });
  };

  const onSearch = (e) => {
    const searchText = e.target.value.toLowerCase();

    const matchSearch = (note) => {
      const title = note.title.toLowerCase();
      const description = note.description.toLowerCase();
      const titleMatch = title.includes(searchText);
      const descriptionMatch = description.includes(searchText);

      if (!searchText) {
        note.doesMatchSearch = true;
        return note;
      }
      if (!titleMatch && !descriptionMatch) {
        note.doesMatchSearch = false;
        return note;
      } else {
        note.doesMatchSearch = true;
        return note;
      }
    };
    const updatedNotes = state.notes.map(matchSearch);
    setState({
      searchText: searchText, 
      notes: updatedNotes
    });
  };


    return (
      <div>
        <Header
          searchTextProps={state.searchText}
          addNoteProps={addNote}
          onSearchProps={onSearch}
        />

        <NoteList
          notesProps={state.notes}
          onType={onType}
          removeNote={removeNote}
        />
      </div>
    );
}

export default App;
