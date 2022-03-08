import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import toast from 'cogo-toast';
import Alert from 'src/components/Alert';
import MenuItem from './MenuItem';

const {Info} = Alert;

interface IProps {
  route: any;
}

const MenuItemWrapper: React.FC<IProps> = ({route}) => {
  // eslint-disable-next-line
  const [close, setClose] = useState<any>(true);
  const location = useLocation();

  const handleDisabled: (message: string) => void = message => {
    toast.info(<Info message={message} />, {
      toastContainerID: 'ct-p-0',
      renderIcon: () => '',
    });
  };

  useEffect(() => {
    if (location.pathname.includes(route.link)) {
      setClose(false);
    } else setClose(true);
  }, [location]);

  const checkMenuIsActive = (routeArg: any, locationArg: any = location) => {
    return routeArg.simLink
      ? locationArg.pathname.includes(routeArg.simLink)
      : locationArg.pathname.includes(routeArg.link);
  };

  return (
    route.inMenu && (
      <>
        <MenuItem
          className={`py-3 px-3 pr-12 relative ${route.disabled && 'text-gray-300 cursor-pointer'}`}
        >
          {route.disabled ? (
            <button
              type="button"
              className="flex items-center"
              onClick={() =>
                handleDisabled(`سامانه ${route.title} به زودی به بهره برداری خواهد رسید`)
              }
            >
              {route.icon && route.icon(location.pathname === route.link, true)}
              {route.title}
            </button>
          ) : (
            <ul  className="">
              <li>
                <NavLink
                  to={route.link}
                  className="flex items-center"
                  isActive={(match: any, loc: any) => {
                    return checkMenuIsActive(route, loc);
                  }}
                >
                  {route.icon && route.icon(checkMenuIsActive(route))}
                  {route.title}
                </NavLink>
                {route.subMenu && (
                  <ul
                    className={`pr-10 ${
                      checkMenuIsActive(route) ? 'sub-menu-open' : 'sub-menu-close'
                    }`}
                  >
                    {route.subMenu.map((r: any) => {
                      return (
                        <li key={r.keyIndex} className="text-gray-400">
                          <NavLink
                            to={r.link}
                            className="flex items-center pt-3 text-xs font-normal"
                            isActive={(match: any, loc: any) => {
                              return checkMenuIsActive(r, loc);
                            }}
                          >
                            <div className="w-1 h-1 rounded-full bg-gray-400 ml-2" />
                            {r.icon && r.icon(location.pathname.includes(r.link))}
                            {r.title}
                          </NavLink>
                          {r.children && (
                            <ul
                              className={`pr-10 ${
                                checkMenuIsActive(r) ? 'sub-menu-open' : 'sub-menu-close'
                              }`}
                            >
                              {r.children.map((c: any) => {
                                return (
                                  <li key={c.keyIndex} className="text-gray-400">
                                    <NavLink
                                      to={c.link}
                                      className="flex items-center pt-3 text-xs font-normal"
                                    >
                                      <div className="w-1 h-1 rounded-full bg-gray-400 ml-2" />
                                      {c.icon && c.icon(location.pathname.includes(c.link))}
                                      {c.title}
                                    </NavLink>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </ul>
          )}
        </MenuItem>
      </>
    )
  );
};

export default MenuItemWrapper;
/*  
  {
    keyIndex: '5',
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
            main: Guild,
          },
          {
            keyIndex: '2',
            title: 'استانی',
            link: '/dashboard/guild/SocialSecurity/province',
            icon: active => <IconWrapperStyle name="sub-vaccination" active={active} />,
            main: GuildProvince,
          },
          {
            keyIndex: '3',
            title: 'نظارت و بازرسی',
            link: '/dashboard/guild/SocialSecurity/monitoring',
            icon: active => <IconWrapperStyle name="sub-transport" active={active} />,
            main: GuildMonitoring,
          },
        ],
      },

    ],
  }, */