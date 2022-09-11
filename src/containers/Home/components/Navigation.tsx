import React, {useState} from "react";
// packages
import {Link as LinkReactRouter} from "react-router-dom";
import {Link as InnerLink} from "react-scroll";

// svg images
import Svg from "../../../components/Svg";

// normal images
// import logoDepartmentInterior from "../../../assets/images/logos/logo-department-interior.png";
import logoDepartmentInterior from "../../../assets/images/logos/logo-department-interior-white.png";

import NavigationMobile from "./NavigationMobile";

import EPUBLICROUTE from '../../../constants/PublicRoute.enum';


const Navigation = () => {
  const [showNav, setShowNav] = useState(false);
  const showMobileNav = () => {
    setShowNav(true);
  }

  const {LoginLogoSvg} = Svg;
  return (
    <div className="navigation">
      <NavigationMobile showNav={showNav} onHandleShowNav={setShowNav}/>
      <nav className="navigation__nav">
        <ul className="navigation__list-right">
          <li className="navigation__mobile-button">
            <div className="navigation__mobile-button__holder" onClick={showMobileNav}>
              <span/><span/><span/>
            </div>
          </li>
          <li className="u-d-mobile-none">
            <InnerLink to="/" smooth className="anchor-underline">
              صفحه اصلی{" "}
            </InnerLink>
          </li>
          <li className="u-d-mobile-none">
            <InnerLink to="about-project" smooth>
              درباره پروژه
            </InnerLink>
          </li>
          <li className="u-d-mobile-none">
            <InnerLink to="progress-project" smooth>
              وضعیت پیشرفت پروژه
            </InnerLink>
          </li>
        </ul>

        <ul className="navigation__list-left">
          <li className="u-d-mobile-none">
            <InnerLink to="contributors" smooth>
              همکاران
            </InnerLink>
          </li>
          <li className="u-d-mobile-none">
            <InnerLink to="faq-section" smooth>
              سوالات متداول
            </InnerLink>
          </li>
          <li className="u-d-mobile-none">
            <InnerLink to="contact-us-form" smooth>
              تماس با ما
            </InnerLink>
          </li>

          <li className="u-d-mobile-none">
            <LinkReactRouter to={EPUBLICROUTE.LOGIN} className="btn btn--white btn--animate">

              <LoginLogoSvg/>
              <span>ورود</span>
            </LinkReactRouter>
          </li>
          <li className="navigation__mobile-li">
            <LinkReactRouter to={EPUBLICROUTE.LOGIN}>
              <LoginLogoSvg/>
            </LinkReactRouter>
          </li>
        </ul>
      </nav>
      <div className="navigation__logo-box">
        <img src={logoDepartmentInterior} className="navigation__logo" alt=""/>
      </div>
    </div>
  );
};

export default Navigation;
