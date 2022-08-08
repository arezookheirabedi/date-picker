import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, useState} from 'react';
// import toast from 'cogo-toast';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  content: JSX.Element;
  endPoint: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Delete: React.FC<IProps> = ({isOpen, content, closeModal, endPoint}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);

  // const handelSubmit=async () =>{try {
  // //   setLoading(true);
  // //   const res=await endPoint()

  // // } catch (error) {
  // //        toast.error('خطایی در عملیات');

  // // }finally{
  // //   setLoading(false);
  // // }
  // }

  return (
    <>
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
                  {content}
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
                      // onClick={handelSubmit}
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
    </>
  );
};

export default Delete;
