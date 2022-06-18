import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import dayjs from 'dayjs';
import DotLoading from 'src/components/Loading/DotLoading';
import DatePicker from 'src/components/Form/DatePicker';
import dayjs from 'dayjs';
import {convertGregorianDateToObjectDate} from 'src/helpers/utils';
// import calendar from "src/assets/images/icons/calendar.svg";

interface Iprops {
  handleSetFilters: any;
}

interface ISavedVisite {
  from: any;
  to: any;
  inspectorId: any;
  inspectorNationalId: any;
  qrCode: any;
}

// const convertDay = (day: any) => {
//   const date = new Date(day);
//   return dayjs(date).locale('en').format('YYYY-MM-DD');
// };

const FilterSavedInquiry: React.FC<Iprops> = ({handleSetFilters}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({});

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: {errors},
  } = useForm<ISavedVisite>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const [from, to] = watch(['from', 'to']);

  const convertDay = (day: any) => {
    const date = new Date(day);
    return dayjs(date).locale('en').format('YYYY-MM-DDT00:00:00');
  };

  const onSubmit = (values: any) => {
    handleSetFilters((filters: any) => {
      return {
        ...filters,
        from: values.from ? convertDay(values.from) : null,
        to: values.to ? convertDay(values.to) : null,
        inspectorId: values.inspectorId ? values.inspectorId : null,
        inspectorNationalId: values.inspectorNationalId ? values.inspectorNationalId : null,
        qrCode: values.qrCode ? values.qrCode : null,
        currentPage: 1,
      };
    });
  };

  return (
    <>
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <div className="w-full">
            <Controller
              control={control}
              name="from"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({field: {onChange, onBlur, value, ref, name}}) => (
                <DatePicker
                  max={convertGregorianDateToObjectDate(to)}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="از تاریخ"
                  selected={value}
                  error={errors.from}
                  iClass={`ltr placeholder-rtl relative block w-full rounded-full bg-white px-5 pl-9 py-2 placeholder-gray-400 shadow-lg focus:outline-none disabled:bg-gray-50 sm:text-sm ${
                    errors ? 'border-1 border-rose-600' : ''
                  } focus-visible disabled:shadow-none`}
                  name={name}
                  // eslint-disable-next-line no-unneeded-ternary
                  aria-invalid={errors.from ? true : false}
                />
              )}
            />

            <p className={`${errors.from ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}>
              {errors.from?.message}
            </p>
          </div>

          <div className="w-full">
            <Controller
              control={control}
              name="to"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({field: {onChange, onBlur, value, ref, name}}) => (
                <DatePicker
                  min={convertGregorianDateToObjectDate(from)}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="تا تاریخ"
                  selected={value}
                  error={errors.to}
                  iClass={`ltr placeholder-rtl relative block w-full rounded-full bg-white px-5 pl-9 py-2 placeholder-gray-400 shadow-lg        focus:outline-none disabled:bg-gray-50 sm:text-sm ${
                    errors ? 'border-1 border-rose-600' : ''
                  } focus-visible disabled:shadow-none`}
                  name={name}
                  // eslint-disable-next-line no-unneeded-ternary
                  aria-invalid={errors.to ? true : false}
                />
              )}
            />

            <p className={`${errors.to ? 'visible' : 'invisible'} mt-1 text-xs text-red-600`}>
              {errors.to?.message}
            </p>
          </div>

          <div className="w-full">
            <input
              type="text"
              {...register('inspectorNationalId')}
              placeholder="کد ملی بازرس"
              className="ltr placeholder-rtl focus-visible focus:outline-none relative block  w-full rounded-full bg-white px-5 py-2 placeholder-gray-400 shadow-lg disabled:bg-gray-50  disabled:shadow-none sm:text-sm"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              {...register('inspectorId')}
              placeholder="کد بازرس"
              className="ltr placeholder-rtl focus-visible focus:outline-none relative block  w-full rounded-full bg-white px-5 py-2 placeholder-gray-400 shadow-lg disabled:bg-gray-50  disabled:shadow-none sm:text-sm"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              {...register('qrCode')}
              placeholder="QR-code"
              className="ltr placeholder-rtl focus-visible focus:outline-none relative block  w-full rounded-full bg-white px-5 py-2 placeholder-gray-400 shadow-lg disabled:bg-gray-50  disabled:shadow-none sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => {
                reset({
                  from: null,
                  to: null,
                  inspectorId: null,
                  inspectorNationalId: null,
                  qrCode: null,
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
