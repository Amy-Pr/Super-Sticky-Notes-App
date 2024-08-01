import React from "react";

const Header = ({addNoteProps, searchTextProps, onSearchProps}) => (
  <header>
    <h1 className="app-header__title">Super Sticky Notes</h1>
    <aside className="app-header__controls">
      <button className="add-new" onClick={addNoteProps}>
        + New Note
      </button>
      <input
        type=""
        className="search"
        placeholder="Type here to search..."
        value={searchTextProps}
        onChange={onSearchProps}
      />
    </aside>
  </header>
);

export default Header;
