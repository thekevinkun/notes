import React from "react";
import { useContext } from "react";
import { enqueueSnackbar } from "notistack";

import { AuthContext } from "../context/AuthContext";

const ConfirmDelete = ({ noteDetails, fetchNotes, onClose }) => {
  const { user } = useContext(AuthContext);

  // HANDLER: DELETE a Note
  const handleDeleteNote = async () => {
    if (!user) {
      enqueueSnackbar("You must be logged in", { variant: "error" });
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/notes/${noteDetails?._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    // const deletedNote = await response.json();

    if (!response.ok) {
      onClose();
      enqueueSnackbar("Failed to Delete Note", { variant: "error" });
    }

    if (response.ok) {
      onClose();
      enqueueSnackbar("Note Deleted Successfully", { variant: "success" });

      await fetchNotes();
    }
  };

  return (
    <div className="confirm-delete">
      <h3>Are you sure?</h3>

      <div className="confirm-delete__details">
        <p>
          You will delete <span>Note: {noteDetails?.title}</span>
        </p>
      </div>

      <div className="confirm-delete__btn">
        <button className="btn btn-gray" onClick={onClose}>
          CANCEL
        </button>
        <button className="btn btn-danger" onClick={handleDeleteNote}>
          DELETE NOTE
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
