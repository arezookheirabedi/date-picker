import React, {useEffect, useState} from 'react';
import vaccineService from 'src/services/vaccine.service';
import axios from 'axios';

// import Spinner from '../../Spinner';
import Charts from '../../Charts';

const {StackArea} = Charts;


const initialData = {
  categories: ['۱۴۰۱/۰۱/۰۱', '۱۴۰۱/۰۱/۰۲', '۱۴۰۱/۰۱/۰۳', '۱۴۰۱/۰۱/۰۴', '۱۴۰۱/۰۱/۰۵', '۱۴۰۱/۰۱/۰۶', '۱۴۰۱/۰۱/۰۷', '۱۴۰۱/۰۱/۰۸', '۱۴۰۱/۰۱/۰۹', '۱۴۰۱/۰۱/۱۰'],
  series: [{
    name: 'دوز اول',
    data: [502, 635, 809, 1947, 2402, 3634, 5268, 6000, 7000, 6000]
  }, {
    name: 'دوز دوم',
    data: [106, 300, 500, 1133, 1721, 2867, 2766, 3900, 5100, 3490]
  }, {
    name: 'دوز سوم',
    data: [163, 203, 276, 908, 1547, 1729, 1628, 2500, 3800, 2390]
  }, {
    name: 'دوز چهارم',
    data: [18, 31, 54, 656, 339, 1218, 1201, 1300, 2450, 1903]
  }, {
    name: 'دوز پنجم',
    data: [16, 21, 44, 196, 139, 1018, 1001, 1200, 1150, 1703]
  }]
} as any;

const OverviewOfDriverVaccinationProcess = () => {

  const {CancelToken} = axios;
  const source = CancelToken.source();
  const [dataset, setDataset] = useState<any[]>(initialData);
  // const [categories, setCategories] = useState<any[]>([]);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  const getLinearOverview = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await vaccineService.dosesTagBased({}, {cancelToken: source.token});

      const provinces: any[] = [];

      // eslint-disable-next-line
      let firstDose: any[] = [];
      // eslint-disable-next-line
      let secondDose: any[] = [];
      // eslint-disable-next-line
      let thirdDose: any[] = [];
      // eslint-disable-next-line
      let moreThanThreeDose: any[] = [];
      // eslint-disable-next-line
      let noDose: any[] = [];

      data.forEach((item: any, index: number) => {
        let more = 0;

        // eslint-disable-next-line
        for (const [key, value] of Object.entries(item.doses)) {

          if (Number(key) === 1) {
            firstDose.push(Number(value));
          }

          if (Number(key) === 2) {
            secondDose.push(Number(value));
          }

          if (Number(key) === 3) {
            thirdDose.push(Number(value));
          }

          if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            more += Number(value);
          }
        }

        noDose.push(Number(item.totalNonVaccinesCount || 0));

        if (noDose.length < index + 1) noDose.push(0);
        if (firstDose.length < index + 1) firstDose.push(0);
        if (secondDose.length < index + 1) secondDose.push(0);
        if (thirdDose.length < index + 1) thirdDose.push(0);
        if (moreThanThreeDose.length < index + 1) moreThanThreeDose.push(more);

        provinces.push(item.province);
      });

      // setDataset([
      //   {
      //     name: 'واکسن نزده',
      //     color: '#FF0060',
      //     data: [...noDose],
      //   },
      //   {
      //     name: 'دوز اول',
      //     color: '#F3BC06',
      //     data: [...firstDose],
      //   },
      //   {
      //     name: 'دوز دوم',
      //     color: '#209F92',
      //     data: [...secondDose],
      //   },
      //   {
      //     name: 'دوز سوم',
      //     color: '#004D65',
      //     data: [...thirdDose],
      //   },
      //   {
      //     name: 'بیش از ۳ دوز',
      //     color: '#BFDDE7',
      //     data: [...moreThanThreeDose],
      //   },
      // ]);
      // setCategories([...provinces]);
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      getLinearOverview();
    }, 500);

    return () => {
      clearTimeout(idSetTimeOut);
      source.cancel('Operation canceled by the user.');
      setDataset([]);
    };
  }, []);


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به روند واکسیناسیون رانندگان</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="w-full">
            <div
              className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
              <div
                className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#716DE3'}}/>
                  <span>دوز پنجم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#BFDDE7'}}/>
                  <span>دوز چهارم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#004D65'}}/>
                  <span>دوز سوم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#209F92'}}/>
                  <span>دوز دوم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#F3BC06'}}/>
                  <span>دوز اول</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {loading && ( */}
        {/*  <div className="p-40"> */}
        {/*    <Spinner /> */}
        {/*  </div> */}
        {/* )} */}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {/* {!loading && dataset.length > 0 && !errorMessage && ( */}
        <StackArea data={dataset}/>
        {/* )} */}
        {dataset.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
        {/* <div className="flex justify-center items-center w-full">
          <Stacked data={dataset} categories={categories} />
        </div> */}
      </div>
    </fieldset>
  )
}

export default OverviewOfDriverVaccinationProcess;