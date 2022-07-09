import {Dialog, Menu, Transition} from '@headlessui/react';
import {ReactComponent as DownIcon} from 'src/assets/images/icons/down.svg';
import avatar from 'src/assets/images/logos/avatar.svg';
import React, {Fragment, useState} from 'react';
import {useHistory} from 'react-router-dom';
import IconWrapper from 'src/components/IconWrapper';
import authenticateService from 'src/services/authentication.service';
import useLocalStorage from 'src/hooks/useLocalStorage';
import {IProfile} from 'src/models/authentication.model';
import ResetPassWordModal from './ResetPassWordModal';

const UserArea: React.FC<any> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resetIsOpen, setResetIsOpen] = useState<boolean>(false);
  const history = useHistory();
  const [profile] = useLocalStorage<IProfile>('ministers-userinfo', {
    birthday: '',
    categoryId: '',
    firstName: '',
    guildCode: '',
    id: '',
    lastName: '',
    nationalId: '',
    qrCode: '',
    roles: [],
    permissions: [],
  });

  const closeModal: () => void = () => {
    setIsOpen(false);
  };

  const openModal: () => void = () => {
    setIsOpen(true);
  };
  const openResetModal: () => void = () => {
    setResetIsOpen(true);
  };
  const handleLogout: (e: React.MouseEvent<HTMLElement>) => void = e => {
    e.stopPropagation();
    authenticateService.logout(history);
  };

  return (
    <>
      <Menu
        as="div"
        className="relative z-20 inline-block rounded-full px-5 py-1 text-left shadow-xl"
      >
        <div>
          <Menu.Button className="focus:outline-none inline-flex w-full items-center justify-center py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
            <img src={avatar} alt={profile.nationalId} className="h-5 w-5" />
            <span className="mx-3 truncate whitespace-nowrap">
              {window.localStorage.getItem('ministers-username') || ''}
            </span>
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
          <Menu.Items className="focus:outline-none absolute left-0 z-40 mt-2 w-40 max-w-xs origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 xl:right-0">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({active}) => (
                  <button
                    type="button"
                    onClick={openModal}
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
          </Menu.Items>
        </Transition>
      </Menu>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-opacity-90 bg-clip-padding backdrop-blur backdrop-filter" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative my-8 inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-10 align-middle shadow-2xl transition-all">
                <Dialog.Title as="h3" className="my-8 font-bold leading-6 text-gray-900">
                  آیا می‌خواهید از پنل مدیریت واحد‌های صنفی خود خارج شوید؟
                </Dialog.Title>

                <button
                  type="button"
                  className="absolute top-3 left-4 cursor-pointer text-gray-300"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="flex flex-col items-center justify-center">
                  <div className="mb-6 flex justify-center space-x-2 rtl:space-x-reverse">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center justify-center rounded bg-gray-900 px-12 py-2 text-sm text-white shadow-xl"
                    >
                      <span>بله</span>
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex items-center justify-center rounded border border-gray-900 bg-white px-12 py-2 text-sm text-gray-900"
                    >
                      <span>خیر</span>
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <ResetPassWordModal resetIsOpen={resetIsOpen} setResetIsOpen={setResetIsOpen} />
    </>
  );
};
export default UserArea;
