import React, {useState} from "react";
import plusIcon from "../../assets/images/icons/plus.svg";
import SimpleSelect from "../../components/Select2/SimpleSelect";
import ConfirmIcon from "../../assets/images/icons/confirm.svg";
import RejectIcon from "../../assets/images/icons/reject.svg";
import PendingIcon from "../../assets/images/icons/pending.svg";

import Modal from "../../components/Modal"
import AddOrUpdateInspector from "../../components/Inspector/AddOrUpdateInspector";

const provinceOptions = [
  {
    value: 'آذربایجان شرقی',
    title: 'آذربایجان شرقی',
  },
  {
    value: 'آذربایجان غربی',
    title: 'آذربایجان غربی',
  },
  {
    value: 'اردبیل',
    title: 'اردبیل',
  },
  {
    value: 'اصفهان',
    title: 'اصفهان',
  },
  {
    value: 'البرز',
    title: 'البرز',
  },
  {
    value: 'ایلام',
    title: 'ایلام',
  },
  {
    value: 'بوشهر',
    title: 'بوشهر',
  },
  {
    value: 'تهران',
    title: 'تهران',
  },
  {
    value: 'خراسان جنوبی',
    title: 'خراسان جنوبی',
  },
  {
    value: 'خراسان رضوی',
    title: 'خراسان رضوی',
  },
  {
    value: 'خراسان شمالی',
    title: 'خراسان شمالی',
  },
  {
    value: 'خوزستان',
    title: 'خوزستان',
  },
  {
    value: 'زنجان',
    title: 'زنجان',
  },
  {
    value: 'سمنان',
    title: 'سمنان',
  },
  {
    value: 'سیستان و بلوچستان',
    title: 'سیستان و بلوچستان',
  },
  {
    value: 'فارس',
    title: 'فارس',
  },
  {
    value: 'قزوین',
    title: 'قزوین',
  },
  {
    value: 'قم',
    title: 'قم',
  },
  {
    value: 'کردستان',
    title: 'کردستان',
  },
  {
    value: 'کرمان',
    title: 'کرمان',
  },
  {
    value: 'کرمانشاه',
    title: 'کرمانشاه',
  },
  {
    value: 'کهگیلویه وبویراحمد',
    title: 'کهگیلویه وبویراحمد',
  },
  {
    value: 'گلستان',
    title: 'گلستان',
  },
  {
    value: 'گیلان',
    title: 'گیلان',
  },
  {
    value: 'لرستان',
    title: 'لرستان',
  },
  {
    value: 'مازندران',
    title: 'مازندران',
  },
  {
    value: 'مرکزی',
    title: 'مرکزی',
  },
  {
    value: 'هرمزگان',
    title: 'هرمزگان',
  },
  {
    value: 'همدان',
    title: 'همدان',
  },
  {
    value: 'یزد',
    title: 'یزد',
  },
  {
    value: 'چهارمحال و بختیاری',
    title: 'چهارمحال و بختیاری',
  }
];

const statusOption = [
  {
    value: 'تایید شده',
    title: 'تایید شده',
    icon: <img src={ConfirmIcon} alt='confirm'/>
  },
  {
    value: 'رد شده',
    title: 'رد شده',
    icon: <img src={RejectIcon} alt='confirm'/>
  },
  {
    value: 'در انتظار تایید',
    title: 'در انتظار تایید',
    icon: <img src={PendingIcon} alt='confirm'/>
  }
]



export default function index() {

  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal: () => void = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8 mt-4">
        <div className="flex flex-grow align-center justify-start">
          <div className="w-3/4 flex">
            <div className="relative inline-flex align-center leading-3 h-10 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="جستجوی کدملی، موبایل"
                className="py-2 px-4 pr-10 text-sm border-none rounded-lg focus:outline-none shadow-custom"
              />
            </div>

            <SimpleSelect options={provinceOptions} defaultOption='تهران'/>
            <SimpleSelect options={statusOption}/>
          </div>
          <div className="w-1/4">
            <div
              className="button button--primary px-5 justify-start sm:w-full sm:text-xs sm:px-0 sm:justify-center md:text-sm 2xl:w-4/6 xl:w-full mx-auto"
              onClick={() => openModal()}
            >
              <img src={plusIcon} alt="+" className="ml-2 xl:block sm:hidden"/>
              اضافه کردن بازرس جدید
            </div>
          </div>

        </div>

      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <AddOrUpdateInspector actionType="add" />
      </Modal>
    </>
  )
}