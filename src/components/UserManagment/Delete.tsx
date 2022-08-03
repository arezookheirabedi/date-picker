import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

interface IProps {
  id: string;
  name: string;
  isOpen: boolean;
  closeModal: () => void;
}

const Button: React.FC<{ onClick: any }> = ({ onClick: handleClick }) => {

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="group flex w-full items-center px-2 py-2 text-sm hover:bg-gray-100"
      >
        delete
      </button>
    </>
  );
};

const Modal: React.FC<IProps> = ({ isOpen, closeModal }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitted, setSubmitted] = useState(false);



  const onSubmit = async () => {
  
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-500/50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
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
              <div className="my-8 inline-block w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all rtl:text-right">
                <Dialog.Title
                  as="h3"
                  className="p-6 text-lg font-black leading-6 text-gray-900"
                >
                  pages__services__deleteSecurity
                </Dialog.Title>

                <div className="">
                  <div className="space-y-6 p-6 pt-0 text-sm">
                    deleteQuestion
                  </div>

                  <div className="flex justify-end space-x-3 px-6 py-4 rtl:space-x-reverse">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center space-x-3 rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold leading-5 text-white hover:bg-sky-400 focus:outline-none focus:ring focus:ring-sky-300 active:bg-sky-600 disabled:opacity-50 rtl:space-x-reverse"
                      onClick={onSubmit}
                    >
                      {submitted && (
                        <svg
                          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white motion-reduce:hidden"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth={4}
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      )}
                      <span>yes</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center space-x-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold leading-5 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-100 active:bg-gray-100 disabled:opacity-50 rtl:space-x-reverse"
                      onClick={closeModal}
                    >
                      no
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

const userDelete = {
  Button,
  Modal,
};

export default userDelete;