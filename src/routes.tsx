// eslint-disable-next-line
import React from 'react';
import {IRoute} from './models/route';
import {IconWrapperStyle} from './components/IconWrapper';
import Overview from './containers/Overview/Overview';
import GuildOwner from './containers/Guild/GuildOwner';
import GuildOwnerProvince from './containers/Guild/GuildOwnerProvince';
import GuildMonitoring from './containers/Guild/GuildMonitoring';
import Transport from './containers/Transport/Transport';
import TransportProvince from './containers/Transport/TransportProvince';
import TransportMonitoring from './containers/Transport/TransportMonitoring';
import Bakery from './containers/Bakery/Bakery';
import BakeryProvince from './containers/Bakery/BakeryProvince';
import Passenger from './containers/Passenger/Passenger';
import School from './containers/School/School';
import SchoolProvince from './containers/School/SchoolProvince';
import Recruitment from './containers/Recruitment/Recruitment';
import RecruitmentProvince from './containers/Recruitment/RecruitmentProvince';
import ReportsRequested from './containers/Reports';
import Vaccination from './containers/Vaccination/Vaccination';
import VaccinationProvince from './containers/Vaccination/VaccinationProvince';
import Citizens from './containers/Citizens/Citizens';
import PassengerProvince from './containers/Passenger/PassengerProvince';
import GuildEmployee from './containers/Guild/GuildEmployee';
import GuildEmployeeProvince from './containers/Guild/GuildEmployeeProvince';
import ServicePort from './containers/ServicePort/ServicePort';
import BakeryMonitoring from './containers/Bakery/BakeryMonitoring';

