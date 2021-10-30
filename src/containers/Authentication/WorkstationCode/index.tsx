import React, {useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import cogoToast from 'cogo-toast';
import {useParams, useHistory, useLocation} from 'react-router-dom';
// import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
// import authenticateService from 'src/services/authentication.service';
import Loading from 'src/components/Loading';
import {setLogin} from 'src/helpers/utils';
import guildService from 'src/services/guild.service';
import {useSelector} from 'src/hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {fetchGuildInfoAc} from 'src/store/action_creators';
import validationSchema from './validation';

interface IGuildParam {
  guildCode: string;
}
interface IBusinessLicense {
  workshopCode: number;
  branchCode: any;
}
const WorkstationCode: React.FC<any> = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const {guildCode} = useParams<IGuildParam>();
  const {search} = useLocation<{nationalId?: string}>();
  const queryStringParams = new URLSearchParams(search);
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    loading: infoLoading,
    error: infoError,
    data: info,
  } = useSelector(state => state.fetchGuildInfo);

  useEffect(() => {
    if (submitted && !infoLoading) {
      // debugger
      setSubmitted(false);
      if (!infoError) {
        setLogin({
          birthday: info.birthday || '',
          categoryId: info.categoryId || '',
          firstName: info.firstName || '',
          guildCode,
          id: info.id || '',
          lastName: info.lastName || '',
          nationalId: info.nationalId,
          qrCode: info.qrCode || '',
        });
        history.push(`/dashboard/overview/${guildCode}`);
      }
    }
  }, [infoLoading, infoError]);

  function goToDashboard() {
    setLogin({
      birthday: '',
      categoryId: '',
      firstName: '',
      guildCode,
      id: '',
      lastName: '',
      nationalId: queryStringParams.get('nationalId') || '',
      qrCode: '',
    });

    history.push(`/dashboard/overview/${guildCode}`);
  }

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
  /**
   * @params form value
   * @return token
   */
  const registerWorkshopCode = async (values: IBusinessLicense) => {
    setSubmitted(true);
    try {
      await guildService.registerWorkshop({...values, guildCode});
      dispatch(fetchGuildInfoAc(guildCode));
    } catch (error: any) {
      handleErrorMessage(error.message);
    } finally {
      setSubmitted(false);
    }
  };

  const onSubmit: SubmitHandler<IBusinessLicense> = data => {
    registerWorkshopCode(data);
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
            {...register('workshopCode')}
            className={`form-input ltr bg-gray-100 bg-opacity-0 rounded-md border ${
              errors.workshopCode
                ? 'border-red-700 focus:border-red-700'
                : 'border-gray-300 focus:border-gray-900'
            } ltr rtl-placeholder w-full p-4 focus:outline-none focus:ring-0`}
            placeholder="شماره کد گارکاه واحد صنفی"
            autoComplete="off"
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.workshopCode && (
            <p className="text-red-700 text-xs mt-2">{errors.workshopCode.message}</p>
          )}
        </div>
        <div className="">
          <input
            {...register('branchCode')}
            className={`form-input ltr bg-gray-100 bg-opacity-0 rounded-md border ${
              errors.branchCode
                ? 'border-red-700 focus:border-red-700'
                : 'border-gray-300 focus:border-gray-900'
            } ltr rtl-placeholder w-full p-4 focus:outline-none focus:ring-0`}
            placeholder="کد شعبه تامین اجتماعی"
            autoComplete="off"
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.branchCode && (
            <p className="text-red-700 text-xs mt-2">{errors.branchCode.message}</p>
          )}
        </div>

        <div className="flex flex-row-reverse px-0 xl:px-0 mb-2">
          <button
            disabled={!isValid || submitted}
            type="submit"
            className={`${
              isValid && !submitted ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'
            } block md:inline-block w-full rounded-md border-gray-300 border p-4 focus:outline-none mt-10 mr-2`}
          >
            <div className="flex items-center justify-center">
              {submitted ? <Loading /> : ''}
              <span> ثبت نام </span>
            </div>
          </button>

          <button
            type="button"
            onClick={goToDashboard}
            className="bg-transparent block md:inline-block w-full rounded-md border-gray-300 border p-4 focus:outline-none mt-10 ml-2"
          >
            <div className="flex items-center justify-center">
              <span> رد کردن </span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkstationCode;
