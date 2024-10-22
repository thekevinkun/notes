import React from "react";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";

import { AuthContext } from "../context/AuthContext";

const SearchBar = ({ value, onChange, onClearSearch }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="nav__search-bar">
      <input
        type="text"
        placeholder="Search Notes"
        className="input input-search"
        value={value}
        onChange={onChange}
        disabled={!user ? true : false}
      />

      {value && (
        <IoMdClose className="clear-search-icon" onClick={onClearSearch} />
      )}
    </div>
  );
};

export default SearchBar;
