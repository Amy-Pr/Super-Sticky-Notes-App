import React from "react";

const Header = (props) => (
  <header>
    <h1 className="app-header__title">Super Sticky Notes</h1>
    <aside className="app-header__controls">
      <button className="add-new" onClick={props.addNoteProps}>
        + New Note
      </button>
      <input
        type=""
        className="search"
        placeholder="Type here to search..."
        value={props.searchTextProps}
        onChange={props.onSearchProps}
      />
    </aside>
  </header>
);

export default Header;
