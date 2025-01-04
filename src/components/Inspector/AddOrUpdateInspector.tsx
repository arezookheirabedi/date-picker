/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import cogoToast from 'cogo-toast';
import dayjs from 'dayjs';
// import SimpleSelect from "../Select2/SimpleSelect";
import SingleSelectInModal from '../Select2/SingleSelectInModal';
// import {addInspectorValidation} from '../../../validations/index';
import DotLoading from '../../components/DotLoading';

import {addInspectorValidation} from 'src/validations';
import DatePicker from '../Form/DatePicker';
import {
  convertGregorianDateToJalaliDate,
  convertGregorianDateToObjectDate,
  fixNumbers,
  toPersianDigit,
  unixToDateObject,
} from '../../helpers/utils';

interface IAddOrUpdateInspector {
  actionType?: any;
  setShowModal?: any;
  shouldRefresh: any;
  userData?: any;
}

const initialCityOptions = [
  {
    title: 'انتخاب شهر',
    value: null,
  },
];

const initialProvinceOptions = [
  {
    title: 'انتخاب استان',
    value: null,
  },
];

const activityStatus = [
  {
    title: 'تایید نشده',
    value: 'UNCONFIRMED',
  },
  {
    title: 'تایید شده',
    value: 'CONFIRMED',
  },
];