const routes: IRoute[] = [
  {
    keyIndex: '1',
    // icon: active => <IconWrapperStyle name="dashboard" active={active} />,
    link: '/dashboard/health/service-port',
    simLink: '/dashboard/health',
    exact: true,
    inMenu: true,
    title: 'سلامت',
    subMenu: [
      {
        keyIndex: '3',
        icon: (active, disabled) => (
          <IconWrapperStyle name="service-port" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/health/service-port',
        simLink: '/dashboard/health/service-port',
        exact: true,
        inMenu: true,
        title: 'درگاه تبادل داده و خدمات',
        main: ServicePort,
      },
      {
        keyIndex: '4',
        icon: (active, disabled) => (
          <IconWrapperStyle name="vaccine" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/health/vaccination/public',
        simLink: '/dashboard/health/vaccination',
        exact: true,
        inMenu: true,
        title: 'واکسیناسیون',
        children: [
          {
            keyIndex: '41',
            title: 'عمومی',
            link: '/dashboard/health/vaccination/public',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main: Vaccination,
          },
          {
            keyIndex: '42',
            title: 'استانی',
            link: '/dashboard/health/vaccination/province',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main: VaccinationProvince,
          },
        ],
      },
      {
        keyIndex: '5',
        icon: (active, disabled) => (
          <IconWrapperStyle name="transport" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/health/transport/public',
        simLink: '/dashboard/health/transport',
        exact: true,
        inMenu: true,
        title: 'حمل و نقل عمومی',
        children: [
          {
            keyIndex: '51',
            title: 'عمومی',
            link: '/dashboard/health/transport/public',
            icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
            main: Transport,
          },
          {
            keyIndex: '52',
            title: 'استانی',
            link: '/dashboard/health/transport/province',
            icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
            main: TransportProvince,
          },
          {
            keyIndex: '53',
            title: 'نظارت و بازرسی',
            link: '/dashboard/health/transport/monitoring',
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
          <IconWrapperStyle name="guild" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/health/guild/owner/public',
        simLink: '/dashboard/health/guild',
        exact: true,
        inMenu: true,
        title: 'اصناف',
        // disabled: true,
        children: [
          {
            keyIndex: '61',
            title: 'مالکان واحدهای صنفی',
            simLink: '/dashboard/health/guild/owner',
            link: '/dashboard/health/guild/owner/public',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            children: [
              {
                keyIndex: '611',
                title: 'عمومی',
                link: '/dashboard/health/guild/owner/public',
                icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
                main: GuildOwner,
              },
              {
                keyIndex: '612',
                title: 'استانی',
                link: '/dashboard/health/guild/owner/province',
                icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
                main: GuildOwnerProvince,
              },
            ],
          },
          {
            keyIndex: '62',
            title: 'کارکنان واحدهای صنفی',
            link: '/dashboard/health/guild/employee/public',
            simLink: '/dashboard/health/guild/employee',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            children: [
              {
                keyIndex: '621',
                title: 'عمومی',
                link: '/dashboard/health/guild/employee/public',
                icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
                main: GuildEmployee,
              },
              {
                keyIndex: '622',
                title: 'استانی',
                link: '/dashboard/health/guild/employee/province',
                icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
                main: GuildEmployeeProvince,
              },
            ],
          },
          {
            keyIndex: '63',
            title: 'نظارت و بازرسی',
            link: '/dashboard/health/guild/monitoring',
            icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
            main: GuildMonitoring,
          },
        ],
      },
      {
        keyIndex: '7',
        icon: (active, disabled) => (
          <IconWrapperStyle name="passenger" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/health/passenger/public',
        simLink: '/dashboard/health/passenger',
        exact: true,
        inMenu: true,
        title: 'مسافران',
        children: [
          {
            keyIndex: '1',
            title: 'عمومی',
            link: '/dashboard/health/passenger/public',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main: Passenger,
          },
          {
            keyIndex: '2',
            title: 'استانی',
            link: '/dashboard/health/passenger/province',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main: PassengerProvince,
          },
        ],
        // main: Passenger,
      },
      {
        keyIndex: '8',
        icon: (active, disabled) => (
          <IconWrapperStyle name="school" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/health/school/public',
        simLink: '/dashboard/health/school',
        exact: true,
        inMenu: true,
        // disabled: true,
        title: 'آموزش و پرورش',
        children: [
          {
            keyIndex: '1',
            title: 'عمومی',
            link: '/dashboard/health/school/public',
            icon: active => <IconWrapperStyle name="sub-school" active={active} />,
            main: School,
          },
          {
            keyIndex: '2',
            title: 'استانی',
            link: '/dashboard/health/school/province',
            icon: active => <IconWrapperStyle name="sub-school" active={active} />,
            main: SchoolProvince,
          },
        ],
        main: School,
      },
      {
        keyIndex: '9',
        icon: (active, disabled) => (
          <IconWrapperStyle name="recruitment" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/health/recruitment/public',
        simLink: '/dashboard/health/recruitment',
        exact: true,
        inMenu: true,
        title: 'امور استخدامی',
        children: [
          {
            keyIndex: '1',
            title: 'عمومی',
            link: '/dashboard/health/recruitment/public',
            icon: active => <IconWrapperStyle name="sub-recruitment" active={active} />,
            main: Recruitment,
          },
          {
            keyIndex: '2',
            title: 'استانی',
            link: '/dashboard/health/recruitment/province',
            icon: active => <IconWrapperStyle name="sub-recruitment" active={active} />,
            main: RecruitmentProvince,
          },
        ],
        main: Recruitment,
      },
      {
        keyIndex: '11',
        icon: (active, disabled) => (
          <IconWrapperStyle name="reports-requested" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/health/reports/requested',
        simLink: '/dashboard/health/reports/requested',
        exact: true,
        inMenu: true,
        title: 'لیست درخواست گزارش',
        main: ReportsRequested,
      },
    ],
  },
  {
    keyIndex: '2',
    // icon: active => <IconWrapperStyle name="dashboard" active={active} />,
    link: '/dashboard/guilds/bakery/public',
    simLink: '/dashboard/guilds',
    exact: true,
    inMenu: true,
    title: 'بازرسی اصناف',
    subMenu: [
      {
        keyIndex: '10',
        icon: (active, disabled) => (
          <IconWrapperStyle name="bakery" className="w-5 h-5" active={active} disabled={disabled} />
        ),
        link: '/dashboard/guilds/bakery/public',
        simLink: '/dashboard/guilds',
        exact: true,
        inMenu: true,
        title: 'داشبورد آرد و نان',
        children: [
          {
            keyIndex: '1',
            title: 'عمومی',
            link: '/dashboard/guilds/bakery/public',
            icon: active => <IconWrapperStyle name="sub-bakery" active={active} />,
            main: Bakery,
          },
          {
            keyIndex: '2',
            title: 'استانی',
            link: '/dashboard/guilds/bakery/province',
            icon: active => <IconWrapperStyle name="sub-bakery" active={active} />,
            main: BakeryProvince,
          },
          {
            keyIndex: '3',
            title: 'بازرسی آرد و نان',
            link: '/dashboard/guilds/bakery/monitring',
            icon: active => <IconWrapperStyle name="sub-bakery" active={active} />,
            main: BakeryMonitoring,
          },
        ],
        // disabled: true,
        main: Bakery,
      },
    ],
  },
  {
    keyIndex: '3',
    // icon: active => <IconWrapperStyle name="dashboard" active={active} />,
    link: '/dashboard/overview',
    exact: true,
    inMenu: true,
    title: 'زائرین اربعین',
    main: Overview,
    disabled: true,
  },
  {
    keyIndex: '0',
    icon: active => <IconWrapperStyle name="dashboard" active={active} />,
    link: '/dashboard/overview',
    exact: true,
    inMenu: false,
    title: 'جامع',
    main: Overview,
    disabled: true,
  },
  {
    keyIndex: '4',
    icon: active => <IconWrapperStyle name="citizenship" active={active} />,
    link: '/dashboard/citizenship',
    exact: true,
    inMenu: false,
    title: 'شهروندان',
    disabled: true,
    main: Citizens,
  },
];

export default routes;
