import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, useState} from 'react';
import OtpInput from 'react-otp-input';
import cogoToast from 'cogo-toast';
import transportService from 'src/services/transport.service';
import download from '../../assets/images/icons/download.svg';
import DotLoading from '../DotLoading';

// eslint-disable-next-line react/prop-types
const ExportButton: React.FC<{params: {from: string; to: string}}> = ({params}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fetchCode, setFetchCode] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');

  const closeModal: () => void = () => {
    setIsOpen(false);
  };

  const requestExport = () => {
    setFetchCode(true);

    transportService
      .requestReport(params)
      .then(() => {
        cogoToast.success('کد به شماره همراه ارسال شد');
      })
      .catch(error => {
        cogoToast.error(error.message || 'خطایی در عملیات');
        closeModal();
      })
      .finally(() => {
        setFetchCode(false);
      });
  };

  const openModal: () => void = () => {
    requestExport();
    setIsOpen(true);
  };

  const handleOtpChange = (otpValue: any) => {
    setOtp(otpValue);
  };

  const handleSubmit: (e: React.MouseEvent<HTMLElement>) => void = e => {
    e.stopPropagation();
    setSubmitted(true);

    transportService
      .confirmRequestReport(otp)
      .then(() => {
        cogoToast.success('لینک دانلود به شماره همراه ارسال شد');
      })
      .catch(error => {
        cogoToast.error(error.message || 'خطایی در عملیات');
        // closeModal();
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="button button--primary px-5 flex space-x-2 rtl:space-x-reverse"
      >
        <img src={download} alt="" className="h-4" />
        <span>دانلود اطلاعات</span>
      </button>

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
              <div className="relative inline-block w-full max-w-xl p-10 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                <Dialog.Title as="h3" className="font-bold leading-6 text-gray-900 my-4">
                  برای دریافت اطلاعات کد فعالسازی را وارد نمایید
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
                  <div className="mt-4 w-4 max-w-xs">
                    <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-sm otp">
                      <OtpInput value={otp} onChange={handleOtpChange} numInputs={6} isInputNum />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={submitted || fetchCode}
                    onClick={requestExport}
                    className="flex items-center justify-center text-xs text-primary-500 border-b border-primary-500 mt-4"
                  >
                    <span>ارسال مجدد کد</span>
                  </button>

                  <div className="mt-16 flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitted || fetchCode}
                      className="button button--primary px-14 w-52"
                    >
                      <span>{!submitted && !fetchCode ? 'ثبت' : <DotLoading />}</span>
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

export default ExportButton;
