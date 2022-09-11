import React from "react";
import sliderThumb5 from "../../../assets/images/slider/slider-thumb-5.png";

const BakeryManagement = () => {
  return (
    <div className="slider__content-holder slider__content-holder--5" data-slider-id="5">
      <div className="slider__content">
        <h4 className="slider__heading-first">سکوی مدیریت آرد و نان</h4>
        <h5 className="slider__heading-second">مدیریت هوشمند آرد و نان</h5>
        <h6 className="slider__heading-third">
              <span className="slider__heading-third--main">
         در این مجموعه اطلاعات آرد دریافتی توسط خبازان کشور، اطلاعات اصناف و مقدار فروش نان در سراسر کشور تجمیع و گزارش می‌شوند.
              </span>
          <span className="slider__heading-third--sub">
 این سامانه در اختیار کلیه استانداری‌ها و بازرسان صنف آرد و نان قرار می‌گیرد و امکان مدیریت هوشمند و بهینه توزیع آرد و فروش نان را فراهم می‌آورد. هدف این سامانه  مدیریت بهینه و جلوگیری از قاچاق آرد و نظارت بر فروش نان است.
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