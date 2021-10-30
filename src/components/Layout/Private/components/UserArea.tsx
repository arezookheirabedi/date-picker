import {Dialog, Menu, Transition} from '@headlessui/react';
import {ReactComponent as DownIcon} from 'src/assets/images/icons/down.svg';
import avatar from 'src/assets/images/logos/avatar.svg';
import React, {Fragment, useState} from 'react';
import {useHistory} from 'react-router-dom';
import IconWrapper from 'src/components/IconWrapper';
import authenticateService from 'src/services/authentication.service';
import useLocalStorage from 'src/hooks/useLocalStorage';
import {IProfile} from 'src/models/authentication.model';

const UserArea: React.FC<any> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const history = useHistory();
  const [profile] = useLocalStorage<IProfile>('userinfo', {
    birthday: '',
    categoryId: '',
    firstName: '',
    guildCode: '',
    id: '',
    lastName: '',
    nationalId: '',
    qrCode: '',
  });

  const closeModal: () => void = () => {
    setIsOpen(false);
  };

  const openModal: () => void = () => {
    setIsOpen(true);
  };

  const handleLogout: (e: React.MouseEvent<HTMLElement>) => void = e => {
    e.stopPropagation();
    authenticateService.logout(history);
  };

  return (
    <>
      <Menu as="div" className="relative z-20 inline-block text-left shadow-xl rounded-full px-5 py-1">
        <div>
          <Menu.Button className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
            <img src={avatar} alt={profile.nationalId} className="w-5 h-5" />
            <span className="mx-3 whitespace-nowrap truncate">{profile.nationalId || "نگین آساده"}</span>
            <DownIcon className="h-2 w-2.5 mr-2" />
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
          <Menu.Items className="z-40 absolute left-0 xl:right-0 w-40 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({active}) => (
                  <button
                    type="button"
                    onClick={openModal}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <IconWrapper className="w-4 h-4 ml-3" name="exit" />
                    خروج
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-y-auto z-50" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="all"
              enterTo="all"
              leave="ease-in duration-200"
              leaveFrom="all"
              leaveTo="all"
            >
              <Dialog.Overlay className="fixed inset-0 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-90" />
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
              <div className="relative inline-block w-full max-w-lg p-10 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                <Dialog.Title as="h3" className="font-bold leading-6 text-gray-900 my-8">
                  آیا می‌خواهید از پنل مدیریت واحد‌های صنفی خود خارج شوید؟
                </Dialog.Title>

                <button
                  type="button"
                  className="absolute top-3 left-4 text-gray-300 cursor-pointer"
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

                <div className="flex flex-col justify-center items-center">
                  <div className="mb-6 flex justify-center space-x-2 rtl:space-x-reverse">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center justify-center bg-gray-900 shadow-xl rounded px-12 text-sm py-2 text-white"
                    >
                      <span>بله</span>
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex items-center justify-center rounded px-12 text-sm py-2 bg-white border border-gray-900 text-gray-900"
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
    </>
  );
};
export default UserArea;
