import React from "react";
import { MdAdd } from "react-icons/md";

const CreateNoteButton = ({ setOpenAddEditModal }) => {
  return (
    <div className="create-notes__wrapper">
      <button
        className="create-notes-btn"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="add-icon" />
      </button>
    </div>
  );
};

export default CreateNoteButton;
