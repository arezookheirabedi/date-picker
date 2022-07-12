import {ReactElement} from 'react';

export interface IRoute {
  keyIndex: string;
  icon?: (active: boolean, disabled?: boolean) => ReactElement;
  title: string;
  enTitle?: string;
  link?: string;
  simLink?: string;
  keyString?: string;
  exact?: boolean;
  disabled?: boolean;
  inMenu?: boolean;
  roles: string[];
  showGuildList?: boolean;
  deleteable?: boolean;
  children?: IRoute[];
  subMenu?: IRoute[];
  main?: (props: any) => any;
}
