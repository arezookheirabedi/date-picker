
import React, {useEffect, useRef, useState} from "react";
import Carousel from "react-spring-3d-carousel";
import {config} from "react-spring";
import Dots from "./Dots";

let interval: any = null;

export default function Example({time = 5000, slides: sourceSlides = []}) {
  const ref = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 1,
    showNavigation: false,
    config: config.gentle
  });

  const slides = [...sourceSlides].map((slide: any) => {
    return {
      ...slide,
      // onClick: () => setState({ ...state, goToSlide: index })
    };
  });

  const updateSlide = () => {
    // @ts-ignore
    setCurrentSlide(ref.current.state.index + 1);
  };

  useEffect(() => {
    // eslint-disable-next-line
    interval = setInterval(updateSlide, time);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setState({...state, goToSlide: currentSlide});

    // eslint-disable-next-line
  }, [currentSlide]);

  const handleClick = (v: any) => {
    clearInterval(interval);
    interval = setInterval(updateSlide, time);
    setCurrentSlide(v);
  };

  return (
    <>
      <Carousel
        // @ts-ignore
        ref={ref}
        slides={slides}
        goToSlide={state.goToSlide}
        offsetRadius={state.offsetRadius}
        showNavigation={state.showNavigation}
        animationConfig={state.config}
      />

      <Dots
        slides={slides}
        currentSlide={currentSlide >= slides.length ? 0 : currentSlide}
        goToSlide={handleClick}
      />
    </>
  );
}
