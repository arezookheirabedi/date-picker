import React from "react";
import sliderThumb5 from "../../../assets/images/slider/slider-thumb-5.png";

const BakeryManagement = () => {
  return (
    <div className="slider__content-holder slider__content-holder--5" data-slider-id="5">
      <div className="slider__content">
        <h4 className="slider__heading-first">آرد و نان</h4>
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
        <img src={sliderThumb5} alt=""/>
      </div>
    </div>
  );
}

export default BakeryManagement;