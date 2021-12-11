import React from "react";
import sliderThumb2 from "../../../assets/images/slider/slider-thumb-2.png";

const TransportManagement = () => {
  return (
    <div className="slider__content-holder slider__content-holder--2" data-slider-id="2">
      <div className="slider__content">
        <h4 className="slider__heading-first">
          سکوی مدیریت حمل و نقل عمومی
          <span className="font-regular"> (در شرایط بحران)</span>
        </h4>
        <h5 className="slider__heading-second">پایش، تحلیل و غربالگری</h5>
        <h6 className="slider__heading-third">
              <span className="slider__heading-third--main">
                در راستای افزایش امنیت اجتماعی شهروندان در دوران بحران‌های سلامت، وضعیت سلامت تمامی
                افراد شاغل در حوزه حمل و نقل عمومی به صورت مستمر و بر خط مورد بررسی قرار میگیرد.
              </span>
          <span className="slider__heading-third--sub">
                شهروندان این امکان را خواهند داشت تا در صورت تمایل از طریق وارد نمودن پلاک وسیله
                نقلیه در بخش حمل و نقل، وضعیت سلامت خدمت دهنده را به صورت لحظه‌ای و برخط بررسی
                نمایند.
              </span>
        </h6>
      </div>

      <div className="slider__img u-d-mobile-none">
        <img src={sliderThumb2} alt="ارائه هشدارهای هوشمند بنا به ارتباطات مسافر" />
      </div>
    </div>
  );
}
export default TransportManagement;