const AddOrUpdateInspector: React.FC<IAddOrUpdateInspector> = ({
  actionType,
  setShowModal,
  shouldRefresh,
  userData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [provinceOptions, setProvinceOptions] = useState<any>(initialProvinceOptions);
  const [cityOptions, setCityOptions] = useState<any>(initialCityOptions);

  const [provinceTitleInput, setProvinceTitleInput] = useState<any>(null);
  const [cityTitleInput, setCityTitleInput] = useState<any>(null);
  const [activityStatusValue, setActivityStatusValue] = useState<any>(activityStatus[0]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
    setError,
  } = useForm<any>({
    // mode: "onChange",
    defaultValues: {
      firstName: userData && userData.firstName ? userData.firstName : null,
      lastName: userData && userData.lastName ? userData.lastName : null,
      activityStatus: null,
      city: null,
      province: null,
      inspectorId: userData && userData.inspectorId ? userData.inspectorId : null,
      mobileNumber: userData && userData.mobileNumber ? userData.mobileNumber : null,
      nationalId: userData && userData.nationalId ? userData.nationalId : null,
      organization: userData && userData.organization ? userData.organization : null,
      birthDate: userData && userData.organization ? userData.organization : null,
      role: userData && userData.role ? userData.role : null,
    },
  });

 





  const validations = (values: any) => {
    if (!values.birthDate && !userData) {
      cogoToast.error('تاریخ تولد اجباری است.');
      return false;
    }
    if (!provinceTitleInput || !provinceTitleInput.value) {
      cogoToast.error('انتخاب استان اجباری است.');
      return false;
    }
    if (!cityTitleInput || !cityTitleInput.value) {
      cogoToast.error('انتخاب شهر اجباری است.');
      return false;
    }

    return true;
  };

  const onSubmit =()=>{
    console.log("ppp")
  }
  const addDash = (str: any) => {
    return str.slice(0, 4) + '-' + str.slice(4, 6) + '-' + str.slice(6);
  };

  return (
    <div>
      <h3 className="mb-6">
        {actionType === 'add' && 'ثبت بازرس جدید'}
        {actionType === 'update' && 'ویرایش اطلاعات'}
      </h3>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label htmlFor="firstName" className="text-xs text-gray-400 flex justify-start mb-1">
              نام
            </label>
            <input
              id="firstName"
              {...register('firstName', addInspectorValidation.firstName)}
              type="text"
              className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                  ${errors.firstName ? 'border-1 border-rose-600' : 'border-gray-400'}
                  `}
            />
            <p
              className={`${errors.firstName ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}
            >
              {errors.firstName?.message}
            </p>
          </div>
          <div className="u-width-47 mr-auto">
            <label htmlFor="lastName" className="text-xs text-gray-400 flex justify-start mb-1">
              نام خانوادگی
            </label>
            <input
              id="lastName"
              {...register('lastName', addInspectorValidation.lastName)}
              type="text"
              className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.firstName ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
            />
            <p className={`${errors.lastName ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}>
              {errors.lastName?.message}
            </p>
          </div>
        </div>
        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label htmlFor="full-name" className="text-xs text-gray-400 flex justify-start mb-1">
              شماره موبایل
            </label>
            <input
              id="mobileNumber"
              {...register('mobileNumber', addInspectorValidation.mobileNumber)}
              type="text"
              className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.mobileNumber ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
            />
            <p
              className={`${
                errors.mobileNumber ? 'visible' : 'invisible'
              } mt-1 text-xs text-red-600`}
            >
              {errors.mobileNumber?.message}
            </p>
          </div>
          <div className="u-width-47 mr-auto">
            <label
              htmlFor="national-code"
              className="text-xs text-gray-400 flex justify-start mb-1"
            >
              کدپرسنلی
            </label>
            <input
              id="inspectorId"
              {...register('inspectorId', addInspectorValidation.inspectorId)}
              type="text"
              className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.inspectorId ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
            />
            <p
              className={`${
                errors.inspectorId ? 'visible' : 'invisible'
              } mt-1 text-xs text-red-600`}
            >
              {errors.inspectorId?.message}
            </p>
          </div>
        </div>
        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label
              htmlFor="national-code"
              className="text-xs text-gray-400 flex justify-start mb-1"
            >
              پست سازمانی
            </label>
            <input
              id="role"
              {...register('role', addInspectorValidation.role)}
              type="text"
              className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.role ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
            />
            <p className={`${errors.role ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}>
              {errors.role?.message}
            </p>
          </div>
          <div className="u-width-47 mr-auto">
            <label
              htmlFor="national-code"
              className="text-xs text-gray-400 flex justify-start mb-1"
            >
              وضعیت بازرس
            </label>
            {userData && userData.activityStatus ? (
              <SingleSelectInModal
                options={activityStatus}
                setValueOption={setActivityStatusValue}
                selectedValue={userData.activityStatus}
              />
            ) : (
              <SingleSelectInModal
                options={activityStatus}
                setValueOption={setActivityStatusValue}
              />
            )}

            {/* <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm" */}
            {/*       type="text"/> */}
          </div>
        </div>
        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label htmlFor="full-name" className="text-xs text-gray-400 flex justify-start mb-1">
              استان
            </label>
            {userData && userData.provinceCode ? (
              <SingleSelectInModal
                options={provinceOptions}
                setValueOption={setProvinceTitleInput}
                selectedValue={userData.provinceCode}
              />
            ) : (
              <SingleSelectInModal
                options={provinceOptions}
                setValueOption={setProvinceTitleInput}
              />
            )}

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
            {userData && userData.cityCode ? (
              <SingleSelectInModal
                options={cityOptions}
                setValueOption={setCityTitleInput}
                selectedValue={userData.cityCode}
              />
            ) : (
              <SingleSelectInModal options={cityOptions} setValueOption={setCityTitleInput} />
            )}
            {/* <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm" */}
            {/*       type="text"/> */}
          </div>
        </div>

        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label htmlFor="nationalId" className="text-xs text-gray-400 flex justify-start mb-1">
              کدملی
            </label>
            <input
              id="nationalId"
              {...register('nationalId', addInspectorValidation.nationalId)}
              className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.nationalId ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
              type="text"
            />
            <p
              className={`${errors.nationalId ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}
            >
              {errors.nationalId?.message}
            </p>
          </div>

          <div className="u-width-47 mr-auto">
            <label htmlFor="organization" className="text-xs text-gray-400 flex justify-start mb-1">
              سازمان محل خدمت
            </label>
            <input
              id="organization"
              {...register('organization', addInspectorValidation.organization)}
              className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.organization ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
              type="text"
            />
            <p
              className={`${
                errors.organization ? 'visible' : 'invisible'
              } mt-1 text-xs text-red-600`}
            >
              {errors.organization?.message}
            </p>
          </div>
        </div>

        <div className="w-full flex px-8 mb-12">
          <div className="u-width-47">
            <label htmlFor="nationalId" className="text-xs text-gray-400 flex justify-start mb-1">
              تاریخ تولد
            </label>
            <Controller
              control={control}
              name="birthDate"
              // defaultValue={birthDate}
              render={({field: {onChange, onBlur, value, ref, name}}) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  error={errors.birthDate}
                  placeholder={
                    userData && userData.birthDate
                      ? addDash(toPersianDigit(userData.birthDate))
                      : 'تاریخ تولد'
                  }
                  iClass={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm border-gray-400 ${
                    userData && userData.birthDate ? 'placeholder-black' : ''
                  }`}
                  max={unixToDateObject(new Date().getTime())}
                  name={name}
                  aria-invalid={!!errors.birthDate}
                />
              )}
            />

            <p
              className={`${errors.birthDate ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}
            >
              {errors.birthDate?.message}
            </p>
          </div>

          <div className="u-width-47 mr-auto"></div>
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="button button--primary px-5 justify-start sm:text-xs sm:px-0 sm:justify-center md:text-sm  mx-auto w-52"
          >
            {actionType === 'add' && <span>{!isLoading ? 'ثبت بازرس' : <DotLoading />}</span>}
            {actionType === 'update' && 'ثبت اطلاعات'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrUpdateInspector;
