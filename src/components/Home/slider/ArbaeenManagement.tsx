import React from "react";
import sliderThumb6 from "../../../assets/images/slider/slider-thumb-6.png";

const ArbaeenManagement = () => {
  return (
    <div className="slider__content-holder slider__content-holder--6" data-slider-id="6">
      <div className="slider__content">
        <h4 className="slider__heading-first">سکوی مدیریت زائران اربعین</h4>
        <h5 className="slider__heading-second">تجمیع ، پایش و تحلیل اطلاعات</h5>
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
        <img src={sliderThumb6} alt=""/>
      </div>
    </div>
  );
}

export default ArbaeenManagement;