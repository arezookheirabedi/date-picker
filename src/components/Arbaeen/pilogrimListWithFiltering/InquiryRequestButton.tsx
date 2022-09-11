import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import dayjs from 'dayjs';
import {toPersianDigit} from 'src/helpers/utils';
import InquiryForm from './InquiryForm';

const initialAddInqueryResponse = {
  birthDate: '',
  departureDate: '',
  departureDestinationBorder: '',
  departureOriginCity: '',
  departureOriginProvince: '',
  departureType: '',
  dosesCount: 0,
  fatherName: '',
  firstName: '',
  gender: '',
  hasCovid: false,
  hasPassport: true,
  lastDose: 0,
  lastDoseDate: null,
  lastName: '',
  lastTestResult: '',
  lastTestResultDate: null,
  mobileNumber: '',
  nationalId: '',
  passportExpirationDate: '',
  passportNumber: '',
  qrCode: null,
  returnDate: '',
  returnDestinationCity: '',
  returnDestinationProvince: '',
  returnOriginBorder: '',
  returnType: '',
};
const InquiryRequestButton: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>(initialAddInqueryResponse);

  const closeModal: () => void = () => {
    setIsOpen(false);
  };

  const openModal: () => void = () => {
    setIsOpen(true);
  };

  return (
    <>
      <InquiryForm openModal={openModal} setData={setData} />

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
                  <span> اطلاعات زائر با کد ملی:</span>
                  <span className="px-1">
                    {data?.nationalId && toPersianDigit(`${data?.nationalId}`)}
                  </span>
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

                <div className="flex flex-col items-center justify-center   ">
                  <div className=" mt-2 ">
                    <div className=" border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        <span className="font-semibold text-[#AAA9A9]"> نام و نام خانوادگی:</span>
                        <span className="px-1 font-semibold">
                          {data && data.firstName ? data.firstName : '-'}
                          &nbsp;
                          {data && data.lastName ? data.lastName : '-'}
                        </span>
                      </div>
                    </div>
                    <div className=" border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        <span className="font-semibold text-[#AAA9A9]">شماره موبایل:</span>
                        <span className="px-1 font-semibold">
                          {data?.mobileNumber ? toPersianDigit(`${data?.mobileNumber}`) : '-'}
                        </span>
                      </div>
                    </div>
                    <div className=" items-center justify-center border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        {' '}
                        <span className="font-semibold text-[#AAA9A9]"> تاریخ عزیمت:</span>
                        {data?.departureDate ? (
                          <span className=" px-1 font-semibold">
                            {dayjs(data.departureDate)
                              .calendar('jalali')
                              .format('DD-MM-YYYY')
                              .toPersianDigits()}
                          </span>
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                    <div className=" items-center justify-center border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        {' '}
                        <span className="font-semibold text-[#AAA9A9]"> تاریخ برگشت:</span>
                        {data?.returnDate ? (
                          <span className=" px-1 font-semibold">
                            {dayjs(data.returnDate)
                              .calendar('jalali')
                              .format('DD-MM-YYYY')
                              .toPersianDigits()}
                          </span>
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                    <div className=" border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        <span className="font-semibold text-[#AAA9A9]"> مرز خروجی:</span>
                        <span className="px-1 font-semibold">
                          {data && data.departureDestinationBorder
                            ? data.departureDestinationBorder
                            : '-'}
                        </span>
                      </div>
                    </div>
                    <div className=" border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        <span className="font-semibold text-[#AAA9A9]"> مرز ورودی:</span>
                        <span className="px-1 font-semibold">
                          {data && data.returnOriginBorder ? data.returnOriginBorder : '-'}
                        </span>
                      </div>
                    </div>
                    <div className=" border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        <span className="font-semibold text-[#AAA9A9]"> نوع عزیمت:</span>
                        <span className="px-1 font-semibold">
                          {data && data.departureType ? data.departureType : '-'}
                        </span>
                      </div>
                    </div>
                    <div className=" border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        <span className="font-semibold text-[#AAA9A9]"> نوع برگشت:</span>
                        <span className="px-1 font-semibold">
                          {data && data.returnType ? data.returnType : '-'}
                        </span>
                      </div>
                    </div>
                    <div className=" border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        <span className="font-semibold text-[#AAA9A9]"> شهر:</span>
                        <span className="px-1 font-semibold">
                          {data && data.departureOriginCity ? data.departureOriginCity : '-'}
                        </span>
                      </div>
                    </div>{' '}
                    <div className=" border-b  border-gray-300 py-4 text-sm rtl:space-x-reverse">
                      <div>
                        <span className="font-semibold text-[#AAA9A9]"> استان:</span>
                        <span className="px-1 font-semibold">
                          {data && data.departureOriginProvince
                            ? data.departureOriginProvince
                            : '-'}
                        </span>
                      </div>
                    </div>
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
export default InquiryRequestButton;
