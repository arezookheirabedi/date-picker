import React from "react";

// packages
import {Link as InnerLink} from "react-scroll";

const Header = () => {
  return (
    <header className="header">
      <div className="header__go-to-bottom">
        <InnerLink to="about-project" smooth>
          <div className="go-to-bottom">
            <div className="go-to-bottom__top">
              <div className="go-to-bottom__top--line" />
            </div>
            <div className="go-to-bottom__bottom" />
          </div>
        </InnerLink>
      </div>
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main u-color-white">سکوی مدیریت هوشمند اجتماعی بحران‌های سلامتی</span>
          <span className="heading-primary--sub u-color-white">تجمیع ، پایش و تحلیل اطلاعات</span>
        </h1>
        <h2 className="heading-secondary">
          <span className="heading-secondary--main u-color-white">
            اخذ تصمیمات صحیح در حوزه‌ی مدیریت بحران نیازمند به ایجاد مجموعه سامانه‌هایی است. که ضمن
            افزایش مشارکت شهروندان در کنترل بحران بستر‌های داده‌کاوی مناسبی را در راستای تصمیم سازی
            نهادهای متولی ایجاد نماید.
          </span>
          <span className="heading-secondary--sub u-color-white">
            سامانه‌های موضوع این طرح با هدف ایجاد بستر‌های خدمت‌رسانی به شهروندان و نظارت‌بر حسن
            اجرای آئین نامه‌های شرایط بحران طراحی و راه‌اندازی شده‌اند.
          </span>
        </h2>
      </div>
    </header>
  );
};

export default Header;
