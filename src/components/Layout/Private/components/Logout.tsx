import React, {HTMLProps, Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import authenticateService from 'src/services/authentication.service';
import {useHistory} from 'react-router-dom';
import {IconWrapperStyle} from '../../../IconWrapper';
import MenuItem from './MenuItem';

interface IProps extends HTMLProps<HTMLDivElement> {
  isMenuItem?: boolean;
  active?: boolean;
}

const Logout: React.FC<IProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const history = useHistory();

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
      <MenuItem className="pb-3 px-3 pr-12 relative" onClick={openModal}>
        <div className="flex items-center text-gray-400 cursor-pointer pt-3 border-t">
          <IconWrapperStyle name="exit" />
          خروج
        </div>
      </MenuItem>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-y-auto z-50" onClose={closeModal}>
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

export default Logout;
