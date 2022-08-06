import {ReactElement} from 'react';
import {EACTIONTABLE} from 'src/constants/acctionTable.enum';
import Delete from '../../../assets/images/icons/user-delete.svg';
import Edit from '../../../assets/images/icons/user-edit.svg';

export interface IActionList {
  icon: ReactElement;
  title: string;
  type: string;
}

export const ActionList: Array<IActionList> = [
  {
    icon: <img alt="delete" src={Delete} className="h-4 w-4" />,
    title: 'حذف بازرس',
    type: EACTIONTABLE.DELETE,
  },
  {
    icon: <img alt="update" src={Edit} className="h-4 w-4" />,
    title: 'ویرایش اطلاعات',
    type: EACTIONTABLE.EDIT,
  },
];
