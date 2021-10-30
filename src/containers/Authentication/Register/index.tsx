import React, {useEffect, useState} from 'react';
import RefreshLogo from 'src/components/Refreshlogo';
import {useForm, SubmitHandler} from 'react-hook-form';
import qs from 'qs';
import cogoToast from 'cogo-toast';
// import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import {useHistory, useLocation} from 'react-router-dom';
import authenticateService from 'src/services/authentication.service';
import Loading from 'src/components/Loading';
import {ICaptcha} from 'src/models/captcha.model';
import EPUBLICROUTE from 'src/constants/PublicRoute.enum';
import {IInitialLoginForm} from 'src/models/authentication.model';
import validationSchema from './validation';

export interface ILoginForm {
  mobileNumber: number;
  nationalId: number;
  captcha: any;
}
const Register: React.FC<any> = () => {
  const {search} = useLocation();
  const params: URLSearchParams = new URLSearchParams(search);
  const mobile = Object.fromEntries(params).mobileNumber;
  const nationalid = Object.fromEntries(params).nationalId;
  const history = useHistory();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);

  const [captcha, setCaptcha] = useState<ICaptcha>({id: '', code: ''});

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm<ILoginForm>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  /**
   * @params set error msg
   * @return show msg box
   */
  const handleErrorMessage = (data: string) => {
    const value = typeof data === 'string' ? data : 'خطایی در عملیات';
    if (value !== '') {
      cogoToast.error(value, {
        renderIcon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      });
    }
  };

  const getCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const res = await authenticateService.captcha();
      if (res) {
        setCaptcha({id: res.data.id, code: res.data.captchaBase64});
      }
    } catch (error: any) {
      handleErrorMessage(error);
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  const refreshCaptchaHandler = () => {
    getCaptcha();
  };

  /**
   * @params form value
   * @return token
   */
  const getActivate = async (values: IInitialLoginForm) => {
    localStorage.setItem('waiting-sms', new Date().toString());
    setSubmitted(true);
    try {
      await authenticateService.login(values);
      localStorage.setItem('waiting-sms', new Date().toString());
      const data = {
        mobileNumber: values.mobileNumber,
        nationalId: values.nationalId,
      };
      history.push(`${EPUBLICROUTE.ACTIVATE}?${qs.stringify(data, {skipNulls: true})}`);
    } catch (error: any) {
      getCaptcha();
      if (error.errors && error.errors.length > 0) {
        error.errors.forEach((errorItem: any) => {
          setError(
            errorItem.field,
            {type: 'manual', message: errorItem.message},
            {shouldFocus: true}
          );
        });
      }
      handleErrorMessage(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    const FormData = {
      captcha: {
        code: data.captcha,
        id: captcha.id,
      },
      mobileNumber: data.mobileNumber.toString(),
      nationalId: data.nationalId.toString(),
    };
    getActivate(FormData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-grow flex flex-col justify-center space-y-5 md:space-y-10"
    >
      <h3 className="text-2xl font-black">ورود به سامانه</h3>
      <div className="space-y-4">
        <div className="">
          <input
            defaultValue={`${mobile === undefined ? '' : mobile}`}
            {...register('mobileNumber')}
            className={`form-input bg-gray-100 bg-opacity-0 rounded-md border ${
              errors.mobileNumber
                ? 'border-red-700 focus:border-red-700'
                : 'border-gray-300 focus:border-gray-900'
            } ltr rtl-placeholder w-full p-4 focus:outline-none focus:ring-0`}
            placeholder="شماره تلفن همراه"
            autoComplete="off"
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.mobileNumber && (
            <p className="text-red-700 text-xs mt-2">{errors.mobileNumber.message}</p>
          )}
        </div>
        <div className="">
          <input
            defaultValue={`${nationalid === undefined ? '' : nationalid}`}
            {...register('nationalId')}
            className={`form-input bg-gray-100 bg-opacity-0 rounded-md border ${
              errors.nationalId
                ? 'border-red-700 focus:border-red-700'
                : 'border-gray-300 focus:border-gray-900'
            } ltr rtl-placeholder w-full p-4 focus:outline-none focus:ring-0`}
            placeholder="کدملی"
            autoComplete="off"
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.nationalId && (
            <p className="text-red-700 text-xs mt-2">{errors.nationalId.message}</p>
          )}
        </div>
        <div className="relative">
          <input
            {...register('captcha')}
            className={`form-input bg-gray-100 bg-opacity-0 rounded-md border ${
              errors.captcha
                ? 'border-red-700 focus:border-red-700'
                : 'border-gray-300 focus:border-gray-900'
            } rtl rtl-placeholder w-full p-4 pl-36 focus:outline-none focus:ring-0`}
            placeholder="کد امنیتی"
            autoComplete="off"
          />

          <div className="absolute left-5 top-1/2 transform -translate-y-2/4 h-10 flex justify-evenly items-center space-x-3 rtl:space-x-reverse">
            {captchaLoading ? (
              <Loading />
            ) : (
              <img
                className="h-full"
                src={`data:image/png;base64, ${captcha.code}`}
                alt="captcha"
              />
            )}
            <RefreshLogo onHandleRefreshLogo={refreshCaptchaHandler} />
          </div>
          {errors.captcha && <p className="text-red-700 text-xs mt-2">{errors.captcha.message}</p>}
        </div>

        <div className="px-0 xl:px-16">
          <button
            disabled={!isValid || submitted}
            type="submit"
            className={`${
              isValid && !submitted ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'
            } block md:inline-block w-full rounded-md border-gray-300 border p-4 focus:outline-none mt-10`}
          >
            <div className="flex items-center justify-center">
              {submitted ? <Loading /> : ''}
              <span className="px-1">ارسال کد فعالسازی</span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
