import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import toast from 'cogo-toast';
import Alert from 'src/components/Alert';
import useLocalStorage from 'src/hooks/useLocalStorage';
import {IProfile} from 'src/models/authentication.model';
import MenuItem from './MenuItem';

const {Info} = Alert;

interface IProps {
  route: any;
}

const MenuItemWrapper: React.FC<IProps> = ({route}) => {
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

  // eslint-disable-next-line
  const [close, setClose] = useState<any>(true);
  const location = useLocation();
  const checkProvinceResources = profile.resources?.find(
    (item: any) => item.name === 'province'
  ) as {name: string; value: string[]} | undefined;

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
    <>
      {route.roles &&
      profile.roles &&
      route.roles.some((roleL1: string) => profile.roles.includes(roleL1))
        ? route.inMenu && (
            <>
              <MenuItem
                className={`py-3 px-3 pr-12 relative ${
                  route.disabled && 'text-gray-300 cursor-pointer'
                }`}
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
                          {route.subMenu.map((routeL2: any) => {
                            return (
                              <>
                                {routeL2.roles &&
                                profile.roles &&
                                routeL2.roles.some((roleL2: string) =>
                                  profile.roles.includes(roleL2)
                                ) ? (
                                  <li key={routeL2.keyIndex} className="text-gray-400">
                                    <NavLink
                                      to={routeL2.link}
                                      className="flex items-center pt-4 text-xs font-normal"
                                      isActive={(match: any, loc: any) => {
                                        return checkMenuIsActive(routeL2, loc);
                                      }}
                                    >
                                      {/* <div className="w-1 h-1 rounded-full bg-gray-400 ml-2" /> */}
                                      {routeL2.icon &&
                                        routeL2.icon(location.pathname.includes(routeL2.simLink))}
                                      {routeL2.title}
                                    </NavLink>
                                    {routeL2.children && (
                                      <ul
                                        className={`pr-10 ${
                                          checkMenuIsActive(routeL2)
                                            ? 'sub-menu-open'
                                            : 'sub-menu-close'
                                        }`}
                                      >
                                        {routeL2.children.map((routeL3: any) => {
                                          return (
                                            <>
                                              {routeL3.roles &&
                                              profile.roles &&
                                              routeL3.roles.some((roleL3: string) =>
                                                profile.roles.includes(roleL3)
                                              ) ? (
                                                <li
                                                  key={routeL3.keyIndex}
                                                  className="text-gray-400"
                                                >
                                                  <NavLink
                                                    to={`${routeL3.link}${
                                                      routeL3?.enTitle === 'province' &&
                                                      profile.resources &&
                                                      checkProvinceResources &&
                                                      checkProvinceResources?.value[0] !== '*'
                                                        ? `/?provinceName=${checkProvinceResources?.value[0]}`
                                                        : ''
                                                    }`}
                                                    className="flex items-center pt-3 text-xs font-normal"
                                                    isActive={(match: any, loc: any) => {
                                                      return checkMenuIsActive(routeL3, loc);
                                                    }}
                                                  >
                                                    <div className="w-1 h-1 rounded-full bg-gray-400 ml-2" />
                                                    {routeL3.icon &&
                                                      routeL3.icon(
                                                        location.pathname.includes(routeL3.link)
                                                      )}
                                                    {routeL3.title}
                                                  </NavLink>
                                                  {routeL3.children && (
                                                    <ul
                                                      className={`pr-5 ${
                                                        checkMenuIsActive(routeL3)
                                                          ? 'sub-menu-open'
                                                          : 'sub-menu-close'
                                                      }`}
                                                    >
                                                      {routeL3.children.map((routeL4: any) => {
                                                        return (
                                                          <>
                                                            {routeL4.roles &&
                                                            profile.roles &&
                                                            routeL4.roles.some((roleL4: string) =>
                                                              profile.roles.includes(roleL4)
                                                            ) ? (
                                                              <li
                                                                key={routeL4.keyIndex}
                                                                className="text-gray-400"
                                                              >
                                                                <NavLink
                                                                  to={routeL4.link}
                                                                  className="flex items-center pt-3 text-xs font-normal"
                                                                >
                                                                  <div className="w-1 h-1 rounded-full bg-gray-400 ml-2" />
                                                                  {routeL4.icon &&
                                                                    routeL4.icon(
                                                                      location.pathname.includes(
                                                                        routeL4.link
                                                                      )
                                                                    )}
                                                                  {routeL4.title}
                                                                </NavLink>
                                                              </li>
                                                            ) : (
                                                              ''
                                                            )}
                                                          </>
                                                        );
                                                      })}
                                                    </ul>
                                                  )}
                                                </li>
                                              ) : (
                                                ''
                                              )}
                                            </>
                                          );
                                        })}
                                      </ul>
                                    )}
                                  </li>
                                ) : (
                                  ''
                                )}
                              </>
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
        : ''}
    </>
  );
};

export default MenuItemWrapper;
