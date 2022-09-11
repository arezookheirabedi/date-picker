import React from "react";
import sliderThumb6 from "../../../assets/images/slider/slider-thumb-6.png";

const ArbaeenManagement = () => {
  return (
    <div className="slider__content-holder slider__content-holder--6" data-slider-id="6">
      <div className="slider__content">
        <h4 className="slider__heading-first">سکوی مدیریت زائران اربعین</h4>
        <h5 className="slider__heading-second">مدیریت هوشمند زائران اربعین</h5>
        <h6 className="slider__heading-third">
              <span className="slider__heading-third--main">
ابر حرکتی زائرین، وضعیت حرکت در مرزهای زمینی ، هوایی و راه‌ها، اطلاعات پایگاه‌های هلال احمرو بیمارستان صحرایی، موکب‌ها و اطلاعات سلامت و... در دسته‌بندی‌های مختلف تجمیع و تحلیل  می‌گردد.
              </span>
          <span className="slider__heading-third--sub">
این اطلاعات در جهت مدیریت و خدمات دهی، پایش و تحلیل می‌شوند و در اختیار تمامی ذینفعان و مجریان مراسم اربعین جهت اتخاذ تصمیمات داده محور قرار می‌گیرد. هدف این سامانه افزایش توان مدیریت و خدمت‌رسانی به مراسم پرفیض اربعین است.
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