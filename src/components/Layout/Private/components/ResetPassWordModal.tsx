import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {changeDigitToEnglish} from 'src/helpers/utils';
import AppRegex from 'src/helpers/regex';
import SendActivationCode from './SendActivationCode';

interface IProps {
  resetIsOpen: boolean;
  setResetIsOpen: (data: boolean) => void;
}
const ResetPassWordModal: React.FC<IProps> = ({resetIsOpen, setResetIsOpen}) => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('وارد کردن پسورد قبلی الزامی است.'),
    password: Yup.string()
      .required('وارد کردن پسورد الزامی است.')
      .matches(AppRegex.password, 'حداقل کلمه عبور ۸ کارکتر می باشد.'),
    confirmPassword: Yup.string()
      .required('تکرار کلمه عبور الزامی است.')
      .oneOf([Yup.ref('password')], 'تکرار کلمه عبور اشتیاه است.'),
    mobile: Yup.string().matches(AppRegex.mobile, 'موبایل خود را با فرمت صحیح وارد نمایید'),
    activationCode: Yup.string().required('کد فعال سازی را وارد نمایید'),
  });
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: {errors},
    setValue,
  } = useForm<any>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const closeModal: () => void = () => {
    setResetIsOpen(false);
    reset();
  };

  const onSubmit: (e: React.MouseEvent<HTMLElement>) => void = e => {
    console.log('passwordreser', e);
    reset();
    closeModal();
  };

  return (
    <div>
      {' '}
      <Transition appear show={resetIsOpen} as={Fragment}>
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
                  <form className="p-5 text-base" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-3xl font-black">تغییر کلمه عبور</h1>

                    <div className="mt-10 flex flex-col">
                      <div>
                        <label
                          htmlFor="oldPassword"
                          className="ltr   block font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
                        >
                          کلمه عبور قبلی
                        </label>
                        <div className="mt-1">
                          <input
                            autoComplete="off"
                            type="text"
                            id="oldPassword"
                            aria-invalid={!!errors.oldPassword}
                            placeholder="کلمه عبور قبلی"
                            {...register('oldPassword')}
                            className={`ltr  placeholder-rtl focus:outline-none block w-full rounded-md border border-gray-300 bg-white  px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${
                              errors.oldPassword
                                ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
                                : ''
                            } disabled:shadow-none`}
                          />
                          <p
                            className={`mt-2 ${
                              errors.oldPassword ? 'visible' : 'invisible'
                            } text-xs text-red-600`}
                          >
                            {errors.oldPassword?.message}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label
                          htmlFor="password"
                          className="ltr block font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
                        >
                          کلمه عبور جدید
                        </label>
                        <div className="mt-1">
                          <input
                            autoComplete="off"
                            type="password"
                            id="password"
                            aria-invalid={!!errors.password}
                            {...register('password')}
                            className={`ltr  placeholder-rtl  focus:outline-none block w-full rounded-md border border-gray-300 bg-white  px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${
                              errors.password
                                ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
                                : ''
                            } disabled:shadow-none`}
                          />
                          <p
                            className={`mt-2 ${
                              errors.password ? 'visible' : 'invisible'
                            } text-xs text-red-600`}
                          >
                            {errors.password?.message}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label
                          htmlFor="confirmPassword"
                          className="block font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
                        >
                          تکرار کلمه عبور جدید
                        </label>
                        <div className="mt-1">
                          <input
                            autoComplete="off"
                            type="password"
                            id="confirmPassword"
                            aria-invalid={!!errors.confirmPassword}
                            {...register('confirmPassword')}
                            className={`ltr placeholder-rtl  focus:outline-none block w-full rounded-md border border-gray-300 bg-white  px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${
                              errors.confirmPassword
                                ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
                                : ''
                            } disabled:shadow-none`}
                          />
                          <p
                            className={`mt-2 ${
                              errors.confirmPassword ? 'visible' : 'invisible'
                            } text-xs text-red-600`}
                          >
                            {errors.confirmPassword?.message}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label
                          htmlFor="mobile"
                          className="block font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
                        >
                          شماره تلفن همراه
                        </label>
                        <div className="mt-1">
                          <input
                            autoComplete="off"
                            onKeyPress={event => changeDigitToEnglish(event, setValue)}
                            type="text"
                            id="mobile"
                            placeholder="0مثال: 9377070000"
                            {...register('mobile')}
                            aria-invalid={!!errors.mobile}
                            className={`ltr placeholder-rtl focus:outline-none block w-full rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${
                              errors.mobile
                                ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
                                : ''
                            } focus-visible disabled:shadow-none`}
                          />
                          <p
                            className={`mt-2 ${
                              errors.mobile ? 'visible' : 'invisible'
                            } text-xs text-red-600`}
                          >
                            {errors.mobile?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                    <SendActivationCode mobileNumber={watch('mobile', null)} />
                    <div className="mt-6">
                      <label
                        htmlFor="activationCode"
                        className="block font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
                      >
                        کد فعالسازی
                      </label>
                      <div className="mt-1">
                        <input
                          autoComplete="off"
                          onKeyPress={event => changeDigitToEnglish(event, setValue)}
                          type="text"
                          id="activationCode"
                          placeholder="کد فعالسازی"
                          {...register('activationCode')}
                          aria-invalid={!!errors.activationCode}
                          className={`ltr placeholder-rtl focus:outline-none block w-full rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${
                            errors.activationCode
                              ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
                              : ''
                          } focus-visible disabled:shadow-none`}
                        />
                        <p
                          className={`mt-2 ${
                            errors.activationCode ? 'visible' : 'invisible'
                          } text-xs text-red-600`}
                        >
                          {errors.activationCode?.message}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-6 flex justify-center space-x-2 rtl:space-x-reverse">
                          <button
                            type="submit"
                            className="flex items-center justify-center rounded bg-gray-900 px-12 py-2 text-sm text-white shadow-xl"
                          >
                            <span>تغییر کلمه عبور</span>
                          </button>

                          <button
                            type="button"
                            onClick={closeModal}
                            className="flex items-center justify-center rounded border border-gray-900 bg-white px-12 py-2 text-sm text-gray-900"
                          >
                            <span>انصراف</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default ResetPassWordModal;
