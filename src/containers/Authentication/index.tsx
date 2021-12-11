import React from "react";
import {Route, Switch , Link } from 'react-router-dom';
import { Link as InnerLink } from "react-scroll";
import Login from "./Login";
import flagLogo from "../../assets/images/icons/login-flag1.svg";
import backIcon from "../../assets/images/icons/left-arrow.svg";

const Authentication: React.FC<any> = () => {
  return (
    <>
      <div className="authWrapeer">
        <div className="back-desk">
          <Link to="/" >
            <img src={backIcon} alt="" />
          </Link>
        </div>
        <div className="loginSide">
          <div className="login-text-box">
            <div className="display_scroll">
              <div className="go-to-bottom">
                <InnerLink to="loginWrapper" smooth >
                  <div className="go-to-bottom">
                    <div className="go-to-bottom__top">
                      <div className="go-to-bottom__top--line"/>
                    </div>
                    <div className="go-to-bottom__bottom"/>
                  </div>
                </InnerLink>
              </div>
            </div>
            <div className="login">ورود به سامانه</div>
          </div>
          <div className="logincard">
            <Switch>
              <Route path="/login" exact component={Login} />
            </Switch>
          </div>
        </div>

        <div className="image_side1">
          <div className="mainBox">
            <img src={flagLogo} alt="" className="imageBox" />

            <p className="title">سکوی مدیریت هوشمند </p>
            <p className="subtitle">تجمیع، پایش و تحلیل اطلاعات</p>

            <p className="description">
              سامانه‌های موضوع این طرح با هدف ایجاد بسترهای خدمت‌رسانی به
              شهروندان و نظارت بر حسن اجرای آئین‌نامه‌های شرایط بحران طراحی و
              راه اندازی شده‌اند.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;
