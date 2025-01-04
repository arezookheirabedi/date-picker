import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'cogo-toast';

import Svg from '../Svg';
import DotLoading from '../DotLoading';

const {RefreshLogo} = Svg;

type ContactUsForm = {
  email: string;
  name: string;
  content: string;
  captchaCode: string;
  captchaId: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('پست الکترونیکی اجباری می‌باشد')
    .email('پست الکترونیکی نامعتبر می‌باشد'),
  name: Yup.string()
    .required('نام و نام خانوادگی اجباری می‌باشد')
    .min(3, 'نام و نام خانوادگی نمیتواند کمتر از ۳ کاراکتر باشد')
    .matches(/^(?!\s+$)/g, 'نام و نام خانوادگی نمیتواند خالی باشد'),
  content: Yup.string()
    .required('پیام اجباری می‌باشد')
    .min(3, 'پیام نمیتواند کمتر از ۳ کاراکتر باشد')
    .max(255, 'پیام نمیتواند بیشتر از ۲۵۵ کاراکتر باشد')
    .matches(/^(?!\s+$)/g, 'پیام نمیتواند خالی باشد'),
  captchaCode: Yup.string().required('کد امنیتی اجباری می‌باشد'),
});

const ContactUs: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [captchaId, setCaptchaId] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ContactUsForm>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });


const onSubmit=()=>{
  console.log("k")
}


  return (
    <div className="contact-us-form" id="contact-us-form">
      <div className="u-center-text u-margin-bottom-medium">
        <h6>با ما در تماس باشید</h6>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <div className="">
                <input
                  type="text"
                  className={`text-3xl leading-8 px-8 py-8 bg-white border shadow-sm placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none block w-full rounded-xl outline-none disabled:shadow-none ${
                    errors.name
                      ? 'border-red-500 text-red-600 focus:border-red-500'
                      : 'border-slate-300 focus:border-gray-500'
                  }`}
                  placeholder="نام و نام خانوادگی"
                  {...register('name')}
                />
              </div>

              <p className={`mt-2 ${errors.name ? 'visible' : 'invisible'} text-red-600 text-lg`}>
                {errors.name?.message}
              </p>
            </div>

            <div className="">
              <div className="">
                <input
                  type="email"
                  placeholder="پست الکترونیکی"
                  className={`ltr placeholder-rtl text-3xl leading-8 px-8 py-8 bg-white border shadow-sm placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none block w-full rounded-xl outline-none disabled:shadow-none ${
                    errors.email
                      ? 'border-red-500 text-red-600 focus:border-red-500'
                      : 'border-slate-300 focus:border-gray-500'
                  }`}
                  {...register('email')}
                />
              </div>
              <p className={`mt-2 ${errors.email ? 'visible' : 'invisible'} text-red-600 text-lg`}>
                {errors.email?.message}
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="">
            <textarea
              cols={20}
              rows={5}
              className={`text-3xl leading-8 px-8 py-8 bg-white border shadow-sm placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none block w-full rounded-xl outline-none disabled:shadow-none ${
                errors.content
                  ? 'border-red-500 text-red-600 focus:border-red-500'
                  : 'border-slate-300 focus:border-gray-500'
              }`}
              placeholder="متن پیام..."
              {...register('content')}
            />
          </div>
          <p className={`mt-2 ${errors.content ? 'visible' : 'invisible'} text-red-600 text-lg`}>
            {errors.content?.message}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="flex-grow flex items-center relative">
              <input
                {...register('captchaCode', {
                  required: {value: true, message: '* وارد کردن کدامنیتی اجباری است.'},
                })}
                maxLength={7}
                autoComplete="off"
                type="text"
                placeholder="کد امنیتی"
                className={`text-3xl leading-8 px-8 py-8 bg-white border shadow-sm placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none block w-full rounded-xl outline-none disabled:shadow-none ${
                  errors.captchaCode
                    ? 'border-red-500 text-red-600 focus:border-red-500'
                    : 'border-slate-300 focus:border-gray-500'
                }`}
              />
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-stretch space-x-3 rtl:space-x-reverse mb-12 sm:mb-0">
                <div className="overflow-hidden flex items-center">
                  <img className="w-56" src={`data:image/png;base64, ${captchaImage}`} alt="" />
                </div>
              </div>
            </div>
            <p
              className={`mt-2 ${
                errors.captchaCode ? 'visible' : 'invisible'
              } text-red-600 text-lg`}
            >
              {errors.captchaCode?.message}
            </p>
          </div>
        </div>

        <div className="direction-ltr">
          <button className="btn btn--primary medium phone-block" type="submit" disabled={loading}>
            {!loading ? 'ارسال پیام' : <DotLoading />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
