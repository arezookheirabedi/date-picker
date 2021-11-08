import React, { useState, useRef, useEffect } from "react";


import Svg from "../Svg"

interface FaqBoxProps {
  ask: string;
  question: string;
  index: any;
  open?: boolean;
  onSetIndex: any;
}
const FaqBox: React.FC<FaqBoxProps> = ({ open, ask, question, index, onSetIndex }) => {
  const [innerOpen, setInnerOpen] = useState(false);
  const [whatHeight, setWhatHeight] = useState(open ? "19.4rem" : "0");
  const curreneHeight: any = useRef<HTMLHeadingElement>(null);

  // svg images
  const {CloseIcon,OpenIcon} = Svg;

  useEffect(() => {
    setInnerOpen(!open);
  }, [open]);

  // console.log(index + "  INNER OPEN :  =>  " + innerOpen);
  const checkIsOpen = () => {
    setWhatHeight(
      open === true && innerOpen === false ? "0px" : `${curreneHeight.current.scrollHeight}px`
    );
    setInnerOpen(!innerOpen);
    onSetIndex(index);
  };

  return (
    <div className="faq-box__card">
      <p className="faq-box__card--ask">
        <span>
          <i/>
          {ask}
        </span>
        <i className="faq-box__card--ask-icon" onClick={checkIsOpen}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {innerOpen ? <OpenIcon /> : open ? <CloseIcon /> : <OpenIcon />}
        </i>
      </p>
      {/* ${!isOpen ? "d-none" : ""} */}
      <div
        ref={curreneHeight}
        style={{
          maxHeight: `${!open ? 0 : whatHeight}`,
          overflow: "hidden",
          transition: `all .4s ease`,
        }}
      >
        <div className="faq-box__card--answer">
          <p>{question}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqBox;
