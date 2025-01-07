/* eslint-disable no-console */

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "../shared/datepicker";
import { unixToDateObject } from "../helpers/utils";

interface IFormInput {
  visitDate: number | null | string;
}


export const Form: React.FC<{}> = () => {
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
                  placeholder="تاریخ "
                  name={name}
                  max={unixToDateObject(new Date().getTime())}
                  iClass={`ltr  relative block w-full rounded-full  bg-white px-5 py-2 placeholder-gray-400 shadow-lg        focus:outline-none disabled:bg-gray-50 sm:text-sm ${
                    errors ? "border-1 border-rose-600" : ""
                  } focus-visible disabled:shadow-none`}
                  aria-invalid={!!errors.visitDate}
                />
              )}
            />

          </div>
 
        </div>
      </form>
    </>
  );
};
