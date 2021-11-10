// eslint-disable-next-line
import React from 'react';
import {IRoute} from './models/route';
import {IconWrapperStyle} from './components/IconWrapper';
import Overview from './containers/Overview/Overview';
import Guild from './containers/Guild/Guild';
import Transport from "./containers/Transport/Transport";
import Passenger from "./containers/Passenger/Passenger";
import Vaccination from './containers/Vaccination/Vaccination';
import Citizens from "./containers/Citizens/Citizens";

const routes: IRoute[] = [
  {
    keyIndex: '1',
    icon: active => <IconWrapperStyle name="dashboard" active={active} />,
    link: '/dashboard/overview',
    exact: true,
    inMenu: true,
    title: 'داشبورد جامع',
    main: Overview,
    showGuildList: true,
  },
  {
    keyIndex: '2',
    icon: active => <IconWrapperStyle name="citizenship" active={active} />,
    link: '/dashboard/citizenship',
    exact: true,
    inMenu: true,
    title: 'داشبورد شهروندان',
    // disabled: true,
    main: Citizens,
  },
  {
    keyIndex: '3',
    icon: (active, disabled) => (
      <IconWrapperStyle name="vaccine" active={active} disabled={disabled} />
    ),
    link: '/dashboard/vaccine',
    exact: true,
    inMenu: true,
    title: 'داشبورد واکسیناسیون',
    // disabled: true,
    main: Vaccination,
  },
  {
    keyIndex: '4',
    icon: (active, disabled) => (
      <IconWrapperStyle name="transport" active={active} disabled={disabled} />
    ),
    link: '/dashboard/transport',
    exact: true,
    inMenu: true,
    title: 'داشبورد حمل و نقل عمومی',
    // disabled: true,
    main: Transport,
  },
  {
    keyIndex: '5',
    icon: (active, disabled) => (
      <IconWrapperStyle name="guild" active={active} disabled={disabled} />
    ),
    link: '/dashboard/guild',
    exact: true,
    inMenu: true,
    title: 'داشبورد اصناف',
    // disabled: true,
    main: Guild,
  },
  {
    keyIndex: '6',
    icon: (active, disabled) => (
      <IconWrapperStyle name="passenger" active={active} disabled={disabled} />
    ),
    link: '/dashboard/passenger',
    exact: true,
    inMenu: true,
    title: 'داشبورد مسافران',
    // disabled: true,
    main: Passenger,
  },
];

export default routes;
