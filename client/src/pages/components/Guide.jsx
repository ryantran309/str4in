import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import "./utils.css";
import "./Guide.css";

function GuideComponent({ guide, index, toggleAnswerQuestion }) {
  return (
    <div
      className={"guide " + (guide.open ? "open" : "")}
      key={index}
      onClick={() => toggleAnswerQuestion(index)}
      style={{ animation: "2s emergeAnimation ease-in-out" }}
    >
      <div
        className="guide-question"
        style={{
          backgroundColor: `${guide.background}`,
          color: "#fff",
          animation: "2s emergeAnimation ease-in-out",
        }}
      >
        <span
          className="guide-question-icon"
          style={{ animation: "2s emergeAnimation ease-in-out" }}
        >
          <BsPlusLg />
        </span>
        <span
          className="guide-question-text"
          style={{ animation: "2s emergeAnimation ease-in-out" }}
        >
          {guide.question}
        </span>
      </div>
      <div className="guide-answer">
        <span className="guide-answer-icon">
          <BiMinus />
        </span>
        <span className="guide-answer-text">{guide.answer}</span>
      </div>
    </div>
  );
}

export default GuideComponent;
