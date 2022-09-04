/* eslint-disable */

import React, {useEffect, useState} from "react";
import Loading from "../../Loading";

import arbaeenService from "../../../services/arbaeen.service";
import {
  convertGregorianDateToJalaliDateWithHourAndMinute
} from "../../../helpers/utils";


const Road: React.FC<any> = ({params}: any) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    numberOfPassengers: null,
    numberOfSamah: null,
    roadId: null,
    submitTime: null
  })
  console.log('data => ', data)

  const fetchPopupData = async (param: any) => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getRoadInfo(param);
      setData(data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPopupData(parseInt(params.id));
  }, [params]);

  return (
    <>
      {loading ? (
        <div className="flex items-center text-xs">
          <Loading/>
          <span>درحال دریافت اطلاعات</span>
        </div>
      ) : (
        <>
          <div className="hidden">{JSON.stringify(params, null, 2)}</div>
          <div className="w-full max-h-60 overflow-y-auto px-2 custom-scrollbar-gray ">

            <div className="flex item-center justify-start items-center border-b border-gray-300 pb-2 pt-1">
              <span className="text-xs ml-2 text-gray-500">نام مسیر : </span>
              <span className="text-xs text-gray-500">{params.name}</span>
            </div>

            <div className="flex justify-start items-center border-b border-gray-300 pb-2 pt-2">
              <span className="text-xs ml-2 text-lime-600">تاریخ : </span>
              <span className="text-xs text-lime-600" style={{ direction : 'ltr'}}>{data.submitTime ? convertGregorianDateToJalaliDateWithHourAndMinute(data.submitTime)?.replace(/،/, ' ') : '-'}</span>
            </div>

            <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
              <span className="text-xs ml-2  text-lime-600">تعداد مسافران : </span>
              <span
                className="text-xs text-lime-600">{data.numberOfPassengers ? data.numberOfPassengers.commaSeprator().toPersianDigits() : '-'}</span>
            </div>
            <div className="flex justify-start items-center  pb-1 pt-2">
              <span className="text-xs ml-2 text-lime-600">تعداد زائران : </span>
              <span
                className="text-xs text-lime-600">{data.numberOfSamah ? data.numberOfSamah.commaSeprator().toPersianDigits() : '-'}</span>
            </div>

          </div>
        </>
      )}
    </>
  );
}

export default Road;