import React from "react";

import Svg from "../Svg";

interface ProgressBarProps {
  percentage: number;
  text: string;
  p_id: number;
}

// eslint-disable-next-line
const ProgressBar: React.FC<ProgressBarProps> = ({percentage, text, p_id}) => {
  const {ProgressBarCircle3Svg} = Svg;
  return (
    <div className="progress-box">
      <div className="progress-bar">
        <ProgressBarCircle3Svg indexId={p_id}/>
        <div className="progress-bar__text" data-progress="0">
          0%
        </div>
      </div>
      <h6 className="u-fade-in-1">{text}</h6>
    </div>
  );
};

export default ProgressBar;
