import {ReactElement} from 'react';
import {EACTIONTABLE} from 'src/constants/acctionTable.enum';
import Delete from '../../../assets/images/icons/user-delete.svg';
import Edit from '../../../assets/images/icons/user-edit.svg';
// import ResetPass from '../../../assets/images/icons/reset-pass.svg';
// import Confirm from '../../../assets/images/icons/inspectoere-confirm.svg';

export interface IActionList {
  icon: ReactElement;
  changIcon?: ReactElement;
  title: string;
  type: EACTIONTABLE;
}

export const ActionList: Array<IActionList> = [
  // {
  //   icon: <>notaeed</>,
  //   changIcon: <img alt="confirm" src={Confirm} className="h-4 w-4" />,
  //   title: 'تایید بازرس',
  //   type: EACTIONTABLE.CONFIRM_INSPECTOR,
  // },
  {
    icon: <img alt="update" src={Edit} className="h-4 w-4" />,
    title: 'ویرایش اطلاعات',
    type: EACTIONTABLE.EDIT,
  },

  {
    icon: <img alt="delete" src={Delete} className="h-4 w-4" />,
    title: 'حذف بازرس',
    type: EACTIONTABLE.DELETE,
  },
];
