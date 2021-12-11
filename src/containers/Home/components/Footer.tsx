import React from "react";

import { Link as InnerLink } from "react-scroll";
import ContactUs from "../../../components/Home/ContactUs";

import logoDepartmentInterior from "../../../assets/images/logos/logo-department-interior.png";

interface FooterProps {
  hasContactUsComponent: boolean;
}

const Footer: React.FC<FooterProps> = ({ hasContactUsComponent }) => {
  return (
    <footer className="footer">
      {hasContactUsComponent ? <ContactUs /> : ""}
      <div className=" u-margin-top-negative">
        <div className="footer__navigate">
          <div className="footer__card">
            <div className="footer__logo">
              <img src={logoDepartmentInterior} alt="" />
            </div>
            <ul className="footer__card-right">
              <li>
                <i>آدرس:</i>
                <p>تهران، میدان جهاد، وزارت کشور جمهوری اسلامی ایران</p>
              </li>
              <li>
                <i>ایمیل:</i>
                <p>Support@IM.ir</p>
              </li>
            </ul>
          </div>
          <div className="footer__card">
            <ul className="footer__card-title">
              <li>تماس با ما و پشتیبانی</li>
              <li>
                <InnerLink to="contact-us-form"  smooth >تماس با ما</InnerLink>
              </li>
              <li>
                <a href="/#">پشتیبانی</a>
              </li>
            </ul>
          </div>
          <div className="footer__card">
            <ul className="footer__card-title">
              <li>با ما آشنا شوید</li>
              <li>
                <a href="/#">درباره ما</a>
              </li>
              <li>
                <InnerLink to="contributors" smooth >مشارکت کنندگان</InnerLink>
              </li>
              <li>
                <InnerLink to="faq-section" smooth >سوالات متداول</InnerLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="line"> </div>
      <p className="footer__copyright">
        تمامی حقوق مادی و معنوی این درگاه ها متعلق به وزارت کشور جمهوری اسلامی ایران است.
      </p>
    </footer>
  );
};

export default Footer;
