import React from "react";

import {v4 as uuidv4} from "uuid";
// normal images
import Carousel from "./Carousel";
import CitizenshipProfile from "./slider/CitizenshipProfile";
import GuildManagement from "./slider/GuildManagement";
import PassengerManagement from "./slider/PassengerManagement";
import TransportManagement from "./slider/TransportManagement";

const slides = [
  {
    key: uuidv4(),
    content: <div><GuildManagement/></div>
  },
  {
    key: uuidv4(),
    content: <div><TransportManagement/></div>
  },
  {
    key: uuidv4(),
    content: <div><PassengerManagement/></div>
  },
  {
    key: uuidv4(),
    content: <div><CitizenshipProfile/></div>
  }
];
const Slider = () => {
  // const [initialize, setInitialize] = useState(1);
  // const [render, setRender] = useState(true);
  //
  // const sliderContent: any = useRef<HTMLDivElement>(null);
  // const slider_1: any = useRef<HTMLDivElement>(null);
  // const ButtonHolder: any = useRef<HTMLUListElement>(null);
  //
  // useEffect(() => {
  //   console.log(initialize);
  //   let buttonSliderId = initialize;
  //
  //   let sliderTimer: any;
  //   let item: HTMLLIElement;
  //   let i = 1;
  //   let j = 1;
  //
  //   const sortSliderId = () => {
  //     for (item of ButtonHolder.current.children) {
  //       item.setAttribute("data-slider-id", `${i}`);
  //       i++;
  //     }
  //     for (item of sliderContent.current.children) {
  //       item.setAttribute("data-slider-id", `${j}`);
  //       j++;
  //     }
  //   };
  //
  //   sortSliderId();
  //
  //   let timer = 0;
  //   const myLoop = () => {
  //     sliderTimer = setTimeout(() => {
  //       timer = 4000;
  //       if (buttonSliderId > 4) {
  //         i = 1;
  //         j = 1;
  //         sortSliderId();
  //         buttonSliderId = 1;
  //       }
  //       let currentActive = ButtonHolder.current.querySelector(
  //         "[data-slider-id='" + buttonSliderId + "']"
  //       );
  //
  //       let item: HTMLLIElement;
  //       for (item of ButtonHolder.current.children) {
  //         item.classList.remove("slider__buttons--active");
  //       }
  //       document
  //         .querySelector(".slider__contents > div[data-slider-id='1']")
  //         ?.setAttribute("data-slider-id", "temp");
  //       document
  //         .querySelector(`.slider__contents > div[data-slider-id='${buttonSliderId}']`)
  //         ?.setAttribute("data-slider-id", "1");
  //       document
  //         .querySelector(".slider__contents > div[data-slider-id='temp']")
  //         ?.setAttribute("data-slider-id", `${buttonSliderId}`);
  //       currentActive.classList.add("slider__buttons--active");
  //       document
  //         .querySelector(".slider__buttons ul li[data-slider-id='1']")
  //         ?.setAttribute("data-slider-id", "temp");
  //       currentActive.setAttribute("data-slider-id", "1");
  //       document
  //         .querySelector(".slider__buttons.one ul li[data-slider-id='temp']")
  //         ?.setAttribute("data-slider-id", `${buttonSliderId}`);
  //
  //       buttonSliderId++; //  increment the counter
  //
  //       myLoop();
  //     }, timer);
  //   };
  //   myLoop();
  //   return () => {
  //     return clearTimeout(sliderTimer);
  //   };
  // }, [initialize, render]);
  //
  // const getDataSliderId = (e: any) => {
  //   let buttonSliderId = parseInt(e.target.getAttribute("data-slider-id"));
  //
  //   if (!e.target.className.includes("slider__buttons--active")) {
  //     setInitialize(parseInt(e.target.getAttribute("data-index")));
  //     setRender(!render);
  //
  //     let item: HTMLLIElement;
  //     for (item of ButtonHolder.current.children) {
  //       item.classList.remove("slider__buttons--active");
  //     }
  //     document
  //       .querySelector(".slider__contents > div[data-slider-id='1']")
  //       ?.setAttribute("data-slider-id", "temp");
  //     document
  //       .querySelector(`.slider__contents > div[data-slider-id='${buttonSliderId}']`)
  //       ?.setAttribute("data-slider-id", "1");
  //     document
  //       .querySelector(".slider__contents > div[data-slider-id='temp']")
  //       ?.setAttribute("data-slider-id", `${buttonSliderId}`);
  //     e.target.classList.add("slider__buttons--active");
  //   }
  //
  //   document
  //     .querySelector(".slider__buttons ul li[data-slider-id='1']")
  //     ?.setAttribute("data-slider-id", "temp");
  //   e.target.setAttribute("data-slider-id", "1");
  //   document
  //     .querySelector(".slider__buttons.one ul li[data-slider-id='temp']")
  //     ?.setAttribute("data-slider-id", `${buttonSliderId}`);
  // };


  return (
    <div className="slider">
      <div className="slider__contents">
        {/* @ts-ignore */}
        <Carousel slides={slides}/>
      </div>
    </div>
  );
};

export default Slider;
