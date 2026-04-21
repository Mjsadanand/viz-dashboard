// @ts-nocheck
import React from "react";
import "./howwedo.css";

const HowWeDo = () => {
  return (
    <div className="how-container">
      <h1 className="title">
        How We Do
        <span className="highlight">
          Things
          <svg
            className="underline"
            viewBox="0 0 200 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 15 Q 100 5 195 15"
              stroke="#6B2C6F"
              strokeWidth="4"
              fill="transparent"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>

      <svg
        className="arrow"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10 Q 180 80 150 180"
          stroke="#6B2C6F"
          strokeWidth="4"
          fill="transparent"
          strokeLinecap="round"
        />
        <polygon
          points="145,170 160,180 140,185"
          fill="#6B2C6F"
        />
      </svg>
    </div>
  );
};

export default HowWeDo;
