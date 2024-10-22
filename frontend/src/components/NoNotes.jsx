import React from "react";

const NoNotes = ({ image, alt, message }) => {
  return (
    <div className="no-notes section__padding">
      <div className="no-notes-img">
        <img src={image} alt={alt} />
      </div>

      {message}
    </div>
  );
};

export default NoNotes;
