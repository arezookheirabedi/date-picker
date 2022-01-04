// eslint-disable-next-line
import React from 'react';
import {IRoute} from './models/route';
import {IconWrapperStyle} from './components/IconWrapper';
import Overview from './containers/Overview/Overview';
import Guild from './containers/Guild/Guild';
import Transport from './containers/Transport/Transport';
import TransportProvince from './containers/Transport/TransportProvince';
import TransportMonitoring from './containers/Transport/TransportMonitoring';
import Passenger from './containers/Passenger/Passenger';
import School from './containers/School/School';
import SchoolProvince from './containers/School/SchoolProvince';
import Recruitment from './containers/Recruitment/Recruitment';
import RecruitmentProvince from './containers/Recruitment/RecruitmentProvince';
import Vaccination from './containers/Vaccination/Vaccination';
import Citizens from './containers/Citizens/Citizens';

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
    disabled: true,
  },
  {
    keyIndex: '2',
    icon: active => <IconWrapperStyle name="citizenship" active={active} />,
    link: '/dashboard/citizenship',
    exact: true,
    inMenu: true,
    title: 'داشبورد شهروندان',
    disabled: true,
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
    disabled: true,
    main: Vaccination,
  },
  {
    keyIndex: '4',
    icon: (active, disabled) => (
      <IconWrapperStyle name="transport" active={active} disabled={disabled} />
    ),
    link: '/dashboard/transport/public',
    simLink: '/dashboard/transport',
    exact: true,
    inMenu: true,
    title: 'داشبورد حمل و نقل عمومی',
    subMenu: [
      {
        keyIndex: '1',
        title: 'عمومی',
        link: '/dashboard/transport/public',
        icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
        main: Transport,
      },
      {
        keyIndex: '2',
        title: 'استانی',
        link: '/dashboard/transport/province',
        icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
        main: TransportProvince,
      },
      {
        keyIndex: '3',
        title: 'نظارت و بازرسی',
        link: '/dashboard/transport/monitoring',
        icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
        main: TransportMonitoring,
      },
    ],
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
    disabled: true,
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
    disabled: true,
    main: Passenger,
  },
  {
    keyIndex: '7',
    icon: (active, disabled) => (
      <IconWrapperStyle name="education" active={active} disabled={disabled} />
    ),
    link: '/dashboard/education/public',
    simLink: '/dashboard/education',
    exact: true,
    inMenu: true,
    disabled: true,
    title: 'داشبورد آموزش و پرورش',
    subMenu: [
      {
        keyIndex: '1',
        title: 'عمومی',
        link: '/dashboard/education/public',
        icon: active => <IconWrapperStyle name="sub-education" active={active} />,
        main: School,
      },
      {
        keyIndex: '2',
        title: 'استانی',
        link: '/dashboard/education/province',
        icon: active => <IconWrapperStyle name="sub-education" active={active} />,
        main: SchoolProvince,
      },
    ],
    main: School,
  },
  {
    keyIndex: '8',
    icon: (active, disabled) => (
      <IconWrapperStyle name="recruitment" active={active} disabled={disabled} />
    ),
    link: '/dashboard/recruitment/public',
    simLink: '/dashboard/recruitment',
    exact: true,
    inMenu: true,
    title: 'داشبورد امور استخدامی',
    subMenu: [
      {
        keyIndex: '1',
        title: 'عمومی',
        link: '/dashboard/recruitment/public',
        icon: active => <IconWrapperStyle name="sub-recruitment" active={active} />,
        main: Recruitment,
      },
      {
        keyIndex: '2',
        title: 'استانی',
        link: '/dashboard/recruitment/province',
        icon: active => <IconWrapperStyle name="sub-recruitment" active={active} />,
        main: RecruitmentProvince,
      },
    ],
    main: Recruitment,
  },
];

export default routes;
