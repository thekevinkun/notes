import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { NotesContext } from "../context/NotesContext";

import { Navbar, Notes, NoNotes, Loading, AddEditNotesModal, ConfirmDeleteModal, CreateNoteButton } from "../components";
import { AddNoteImg, NoNotesFound, Danger } from "../assets";

import isTokenExpired from "../utilities/helpers";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const { notes, setNotes, isLoading, setIsLoading, isSearchFound, setIsSearchFound } = useContext(NotesContext);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState({
    isShown: false,
    data: null,
  });

  
  const fetchNotes = async () => {
    if (!user) {
      setError(
        <>
          <p>Please login to see your notes.</p>
        </>
      );
      return;
    }

    if (isTokenExpired(user.token)) {
      localStorage.removeItem("user");
      setUser(null);
      setError(
        <>
          <p>Request is not authorized: Your token is expired.</p>
          <p>Please Log In again.</p>
        </>
      );
    }

    setIsSearchFound(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/notes", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.log(data.error);
        setError(
          <p>{data.error}</p>
        );
      }
  
      if (response.ok) {
        setNotes(data);
      }
    } catch (errror) {
      setError(
        <>
          <p>Failed to load your Notes.</p>
          <p>Something happen with the server. Please try again.</p> 
        </>
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar 
        setError={setError}
        fetchNotes={() => fetchNotes()}
      />

      { isLoading ? 
          <Loading />
        : error ?
          <NoNotes 
            image={Danger}
            alt="Error Icon"
            message={error}
          />
        : notes && notes.length === 0 ?
          <NoNotes 
            image={isSearchFound === false ? NoNotesFound : AddNoteImg}
            alt="Note Icon"
            message={ isSearchFound === false ? 
                <p>Sorry... notes you were looking for was not found.</p>
                : <>
                    <p>Let&apos;s write your first Note!</p>
                    <p>Click the add [+] button to create.</p>
                  </> 
            }
          />
        : <Notes 
            notes={notes}
            setOpenAddEditModal={setOpenAddEditModal}
            setOpenConfirmDeleteModal={setOpenConfirmDeleteModal}
            fetchNotes={() => fetchNotes()}
          />
      }

      <CreateNoteButton 
        setOpenAddEditModal={setOpenAddEditModal}
      />

      <AddEditNotesModal 
        openAddEditModal={openAddEditModal}
        setOpenAddEditModal={setOpenAddEditModal}
        fetchNotes={() => fetchNotes()}
      />

      <ConfirmDeleteModal
        openConfirmDeleteModal={openConfirmDeleteModal}
        setOpenConfirmDeleteModal={setOpenConfirmDeleteModal}
        fetchNotes={() => fetchNotes()}
      />
    </>
  );
};

export default Home;
