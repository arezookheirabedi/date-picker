import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'cogo-toast';
import AppRegex from 'src/helpers/regex';
import DotLoading from 'src/components/DotLoading';
import eyes from 'src/assets/images/icons/eye_icon.svg';
// import {EERRORS} from 'src/constants/errors.enum';
import Modal from '../../Modal';

interface IProps {
  item: any;
  isOpen: boolean;
  closeModal: () => void;
  shouldRefresh: (data: boolean) => void;
  refresh: boolean;
}

const RestPassModal: React.FC<IProps> = ({isOpen, closeModal, item}) => {
  const [typeInputText, setTypeInputText] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('وارد کردن پسورد الزامی است.')
      .matches(
        AppRegex.password,
        '      * فرمت رمز عبور درست نمیباشد.\n      رمز عبور باید\n        حداقل ۸ کاراکتر ،\n       حداقل دو حرف کوچک ،\n       حداقل دو حرف بزرگ ،\n       حداقل یک عدد ،\n      و حداقل شامل یکی از کاراکترهای !@#\n      باشد.'
      ),
    confirmPassword: Yup.string()
      .required('تکرار کلمه عبور الزامی است.')
      .oneOf([Yup.ref('password')], 'تکرار کلمه عبور اشتباه است.'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
    setError,
    // setValue,
  } = useForm<any>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

 const onSubmit=()=>{
  console.log("kk")
 }

  return (
    <Modal showModal={isOpen} setShowModal={closeModal}>
      <form className="p-5 text-base" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h5 className="text-3xl font-black">تغییر کلمه عبور</h5>
        <div className="mt-10 flex flex-col">
          <div className="mt-6">
            <label
              htmlFor="password"
              className="ltr block font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              کلمه عبور جدید
            </label>
            <div className="relative mt-1">
              <input
                type={`${typeInputText ? 'text' : 'password'}`}
                autoComplete="off"
                id="password"
                aria-invalid={!!errors.password}
                {...register('password')}
                className={`ltr  placeholder-rtl  focus:outline-none block w-full rounded-md border border-gray-300 bg-white  px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${
                  errors.password
                    ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'
                    : ''
                } disabled:shadow-none`}
              />
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
              <img
                style={{
                  position: 'absolute',
                  width: '20px',
                  right: '9px',
                  bottom: '3px',
                  height: '38px',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                src={eyes}
                alt=""
                onClick={() => setTypeInputText(!typeInputText)}
              />
            </div>
            <p className={`mt-2 ${errors.password ? 'visible' : 'invisible'} text-xs text-red-600`}>
              {errors.password?.message}
            </p>
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
            </div>
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
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6 flex justify-center space-x-2 rtl:space-x-reverse">
              <button
                type="submit"
                className="flex items-center justify-center rounded bg-gray-900 px-12 py-2 text-sm text-white shadow-xl"
              >
                <span>{!loading ? 'تغییر کلمه عبور ' : <DotLoading />}</span>
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
    </Modal>
  );
};

export default RestPassModal;
