import React from "react";
import { LoadingSpinner } from "../assets";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-spinner-img">
        <img src={LoadingSpinner} alt="Loading Spinner" />
      </div>
    </div>
  );
};

export default Loading;
