import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// import toast from 'cogo-toast';
// import authenticateService from 'src/services/authentication.service';
import plusIcon from '../../assets/images/icons/plus.svg';
// import {EERRORS} from 'src/constants/errors.enum';
// import DotLoading from '../Loading/DotLoading';
import SingleSelectInModal from '../Select2/SingleSelectInModal';

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
  },
];

interface IProps {
  actionType?: any;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreateButton: React.FC<IProps> = ({actionType}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    register,
    handleSubmit,
    reset,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: {errors},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setError,
  } = useForm<any>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });
  const openModal: () => void = () => {
    setIsOpen(true);
  };
  const closeModal: () => void = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="button button--primary flex space-x-2 px-5 rtl:space-x-reverse"
      >
        <img src={plusIcon} alt="+" className="ml-2 xl:block sm:hidden" />
        اضافه کردن بازرس جدید
      </button>
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
                  <h5 className="text-3xl font-black">
                    {actionType === 'add' && ' افزودن کاربر جدید'}
                    {actionType === 'update' && 'ویرایش اطلاعات'}
                  </h5>
                </Dialog.Title>
                {/* form start */}
                <div>
                  <form
                    className="p-5 text-base"
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                  >
                    <div className="w-full flex px-8 mb-6">
                      <div className="u-width-47">
                        <label
                          htmlFor="full-name"
                          className="text-xs text-gray-400 flex justify-start mb-1"
                        >
                          نام و نام خانوادگی
                        </label>
                        <input
                          id="full-name"
                          type="text"
                          className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"
                        />
                      </div>
                      <div className="u-width-47 mr-auto">
                        <label
                          htmlFor="national-code"
                          className="text-xs text-gray-400 flex justify-start mb-1"
                        >
                          کدملی
                        </label>
                        <input
                          id="national-code"
                          className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="w-full flex px-8 mb-6">
                      <div className="u-width-47">
                        <label
                          htmlFor="full-name"
                          className="text-xs text-gray-400 flex justify-start mb-1"
                        >
                          شماره موبایل
                        </label>
                        <input
                          id="full-name"
                          type="text"
                          className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"
                        />
                      </div>
                      <div className="u-width-47 mr-auto">
                        <label
                          htmlFor="national-code"
                          className="text-xs text-gray-400 flex justify-start mb-1"
                        >
                          کدپرسنلی
                        </label>
                        <input
                          id="national-code"
                          className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="w-full flex px-8 mb-6">
                      <div className="u-width-47">
                        <label
                          htmlFor="full-name"
                          className="text-xs text-gray-400 flex justify-start mb-1"
                        >
                          پست سازمانی
                        </label>
                        {/* <SimpleSelect options={provinceOptions} defaultOption='تهران'/> */}
                        <SingleSelectInModal options={provinceOptions} />
                        {/* <input id="full-name" type="text" */}
                        {/*       className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"/> */}
                      </div>
                      <div className="u-width-47 mr-auto">
                        <label
                          htmlFor="national-code"
                          className="text-xs text-gray-400 flex justify-start mb-1"
                        >
                          سازمان محل خدمت
                        </label>
                        <SingleSelectInModal options={provinceOptions} />
                        {/* <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm" */}
                        {/*       type="text"/> */}
                      </div>
                    </div>
                    <div className="w-full flex px-8 mb-12">
                      <div className="u-width-47">
                        <label
                          htmlFor="full-name"
                          className="text-xs text-gray-400 flex justify-start mb-1"
                        >
                          استان
                        </label>
                        <SingleSelectInModal options={provinceOptions} />
                        {/* <input id="full-name" type="text" */}
                        {/*       className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"/> */}
                      </div>
                      <div className="u-width-47 mr-auto">
                        <label
                          htmlFor="national-code"
                          className="text-xs text-gray-400 flex justify-start mb-1"
                        >
                          شهر
                        </label>
                        <SingleSelectInModal options={provinceOptions} />
                        {/* <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm" */}
                        {/*       type="text"/> */}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="button button--primary px-5 justify-start sm:text-xs sm:px-0 sm:justify-center md:text-sm  mx-auto w-52">
                        {actionType === 'add' && 'ثبت بازرس'}
                        {actionType === 'update' && 'ثبت اطلاعات'}
                      </div>
                    </div>
                  </form>
                </div>
                {/* form end */}

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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default CreateButton;
