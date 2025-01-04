import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, useState} from 'react';
import OtpInput from 'react-otp-input';
import toast from 'cogo-toast';
import DotLoading from 'src/components/DotLoading';
import {EERRORS} from 'src/constants/errors.enum';
import {useHistory} from 'react-router-dom';
import ResendActivationCode from './ResendActivationCode';

interface IProps {
  confirmOtpModal: boolean;
  setConfirmOtpModal: (data: boolean) => void;
  formData: any;
}
const ConfirmOtp: React.FC<IProps> = ({confirmOtpModal, setConfirmOtpModal, formData}) => {
  const history = useHistory();
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const closeModal: () => void = () => {
    setConfirmOtpModal(false);
  };

  const handleSubmit: (e: React.MouseEvent<HTMLElement>) => void = e => {
    e.stopPropagation();
  };

  return (
    <>
      <Transition appear show={confirmOtpModal} as={Fragment}>
        <Dialog as="div" className=" fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
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
              <div className="relative my-8 inline-block w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-10 align-middle shadow-2xl transition-all">
                <Dialog.Title as="h3" className="my-4 font-bold leading-6 text-gray-900">
                  برای تغییر کلمه عبور کد فعالسازی را وارد نمایید
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
                  <div className="mt-4 w-4 max-w-xs">
                    <div className="otp flex items-center justify-center space-x-4 text-sm rtl:space-x-reverse">
                      <OtpInput value={otp}  numInputs={6} isInputNum />
                    </div>
                  </div>

                  <ResendActivationCode setOtp={setOtp} formData={formData} />

                  <div className="mt-16 flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="button button--primary w-52 px-14"
                    >
                      <span>{!loading ? 'ثبت' : <DotLoading />}</span>
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
export default ConfirmOtp;
