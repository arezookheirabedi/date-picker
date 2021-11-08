import React from "react";

interface IProp {
  goToSlide: (v: number) => void;
  slides : any ,
  currentSlide : any
}

const Dots : React.FC<IProp> = ({ slides = [], currentSlide = 0, goToSlide }) => {
  return (
    <div className="slider__buttons two u-margin-top-big u-margin-bottom-medium" style={{ direction : 'ltr'}}>
      {slides.length &&
      slides.map((s : any, i : any) => {
        return (
          <div
            key={i}
            onClick={() => goToSlide(i)}
            className={`dot ${i === currentSlide ? "dot-active" : ""}`}
          />
        );
      })}
    </div>
  );
}

export default Dots;
