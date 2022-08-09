import React from "react";
// import SimpleSelect from "../Select2/SimpleSelect";
import SingleSelectInModal from "../Select2/SingleSelectInModal";

interface IAddOrUpdateInspector {
  actionType?: any
}

const provinceOptions = [
  {
    value: 'آذربایجان شرقی',
    title: 'آذربایجان شرقی',
  },
  {
    value: 'آذربایجان غربی',
    title: 'آذربایجان غربی',
  },
  {
    value: 'اردبیل',
    title: 'اردبیل',
  },
  {
    value: 'اصفهان',
    title: 'اصفهان',
  },
  {
    value: 'البرز',
    title: 'البرز',
  },
  {
    value: 'ایلام',
    title: 'ایلام',
  },
  {
    value: 'بوشهر',
    title: 'بوشهر',
  },
  {
    value: 'تهران',
    title: 'تهران',
  },
  {
    value: 'خراسان جنوبی',
    title: 'خراسان جنوبی',
  },
  {
    value: 'خراسان رضوی',
    title: 'خراسان رضوی',
  },
  {
    value: 'خراسان شمالی',
    title: 'خراسان شمالی',
  },
  {
    value: 'خوزستان',
    title: 'خوزستان',
  },
  {
    value: 'زنجان',
    title: 'زنجان',
  },
  {
    value: 'سمنان',
    title: 'سمنان',
  },
  {
    value: 'سیستان و بلوچستان',
    title: 'سیستان و بلوچستان',
  },
  {
    value: 'فارس',
    title: 'فارس',
  },
  {
    value: 'قزوین',
    title: 'قزوین',
  },
  {
    value: 'قم',
    title: 'قم',
  },
  {
    value: 'کردستان',
    title: 'کردستان',
  },
  {
    value: 'کرمان',
    title: 'کرمان',
  },
  {
    value: 'کرمانشاه',
    title: 'کرمانشاه',
  },
  {
    value: 'کهگیلویه وبویراحمد',
    title: 'کهگیلویه وبویراحمد',
  },
  {
    value: 'گلستان',
    title: 'گلستان',
  },
  {
    value: 'گیلان',
    title: 'گیلان',
  },
  {
    value: 'لرستان',
    title: 'لرستان',
  },
  {
    value: 'مازندران',
    title: 'مازندران',
  },
  {
    value: 'مرکزی',
    title: 'مرکزی',
  },
  {
    value: 'هرمزگان',
    title: 'هرمزگان',
  },
  {
    value: 'همدان',
    title: 'همدان',
  },
  {
    value: 'یزد',
    title: 'یزد',
  },
  {
    value: 'چهارمحال و بختیاری',
    title: 'چهارمحال و بختیاری',
  }
];

const AddOrUpdateInspector: React.FC<IAddOrUpdateInspector> = ({actionType}) => {
  return (
    <div>
      <h3 className="mb-6">
        {actionType === 'add' && 'ثبت بازرس جدید'}
        {actionType === 'update' && 'ویرایش اطلاعات'}

      </h3>
      <form action="">
        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label htmlFor="full-name" className="text-xs text-gray-400 flex justify-start mb-1">نام و نام
              خانوادگی</label>
            <input id="full-name" type="text"
                   className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"/>
          </div>
          <div className="u-width-47 mr-auto">
            <label htmlFor="national-code" className="text-xs text-gray-400 flex justify-start mb-1">کدملی</label>
            <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"
                   type="text"/>
          </div>
        </div>
        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label htmlFor="full-name" className="text-xs text-gray-400 flex justify-start mb-1">شماره موبایل</label>
            <input id="full-name" type="text"
                   className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"/>
          </div>
          <div className="u-width-47 mr-auto">
            <label htmlFor="national-code" className="text-xs text-gray-400 flex justify-start mb-1">کدپرسنلی</label>
            <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"
                   type="text"/>
          </div>
        </div>
        <div className="w-full flex px-8 mb-6">
          <div className="u-width-47">
            <label htmlFor="full-name" className="text-xs text-gray-400 flex justify-start mb-1">پست سازمانی</label>
            {/* <SimpleSelect options={provinceOptions} defaultOption='تهران'/> */}
            <SingleSelectInModal options={provinceOptions} />
            {/* <input id="full-name" type="text" */}
            {/*       className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"/> */}
          </div>
          <div className="u-width-47 mr-auto">
            <label htmlFor="national-code" className="text-xs text-gray-400 flex justify-start mb-1">سازمان محل
              خدمت</label>
            <SingleSelectInModal options={provinceOptions} />
            {/* <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm" */}
            {/*       type="text"/> */}
          </div>
        </div>
        <div className="w-full flex px-8 mb-12">
          <div className="u-width-47">
            <label htmlFor="full-name" className="text-xs text-gray-400 flex justify-start mb-1">استان</label>
            <SingleSelectInModal options={provinceOptions} />
            {/* <input id="full-name" type="text" */}
            {/*       className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm"/> */}
          </div>
          <div className="u-width-47 mr-auto">
            <label htmlFor="national-code" className="text-xs text-gray-400 flex justify-start mb-1">شهر</label>
            <SingleSelectInModal options={provinceOptions} />
            {/* <input id="national-code" className="w-full border-solid border border-gray-400 rounded pr-4 py-1 h-9 text-sm" */}
            {/*       type="text"/> */}
          </div>
        </div>
        <div className="w-full">
          <div
            className="button button--primary px-5 justify-start sm:text-xs sm:px-0 sm:justify-center md:text-sm  mx-auto w-52"
          >
            {actionType === 'add' && 'ثبت بازرس'}
            {actionType === 'update' && 'ثبت اطلاعات'}

          </div>
        </div>
      </form>
    </div>
  )
}

export default AddOrUpdateInspector;