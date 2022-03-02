import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
// import {Calendar} from "react-modern-calendar-datepicker";
import {Calendar} from '@hassanmojab/react-modern-calendar-datepicker';

const DatePickerModel: React.FC<any> = ({
  setSelectedDayRange,
  selectedDayRange,
  showDatePicker,
  setShowDatePicker,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [innerDayRange, setInnerDayRange] = useState({
    from: selectedDayRange.from,
    to: selectedDayRange.to,
  }) as any;

  const closeModal: () => void = () => {
    setShowDatePicker(false);
  };

  const setDate = (e: any) => {
    if (e.from && e.to) {
      setError(null);
    }
    // eslint-disable-next-line
    setInnerDayRange({...setInnerDayRange, ['from']: e.from, ['to']: e.to});
  };

  const confirmDate = () => {
    if (!innerDayRange.from || !innerDayRange.to) {
      setError('لطفا بازه زمانی را درست انتخاب کنید.');
      return null;
    }
    setSelectedDayRange({
      from: innerDayRange.from,
      to: innerDayRange.to,
    });
    return closeModal();
  };

  const renderFooterDatePicker = () => {
    return (
      <div className="u-width-80 u-mx-auto u-d-flex u-justify-content-s-b u-mb-1">
        <button
          type="button"
          className="button button--primary w-1/3 mx-auto"
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
                <Calendar
                  value={innerDayRange}
                  calendarClassName="calendar-modal"
                  onChange={setDate}
                  renderFooter={renderFooterDatePicker}
                  calendarRangeStartClassName="calendar-range-start"
                  calendarRangeBetweenClassName="calendar-range-between"
                  calendarRangeEndClassName="calendar-range-end"
                  shouldHighlightWeekends
                  locale="fa"
                />
                {error ? <p className="text-sm mt-4 text-red-500">{error}</p> : null}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DatePickerModel;
