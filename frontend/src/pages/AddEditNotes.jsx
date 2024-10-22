import React from "react";
import { useState, useContext } from "react";
import moment from "moment";

import { enqueueSnackbar } from "notistack";

import { MdClose } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";

import { TagInput } from "../components";

import { AuthContext } from "../context/AuthContext";
import { NotesContext } from "../context/NotesContext";

const AddEditNotes = ({ noteDetails, type, fetchNotes, onClose }) => {
  const { user } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(NotesContext);

  const [title, setTitle] = useState(noteDetails?.title ? noteDetails.title : "");
  const [date, setDate] = useState(noteDetails?.date ? moment(noteDetails.date).format("YYYY-MM-DD") : "");
  const [time, setTime] = useState(noteDetails?.time ? noteDetails.time : "");
  const [description, setDescription] = useState(noteDetails?.description ? noteDetails.description : "");
  const [tags, setTags] = useState(noteDetails?.tags ? noteDetails.tags : []);

  const [emptyField, setEmptyField] = useState(null);
  const [error, setError] = useState(null);

  // HANDLER: ADD New Note
  const handleAddNote = async () => {
    if (!user) {
      setError("You must be logged in to create note");
      return;
    }

    setIsLoading(true);

    const note = { title, date, time, description, tags };

    const response = await fetch("http://localhost:4000/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const addedNote = await response.json();

    if (!response.ok) {
      console.log(addedNote);
      setError(addedNote.error);
      setEmptyField(addedNote.emptyField);
    }

    if (response.ok) {
      setError(null);
      setEmptyField(null);
      onClose();
      enqueueSnackbar("Note Created Successfully", { variant: "success" });

      await fetchNotes();
    }

    setIsLoading(false);
  };

  // HANDLER: UPDATE an edit Note
  const handleEditNote = async () => {
    if (!user) {
      setError("You must be logged in to continue edit note");
      return;
    }

    setIsLoading(true);

    const note = { title, date, time, description, tags };

    const response = await fetch(
      `http://localhost:4000/api/notes/${noteDetails._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const editedNote = await response.json();

    if (!response.ok) {
      setError(editedNote.error);
      setEmptyField(editedNote.emptyField);
    }

    if (response.ok) {
      setError(null);
      setEmptyField(null);
      onClose();
      enqueueSnackbar("Note Edited Successfully", { variant: "success" });

      await fetchNotes();
    }

    setIsLoading(false);
  };

  return (
    <div className="add-edit-notes">
      <button className="btn-add-edit-close" onClick={onClose}>
        <MdClose className="add-edit-close-icon" />
      </button>

      <div className="add-edit-notes__field">
        <label>TITLE</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => {
            setError(null);
            setEmptyField(null);
            setTitle(target.value);
          }}
          className={`${emptyField === "title" && "input-error"}`}
        />
      </div>

      <div className="add-edit-notes__field">
        <label>DATE</label>

        <div className="input-date__field">
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />

          <input
            type="time"
            value={time}
            onChange={({ target }) => setTime(target.value)}
          />
        </div>
      </div>

      <div className="add-edit-notes__field">
        <label>DESCRIPTION</label>
        <textarea
          type="text"
          rows={7}
          value={description}
          onChange={({ target }) => {
            setError(null);
            setEmptyField(null);
            setDescription(target.value);
          }}
          className={`${emptyField === "description" && "input-error"}`}
        />
      </div>

      <div className="add-edit-notes__field">
        <label>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <div className="error-notes">
          <IoMdAlert className="error-alert-icon" />
          <h4>{error}</h4>
        </div>
      )}

      <button
        className="btn btn-full"
        onClick={ type === "add" ? handleAddNote : type === "edit" && handleEditNote }
        disabled={ isLoading ? true : false}
      >
        {type === "add" ? "ADD" : type === "edit" && "UPDATE"}
      </button>
    </div>
  );
};

export default AddEditNotes;
