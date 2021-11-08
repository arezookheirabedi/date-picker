import React, {useRef} from "react";

import {Link as InnerLink} from "react-scroll/modules";

import Svg from "../../../components/Svg";

interface NavigationMobileProps {
  showNav: boolean;
  onHandleShowNav: any
}

const NavigationMobile: React.FC<NavigationMobileProps> = ({showNav, onHandleShowNav}) => {

  const {CloseIcon2} = Svg;

  const menuItems = [
    {
      title: 'صفحه اصلی',
      link: '/'
    },
    {
      title: 'درباره پروژه',
      link: 'about-project'
    },
    {
      title: 'وضعیت پیشرفت پروژه',
      link: 'progress-project'
    },
    {
      title: 'همکاران',
      link: 'contributors'
    },
    {
      title: 'سوالات متداول',
      link: 'faq-section'
    },
    {
      title: 'تماس با ما',
      link: 'contact-us-form'
    },
  ]


  const navRef = useRef<HTMLDivElement>(null);
  const closeNav = () => {
    onHandleShowNav(false)
  }
  return (
    <nav className="navigation__nav-mobile" ref={navRef} style={{display: showNav ? 'block' : 'none'}}>
      <div className="navigation__nav-mobile__close" onClick={closeNav}>
        <CloseIcon2/>
      </div>
      <ul>
        {
          menuItems.map((value, index) => {
            return <li className={index === 0 ? 'active' : ''} key={index}>
              <InnerLink to={value.link} smooth onClick={closeNav}>
                {value.title}
              </InnerLink>
            </li>
          })
        }
      </ul>
    </nav>
  );
}

export default NavigationMobile;