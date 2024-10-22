import React from "react";
import { useState, useContext } from "react";
import { enqueueSnackbar } from "notistack";

import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import { TiPin } from "react-icons/ti";

import { AuthContext } from "../context/AuthContext";

const NoteCard = ({ id, title, date, time, description, tags,
  isPinned, handleClickEdit, handleClickDelete, fetchNotes }) => {
  
  const { user } = useContext(AuthContext);

  const [isNotePinned, setIsNotePinned ] = useState(isPinned ? true : false)
  
  const [ariaDisable, setAriaDisable] = useState("false");
  const [tabIndex, setTabIndex] = useState("0")

  const handlePinNote = async () => {
    if (!user) {
      enqueueSnackbar("You must be logged in to pin this note", { variant: "error" });
      return;
    }

    setAriaDisable("true");
    setTabIndex("-1");
  
    const note = { isPinned: !isNotePinned };

    const response = await fetch(
      `http://localhost:4000/api/notes/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const pinnedNote = await response.json();

    if (!response.ok) {
      enqueueSnackbar(pinnedNote.error, { variant: "error" });
    }

    if (response.ok) {
      setIsNotePinned((prev) => !prev);
    }

    setAriaDisable("false");
    setTabIndex("0");
    await fetchNotes();
  };

  return (
    <div className="note__card glassmorphism">
      <div className="note__card--top-section">
        <div className="note__card--title-date">
          <h3>{title}</h3>

          <div className="note-date">
            <span>{date}</span>
            <span>{time}</span>
          </div>
        </div>

        { !isNotePinned ?
            <MdOutlinePushPin
              className="note__card--icon icon-pin"
              tabIndex={tabIndex} aria-disabled={ariaDisable}
              onClick={() => handlePinNote()}
              title="Pin note?"
            />
          :
            <TiPin 
              className="note__card--icon pinned-note-icon"
              tabIndex={tabIndex} aria-disabled={ariaDisable}
              onClick={() => handlePinNote()}
              title="Note pinned!"
            />
        }
      </div>

      <div className="note__card--description">
        <p>{description}</p>
      </div>

      <div className="note__card--bottom-section">
        <div className="note__card--tags">
          {tags.map((tag, i) => (
            <p key={tag}>
              #{tag}
              {i < tags.length - 1 && ", "}
            </p>
          ))}
        </div>

        <div className="note__card--edit-delete">
          <MdCreate
            className="note__card--icon icon-edit"
            onClick={handleClickEdit}
            title="Edit note?"
          />
          <MdDelete
            className="note__card--icon icon-delete"
            onClick={handleClickDelete}
            title="Delete note?"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
