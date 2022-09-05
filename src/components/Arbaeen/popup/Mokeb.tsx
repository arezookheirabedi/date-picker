/* eslint-disable */

import React, {useEffect, useState} from "react";
import Loading from "../../Loading";

import arbaeenService from "../../../services/arbaeen.service";
import {
  convertGregorianDateToJalaliDateWithHourAndMinute
} from "../../../helpers/utils";


const Mokeb: React.FC<any> = ({params}: any) => {


  console.log('mokeb data =>  ' , params)
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    mokebFrom: null,
    mokebLocation: null,
    adminName: null,
    mokebCapacity: null,
    mokebNubmerOfBreakfast: null,
    mokebNubmerOfLunch: null,
    mokebNubmerOfDinner: null,
    hasMokeb: []
  })
  console.log('data => ', data)

  const fetchPopupData = async (param: any) => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getMokeb(param);
      setData(data);
    } catch (err) {
      setData({
        mokebFrom: null,
        mokebLocation: null,
        adminName: null,
        mokebCapacity: null,
        mokebNubmerOfBreakfast: null,
        mokebNubmerOfLunch: null,
        mokebNubmerOfDinner: null,
        hasMokeb: []
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
              <span className="text-xs ml-2 text-gray-500">نام موکب : </span>
              <span className="text-xs">{params.name}</span>
            </div>
            {
              data.mokebFrom && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">محل اعزام : </span>
                  <span
                    className="text-xs">{data.mokebFrom || '-'}</span>
                </div>
              )
            }

            {
              data.mokebLocation && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">موقعیت : </span>
                  <span
                    className="text-xs">{data.mokebLocation || '-'}</span>
                </div>
              )
            }

            {
              data.adminName && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">نام مسئول : </span>
                  <span
                    className="text-xs">{data.adminName || '-'}</span>
                </div>
              )
            }

            {
              data.mokebCapacity && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">ظرفیت : </span>
                  <span
                    className="text-xs">{data.mokebCapacity || '-'}</span>
                </div>
              )
            }

            {
              data.mokebNubmerOfLunch && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">تعداد صبحانه : </span>
                  <span
                    className="text-xs">{data.mokebNubmerOfLunch || '-'}</span>
                </div>
              )
            }

            {
              data.mokebNubmerOfLunch && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">تعداد ناهار : </span>
                  <span
                    className="text-xs">{data.mokebNubmerOfLunch || '-'}</span>
                </div>
              )
            }

            {
              data.mokebNubmerOfDinner && (
                <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">تعداد شام : </span>
                  <span
                    className="text-xs">{data.mokebNubmerOfDinner || '-'}</span>
                </div>
              )
            }

            {
              !!data.hasMokeb.length && (
                <div className="flex justify-start items-start  pb-1 pt-2">
                  <span className="text-xs ml-2 text-gray-500">امکانات : </span>
                  <span
                    className="text-xs" style={{ maxWidth : '200px'}}>{data.hasMokeb.map((item : string , index : number) => {
                      return `${item} ${data.hasMokeb.length !== index+1 ? ' ,'  : ''} `
                  }) || '-'}</span>
                </div>
              )
            }


          </div>
        </>
      )}
    </>
  );
}

export default Mokeb;