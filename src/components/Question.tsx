import React from "react";

const Question = ({ children }) => {
  return (
    <div className="v-card mx-auto">
      <div className="v-card-title">{children.question}</div>
      <div className="v-card-text headline font-weight-bold text-center">
        {children}
      </div>
      <div className="v-card-text text-center">{children.reponse}</div>
    </div>
  );
};

export default Question;
