import React from "react";
import sliderThumb3 from "../../../assets/images/slider/slider-thumb-3.png";

const PassengerManagement  = () => {
  return (
    <div className="slider__content-holder slider__content-holder--3" data-slider-id="3">
      <div className="slider__content">
        <h4 className="slider__heading-first">
          سکوی مدیریت مسافران
          <span className="font-regular"> (مرزبانی)</span>
        </h4>
        <h5 className="slider__heading-second">در شرایط بحران‌های سلامت</h5>
        <h6 className="slider__heading-third">
              <span className="slider__heading-third--main">
                ساز و کارها و بسترهای کنترلی حوزه مسافران نقش جدی در کنترل گسترش بحران و ایجاد منابع
                مورد نیاز جهت راه‌اندازی بسترهای اطاعاتی و اخذ تصمیم‌های هدفمند، ایفا خواهد نمود.
                این مجموعه سامانه‌ها ساز و کارهای لازم جهت بررسی سا‌بقه سلامت مسافران پیش از سوار شدن
                ایشان، به وسیله سفر را فرآهم خواهند آورد.
              </span>
          <span className="slider__heading-third--sub">بررسی وضعیت سلامت مسافر</span>
          <span className="slider__heading-third--sub">مشاهده دستور‌العمل های‌ مقصد سفر</span>
          <span className="slider__heading-third--sub">
                ارائه هشدارهای هوشمند بنا به ارتباطات مسافر
              </span>
        </h6>
      </div>
      <div className="slider__img u-d-mobile-none">
        <img src={sliderThumb3} alt="" />
      </div>
    </div>
  );
}

export default PassengerManagement;