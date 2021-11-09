import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
// eslint-disable-next-line
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import {useOutsideSidebar} from 'src/hooks/useOutsideSidebar';
import routes from 'src/routes';
import {isLogin} from 'src/helpers/utils';
import logo from 'src/assets/images/logos/logo.svg';
// eslint-disable-next-line
import sidebarBorder from 'src/assets/images/patterns/sidebar-border.svg';
import Overview from 'src/containers/Overview/Overview';
import Logout from './components/Logout';
import UserArea from './components/UserArea';
import MenuItemWrapper from './components/MenuItemWrapper';
import Today from './components/Today';
import SideBarFilter from "./components/SideBarFilter";

const ScrollNavbar = styled.div`
  height: 100vh;
  max-height: calc(100vh - 10rem);
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PrivateLayout: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [filterCollapse, setFilterCollapse] = useState(true);
  const [collapsible, setCollapsible] = useState(false);

  const wrapperRef = useRef(null);

  const toggle: () => void = () => {
    setCollapsed(!collapsed);
  };

  const closeMenu: () => void = () => {
    if (collapsible) setCollapsed(true);
  };

  const toggleFilter: () => void = () => {
    setFilterCollapse(!filterCollapse);
  };

  useOutsideSidebar(wrapperRef, closeMenu);

  useLayoutEffect(() => {
    const handle: () => void = () => {
      if (window.innerWidth <= 1200) {
        setCollapsible(true);
      } else setCollapsible(false);
    };

    window.addEventListener('resize', handle);

    window.dispatchEvent(new Event('resize'));

    return () => {
      window.removeEventListener('resize', handle);
    };
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className={`border-l xl:border-none overflow-auto h-screen fixed z-50 overflow-hidden w-72 pb-12 bg-white transition-all ease-in-out duration-300 
          ${collapsed && collapsible ? ' -right-72' : ' right-0'}
          `}
      >
        <div className="logo py-8 px-4 mb-8">
          <div className="flex justify-center p-2 pr-1">
            <img src={logo} alt="logo"/>
          </div>
        </div>
        <ScrollNavbar className="border-0 z-20 relative overflow-hidden overflow-y-auto pb-5 pt-8 pb-32">
          {routes.map(route => (
            <MenuItemWrapper route={route} key={route.keyIndex}/>
          ))}
        </ScrollNavbar>

        <div className="absolute bottom-0 z-20 w-full bg-white">
          <Logout isMenuItem/>
        </div>

        <div
          className="fixed hidden xl:block z-10 top-0 right-56 h-screen w-44"
          style={{
            backgroundImage: `url(${sidebarBorder})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </div>
      <div className="mr-0 xl:mr-72 flex relative min-h-screen">
        <div className="flex-grow flex flex-col lg:pl-12 xl:pr-32 xl:pl-14 sm:px-12 sm:py-6 px-4 py-2 xl:py-0">
          <div className="lg:py-8">
            {collapsible
              ? React.createElement(
                props => (
                  <div {...props} className="inline-flex w-6 h-6 ml-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </div>
                ),
                {
                  className: 'trigger',
                  onClick: toggle,
                }
              )
              : ''}

            <div className="flex w-full justify-end xl:justify-between space-x-5 rtl:space-x-reverse">
              <div
                className="flex items-center flex-row-reverse xl:flex-row justify-between pr-0 py-5 space-x-5 rtl:space-x-reverse">
                <div className="relative">
                  <UserArea/>
                </div>
              </div>

              <div
                className="flex items-center flex-row-reverse xl:flex-row justify-between py-5 space-x-5 rtl:space-x-reverse">
                <div className="relative">
                  <Today/>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white flex-grow flex flex-col relative">
            <Switch>
              {routes.map((route, i) => (
                <Route path={route.link} exact={route.exact} key={i} component={route.main}/>
              ))}
              <Route component={Overview}/>
            </Switch>
          </div>
        </div>

        <SideBarFilter filterCollapse={filterCollapse} toggleFilter={toggleFilter}/>
      </div>
    </>
  );
};

export default PrivateLayout;

// @ts-ignore
export const PrivateRoute: (any) => any = props => {
  const {component: Component, ...rest} = props;
  useEffect(() => {
    document.getElementsByTagName('html')[0].style.fontSize = 'inherit';
    document.getElementsByTagName('body')[0].style.fontSize = 'inherit';
    return () => {
      document.getElementsByTagName('html')[0].style.fontSize = '';
      document.getElementsByTagName('body')[0].style.fontSize = '';
    }
  }, [])

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={comprops => (isLogin() ? <Component {...comprops} /> : <Redirect to="/" />)}
    />
  );
};
