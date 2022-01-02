import React, {useEffect, useRef, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';

import Charts from '../Charts';
import map from '../Charts/ir-all.geo.json';
import mapData from '../Charts/mapData.json';


const {Map} = Charts;

interface OverviewDriversMapProps {
  sideCityStatus?: any;
  cityTitle: any;
  destinationId: any;
}

const OverviewDriversMap: React.FC<OverviewDriversMapProps> = ({
                                                                 sideCityStatus,
                                                                 cityTitle,
                                                                 destinationId,
                                                               }) => {

  const chartRef = useRef<any>(null);

  const {search} = useLocation();

  const sideCities = [
    {
      name: 'هرمزگان',
      color: '#ccc',
    },
    {
      name: 'بوشهر',
      color: '#ccc',
    },
    {
      name: 'کهگیلویه و بویراحمد',
      color: '#ccc',
    },
    {
      name: 'فارس',
      color: '#ccc',
    },
    {
      name: 'اصفهان',
      color: '#ccc',
    },
    {
      name: 'سمنان',
      color: '#ccc',
    },
    {
      name: 'گلستان',
      color: '#ccc',
    },
    {
      name: 'مازندران',
      color: '#ccc',
    },
    {
      name: 'تهران',
      color: '#ccc',
    },
    {
      name: 'مرکزی',
      color: '#ccc',
    },
    {
      name: 'یزد',
      color: '#ccc',
    },
    {
      name: 'چهارمحال و بختیاری',
      color: '#ccc',
    },
    {
      name: 'خوزستان',
      color: '#ccc',
    },
    {
      name: 'لرستان',
      color: '#ccc',
    },
    {
      name: 'ایلام',
      color: '#ccc',
    },
    {
      name: 'اردبیل',
      color: '#ccc',
    },
    {
      name: 'قم',
      color: '#ccc',
    },
    {
      name: 'همدان',
      color: '#ccc',
    },
    {
      name: 'زنجان',
      color: '#ccc',
    },
    {
      name: 'قزوین',
      color: '#ccc',
    },
    {
      name: 'آذربایجان غربی',
      color: '#ccc',
    },
    {
      name: 'آذربایجان شرقی',
      color: '#ccc',
    },
    {
      name: 'کرمانشاه',
      color: '#ccc',
    },
    {
      name: 'گیلان',
      color: '#ccc',
    },
    {
      name: 'کردستان',
      color: '#ccc',
    },
    {
      name: 'خراسان جنوبی',
      color: '#ccc',
    },
    {
      name: 'خراسان رضوی',
      color: '#ccc',
    },
    {
      name: 'خراسان شمالی',
      color: '#ccc',
    },
    {
      name: 'سیستان و بلوچستان',
      color: '#ccc',
    },
    {
      name: 'کرمان',
      color: '#ccc',
    },
    {
      name: 'البرز',
      color: '#ccc',
    },
  ];

  useEffect(() => {
    const data = chartRef?.current?.chart.get('covid').data;
    const params = new URLSearchParams(search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {

      const city = data.find((x: any) => x.properties['fa-name'] === provinceName)
      city?.select()
    } else {
      const city = data.find((x: any) => x.properties['fa-name'] === 'تهران')
      city?.select()
    }
  }, [])


  const history = useHistory();
  const [options] = useState({
    chart: {
      map,
      height: '70%',
      className: 'guild-map-chart',
      // backgroundColor: '#F3F5F9',
      margin: [0, 0, 50, 0],
    },

    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },

    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click(e: any) {
              //
              // const tag: any = this;
              //
              // const changeColor = (param: any) => {
              //   console.log(previousPoint);
              //   if (previousPoint) {
              //     previousPoint.update({color: '#7cb5ec'});
              //   }
              //   previousPoint = param;
              //   tag.update({color: '#fe5800'});
              // }
              //
              // changeColor(tag);
              document.getElementById(destinationId)!.scrollIntoView({behavior: 'smooth'});
              history.push({
                search: `?provinceName=${e.point.properties['fa-name']}`,
              });
              // setQueryParams({provinceName: e.point.properties['fa-name']})

              // console.log(e.point.name);
              // history.push({
              //   pathname: '/dresses',
              //   search: '?color=blue'
              // })
            },
          },
        },
      },
    },
    subtitle: {
      text: '',
      floating: true,
      align: 'right',
      y: 50,
      style: {
        fontSize: '16px',
      },
    },
    legend: {
      itemStyle: {
        fontSize: '12px',
        fontWeight: '400',
        color: '#707070',
        transform: 'translate(-20px,20px)',
        direction: 'rtl',
        textAlign: 'right',
      },
      align: 'center',
      verticalAlign: 'bottom',
      squareSymbol: false,
      valueDecimals: 0,
      symbolRadius: 4,
      symbolHeight: 7,
      symbolWidth: 85,
      itemDistance: -40,
    },
    colorAxis: {
      dataClasses: [
        {
          from: 500,
          to: 1000,
          // color: '#AB0A0A',
          color: '#9e9e9e',
          name: 'بیشتر از ۵۰٪',
        },
        {
          from: 400,
          to: 500,
          // color: '#CF0D0D',
          color: '#9e9e9e',
          name: '%۲۰ الی ۵۰%',
        },
        {
          from: 300,
          to: 400,
          // color: '#FF9114',
          color: '#9e9e9e',
          name: '%۱۰ الی ۲۰%',
        },
        {
          from: 200,
          to: 300,
          // color: '#FFC700',
          color: '#9e9e9e',
          name: '%۵ الی ۱۰%',
        },
        {
          from: 100,
          to: 200,
          // color: '#F8D354',
          color: '#9e9e9e',
          name: '%۲ الی ۵%',
        },
        {
          from: 1,
          to: 100,
          // color: '#FBE186',
          color: '#9e9e9e',
          name: '%کمتر از ۲',
        },
      ],
    },

    mapNavigation: {
      enableButtons: false,
      enabled: true,
      enableMouseWheelZoom: false,
      enableDoubleClickZoomTo: false,
      enableDoubleClickZoom: false,
      enableTouchZoom: false,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    tooltip: {
      borderRadius: 16,
      borderWidth: 0,
      valueDecimals: 0,
      style: {
        color: "#fff",
        fontFamily: 'inherit',
      },
      headerFormat: "",
      pointFormat: '<div>{point.properties.fa-name}</div>',
      backgroundColor: {
        linearGradient: [0, 0, 0, 60],
        stops: [
          [0, '#374151'],
          [1, '#6B7280'],
        ],
      },
    },
    series: [
      {
        data: mapData,
        id: 'covid',
        keys: ['hasc', 'value'],
        joinBy: 'hasc',
        name: 'کوید',
        borderColor: '#ffffff',
        borderWidth: 1,
        dataLabels: {
          enabled: true,
          format: '{point.properties.fa-name}',
          style: {
            fontWeight: '400',
            color: '#ffffff',
            fontFamily: 'inherit',
            backgroundColor: 'transparent',
          },
        },
        states: {
          select: {
            color: '#3b3b3b'
          }
        },
        allowPointSelect: true
      },
    ],
  });

  return (
    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت حمل و نقل عمومی استان‌ &nbsp;
        {cityTitle}
      </legend>
      <div className="flex w-full rounded-xl bg-white pb-8 pt-8  shadow relative">
        <Link to="/dashboard/transport/public" className="absolute right-20 top-8 z-50">
          <div className="button button--primary px-5">نمایش وضعیت کل کشور</div>
        </Link>
        <div className="w-5/6 map-wrapper">
          <Map options={options} ref={chartRef}/>
        </div>
        <ul className="w-1/6">
          {sideCityStatus.map((item: any, index: any) => {
            return (
              // eslint-disable-next-line
              <li key={index} className="flex justify-start items-center mb-2.5">
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color,
                    borderRadius: '2px',
                  }}
                />
                <span className="text-xs mr-2">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
};

export default OverviewDriversMap;
