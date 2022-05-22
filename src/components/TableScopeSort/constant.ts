import {ReactNode} from 'react';

export interface IColumn {
  sortable?: boolean;

  name: string;
  key: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
  colSpan?: number;
  width?: string | number;
  render?: (text: string, record: any, index: number, page: number) => ReactNode;
}
export interface ISelect {
  label: string;
  value: any;
}
export type OrderDirection = 'ASC' | 'DESC' | undefined;
