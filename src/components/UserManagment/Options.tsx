/* eslint-disable @typescript-eslint/no-unused-vars */
import {Menu, Transition} from '@headlessui/react';
import {ReactComponent as DownIcon} from 'src/assets/images/icons/down.svg';
import React, {Fragment, useState} from 'react';
import IconWrapper from 'src/components/IconWrapper';
import DeleteModal from './Delete';
import EditButton from './EditButton';

const Options: React.FC<{userData:any}> = ({userData}) => {
  const [resetIsOpen, setResetIsOpen] = useState<boolean>(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);

  const openResetModal: () => void = () => {
    setResetIsOpen(true);
  };
  const openDeleteModal: () => void = () => {
    setDeleteIsOpen(true);
  };

  return (
    <>
      <Menu
        as="div"
        className="relative z-20 inline-block rounded-full px-5 py-1 text-left shadow-xl"
      >
        <div>
          <Menu.Button className="focus:outline-none inline-flex w-full items-center justify-center py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-1">
           
          meno
            <DownIcon className="mr-2 h-2 w-2.5" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* <Menu.Items className="focus:outline-none absolute left-0 z-40 mt-2 w-40 max-w-xs origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 xl:right-0">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({active}) => (
                  <button
                    type="button"
                    onClick={openDeleteModal}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                  >
                    <IconWrapper className="ml-3 h-4 w-4" name="exit" />
                    خروج
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({active}) => (
                  <button
                    type="button"
                    onClick={openResetModal}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                  >
                    <IconWrapper className="ml-3  h-5 w-5" name="reset-password" />
                    تغییر کلمه عبور
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items> */}
        </Transition>
      </Menu>
      {/* <DeleteModal deleteIsOpen={deleteIsOpen} setDeleteIsOpen={setDeleteIsOpen} /> */}
      <EditButton isOpen={resetIsOpen} setIsOpen={setResetIsOpen} userData={userData}/>
    </>
  ); 
};
export default Options;
