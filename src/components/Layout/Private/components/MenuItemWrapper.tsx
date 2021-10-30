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
            <NavLink to={route.link} className="flex items-center">
              {route.icon && route.icon(location.pathname.includes(route.link))}
              {route.title}
            </NavLink>
          )}
        </MenuItem>
      </>
    )
  );
};

export default MenuItemWrapper;
