import React from "react";
import moment from "moment";

import { NoteCard } from "../components";

const Notes = ({ notes, setOpenAddEditModal, setOpenConfirmDeleteModal, fetchNotes }) => {
  const handleClickEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  };

  const handleClickDelete = (noteDetails) => {
    setOpenConfirmDeleteModal({
      isShown: true,
      data: noteDetails,
    });
  };

  return (
    <section className="notes">
      <div className="notes-grid">
        {notes?.map((note) => (
          <NoteCard
            key={note._id}
            id={note._id}
            title={note.title}
            date={note.date ? moment(note.date).format("Do MMM, YYYY") : ""}
            time={note.time}
            description={note.description}
            tags={note.tags}
            isPinned={note.isPinned}
            handleClickEdit={() => handleClickEdit(note)}
            handleClickDelete={() => handleClickDelete(note)}
            fetchNotes={fetchNotes}
          />
        ))}
      </div>
    </section>
  );
};

export default Notes;
