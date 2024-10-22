import React from "react";
import Modal from "react-modal";

import { ConfirmDelete } from "../pages";

const ConfirmDeleteModal = ({ openConfirmDeleteModal, setOpenConfirmDeleteModal, fetchNotes }) => {
  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal({
      isShown: false,
      data: null,
    });
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={openConfirmDeleteModal.isShown}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
      contentLabel=""
      className="confirm-delete__showcase"
    >
      <ConfirmDelete
        noteDetails={openConfirmDeleteModal.data}
        fetchNotes={fetchNotes}
        onClose={() => handleCloseConfirmDeleteModal()}
      />
    </Modal>
  );
};

export default ConfirmDeleteModal;
