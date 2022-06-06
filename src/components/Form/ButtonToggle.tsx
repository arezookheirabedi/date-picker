import React from 'react';
import checkActiveIcon from '../../assets/images/icons/check-active.svg';

const ButtonToggle = ({
  name = "",
  title = "",
  selected = false,
  onChange = () => {},
  defaultIcon = <></>,
  activeIcon,
  showCheckedIcon = false,
}: any) => {
  return (
    <>
      <label
        htmlFor={name}
        className="flex-grow flex items-center justify-between cursor-pointer"
      >
        <div
          className="w-full flex items-center shadow rounded p-4 py-2 space-x-2 rtl:space-x-reverse"
          style={{
            ...(selected
              ? {backgroundColor: '#0d9c7a', color: '#fff'}
              : {backgroundColor: '#ffffff'}),
          }}
        >
          <div className="truncate">
            <input
              type="checkbox"
              id={name}
              name={name}
              className="hidden"
              onChange={() => onChange(!selected)}
            />
            <img className="w-4 h-4" src={selected ? activeIcon : defaultIcon} alt="" />
          </div>
          <span className="truncate">{title}</span>
          {showCheckedIcon && selected && (
            <img className="w-2.5 h-2.5" src={checkActiveIcon} alt="" />
          )}
        </div>
      </label>
    </>
  );
};

export default ButtonToggle;
