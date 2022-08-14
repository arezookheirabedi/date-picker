/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import cogoToast from 'cogo-toast';
import dayjs from "dayjs";
// import SimpleSelect from "../Select2/SimpleSelect";
import SingleSelectInModal from '../Select2/SingleSelectInModal';
// import {addInspectorValidation} from '../../../validations/index';
import DotLoading from '../../components/DotLoading';

import fsServices from '../../services/fs.service';
import {addInspectorValidation} from 'src/validations';
import DatePicker from "../Form/DatePicker";
import {
  convertGregorianDateToJalaliDate,
  convertGregorianDateToObjectDate, fixNumbers,
  unixToDateObject
} from "../../helpers/utils";

interface IAddOrUpdateInspector {
  actionType?: any;
  setShowModal?: any
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

const AddOrUpdateInspector: React.FC<IAddOrUpdateInspector> = ({actionType, setShowModal}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [provinceOptions, setProvinceOptions] = useState<any>(initialProvinceOptions);
  const [cityOptions, setCityOptions] = useState<any>(initialCityOptions);

  const [provinceTitleInput, setProvinceTitleInput] = useState<any>(null);
  const [cityTitleInput, setCityTitleInput] = useState<any>(null);
  const [activityStatusValue, setActivityStatusValue] = useState<any>(activityStatus[0]);

  console.log('province title  => ', provinceTitleInput)
  console.log('city title  => ', cityTitleInput)

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
      firstName: null,
      lastName: null,
      activityStatus: null,
      city: null,
      province: null,
      inspectorId: null,
      mobileNumber: null,
      nationalId: null,
      organization: null,
      birthDate: null,
      role: null
    },
  });

  const getProvince = async () => {
    const normalizedData: any[] = [];
    const {data} = (await fsServices.getProvince()) as any;
    data.forEach((item: any) => {
      normalizedData.push({
        title: item.province,
        value: item.provinceCode,
      });
    });
    setProvinceOptions((prev: any) => {
      return [...prev, ...normalizedData];
    });
  };

  const getCities = async (provinceCode: any) => {
    const normalizedData: any[] = [];
    const {data} = (await fsServices.getCities(provinceCode)) as any;
    data[0].cities.forEach((item: any) => {
      normalizedData.push({
        title: item.name,
        value: item.cityCode,
      });
    });
    setCityOptions(() => {
      return [
        {
          title: 'انتخاب شهر',
          value: null,
        },
        ...normalizedData
      ];
    });
  };

  useEffect(() => {
    if (provinceTitleInput && provinceTitleInput.value) {
      getCities(provinceTitleInput?.value);
    } else {
      setCityOptions(initialCityOptions);
      setCityTitleInput(null)
    }
  }, [provinceTitleInput]);

  useEffect(() => {
    getProvince();
  }, []);

  const validations = (values: any) => {

    if (!values.birthDate) {
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

  }


  const onSubmit = async (values: any) => {

    console.log('province title inside => ', provinceTitleInput)
    console.log('city title inside => ', cityTitleInput)

    if (!validations(values)) return;

    let birthDate = values.birthDate && new Date(values.birthDate);

    const jalaliDate = convertGregorianDateToJalaliDate(birthDate)
    const finalJalaliDate = fixNumbers({
      value: jalaliDate?.replace(/\//g, '')
    });

    const extraData = {
      province: provinceTitleInput.title,
      city: cityTitleInput.title,
      activityStatus: activityStatusValue?.value,
      birthDate: finalJalaliDate,
      firstName: values.firstName ? values.firstName : null,
      lastName: values.lastName ? values.lastName : null,
      role: values.role ? values.role : null,
      inspectorId: values.inspectorId ? values.inspectorId : null,
      // mobileSet: [values.mobileSet],
      // roles: valuesOfRole,
      // resources: [tagResources, provinceResources],
    };
    const finalData = {
      ...values,
      ...extraData,
    };
    console.log('final data => ', finalData);
    setIsLoading(true);
    try {
      const {data} = await fsServices.addInspector(finalData);
      cogoToast.success('عملیات با موفقیت انجام شد!');
      setShowModal(false);
      // handleUpdateVisitList((prev: any) => !prev)
    } catch (error: any) {
      console.log(error);
      if (error.errors && error.errors.length) {
        cogoToast.error("خطا در ارسال اطلاعات");
        error.errors.map((item: any) => {
          setError(item.field, {
            message: item.message,
          });
        });
        return;
      }
      if (error.message) {
        cogoToast.error(error.message);
      } else if (error.request) {
        console.log('The request was made but no response was received');
      } else {
        console.log('Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
    // try {
    //   setTimeout(() => {
    //     throw { message: "خطا در ثبت" };
    //   }, 2000);
    // } catch (error: any) {
    //   cogoToast.error(error.message);
    //   console.log(error);
    // } finally {
    //   setSubmitted(false);
    // }
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
            <p
              className={`${
                errors.role ? 'visible' : 'invisible'
              } mt-1 text-xs text-red-600`}
            >
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
            <SingleSelectInModal options={activityStatus} setValueOption={setActivityStatusValue}/>
            {/* <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm" */}
            {/*       type="text"/> */}
          </div>
        </div>
        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label htmlFor="full-name" className="text-xs text-gray-400 flex justify-start mb-1">
              استان
            </label>
            <SingleSelectInModal
              options={provinceOptions}
              setValueOption={setProvinceTitleInput}
            />
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
            <SingleSelectInModal options={cityOptions} setValueOption={setCityTitleInput}/>
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
              className={`${errors.organization ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}
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
                  placeholder="تاریخ تولد"
                  iClass={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm border-gray-400`}
                  max={unixToDateObject(new Date().getTime())}
                  name={name}
                  aria-invalid={!!errors.birthDate}
                />
              )}
            />

            <p className={`${errors.birthDate ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}>
              {errors.birthDate?.message}
            </p>
          </div>

          <div className="u-width-47 mr-auto">

          </div>
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="button button--primary px-5 justify-start sm:text-xs sm:px-0 sm:justify-center md:text-sm  mx-auto w-52"
          >
            {actionType === 'add' && <span>{!isLoading ? 'ثبت بازرس' : <DotLoading/>}</span>}
            {actionType === 'update' && 'ثبت اطلاعات'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrUpdateInspector;
