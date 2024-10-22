import React from "react";
import Modal from "react-modal";

import { AddEditNotes } from "../pages";

const AddEditNotesModal = ({ openAddEditModal, setOpenAddEditModal, fetchNotes }) => {
  const handleCloseAddEditNotesModal = () => {
    setOpenAddEditModal({
      isShown: false,
      type: "add",
      data: null,
    });
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={openAddEditModal.isShown}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
      contentLabel=""
      className="add-edit-notes__showcase"
    >
      <AddEditNotes
        noteDetails={openAddEditModal.data}
        type={openAddEditModal.type}
        fetchNotes={fetchNotes}
        onClose={() => handleCloseAddEditNotesModal()}
      />
    </Modal>
  );
};

export default AddEditNotesModal;
