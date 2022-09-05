/* eslint-disable */

import React, {useEffect, useState} from "react";
import Loading from "../../Loading";

import arbaeenService from "../../../services/arbaeen.service";
import {
  convertGregorianDateToJalaliDateWithHourAndMinute,
  convertGregorianDateToJalaliDate
} from "../../../helpers/utils";


const Airport: React.FC<any> = ({params}: any) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    trafficSubmitTime: null,
    regionSubmitTime: null,
    numberOfPassengers: null,
    numberOfSamah: null,
    numberOfPassengersIn50KM: null,
    numberOfPassengersIn100KM: null,
    numberOfPassengersIn150KM: null,
    numberOfPassengersIn200KM: null,
    exitingCount: null,
    enteringCount: null
  })
  console.log('data => ', data)

  const fetchPopupData = async (params: any) => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getAirportAndBorderInfo(params);
      setData(data);
    } catch (err) {
      setData({
        trafficSubmitTime: null,
        regionSubmitTime: null,
        numberOfPassengers: null,
        numberOfSamah: null,
        numberOfPassengersIn50KM: null,
        numberOfPassengersIn100KM: null,
        numberOfPassengersIn150KM: null,
        numberOfPassengersIn200KM: null,
        exitingCount: null,
        enteringCount: null
      });
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPopupData({
      regionId: parseInt(params.id),
      borderId: params.borderId ? parseInt(params.borderId) : null
    });
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

            <div className="flex item-center justify-start items-center border-b border-gray-300 pb-2 pt-2">
              <span className="text-xs ml-2 text-gray-500">نام  : </span>
              <span className="text-xs text-gray-500">{params.name}</span>
            </div>

            {
              data.regionSubmitTime && (
                <div className="flex justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2  text-lime-600">تاریخ : </span>
                  <span className="text-xs text-lime-600"
                        style={{direction: 'ltr'}}>{data.regionSubmitTime ? convertGregorianDateToJalaliDateWithHourAndMinute(data.regionSubmitTime)?.replace(/،/, ' ') : '-'}</span>
                </div>
              )
            }

            {
              data.numberOfPassengers && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-lime-600">تعداد مسافران : </span>
                  <span
                    className="text-xs text-lime-600">{data.numberOfPassengers ? data.numberOfPassengers.commaSeprator().toPersianDigits() : '-'}</span>
                </div>
              )
            }

            {
              data.numberOfSamah && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-lime-600">تعداد زائران : </span>
                  <span
                    className="text-xs text-lime-600">{data.numberOfSamah ? data.numberOfSamah.commaSeprator().toPersianDigits() : '-'}</span>
                </div>
              )
            }

            {
              data.numberOfPassengersIn50KM && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-lime-600">تعداد مسافران در شعاع ۵۰ کیلومتری : </span>
                  <span
                    className="text-xs text-lime-600">{data.numberOfPassengersIn50KM ? data.numberOfPassengersIn50KM.commaSeprator().toPersianDigits() : '-'}</span>
                </div>
              )
            }

            {
              data.numberOfPassengersIn100KM && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-lime-600">تعداد مسافران در شعاع ۱۰۰ کیلومتری : </span>
                  <span
                    className="text-xs text-lime-600">{data.numberOfPassengersIn100KM ? data.numberOfPassengersIn100KM.commaSeprator().toPersianDigits() : '-'}</span>
                </div>
              )
            }

            {
              data.numberOfPassengersIn150KM && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-lime-600">تعداد مسافران در شعاع ۱۵۰ کیلومتری : </span>
                  <span
                    className="text-xs text-lime-600">{data.numberOfPassengersIn150KM ? data.numberOfPassengersIn150KM.commaSeprator().toPersianDigits() : '-'}</span>
                </div>
              )
            }

            {
              data.numberOfPassengersIn200KM && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-lime-600">تعداد مسافران در شعاع ۲۰۰ کیلومتری : </span>
                  <span
                    className="text-xs text-lime-600">{data.numberOfPassengersIn200KM ? data.numberOfPassengersIn200KM.commaSeprator().toPersianDigits() : '-'}</span>
                </div>
              )
            }

            {
              data.trafficSubmitTime && (
                <div className="flex justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2  text-blue-600">تاریخ : </span>
                  <span className="text-xs text-blue-600"
                        style={{direction: 'ltr'}}>{data.trafficSubmitTime ? convertGregorianDateToJalaliDate(data.trafficSubmitTime)?.replace(/،/, ' ') : '-'}</span>
                </div>
              )
            }


            {
              data.exitingCount && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-blue-600">تعداد مسافر خارج شده : </span>
                  <span
                    className="text-xs text-blue-600">{data.exitingCount ? data.exitingCount.commaSeprator().toPersianDigits() : '-'}</span>
                </div>
              )
            }

            {
              data.enteringCount && (
                <div className="flex  justify-start items-center  pb-2 pt-2">
                  <span className="text-xs ml-2 text-blue-600">تعداد مسافر وارد شده : </span>
                  <span
                    className="text-xs text-blue-600">{data.enteringCount ? data.enteringCount.commaSeprator().toPersianDigits() : '-'}</span>
                </div>
              )
            }

          </div>
        </>
      )}
    </>
  );
}

export default Airport;