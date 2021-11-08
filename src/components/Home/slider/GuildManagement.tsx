import React from 'react';

import sliderThumb1 from "../../../assets/images/slider/slider-thumb-1.png";

const GuildManagement = () => {
  return (
    <div
      className="slider__content-holder slider__content-holder--1 active"
      data-slider-id="1"
    >
      <div className="slider__content">
        <h4 className="slider__heading-first">
          سکوی مدیریت اصناف کشور
          <span className="font-regular">(در شرایط بحران)</span>
        </h4>
        <h5 className="slider__heading-second">تجمیع ، پایش و تحلیل اطلاعات</h5>
        <h6 className="slider__heading-third">
              <span className="slider__heading-third--main">
                ایجاد بستر هوشمندی که تعادل میان ادامه خدمت‌رسانی اصناف کشور و محدودیت‌های ناشی از
                دستور‌العمل‌های شرایط بحران‌های سلامت را اجرایی نماید، از جمله اهداف اجرای طرح است.
                با اجرای کامل بخش اصناف شهروندان نقش فعالی در کنترل و مدیریت بحران‌های سلامت ایفا
                خواهند نمود.
              </span>
          <span className="slider__heading-third--sub">
                امکان بررسی وضعیت سلامت هر واحد صنفی
              </span>
          <span className="slider__heading-third--sub">
                مشاهده دستور‌العمل‌های هر واحد صنفی
              </span>
          <span className="slider__heading-third--sub">
                ارائه هشدارهای هوشمند به اقتضا شرایط هر واحد صنفی
              </span>
        </h6>
      </div>
      <div className="slider__img u-d-mobile-none">
        <img src={sliderThumb1} alt=""/>
      </div>
    </div>
  );
}

export default GuildManagement;