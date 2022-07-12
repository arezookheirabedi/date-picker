import styled from 'styled-components';
import React from 'react';
import dashboardIcon from '../assets/images/icons/dashboard.svg';
import dashboardActiveIcon from '../assets/images/icons/dashboard-active.svg';
import citizenshipIcon from '../assets/images/icons/citizenship.svg';
import citizenshipActiveIcon from '../assets/images/icons/citizenship-active.svg';
import servicePortIcon from '../assets/images/icons/service-port.svg';
import servicePortActiveIcon from '../assets/images/icons/service-port-active.svg';
import vaccineIcon from '../assets/images/icons/vaccine.svg';
import vaccineActiveIcon from '../assets/images/icons/vaccine-active.svg';
import transportIcon from '../assets/images/icons/transport.svg';
import transportActiveIcon from '../assets/images/icons/transport-active.svg';
import bakeryIcon from '../assets/images/icons/bakery.svg';
import bakeryActiveIcon from '../assets/images/icons/bakery-active.svg';
import passengerIcon from '../assets/images/icons/passenger.svg';
import passengerActiveIcon from '../assets/images/icons/passenger-active.svg';
import guildIcon from '../assets/images/icons/guild.svg';
import guildActiveIcon from '../assets/images/icons/guild-active.svg';
import schoolIcon from '../assets/images/icons/school.svg';
import schoolActiveIcon from '../assets/images/icons/school-active.svg';
import recruitmentIcon from '../assets/images/icons/recruitment.svg';
import recruitmentActiveIcon from '../assets/images/icons/recruitment-active.svg';
import reportsRequestedIcon from '../assets/images/icons/reports-requested.svg';
import reportsRequestedActiveIcon from '../assets/images/icons/reports-requested-active.svg';
import reportsFlourIcon from '../assets/images/icons/reports-flour.svg';
import passwordResetIcon from '../assets/images/icons/password-reset-active.svg';
import reportsFlourActiveIcon from '../assets/images/icons/reports-flour-active.svg';
import exitIcon from '../assets/images/icons/exit.svg';
import exitActiveIcon from '../assets/images/icons/exit-active.svg';

const icons = [
  {
    name: 'dashboard',
    icon: dashboardIcon,
    disableIcon: dashboardIcon,
    activeIcon: dashboardActiveIcon,
  },
  {
    name: 'citizenship',
    icon: citizenshipIcon,
    disableIcon: citizenshipIcon,
    activeIcon: citizenshipActiveIcon,
  },
  {
    name: 'service-port',
    icon: servicePortIcon,
    disableIcon: servicePortIcon,
    activeIcon: servicePortActiveIcon,
  },
  {name: 'vaccine', icon: vaccineIcon, disableIcon: vaccineIcon, activeIcon: vaccineActiveIcon},
  {
    name: 'transport',
    icon: transportIcon,
    disableIcon: transportIcon,
    activeIcon: transportActiveIcon,
  },
  {
    name: 'bakery',
    icon: bakeryIcon,
    disableIcon: bakeryIcon,
    activeIcon: bakeryActiveIcon,
  },
  {
    name: 'guild',
    icon: guildIcon,
    disableIcon: guildIcon,
    activeIcon: guildActiveIcon,
  },
  {
    name: 'passenger',
    icon: passengerIcon,
    disableIcon: passengerIcon,
    activeIcon: passengerActiveIcon,
  },
  {
    name: 'school',
    icon: schoolIcon,
    disableIcon: schoolIcon,
    activeIcon: schoolActiveIcon,
  },
  {
    name: 'recruitment',
    icon: recruitmentIcon,
    disableIcon: recruitmentIcon,
    activeIcon: recruitmentActiveIcon,
  },
  {
    name: 'reports-requested',
    icon: reportsRequestedIcon,
    disableIcon: reportsRequestedIcon,
    activeIcon: reportsRequestedActiveIcon,
  },
  {
    name: 'reports-flour',
    icon: reportsFlourIcon,
    disableIcon: reportsFlourIcon,
    activeIcon: reportsFlourActiveIcon,
  },
  {
    name: 'reset-password',
    icon: passwordResetIcon,
    disableIcon: passwordResetIcon,
    activeIcon: passwordResetIcon,
  },
  {name: 'exit', icon: exitIcon, disableIcon: exitIcon, activeIcon: exitActiveIcon},
];

interface IProps {
  name: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

const IconWrapper: React.FC<IProps> = props => {
  // eslint-disable-next-line
  const {name, active = false, disabled = false, className = '', ...rest} = props;

  if (!name || !name.length) return <></>;

  const item = icons.find(icon => icon.name === name.toLowerCase());

  if (!item) return <></>;

  let {icon} = item;

  if (disabled) icon = item.disableIcon;
  else if (active) icon = item.activeIcon;

  // @ts-ignore
  return <img {...rest} className={className} src={icon} alt="" />;
};

export default IconWrapper;

export const IconWrapperStyle = styled(IconWrapper)`
  margin-left: 0.75rem !important;
`;
