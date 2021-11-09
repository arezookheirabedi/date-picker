import React, { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
export default function Checkbox(props: IProps) {
  return (
    <>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      <label className={`ch-container ${  props.className}`} htmlFor="ch-id-1">
        <input type="checkbox" {...props} id="ch-id-1" />

        <span> مرا بخاطر بسپار</span>
        <span className="checkmark"/>
      </label>
    </>
  );
}
