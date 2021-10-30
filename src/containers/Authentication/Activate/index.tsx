import React, {useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Loading from 'src/components/Loading';
import cogoToast from 'cogo-toast';
import authenticateService from 'src/services/authentication.service';
import {ISendActivat} from 'src/models/authentication.model';
import {useLocation, useHistory} from 'react-router-dom';
import EPRIVATEROUTE from 'src/constants/PrivateRoute.enum';
import {useSelector} from 'src/hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {fetchGuildBriefAc, fetchGuildInfoAc} from 'src/store/action_creators';
import {setLogin, setToken} from 'src/helpers/utils';
import validationSchema from './validation';
import ResendActivateCode from './ResendActivateCode';

interface IActivateForm {
  activationCode: number;
}
export interface IInfoResendCode {
  mobileNumber: string;
  nationalId: string;
}

const Activate: React.FC<any> = () => {
  const {search} = useLocation();
  const {
    loading: briefLoading,
    error: briefError,
    data: briefs,
  } = useSelector(state => state.fetchGuildBrief);
  const {loading: infoLoading, error: infoError} = useSelector(state => state.fetchGuildInfo);
  const params: URLSearchParams = new URLSearchParams(search);
  const mobile = Object.fromEntries(params).mobileNumber;
  const nationalid = Object.fromEntries(params).nationalId;

  const [submitted, setSubmitted] = useState({
    activate: false,
    info: false,
    brief: false,
  });

  const [info, setInfo] = useState<IInfoResendCode>({
    mobileNumber: '',
    nationalId: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm<IActivateForm>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setInfo({mobileNumber: mobile, nationalId: nationalid});
  }, []);

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

  useEffect(() => {
    if (submitted.info && !infoLoading) {
      setSubmitted({...submitted, info: false});
      if (!infoError) {
        debugger;
        setLogin({
          birthday: '',
          categoryId: '',
          firstName: '',
          guildCode: briefs[0].guildCode,
          id: '',
          lastName: '',
          nationalId: info.nationalId,
          qrCode: '',
        });

        history.push(`/dashboard/overview/1234`);
      } else {
        handleErrorMessage(infoError);
      }
    }
  }, [infoLoading, infoError]);

  useEffect(() => {
    if (submitted.brief && !briefLoading) {
      setSubmitted({...submitted, brief: false});
      if (!briefError) {
        if (briefs.length > 0) {
          setSubmitted({...submitted, info: true});
          const defaultBrief = briefs[0];
          dispatch(fetchGuildInfoAc(defaultBrief.guildCode));
        } else {
          history.push(`${EPRIVATEROUTE.BUSINESSLICENSE}?nationalId=${nationalid}`);
        }
      } else {
        handleErrorMessage(briefError);
      }
    }
  }, [briefLoading, briefError]);

  /**
   * @params form value
   * @return token
   */
  const sendActivate = async (values: ISendActivat) => {
    // console.log(values);
    // history.push(EPRIVATEROUTE.BUSINESSLICENSE);
    setSubmitted({...submitted, activate: true});
    try {
      const res = await authenticateService.sendActivateCode(values);
      setToken(res.data);
      setSubmitted({...submitted, brief: true});
      dispatch(fetchGuildBriefAc());
    } catch (error: any) {
      setError('activationCode', {type: 'manual', message: error.message}, {shouldFocus: true});
      handleErrorMessage(error.message);
    }
  };

  const onSubmit: SubmitHandler<IActivateForm> = (data: any) => {
    const formData = {
      activationCode: data.activationCode.toString(),
      mobileNumber: mobile,
    };
    sendActivate(formData);
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
            {...register('activationCode')}
            className={`form-input bg-gray-100 bg-opacity-0 rounded-md border ${
              errors.activationCode
                ? 'border-red-700 focus:border-red-700'
                : 'border-gray-300 focus:border-gray-900'
            } ltr rtl-placeholder w-full p-4 focus:outline-none focus:ring-0`}
            placeholder="کد فعالسازی"
            autoComplete="off"
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.activationCode && (
            <p className="text-red-700 text-xs mt-2">{errors.activationCode.message}</p>
          )}
        </div>

        <ResendActivateCode info={info} />
        <div className="px-0 xl:px-16">
          <button
            disabled={!isValid || submitted.activate}
            type="submit"
            className={`${
              isValid && !submitted.activate ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'
            } block md:inline-block w-full rounded-md border-gray-300 border p-4 focus:outline-none mt-20`}
          >
            <div className="flex items-center justify-center">
              {submitted.activate ? <Loading /> : ''}
              <span className="px-1"> مرحله بعد </span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Activate;
