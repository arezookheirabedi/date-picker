// eslint-disable-next-line
import React from 'react';
import {IRoute} from './models/route';
import {IconWrapperStyle} from './components/IconWrapper';
import Overview from './containers/Overview/Overview';
import Guild from './containers/Guild/Guild';
import GuildProvince from './containers/Guild/GuildProvince';
import GuildMonitoring from './containers/Guild/GuildMonitoring';
import Transport from './containers/Transport/Transport';
import TransportProvince from './containers/Transport/TransportProvince';
import TransportMonitoring from './containers/Transport/TransportMonitoring';
import Passenger from './containers/Passenger/Passenger';
import School from './containers/School/School';
import SchoolProvince from './containers/School/SchoolProvince';
import Recruitment from './containers/Recruitment/Recruitment';
import RecruitmentProvince from './containers/Recruitment/RecruitmentProvince';
import ReportsRequested from './containers/Reports';
import Vaccination from './containers/Vaccination/Vaccination';
import VaccinationProvince from './containers/Vaccination/VaccinationProvince';
import Citizens from './containers/Citizens/Citizens';
import GuildSocial from './containers/GuildSocialSecurity/GuildSocial';
import GuildSocialProvince from './containers/GuildSocialSecurity/GuildSocialProvince';
import GuildSocialMonitoring from './containers/GuildSocialSecurity/GuildSocialMonitoring';

const routes: IRoute[] = [
  {
    keyIndex: '1',
    icon: active => <IconWrapperStyle name="dashboard" active={active} />,
    link: '/dashboard/overview',
    exact: true,
    inMenu: true,
    title: 'جامع',
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
    title: 'شهروندان',
    disabled: true,
    main: Citizens,
  },
  {
    keyIndex: '3',
    icon: (active, disabled) => (
      <IconWrapperStyle name="vaccine" active={active} disabled={disabled} />
    ),
    link: '/dashboard/vaccination/public',
    simLink: '/dashboard/vaccination',
    exact: true,
    inMenu: true,
    title: 'واکسیناسیون',
    subMenu: [
      {
        keyIndex: '1',
        title: 'عمومی',
        link: '/dashboard/vaccination/public',
        icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
        main: Vaccination,
      },
      {
        keyIndex: '2',
        title: 'استانی',
        link: '/dashboard/vaccination/province',
        icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
        main: VaccinationProvince,
      },
    ],
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
    title: 'حمل و نقل عمومی',
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
    keyIndex: '6',
    icon: (active, disabled) => (
      <IconWrapperStyle name="passenger" active={active} disabled={disabled} />
    ),
    link: '/dashboard/passenger',
    exact: true,
    inMenu: true,
    title: 'مسافران',
    disabled: true,
    main: Passenger,
  },
  {
    keyIndex: '7',
    icon: (active, disabled) => (
      <IconWrapperStyle name="school" active={active} disabled={disabled} />
    ),
    link: '/dashboard/school/public',
    simLink: '/dashboard/school',
    exact: true,
    inMenu: true,
    // disabled: true,
    title: 'آموزش و پرورش',
    subMenu: [
      {
        keyIndex: '1',
        title: 'عمومی',
        link: '/dashboard/school/public',
        icon: active => <IconWrapperStyle name="sub-school" active={active} />,
        main: School,
      },
      {
        keyIndex: '2',
        title: 'استانی',
        link: '/dashboard/school/province',
        icon: active => <IconWrapperStyle name="sub-school" active={active} />,
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
    title: 'امور استخدامی',
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
  {
    keyIndex: '9',
    icon: (active, disabled) => (
      <IconWrapperStyle name="reports-requested" active={active} disabled={disabled} />
    ),
    link: '/dashboard/reports/requested',
    simLink: '/dashboard/reports/requested',
    exact: true,
    inMenu: true,
    title: 'لیست درخواست گزارش',
    main: ReportsRequested,
  },
  {
    keyIndex: '10',
    icon: (active, disabled) => (
      <IconWrapperStyle name="guild" active={active} disabled={disabled} />
    ),
    link: '/dashboard/guild/managment/public',
    simLink: '/dashboard/guild',
    exact: true,
    inMenu: true,
    title: 'اصناف',
    // disabled: true,
    subMenu: [
      {
        keyIndex: '1',
        title: 'مدیر اصناف',
        simLink: '/dashboard/guild/managment',
        link: '/dashboard/guild/managment/public',
        icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
        children: [
          {
            keyIndex: '1',
            title: 'عمومی',
            link: '/dashboard/guild/managment/public',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main: Guild,
          },
          {
            keyIndex: '2',
            title: 'استانی',
            link: '/dashboard/guild/managment/province',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main: GuildProvince,
          },
          {
            keyIndex: '3',
            title: 'نظارت و بازرسی',
            link: '/dashboard/guild/managment/monitoring',
            icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
            main: GuildMonitoring,
          },
        ],
      },
      {
        keyIndex: '2',
        title: 'تامین اجتماعی',
        link: '/dashboard/guild/SocialSecurity/public',
        simLink: '/dashboard/guild/SocialSecurity',
        icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
        children: [
          {
            keyIndex: '1',
            title: 'عمومی',
            link: '/dashboard/guild/SocialSecurity/public',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main:GuildSocial,
          },
          {
            keyIndex: '2',
            title: 'استانی',
            link: '/dashboard/guild/SocialSecurity/province',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main:GuildSocialProvince,
          },
          {
            keyIndex: '3',
            title: 'نظارت و بازرسی',
            link: '/dashboard/guild/SocialSecurity/monitoring',
            icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
            main: GuildSocialMonitoring,
          },
        ],
      },
    ],
  },
];

export default routes;
