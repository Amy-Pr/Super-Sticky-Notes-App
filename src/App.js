import React, { Component } from "react";
import Header from "./Header.js";
import NoteList from "./NoteList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
      //This data was only for my static model. Replaced by blank note object above.
      //{
      //id: 0,
      //title: "eat",
      // description: "reese peanut butter cups",
      //doesMatchSearch: true
      //},
      //{
      //id: 1,
      // title: "sleep",
      //description: "eight hours",
      // doesMatchSearch: true
      // },
      // {
      // id: 2,
      // title: "code",
      // description: "build an awesome ui",
      // doesMatchSearch: true
      // }
    ],
    searchText: ""
  };

  componentDidMount() {
    const savedNotesString = localStorage.getItem("savedNotes");
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      //console.log(savedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  componentDidUpdate() {
    const savedNotesString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };

    const newNoteArray = [newNote, ...this.state.notes];
    this.setState({ notes: newNoteArray });
    console.log(newNoteArray);
  };

  removeNote = (clickedNote) => {
    const filterCallback = (note) => note.id !== clickedNote; //Remember no brackets in ES6 for 1 expression function
    const updatedNotes = this.state.notes.filter(filterCallback);
    this.setState({ notes: updatedNotes });
  };

  //If I wrote the callback in ES5:
  //function filterCallback (note) {
  //return note.id !== clickedNote;
  //};

  onType = (editMeId, updatedKey, updatedValue) => {
    /* this event handler updates sticky note text fields
      - editMeId: the id of the note that the user typed in
      - updatedKey: which field was edited? 'title' or 'description'
      - updatedValue: new value of edited field */
    const updateIdMatch = (note) => {
      //This function is looking for the note with the *change* the event listener is listening for
      if (note.id !== editMeId) {
        //If this isn't the note with the change
        return note; //then give me the note (stays in the array when mapped over later)
      } else {
        //If this is the note with the change
        if (updatedKey === "title") {
          //and if the key is "title" (specified in Note Component)
          note.title = updatedValue; // then update the value (the value is specified in Note Component)
          return note; //and give me the note
        } else {
          //if the key is not "title"
          note.description = updatedValue; //then update the description value
          return note; //and give me the note
        }
      }
    };
    const updatedNotes = this.state.notes.map(updateIdMatch); //for each object of notes array, run it through the updateIdMatch function, and build a new array made up of the return values of that function
    this.setState({ notes: updatedNotes });
  };

  onSearch = (e) => {
    /* toggle the doesMatchSearch boolean value of each sticky
    note when the user types in the search field.
    set the doesMatchSearch value to true for a sticky note if
    it's title or description matches the search string. */
    const searchText = e.target.value.toLowerCase();

    const matchSearch = (note) => {
      //alternative, can lose this function declaration and go straight to mapping as a function: const updatedNotes = this.state.notes.map((note) => {
      const title = note.title.toLowerCase();
      const description = note.description.toLowerCase();
      const titleMatch = title.includes(searchText);
      const descriptionMatch = description.includes(searchText);
      //const hasMatch = titleMatch || descriptionMatch; //I don't know what this is.

      if (!searchText) {
        /* If the search field is empty, then
      we set the doesMatchSearch value for every note to true. */
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
    const updatedNotes = this.state.notes.map(matchSearch);
    this.setState({
      searchText: searchText, //setting this to the variable above (e.target.value) which corresponds to the value in the input element in Header.
      notes: updatedNotes
    });
  };

  render() {
    return (
      <div>
        {/*The addNoteProps attribute is important for the new note to render into JSX*/}
        <Header
          searchTextProps={this.state.searchText}
          addNoteProps={this.addNote}
          onSearchProps={this.onSearch}
        />

        {/*The ontType prop is being passed from the update functions in Note Component*/}
        <NoteList
          notesProps={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
