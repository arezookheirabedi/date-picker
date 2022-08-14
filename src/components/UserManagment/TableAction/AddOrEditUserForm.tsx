/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import cogoToast from 'cogo-toast';

import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import SingleSelectInModal from '../../Select2/SingleSelectInModal';
import MultiSelectInModal from '../../Select2/MultiSelectInModal';
import {addUserValidation} from '../../../validations/index';
import DotLoading from '../../../components/DotLoading';

import fsServices from '../../../services/fs.service';
import authService from '../../../services/authentication.service';

interface IAddOrUpdateUser {
  actionType?: string;
  actionTitle?: string;
  setShowModal?: any;
  shouldRefresh: (data: boolean) => void;
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

const initialًRuleOptions = [
  {
    title: 'انتخاب نقش',
    value: null,
  },
];

const initialًTagOptions = [
  {
    title: 'انتخاب برچسب',
    value: null,
  },
];

const initialًProvinceResourceOptions = [
  {
    title: 'انتخاب استان',
    value: null,
  },
];

const initialًCityResourceOptions = [
  {
    title: 'انتخاب شهر',
    value: null,
  },
];

const AddOrUpdateUser: React.FC<IAddOrUpdateUser> = ({actionType, actionTitle, setShowModal, shouldRefresh}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [provinceOptions, setProvinceOptions] = useState<any>(initialProvinceOptions);
  const [ruleOptions, setRuleOptions] = useState<any>(initialًRuleOptions);
  const [tagOptions, setTagOptions] = useState<any>(initialًTagOptions);
  const [provinceResourceOptions, setProvinceResourceOptions] = useState<any>(
    initialًProvinceResourceOptions
  );
  const [cityResourceOptions, setCityResourceOptions] = useState<any>(initialًCityResourceOptions);

  // eslint-disable-next-line
  const [cityOptions, setCityOptions] = useState<any>(initialCityOptions);

  // const [valueOption, setValueOption] = useState(null);
  const [provinceTitleInput, setProvinceTitleInput] = useState<any>(null);
  const [cityTitleInput, setCityTitleInput] = useState<any>(null);

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
      email: null,
      firstName: null,
      lastName: null,
      locked: false,
      mobileSet: [],
      nationalId: null,
      password: null,
      username: null,
    },
  });

  const [valuesOfRole, setValuesOfRoles] = useState([]);
  const [tagResources, setTagResources] = useState<any>(null);
  const [provinceResources, setProvinceResources] = useState<any>(null);
  const [cityResources, setCityResources] = useState<any>(null);

  const getValuesOfRoles = (values: any) => {

    const temp: any = [];
    values.forEach((item: any) => temp.push(item.title));
    setValuesOfRoles(temp);
  };

  const getValuesOfTag = (values: any) => {
    let temp: any = [];
    values.forEach((item: any) => temp.push(item.id));

    setTagResources((prev: any) => {
      return {
        name: 'tag',
        value: temp,
      };
    });
  };

  const getValuesOfProvinceResource = (values: any) => {
    const temp: any = [];
    values.forEach((item: any) => temp.push(item.id));

    setProvinceResources(() => {
      return {
        name: 'province',
        value: temp,
      };
    });
  };

  const getValuesOfCityResource = (values: any) => {
    const temp: any = [];
    values.forEach((item: any) => temp.push(item.id));

    setCityResources(() => {
      return {
        name: 'city',
        value: temp,
      };
    });
  }

  const onSubmit = async (values: any) => {
    if (!valuesOfRole.length) {
      cogoToast.error('اضافه کردن نقش اجباری است.', {
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
      return;
    }
    const extraData = {
      province: provinceTitleInput ? provinceTitleInput.title : null,
      city: cityTitleInput ? cityTitleInput.title : null,
      mobileSet: [values.mobileSet],
      roles: valuesOfRole,
      resources: [tagResources, provinceResources, cityResources],
      nationalId: values.nationalId ? values.nationalId : null
    };
    const finalData = {
      ...values,
      ...extraData,
    };
    console.log('final data => ', finalData);
    setIsLoading(true);
    try {
      const {data} = await fsServices.addUser(finalData);
      cogoToast.success('عملیات با موفقیت انجام شد!');
      setShowModal(false);
      shouldRefresh(true);
      // handleUpdateVisitList((prev: any) => !prev)
    } catch (error: any) {

      if (error.errors && error.errors.length) {
        // cogoToast.error("خطا در ارسال اطلاعات");
        error.errors.map((item: any) => {
          setError(item.field, {
            message: item.message,
          });
        });
        return;
      }

      if (error.message) {
        cogoToast.error(error.message);

        // setError("appointmentDate", {
        //   message: error.message
        // });
        // if (errors && errors.length) {
        //   errors.map((item: any) => {
        //     return setError(item.field, {
        //       message: item.message
        //     })
        //   })
        // }
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

  const cancelTokenendPoint = cancelTokenSource();

  function cancelRequestEndPoint() {
    cancelTokenendPoint.cancel(msgRequestCanceled);
  }

  const getRoles = async () => {
    const normalizedData: any[] = [];

    const {data} = (await authService.rolePermision(
      {pageNumber: 0, pageSize: 1000},
      {cancelToken: cancelTokenendPoint.token}
    )) as any;
    data.content.forEach((item: any) => {
      normalizedData.push({
        title: item.name,
        value: item.id,
      });
    });
    setRuleOptions(() => {
      return [...normalizedData];
    });
  };

  const getResources = async () => {
    const normalizedTagData: any[] = [];
    const normalizedProvinceData: any[] = [];
    const normalizedCityData: any[] = [];
    const {data} = (await authService.getResources(
      {pageNumber: 0, pageSize: 1000},
      {cancelToken: cancelTokenendPoint.token}
    )) as any;
    data.content.forEach((item: any) => {
      if (item.name === 'tag') {
        normalizedTagData.push({
          title: item.title,
          value: item.value,
        });
      }
      if (item.name === 'province') {
        normalizedProvinceData.push({
          title: item.title,
          value: item.value,
        });
      }
      if (item.name === 'city') {
        normalizedCityData.push({
          title: item.title,
          value: item.value,
        });
      }
    });

    setTagOptions(() => {
      return [...normalizedTagData];
    });

    setProvinceResourceOptions(() => {
      return [...normalizedProvinceData];
    });

    setCityResourceOptions(() => {
      return [...normalizedCityData];
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
    getRoles();
    getResources();

    return () => {
      cancelRequestEndPoint();
    };
  }, []);

  return (
    <div>
      <h3 className="mb-6">
        {actionType === 'add' && `ثبت ${actionTitle} جدید`}
        {actionType === 'update' && 'ویرایش اطلاعات'}
      </h3>
      <div>
        <form className="text-base" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex px-12 mb-6">
            <div className="u-width-47">
              <label htmlFor="firstName" className="text-xs text-gray-400 flex justify-start mb-1">
                نام
              </label>
              <input
                id="firstName"
                {...register('firstName', addUserValidation.firstName)}
                type="text"
                className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                  ${errors.firstName ? 'border-1 border-rose-600' : 'border-gray-400'}
                  `}
              />
              <p
                className={`${
                  errors.firstName ? 'visible' : 'invisible'
                } mt-1 text-xs text-red-600`}
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
                {...register('lastName', addUserValidation.lastName)}
                type="text"
                className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.firstName ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
              />
              <p
                className={`${errors.lastName ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}
              >
                {errors.lastName?.message}
              </p>
            </div>
          </div>
          <div className="w-full flex px-12 mb-6">
            <div className="u-width-47">
              <label htmlFor="mobileSet" className="text-xs text-gray-400 flex justify-start mb-1">
                شماره موبایل
              </label>
              <input
                id="mobileSet"
                {...register('mobileSet', addUserValidation.mobileSet)}
                type="text"
                className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.mobileSet ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
              />
              <p
                className={`${
                  errors.mobileSet ? 'visible' : 'invisible'
                } mt-1 text-xs text-red-600`}
              >
                {errors.mobileSet?.message}
              </p>
            </div>
            <div className="u-width-47 mr-auto">
              <label htmlFor="username" className="text-xs text-gray-400 flex justify-start mb-1">
                نام کاربری
              </label>
              <input
                id="username"
                {...register('username', addUserValidation.username)}
                type="text"
                className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.username ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
              />
              <p
                className={`${errors.username ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}
              >
                {errors.username?.message}
              </p>
            </div>
          </div>

          <div className="w-full flex px-12 mb-6">
            <div className="u-width-47">
              <label htmlFor="province" className="text-xs text-gray-400 flex justify-start mb-1">
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
              <label htmlFor="city" className="text-xs text-gray-400 flex justify-start mb-1">
                شهر
              </label>
              <SingleSelectInModal options={cityOptions} setValueOption={setCityTitleInput}/>
              {/* <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm" */}
              {/*       type="text"/> */}
            </div>
          </div>

          <div className="w-full flex px-12 mb-6">
            <div className="u-width-47">
              <label htmlFor="email" className="text-xs text-gray-400 flex justify-start mb-1">
                پست الکترونیک
              </label>
              {/* <SimpleSelect options={provinceOptions} defaultOption='تهران'/> */}
              {/* <SingleSelectInModal options={provinceOptions} /> */}
              <input
                id="email"
                {...register('email', addUserValidation.email)}
                type="text"
                className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.email ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
              />
              <p className={`${errors.email ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}>
                {errors.email?.message}
              </p>
            </div>
            <div className="u-width-47 mr-auto">
              <label htmlFor="nationalId" className="text-xs text-gray-400 flex justify-start mb-1">
                کدملی
              </label>
              <input
                id="nationalId"
                {...register('nationalId', addUserValidation.nationalId)}
                className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.nationalId ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
                type="text"
              />
              <p
                className={`${
                  errors.nationalId ? 'visible' : 'invisible'
                } mt-1 text-xs text-red-600`}
              >
                {errors.nationalId?.message}
              </p>
            </div>
          </div>

          <div className="w-full flex px-12 mb-12">
            <div className="u-width-47">
              <label htmlFor="password" className="text-xs text-gray-400 flex justify-start mb-1">
                رمز عبور
              </label>
              {/* <SimpleSelect options={provinceOptions} defaultOption='تهران'/> */}
              {/* <SingleSelectInModal options={provinceOptions} /> */}
              <input
                id="password"
                {...register('password', addUserValidation.password)}
                type="text"
                className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.password ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
              />
              <p
                className={`${errors.password ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}
              >
                {errors.password?.message}
              </p>
            </div>
            <div className="u-width-47 mr-auto">
              {/* <label htmlFor="nationalId" className="text-xs text-gray-400 flex justify-start mb-1">
                کدملی
              </label>
              <input
                id="nationalId"
                {...register('nationalId', addUserValidation.nationalId)}
                className={`w-full border-solid border  rounded pr-4 py-1 h-9 text-sm
                ${errors.nationalId ? 'border-1 border-rose-600' : 'border-gray-400'}
                `}
                type="text"
              />
              <p
                className={`${
                  errors.nationalId ? 'visible' : 'invisible'
                } mt-1 text-xs text-red-600`}
              >
                {errors.nationalId?.message}
              </p> */}
            </div>
          </div>

          <h5 className="text-lg font-black text-right px-12 mb-8">سطح دسترسی کاربر</h5>
          <div className="mb-4">
            <MultiSelectInModal options={ruleOptions} title="نقش ها" getValues={getValuesOfRoles}/>
          </div>
          <div className="mb-4">
            <MultiSelectInModal options={tagOptions} title="برچسب ها" getValues={getValuesOfTag}/>
          </div>
          <div className="mb-4">
            <MultiSelectInModal
              options={provinceResourceOptions}
              title="استان"
              getValues={getValuesOfProvinceResource}
            />
          </div>
          <div className="mb-8">
            <MultiSelectInModal options={cityResourceOptions} title="شهر" getValues={getValuesOfCityResource}/>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="button button--primary px-5 justify-start sm:text-xs sm:px-0 sm:justify-center md:text-sm  mx-auto w-52 mb-12"
            >
              {actionType === 'add' && (
                <span>{!isLoading ? `ثبت ${actionTitle}` : <DotLoading/>}</span>
              )}
              {actionType === 'update' && ` ویرایش ${actionTitle}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateUser;
