import React from "react";
import plusIcon from "../../assets/images/icons/plus.svg";

export default function index() {
  return (
    <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8 mt-4">
      <div className="flex flex-grow align-center justify-start">
        <div className="w-3/4">
          <div className="relative inline-flex align-center leading-3 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="جستجوی کدملی، موبایل"
              className="py-2 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
        </div>
        <div className="w-1/4">
          <div className="button button--primary px-5 justify-start w-10/12 mx-auto">
            <img src={plusIcon} alt="+" className="ml-4" />
            اضافه کردن بازرس جدید
          </div>
        </div>

      </div>

    </div>
  )
}