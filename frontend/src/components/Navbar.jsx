import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchBar, ProfileSide } from "../components";

import { MdMenu } from "react-icons/md";

import { AuthContext } from "../context/AuthContext";
import { NotesContext } from "../context/NotesContext";

const Navbar = ({ setError, fetchNotes }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { setNotes, setIsLoading, setIsSearchFound } = useContext(NotesContext);

  const [searchQuery, setSearchQuery] = useState("");

  const handleOnSearchChange = async (query) => {
    if (!user) {
      setError(
        <p>You must be logged in to continue to search</p>
      );
      return;
    }

    if (query === "") {
      onClearSearch();
    } else {
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:4000/api/notes/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const searchedNote = await response.json();

      if (!response.ok) {
        setError(
          <p>{searchedNote.error}</p>
        );
      }

      if (response.ok) {
        if (searchedNote.length === 0) setIsSearchFound(false);
        else setIsSearchFound(true);

        setNotes(searchedNote);
      }

      setIsLoading(false);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    fetchNotes();

    return;
  };

  const onLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <nav className={`${user ? "nav" : "nav-out"} app__padding`}>
        <div className="nav__title">
          <Link to="/">Notes</Link>
        </div>

        {user && (
          <>
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => {
                setSearchQuery(target.value)
                handleOnSearchChange(target.value)
              }}
              onClearSearch={onClearSearch}
            />

            <ProfileSide name={user.name} onLogout={onLogout} />
          </>
        )}
      </nav>
      
      {user &&
        <nav className="nav__smallscreen app__padding">
          <div className="nav__smallside">
            <MdMenu 
              className="nav__menu"
              onClick={() => setToggleMenu((prev) => !prev)}
            />

            <div className="nav__title">
              <Link to="/">Notes</Link>
            </div>
          </div>
          
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value)
              handleOnSearchChange(target.value)
            }}
            onClearSearch={onClearSearch}
          />

          {toggleMenu ?
            <div className="nav__menu-content">
              <ProfileSide name={user.name} onLogout={onLogout} />
            </div>
          :
            null
          }
        </nav>
      }
    </>
  );
};

export default Navbar;
