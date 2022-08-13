import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Select from './Select';
import DotLoading from '../DotLoading';

interface Iprops {
  provinceOption: Array<any>;
  sattusOption: Array<any>;
  query: any;
  setQuery: (data: any) => void;
}

interface ISavedVisite {
  nationalIdOrMobileNumber: any;
  province: any;
  loked: any;
}

const FilterSavedInquiry: React.FC<Iprops> = ({provinceOption, sattusOption, query, setQuery}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});

  const {
    handleSubmit,
    control,
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: {errors},
  } = useForm<ISavedVisite>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: any) => {
    setQuery(() => {
      debugger;
      return {
        ...query,
        province: values.province,
        loked: values.loked,
        nationalIdOrMobileNumber: values.nationalIdOrMobileNumber
          ? values.nationalIdOrMobileNumber
          : null,
        currentPage: 1,
      };
    });
  };

  return (
    <>
      <form className="w-3/4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <div className="w-full">
            <input
              type="text"
              {...register('nationalIdOrMobileNumber')}
              placeholder="کد ملی یا موبایل"
              className="rtl  relative block w-full rounded-full  bg-white px-5 py-2 placeholder-gray-400 shadow-lg focus:outline-none disabled:bg-gray-50 sm:text-sm  focus-visible disabled:shadow-none"
            />
          </div>
          <div className="w-full ">
            <Controller
              control={control}
              name="province"
              render={({field: {onChange, onBlur, value, name}}) => (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  // options={healthStatusOptions}
                  options={provinceOption}
                  placeholder="همه استان ها "
                  icons={{
                    selected: <div className="h-4 w-4 rounded-full border border-gray-400" />,
                    default: (
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-green-700">
                        <div className="h-2 w-2 rounded-full bg-green-700" />
                      </div>
                    ),
                  }}
                  name={name}
                />
              )}
            />
          </div>

          <div className="w-full ">
            <Controller
              control={control}
              name="loked"
              render={({field: {onChange, onBlur, value, name}}) => (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  options={sattusOption}
                  placeholder="همه "
                  selected={value}
                  icons={{
                    selected: <div className="h-4 w-4 rounded-full border border-gray-400" />,
                    default: (
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-green-700">
                        <div className="h-2 w-2 rounded-full bg-green-700" />
                      </div>
                    ),
                  }}
                  name={name}
                />
              )}
            />
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => {
                reset({
                  nationalIdOrMobileNumber: null,
                  loked: null,
                  province: null,
                });
              }}
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full border bg-white px-4 py-1.5 text-sm rtl:space-x-reverse"
              style={{borderColor: '#175A76', color: '#175A76'}}
            >
              <span>حذف فیلتر</span>
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm text-white rtl:space-x-reverse"
              style={{backgroundColor: '#175A76'}}
            >
              <span>{!submitted ? 'اعمال فیلتر' : <DotLoading />}</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default FilterSavedInquiry;
