/* eslint-disable no-console */

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "src/shared/datepicker";
import { unixToDateObject } from "../helpers/utils";

interface IFormInput {
  visitDate: number | null | string;
}






export const Form: React.FC<{}> = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    visitDate: Yup.string().nullable(),
  });

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<{ visitDate: number | null | string }>({
    mode: "onChange",
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value: any) => {
   console.log(value);
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <div className="w-32">
            <Controller
              control={control}
              name="visitDate"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  error={errors.visitDate}
                  placeholder="تاریخ ملاقات"
                  name={name}
                  max={unixToDateObject(new Date().getTime())}
                  iClass={`ltr  relative block w-full rounded-full  bg-white px-5 py-2 placeholder-gray-400 shadow-lg        focus:outline-none disabled:bg-gray-50 sm:text-sm ${
                    errors ? "border-1 border-rose-600" : ""
                  } focus-visible disabled:shadow-none`}
                  aria-invalid={!!errors.visitDate}
                />
              )}
            />

            <p
              className={`${
                errors.visitDate ? "visible" : "invisible"
              } mt-1 text-xs text-red-600`}
            >
              {errors.visitDate?.message}
            </p>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => {
                reset({ visitDate: null });
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
              show data
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
