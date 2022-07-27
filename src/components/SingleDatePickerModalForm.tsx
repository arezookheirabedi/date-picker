import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
// import {Calendar} from "react-modern-calendar-datepicker";
import {Calendar} from '@hassanmojab/react-modern-calendar-datepicker';

const DatePickerModel: React.FC<any> = ({
  setSelectedDay,
  selectedDay,
  showDatePicker,
  setShowDatePicker,
  min = null,
  max = null,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [innerDay, setInnerDay] = useState(selectedDay || null) as any;

  const closeModal: () => void = () => {
    setShowDatePicker(false);
  };

  const setDate = (e: any) => {
    if (e) {
      setError(null);
    }
    // eslint-disable-next-line
    setInnerDay(e);
  };

  const confirmDate = () => {
    if (!innerDay) {
      setError('لطفا بازه زمانی را درست انتخاب کنید.');
      return null;
    }
    setSelectedDay(innerDay);
    return closeModal();
  };

  const renderFooterDatePicker = () => {
    return (
      <div className="u-width-80 u-mx-auto u-d-flex u-justify-content-s-b u-mb-1">
        <button
          type="button"
          className="button button--primary mx-auto w-1/3"
          onClick={confirmDate}
        >
          تایید
        </button>
      </div>
    );
  };

  return (
    <>
      <Transition appear show={showDatePicker} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
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
                <Calendar
                  value={innerDay}
                  calendarClassName="calendar-modal"
                  onChange={setDate}
                  maximumDate={max}
                  minimumDate={min}
                  renderFooter={renderFooterDatePicker}
                  calendarRangeStartClassName="calendar-range-start"
                  calendarRangeBetweenClassName="calendar-range-between"
                  calendarRangeEndClassName="calendar-range-end"
                  shouldHighlightWeekends
                  locale="fa"
                />
                {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DatePickerModel;
