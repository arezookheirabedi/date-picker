import React from "react";
import sliderThumb4 from "../../../assets/images/slider/slider-thumb-4.png";

const CitizenshipProfile = () => {
  return (
    <div className="slider__content-holder slider__content-holder--4" data-slider-id="4">
      <div className="slider__content">
        <h4 className="slider__heading-first">سکوی خدمات شهروندان</h4>
        <h5 className="slider__heading-second">مدیریت هوشمند بحران‌های سلامت</h5>
        <h6 className="slider__heading-third">
              <span className="slider__heading-third--main">
                ذیل این مجموعه سامانه‌ها خدمات مختلفی در حوزه‌های حمل و نقل عمومی، اصناف، مسافران
                (مرزبانی) در اختیار شهروندان قرار گرفته است.
              </span>
          <span className="slider__heading-third--sub">
                هدف این سامانه‌ها افزایش توان شهروندان در مشارکتی شهروندان در کنترل بیماری‌های
                فراگیر بوده است.
              </span>
        </h6>
      </div>
      <div className="slider__img u-d-mobile-none">
        <img src={sliderThumb4} alt=""/>
      </div>
    </div>
  );
}

export default CitizenshipProfile;