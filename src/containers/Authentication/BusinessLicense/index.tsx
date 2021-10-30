import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import cogoToast from 'cogo-toast';
import {useDispatch} from 'react-redux';
// import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import Loading from 'src/components/Loading';
import {setLogin} from 'src/helpers/utils';
import guildService from 'src/services/guild.service';
import {useSelector} from 'src/hooks/useTypedSelector';
import {fetchGuildBriefAc, fetchGuildInfoAc} from 'src/store/action_creators';
import validationSchema from './validation';

interface IBusinessLicense {
  guildCode: number;
}

const BusinessLicense: React.FC<any> = () => {
  const {search} = useLocation<{nationalId?: string}>();
  const queryStringParams = new URLSearchParams(search);

  const [submitted, setSubmitted] = useState({brief: false, info: false, save: false});
  const {
    loading: briefLoading,
    error: briefError,
    data: briefs,
  } = useSelector(state => state.fetchGuildBrief);
  const {
    loading: infoLoading,
    error: infoError,
    data: info,
  } = useSelector(state => state.fetchGuildInfo);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setSubmitted({...submitted, brief: true});
    dispatch(fetchGuildBriefAc());
  }, []);

  useEffect(() => {
    if (submitted.info && !infoLoading) {
      setSubmitted({...submitted, info: false});
      if (!infoError) {
        if (!info.employees) {
          setSubmitted({...submitted, save: false});
          history.push(
            `/auth/${briefs[0].guildCode}/workstationCode?nationalId=${
              queryStringParams.get('nationalId') || ''
            }`
          );
        } else {
          setLogin({
            birthday: info.birthday || '',
            categoryId: info.categoryId || '',
            firstName: info.firstName || '',
            guildCode: briefs[0].guildCode,
            id: info.id || '',
            lastName: info.lastName || '',
            nationalId: info.nationalId,
            qrCode: info.qrCode || '',
          });
          history.push(`/dashboard/overview/${briefs[0].guildCode}`);
        }
      }
    }
  }, [infoLoading, infoError]);

  useEffect(() => {
    if (submitted.brief && !briefLoading) {
      setSubmitted({...submitted, brief: false});
      if (!briefError) {
        if (briefs.length) {
          setSubmitted({...submitted, info: true});
          const defaultBrief = briefs[0];
          dispatch(fetchGuildInfoAc(defaultBrief.guildCode));
        }
      }
    }
  }, [briefLoading, briefError]);

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<IBusinessLicense>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  /**
   * @params set error msg
   * @return show msg box
   */
  const handleErrorMessage = (data: string) => {
    const value = typeof data === 'string' ? data : 'our error msg';
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
  /**
   * @params form value
   * @return token
   */
  const sendLicense = async (values: IBusinessLicense) => {
    // console.log(values);
    setSubmitted({...submitted, save: true});
    try {
      // eslint-disable-next-line
      const res = await guildService.registerGuild(values);
      setSubmitted({...submitted, brief: true, save: false});
      dispatch(fetchGuildBriefAc());
    } catch (error: any) {
      handleErrorMessage(error.message);
      setSubmitted({...submitted, save: false});
    }
  };

  const onSubmit: SubmitHandler<IBusinessLicense> = data => {
    sendLicense(data);
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
            {...register('guildCode')}
            className={`form-input bg-gray-100 bg-opacity-0 rounded-md border ${
              errors.guildCode
                ? 'border-red-700 focus:border-red-700'
                : 'border-gray-300 focus:border-gray-900'
            } ltr rtl-placeholder w-full p-4 focus:outline-none focus:ring-0`}
            placeholder="شماره پروانه کسب"
            autoComplete="off"
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.guildCode && (
            <p className="text-red-700 text-xs mt-2">{errors.guildCode.message}</p>
          )}
        </div>

        <div className="px-0 xl:px-16">
          <button
            disabled={!isValid || submitted.save}
            type="submit"
            className={`${
              isValid && !submitted.save ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'
            } block md:inline-block w-full rounded-md border-gray-300 border p-4 focus:outline-none mt-20`}
          >
            <div className="flex items-center justify-center">
              {submitted.save ? <Loading /> : ''}
              <span> مرحله بعد </span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default BusinessLicense;
