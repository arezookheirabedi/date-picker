import React, {useState} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {usePopper} from 'react-popper';
import {Portal} from 'react-portal';
import {v4 as uuidv4} from 'uuid';
import ActionIcon from 'src/assets/images/icons/table-action.svg';
import {EACTIONTABLE} from 'src/constants/acctionTable.enum';
import {toPersianDigit} from 'src/helpers/utils';
import EINSPECTORSTATUS from 'src/constants/incpectorStatus.enum';
import fsServices from 'src/services/fs.service';
import ActionButton from './ActionButton';
import Confirm from '../../../components/Modal/DeleteModal';
import {ActionList, IActionList} from './ActionList';
import AddOrUpdateInseptor from '../../../components/UserManagment/TableAction/EditOrAddComponent';

interface IProps {
  refresh: boolean;
  item: any;
  wrapperRef: any;
  shouldRefresh: (data: boolean) => void;
}

interface IModals {
  [name: string]: boolean;
}

const Actions: React.FC<IProps> = ({item, shouldRefresh, refresh}) => {
  const popperElRef = React.useRef<any>(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [modals, setModals] = useState<IModals>({
    DELETE: false,
    EDIT: false,
    CONFIRM_INSPECTOR: false,
  });
  const element = document.querySelector('body');

  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          // @ts-ignore
          boundary: element,
          altBoundary: true,
        },
      },
    ],
  });

  const openModal = (type: string) => {
    let modalsModified: IModals = {...modals};
    Object.keys(modalsModified).forEach(
      // eslint-disable-next-line
      (key: string) => {
        const value = modalsModified[key];
        modalsModified = {
          ...modalsModified,
          [key]: key === type ? !value : false,
        };
      }
    );
    setModals(modalsModified);
  };

  const closeModal = (type: string) => {
    let modalsModified: IModals = {...modals};
    Object.keys(modalsModified).forEach(
      // eslint-disable-next-line
      (key: string) => {
        const value = modalsModified[key];
        modalsModified = {
          ...modalsModified,
          [key]: key === type ? !value : value,
        };
      }
    );
    setModals(modalsModified);
  };

  return (
    <>
      <Popover as="div" className="relative flex items-center">
        <Popover.Button
          // @ts-ignore
          ref={setReferenceElement}
          className="inline-flex items-center justify-center text-xs font-medium focus:outline-none"
        >
          <img alt="moreAction" src={ActionIcon} className="h-4 w-4" />
        </Popover.Button>

        <Portal>
          <div ref={popperElRef} style={styles.popper} {...attributes.popper}>
            <Transition
              as="div"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              beforeEnter={() => setPopperElement(popperElRef.current)}
              afterLeave={() => setPopperElement(null)}
            >
              <Popover.Panel
                static
                className="absolute right-6 left-auto bottom-0 z-10 mt-2 w-40 origin-top-left divide-y divide-gray-100 rounded-md bg-white text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rtl:left-6 rtl:right-auto rtl:origin-top-right"
              >
                <div className="py-1">
                  <div>
                    {ActionList.map((list: IActionList) => {
                      return (
                        <ActionButton
                          key={uuidv4()}
                          icon={
                            list.type === EACTIONTABLE.CONFIRM_INSPECTOR &&
                            item.activityStatus === EINSPECTORSTATUS.UNCONFIRMED
                              ? list.changIcon!
                              : list.icon
                          }
                          title={list.title}
                          onClick={() => openModal(list.type)}
                          disabled={
                            list.type === EACTIONTABLE.CONFIRM_INSPECTOR &&
                            item.activityStatus !== EINSPECTORSTATUS.UNCONFIRMED
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        </Portal>
      </Popover>

      <Confirm
        item={{...item, deleted: true}}
        content={
          <>
            <span>آیا از حذف بازرس با کد ملی</span>
            <span className="text-cyan-400">
              {' '}
              &nbsp;{item.nationalId && toPersianDigit(item.nationalId)}
            </span>
            &nbsp;
            <span>مطمئن هستید؟</span>
          </>
        }
        isOpen={modals.DELETE}
        closeModal={() => closeModal(EACTIONTABLE.DELETE)}
        endPoint={fsServices.updateInspector}
        shouldRefresh={shouldRefresh}
        refresh={refresh}
      />
      <AddOrUpdateInseptor
        shouldRefresh={shouldRefresh}
        userData={item}
        isOpen={modals.EDIT}
        closeModal={() => closeModal(EACTIONTABLE.EDIT)}
        actionType="update"
        actionTitle="بازرس"
      />
      <Confirm
        shouldRefresh={shouldRefresh}
        refresh={refresh}
        content={
          <>
            <span>آیا از تایید بازرس با کد ملی</span>
            <span className="text-cyan-400">
              &nbsp;{item.nationalId && toPersianDigit(item.nationalId)}
            </span>
            &nbsp;
            <span>مطمئن هستید؟ &nbsp;</span>
          </>
        }
        isOpen={modals.CONFIRM_INSPECTOR}
        closeModal={() => closeModal(EACTIONTABLE.CONFIRM_INSPECTOR)}
        endPoint={fsServices.updateInspector}
        item={{...item, activityStatus: 'CONFIRMED'}}
      />
    </>
  );
};

export default Actions;
