import React, {useState} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {usePopper} from 'react-popper';
import {Portal} from 'react-portal';
import {v4 as uuidv4} from 'uuid';
import ActionIcon from 'src/assets/images/icons/table-action.svg';
import {EACTIONTABLE} from 'src/constants/acctionTable.enum';
// import {toPersianDigit} from 'src/helpers/utils';
import ActionButton from './ActionButton';
import Confirm from '../../Modal/DeleteModal';
import {ActionList, IActionList} from './ActionList';
import EditOrAddUser from './EditOrAddComponent';
import RestePassModal from './RestePassModal';

interface IProps {
  item: any;
  wrapperRef: any;
  shouldRefresh: (data: boolean) => void;
  refresh: boolean;
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
    RESET_PASS: false,
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
    Object.keys(modalsModified).forEach((key: string) => {
      const value = modalsModified[key];
      modalsModified = {
        ...modalsModified,
        [key]: key === type ? !value : value,
      };
    });
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
                          icon={list.icon}
                          title={list.title}
                          onClick={() => openModal(list.type)}
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
        shouldRefresh={shouldRefresh}
        refresh={refresh}
        item={{...item, deleted: 'CONFIRMED'}}
        content={
          <>
            <span>آیا از حذف کار بر با کد ملی</span>
            &nbsp;
            <span>مطمئن هستید؟</span>
          </>
        }
        isOpen={modals.DELETE}
        closeModal={() => closeModal(EACTIONTABLE.DELETE)}
        // eslint-disable-next-line no-console
        endPoint={() => console.log('helooo')}
      />
      <EditOrAddUser
        shouldRefresh={shouldRefresh}
        userData={item}
        isOpen={modals.EDIT}
        closeModal={() => closeModal(EACTIONTABLE.EDIT)}
        actionType="update"
        actionTitle="کاربر"
      />
      <RestePassModal
        item={item}
        isOpen={modals.RESET_PASS}
        closeModal={() => closeModal(EACTIONTABLE.RESET_PASS)}
        shouldRefresh={shouldRefresh}
        refresh={refresh}
      />
    </>
  );
};

export default Actions;
