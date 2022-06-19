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
            <ul className="">
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
                            {/* <div className="w-1 h-1 rounded-full bg-gray-400 ml-2" /> */}
                            {r.icon && r.icon(location.pathname.includes(r.simLink))}
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
                                    {c.children && (
                                      <ul
                                        className={`pr-5 ${
                                          checkMenuIsActive(c) ? 'sub-menu-open' : 'sub-menu-close'
                                        }`}
                                      >
                                        {r.children.map((d: any) => {
                                          return (
                                            <li key={d.keyIndex} className="text-gray-400">
                                              <NavLink
                                                to={d.link}
                                                className="flex items-center pt-3 text-xs font-normal"
                                              >
                                                <div className="w-1 h-1 rounded-full bg-gray-400 ml-2" />
                                                {d.icon &&
                                                  d.icon(location.pathname.includes(d.link))}
                                                {d.title}
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
