import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
// eslint-disable-next-line
import {Redirect, Route, Switch} from 'react-router-dom';
// @ts-ignore
import moment from 'moment-jalaali';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {useOutsideSidebar} from 'src/hooks/useOutsideSidebar';
import routes from 'src/routes';
import {isLogin} from 'src/helpers/utils';
import logo from 'src/assets/images/logos/logo.svg';
// eslint-disable-next-line
import sidebarBorder from 'src/assets/images/patterns/sidebar-border.svg';
import useLocalStorage from 'src/hooks/useLocalStorage';
import NotFound from 'src/containers/Errors/NotFound';
import {IProfile} from 'src/models/authentication.model';
import Logout from './components/Logout';
import UserArea from './components/UserArea';
import MenuItemWrapper from './components/MenuItemWrapper';
import Today from './components/Today';
// import SideBarFilter from './components/SideBarFilter';

const ScrollNavbar = styled.div`
  height: 100vh;
  max-height: calc(100vh - 19.5rem);
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PrivateLayout: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(true);
  // const [filterCollapse, setFilterCollapse] = useState(true);
  const [collapsible, setCollapsible] = useState(false);
  const [profile] = useLocalStorage<IProfile>('ministers-userinfo', {
    birthday: '',
    categoryId: '',
    firstName: '',
    guildCode: '',
    id: '',
    lastName: '',
    nationalId: '',
    qrCode: '',
    roles: [],
    resources: [],
    permissions: [],
  });

  const wrapperRef = useRef(null);

  const toggle: () => void = () => {
    setCollapsed(!collapsed);
  };

  const closeMenu: () => void = () => {
    if (collapsible) setCollapsed(true);
  };

  // const toggleFilter: () => void = () => {
  //   setFilterCollapse(!filterCollapse);
  // };

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
        // className={`border-l xl:border-none overflow-auto h-screen fixed z-50 w-72 pb-12 bg-white transition-all ease-in-out duration-300
        className={`border-l xl:border-none overflow-auto h-screen fixed z-50 w-72 pb-12 bg-white transition-all ease-in-out duration-300 
          ${collapsed && collapsible ? ' -right-72' : ' right-0'}
          `}
      >
        <div className="logo py-8 px-4 mb-8">
          <div className="flex justify-center p-2 pr-1">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <ScrollNavbar className="border-0 z-20 relative overflow-hidden overflow-y-auto pt-8 pb-16">
          {routes.map(route => (
            <MenuItemWrapper route={route} key={route.keyIndex} />
          ))}
        </ScrollNavbar>

        <div className="absolute bottom-0 z-20 w-full bg-white">
          <div className="flex justify-between text-xs text-gray-400 pl-9 rtl:pl-3 pr-3 rtl:pr-9">
            <span>
              {process.env.REACT_APP_VERSION?.toPersianDigits()}{' '}
              {process.env.REACT_APP_VERSION_STATUS === 'test' ? 'نسخه آزمایشی' : ''}
            </span>

            <span>
              {process.env.REACT_APP_VERSION_BUILD_DATE
                ? moment(Number(process.env.REACT_APP_VERSION_BUILD_DATE))
                    .format('jYYYY-jMM-jDD')
                    .toPersianDigits()
                : ''}
            </span>
          </div>
          <Logout isMenuItem />
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
      <div className="mr-0 xl:mr-72 relative min-h-screen overflow-hidden overflow-y-auto">
        <div className="lg:pl-12 xl:pr-32 xl:pl-14 sm:px-12 sm:py-6 px-4 py-2 xl:py-0 min-h-screen flex flex-col">
          <div className="lg:py-4">
            {collapsible
              ? React.createElement(
                  props => (
                    // eslint-disable-next-line
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
              <div className="flex items-center flex-row-reverse xl:flex-row justify-between pr-0 py-5 space-x-5 rtl:space-x-reverse">
                <div className="relative">
                  <UserArea />
                </div>
              </div>

              <div className="flex items-center flex-row-reverse xl:flex-row justify-between py-5 space-x-5 rtl:space-x-reverse">
                <div className="relative">
                  <Today />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white relative flex-grow">
            <Switch>
              {routes.map((routeL1, i) =>
                // eslint-disable-next-line no-nested-ternary
                routeL1.roles &&
                profile.roles &&
                routeL1.roles.some((roleL1: string) => profile.roles.includes(roleL1)) ? (
                  !routeL1.subMenu ? (
                    // eslint-disable-next-line
                    <Route
                      path={routeL1.link}
                      exact={routeL1.exact}
                      key={i}
                      component={routeL1.main}
                    />
                  ) : (
                    routeL1.subMenu.map((routeL2: any, j: any) =>
                      // eslint-disable-next-line no-nested-ternary
                      routeL2.roles &&
                      profile.roles &&
                      routeL2.roles.some((roleL2: string) => profile.roles.includes(roleL2)) ? (
                        !routeL2.children ? (
                          <Route
                            path={routeL2.link}
                            exact={routeL2.exact}
                            // eslint-disable-next-line
                            key={j}
                            component={routeL2.main}
                          />
                        ) : (
                          // eslint-disable-next-line no-nested-ternary
                          routeL2.children.map((routeL3: any, k: any) =>
                            // eslint-disable-next-line no-nested-ternary
                            routeL3.roles &&
                            profile.roles &&
                            routeL3.roles.some((roleL3: string) =>
                              profile.roles.includes(roleL3)
                            ) ? (
                              !routeL3.children ? (
                                <Route
                                  path={routeL3.link}
                                  exact={routeL3.exact}
                                  // eslint-disable-next-line
                                  key={k}
                                  component={routeL3.main}
                                />
                              ) : (
                                routeL3.children.map((routeL4: any, m: any) =>
                                  routeL4.roles &&
                                  profile.roles &&
                                  routeL4.roles.some((roleL4: string) =>
                                    profile.roles.includes(roleL4)
                                  ) ? (
                                    <Route
                                      path={routeL4.link}
                                      exact={routeL4.exact}
                                      // eslint-disable-next-line
                                      key={m}
                                      component={routeL4.main}
                                    />
                                  ) : (
                                    ''
                                  )
                                )
                              )
                            ) : (
                              ''
                            )
                          )
                        )
                      ) : (
                        ''
                      )
                    )
                  )
                ) : (
                  ''
                )
              )}
              <Route component={NotFound} />
            </Switch>
          </div>

          <div className="flex flex-row-reverse justify-center items-center text-xs space-x-1 pt-2 pb-3 poweredby">
            <span>Powered</span>
            <span>by</span>
            <a href="https://vasl.ir" target="_blank" rel="noreferrer">
              <span>Va</span>
              <span>sl</span>
            </a>
            {/*
            <a href="https://irancell.ir" target="_blank" rel="noreferrer">
              <img src={`${process.env.PUBLIC_URL}/images/logos/irancell/irancell.png`} className="w-12 ml-1" alt="" />
            </a>
            <a href="https://irancell.ir" target="_blank" rel="noreferrer">
              <img src={`${process.env.PUBLIC_URL}/images/logos/irancell/irancell-labs.png`} className="w-8 ml-1" alt="" />
            </a>
            */}
          </div>
        </div>

        {/* <SideBarFilter filterCollapse={filterCollapse} toggleFilter={toggleFilter} /> */}
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
    };
  }, []);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      // eslint-disable-next-line
      {...rest}
      // eslint-disable-next-line
      render={comprops => (isLogin() ? <Component {...comprops} /> : <Redirect to="/" />)}
    />
  );
};
