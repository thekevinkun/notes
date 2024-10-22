import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, emptyField }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div
      className={`input-password-box ${
        emptyField === "password" && "input-error"
      }`}
    >
      <input
        type={!isShowPassword ? "password" : "text"}
        placeholder="Password"
        value={value}
        onChange={onChange}
        className="input-password"
      />

      {value && !isShowPassword ? (
        <FaRegEyeSlash
          className="show-password-icon"
          onClick={toggleShowPassword}
        />
      ) : value && isShowPassword ? (
        <FaRegEye className="show-password-icon" onClick={toggleShowPassword} />
      ) : (
        ""
      )}
    </div>
  );
};

export default PasswordInput;
