import React from "react";

interface ProgressBarCircleSvgProps {
  indexId: number;
}

const ProgressBarCircle3Svg: React.FC<ProgressBarCircleSvgProps> = ({indexId}) => {
  return (
    <svg
      className={`progress-bar__circle progress-bar__circle--${indexId}`}
      width="130px"
      height="130px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="progress-bar__circle-back" cx="65" cy="65" r="60" />
      <circle
        className="progress-bar__circle-prog"
        cx="65"
        cy="65"
        r="60"
        strokeDasharray="46.4, 999"
      />
    </svg>
  );
};

export default ProgressBarCircle3Svg;
