import React, { useState } from "react";

import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleTagInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag != tagToRemove));
  };

  return (
    <div className="tag-input">
      {tags.length > 0 && (
        <div className="tag-input__list">
          {tags.map((tag, index) => (
            <span key={index}>
              #{tag.toLowerCase()}
              <button
                className="btn-remove-tag-input"
                onClick={() => handleRemoveTag(tag)}
              >
                <MdClose className="remove-tag-icon" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="tag-input__field">
        <input
          type="text"
          value={inputValue}
          onChange={handleTagInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className="btn-add-tag-input" onClick={() => addNewTag()}>
          <MdAdd className="add-tag-icon" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
