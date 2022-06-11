import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import DotLoading from 'src/components/Loading/DotLoading';
import DatePicker from './DatePicker';

interface Iprops {
  handleSetFilters: any;
}

interface ISavedVisite {
  date: any;
  nationalId: any;
  status: any;
  numberOfDoses: any;
}

const convertDay = (day: any) => {
  const date = new Date(day);
  return dayjs(date).locale('en').format('YYYY-MM-DD');
};

const FilterSavedInquiry: React.FC<Iprops> = ({handleSetFilters}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: {errors},
  } = useForm<ISavedVisite>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: any) => {
    handleSetFilters((filters: any) => {
      return {
        ...filters,
        inquiryDate: values.inquiryDate ? convertDay(values.inquiryDate) : null,
        permissionStatus: values.status,
        dose: values.numberOfDoses,
        nationalId: values.nationalId ? values.nationalId : null,
        currentPage: 1,
      };
    });
  };

  return (
    <>
      <form className="w-2/3 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <div className="w-full">
            <Controller
              control={control}
              name="date"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({field: {onChange, onBlur, value, ref, name}}) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  error={errors.date}
                  iClass={`ltr  relative block w-full rounded-full  bg-white px-5 py-2 placeholder-gray-400 shadow-lg        focus:outline-none disabled:bg-gray-50 sm:text-sm ${
                    errors ? 'border-1 border-rose-600' : ''
                  } focus-visible disabled:shadow-none`}
                  name={name}
                  // aria-invalid={errors.date ? true : false}
                />
              )}
            />

            <p className={`${errors.date ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}>
              {errors.date?.message}
            </p>
          </div>

          <div className="w-full">
            <input
              type="text"
              {...register('nationalId')}
              placeholder="کد ملی مد نظر"
              className="rtl  focus-visible relative block w-full  rounded-full bg-white px-5 py-2 placeholder-gray-400 shadow-lg focus:outline-none disabled:bg-gray-50  disabled:shadow-none sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => {
                reset({
                  date: null,
                  status: null,
                  numberOfDoses: null,
                  nationalId: null,
                });
              }}
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full border border-[#175A76] bg-white px-4 py-1.5 text-sm text-[#175A76] rtl:space-x-reverse"
            >
              <span>حذف فیلتر</span>
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full bg-[#175A76] px-4 py-1.5 text-sm text-white rtl:space-x-reverse"
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
