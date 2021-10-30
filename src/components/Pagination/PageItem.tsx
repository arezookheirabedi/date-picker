import React, {ReactNode} from 'react';
import {NavLink, useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';

const DisableItem = styled.span``;
const Item = styled(NavLink)``;

interface IProps {
  label?: number | string | ReactNode;
  value: number;
  currentPage: number;
  disabled?: boolean;
  shadow?: boolean;
  children?: any;
}

const PageItem: React.FC<IProps> = props => {
  const {url} = useRouteMatch();

  const {disabled, currentPage, value, label, shadow = true} = props;

  return disabled ? (
    <DisableItem
      className={`inline-flex justify-center rounded-md ${shadow && 'shadow'} ${
        currentPage === value
          ? 'bg-primary-300 hover:bg-primary-500 text-white dark:bg-white dark:hover:bg-white dark:hover:border-transparent dark:text-primary-300'
          : 'bg-gray-100 dark:border-gray-200 text-primary-300 dark:bg-primary-300 dark:text-light'
      }  py-1 px-2 min-w-7 cursor-not-allowed select-none`}
    >
      {label}
    </DisableItem>
  ) : (
    <Item
      to={`${url}?page=${value}`}
      className={`inline-flex justify-center rounded-md ${shadow && 'shadow'} ${
        currentPage === value
          ? 'bg-primary-500 hover:bg-primary-700 border-transparent text-white dark:border-primary-500 dark:bg-dark dark:hover:bg-primary-800 dark:text-primary-500 dark:hover:text-light dark:hover:border-transparent cursor-default'
          : 'bg-white dark:border-gray-500 hover:bg-gray-100 dark:bg-primary-600 dark:hover:bg-primary-600 text-primary-500 dark:text-light cursor-pointer'
      }  py-1 px-2 min-w-7 select-none`}
    >
      {label}
    </Item>
  );
};

export default PageItem;
