/* eslint-disable */

import React, {useEffect, useState} from "react";
import Loading from "../../Loading";

import arbaeenService from "../../../services/arbaeen.service";
import {
  convertGregorianDateToJalaliDateWithHourAndMinute
} from "../../../helpers/utils";


const RedCrescent: React.FC<any> = ({params}: any) => {


  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    type: null,
    location: null,
    capacity: null,
    hoursOfServices: null,
    numberOfAvailableAmbulances: null,
    numberOfAvailableAutolances: null,
    numberOfPersonnel: null,
  })

  const fetchPopupData = async (param: any) => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getRedCrescent(param);
      setData(data);
    } catch (err) {
      setData({
        type: null,
        location: null,
        capacity: null,
        hoursOfServices: null,
        numberOfAvailableAmbulances: null,
        numberOfAvailableAutolances: null,
        numberOfPersonnel: null,
      });
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPopupData(params.id);
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
              <span className="text-xs ml-2 text-gray-500">نام : </span>
              <span className="text-xs">{params.name}</span>
            </div>
            {
              data.type && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">نوع : </span>
                  <span
                    className="text-xs">{data.type || '-'}</span>
                </div>
              )
            }

            {
              data.location && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">موقعیت : </span>
                  <span
                    className="text-xs">{data.location || '-'}</span>
                </div>
              )
            }

            {
              data.capacity && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">ظرفیت : </span>
                  <span
                    className="text-xs">{data.capacity || '-'}</span>
                </div>
              )
            }

            {
              data.hoursOfServices && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">زمان سرویس دهی : </span>
                  <span
                    className="text-xs">{data.hoursOfServices || '-'}</span>
                </div>
              )
            }

            {
              data.numberOfAvailableAmbulances && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">تعداد آمبولانس : </span>
                  <span
                    className="text-xs">{data.numberOfAvailableAmbulances || '-'}</span>
                </div>
              )
            }

            {
              data.numberOfAvailableAutolances && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">تعداد اتولانس : </span>
                  <span
                    className="text-xs">{data.numberOfAvailableAutolances || '-'}</span>
                </div>
              )
            }

            {
              data.numberOfPersonnel && (
                <div className="flex  justify-start items-center  pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">تعداد پرسنل : </span>
                  <span
                    className="text-xs">{data.numberOfPersonnel || '-'}</span>
                </div>
              )
            }

          </div>
        </>
      )}
    </>
  );
}

export default RedCrescent;