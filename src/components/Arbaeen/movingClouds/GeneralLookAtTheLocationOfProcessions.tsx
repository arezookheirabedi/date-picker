import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import MapboxDraw from '@mapbox/mapbox-gl-draw';
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import MehranGeoJson from '../geos/mehran-border-geo.json';
import KhosraviGeoJson from '../geos/khosravi-border-geo.json';
import avareziTehranQomGeo from '../geos/avarezi-tehran-qom-geo.json';
import avareziQazvinZanjanJson from '../geos/avarezi-qazvin-zanjan.json';
import avareziQomKashanJson from '../geos/avarezi-qom-kashan.geo.json';
import parkingsGeoJson from '../geos/parkings-geo.json';
import {roadGeo} from '../geos/road-geo';
import ButtonToggle from '../../Form/ButtonToggle';
import clockIcon from '../../../assets/images/icons/clock.svg';
import clockActiveIcon from '../../../assets/images/icons/clock-active.svg';
import chartBoxIcon from '../../../assets/images/icons/chart-box.svg';
import chartBoxActiveIcon from '../../../assets/images/icons/chart-box-active.svg';
import extortionIcon from '../../../assets/images/icons/extortion.svg';
import extortionActiveIcon from '../../../assets/images/icons/extortion-active.svg';
import inactivityIcon from '../../../assets/images/icons/inactivity.svg';
import inactivityEnableIcon from '../../../assets/images/icons/inactivity-enable.svg';
import unusualTransactionIcon from '../../../assets/images/icons/unusualTransaction.svg';
import unusualTransactionEnableIcon from '../../../assets/images/icons/unusualTransaction-enable.svg';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import {borderGeo} from '../geos/border-geo';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZXJmYW5hYmJhc2lpIiwiYSI6ImNsNXRuNW82cjBpdmIzZHAzM2N5YmUxMHMifQ.9Oe2j9ApsiywqNAb2ZY6vg';

const ZaerinInfoPopup: React.FC<any> = ({data}) => {
  return (
    <div className="w-80 max-h-60 overflow-y-auto px-4 custom-scrollbar-gray">
      <h1 className="text-sm text-bold pb-3">{data.name}</h1>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد زائران : </span>
        <span>{(1508).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران : </span>
        <span>{(56854).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان تهران : </span>
        <span>{(5419).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان مرکزی : </span>
        <span>{(706).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان البرز : </span>
        <span>{(1017).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان اردبیل : </span>
        <span>{(592).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان آذربایجان شرقی : </span>
        <span>{(645).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان آذربایجان غربی : </span>
        <span>{(1024).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان بوشهر : </span>
        <span>{(15).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان چهارمحال و بختیاری : </span>
        <span>{(171).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان ایلام : </span>
        <span>{(17083).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان اصفهان : </span>
        <span>{(3942).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان فارس : </span>
        <span>{(296).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان گیلان : </span>
        <span>{(582).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان گلستان : </span>
        <span>{(268).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان همدان : </span>
        <span>{(901).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان هرمزگان : </span>
        <span>{(70).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان خراسان شمالی : </span>
        <span>{(317).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان خوزستان : </span>
        <span>{(930).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان خراسان رضوی : </span>
        <span>{(9206).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان خراسان جنوبی : </span>
        <span>{(498).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان کهگلویه و بویراحمر : </span>
        <span>{(26).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان کردستان : </span>
        <span>{(103).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان کرمان : </span>
        <span>{(778).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان کرمانشاه : </span>
        <span>{(1115).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان لرستان : </span>
        <span>{(653).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان مازندران : </span>
        <span>{(2374).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان قزوین : </span>
        <span>{(624).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان قم : </span>
        <span>{(5791).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان سیستان و بلوچستان : </span>
        <span>{(150).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان سمنان : </span>
        <span>{(422).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان یزد : </span>
        <span>{(448).commaSeprator().toPersianDigits()}</span>
      </div>
      <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
        <span>تعداد مسافران از استان زنجان : </span>
        <span>{(688).commaSeprator().toPersianDigits()}</span>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Marker: React.FC<any> = ({children, feature, classProp}) => {
  // console.log('class props => ', classProp)
  // console.log('feature props => ', feature.properties.from)
  // const onClickHandler = () => {
  //   onClick(feature.properties.description);
  // };

  return (
    <div
      // onClick={onClickHandler}
      className={`marker  ${classProp || ''}`}
    >
      {children}
    </div>
  );
};
const GeneralLookAtTheLocationOfProcessions = () => {
  function predictPoints(lnt: any, lng: any, map: any) {
    const i1: any = lnt;
    const i2: any = lng;

    const intervalID = setInterval(() => {
      const condition = Math.floor(Math.random() * 4);
      const markerCondition = Math.floor(Math.random() * 10);
      // const predict = [100, 100, 100];
      // eslint-disable-next-line no-plusplus
      // console.log('lng => ', parseFloat((Math.random() / predict[Math.floor(Math.random() * 3)]).toFixed(5)))
      // eslint-disable-next-line no-plusplus
      // console.log('lat => ', (i2 + parseFloat((Math.random() / 10000).toFixed(5))))
      // Create a React ref
      const ref: any = React.createRef();
      // Create a new DOM node and save it to the React ref
      // @ts-ignore
      ref.current = document.createElement('div');
      // Render a Marker Component on our new DOM node
      // @ts-ignore
      ReactDOM.render(
        // onClick={markerClicked}
        // @ts-ignore
        <Marker classProp={markerCondition === 0 ? 'marker--native' : 'marker--normal'} />,
        ref.current
      );

      // Create a Mapbox Marker at our new DOM node
      const mapboxglMarker = new mapboxgl.Marker(ref.current);

      if (condition === 0) {
        mapboxglMarker
          .setLngLat([
            parseFloat(i1) + parseFloat((Math.random() / 100).toFixed(8)),
            parseFloat(i2) + parseFloat((Math.random() / 100).toFixed(8)),
          ])
          .addTo(map);
      } else if (condition === 1) {
        mapboxglMarker
          .setLngLat([
            parseFloat(i1) - parseFloat((Math.random() / 100).toFixed(8)),
            parseFloat(i2) - parseFloat((Math.random() / 100).toFixed(8)),
          ])
          .addTo(map);
      } else if (condition === 2) {
        mapboxglMarker
          .setLngLat([
            parseFloat(i1) + parseFloat((Math.random() / 100).toFixed(8)),
            parseFloat(i2) - parseFloat((Math.random() / 100).toFixed(8)),
          ])
          .addTo(map);
      } else if (condition === 3) {
        mapboxglMarker
          .setLngLat([
            parseFloat(i1) - parseFloat((Math.random() / 100).toFixed(8)),
            parseFloat(i2) + parseFloat((Math.random() / 100).toFixed(8)),
          ])
          .addTo(map);
      }
    }, 20000);

    setTimeout(() => {
      clearInterval(intervalID);
    }, 60000 * 5);
  }

  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const mapDraw: any = useRef(null);

  // const marker = useRef(null);

  const [lng, setLng] = useState(46.0856);
  const [lat, setLat] = useState(33.1073);
  const [zoom, setZoom] = useState(12.5);

  const [showBorder, setShowBorder] = useState<any>(true);
  const [showRoad, setShowRoad] = useState<any>(true);
  const [showParking, setShowParking] = useState<any>(true);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map?.current?.setLayoutProperty('border', 'visibility', `${showBorder ? 'visible' : 'none'}`);
    map?.current?.setLayoutProperty('outline', 'visibility', `${showBorder ? 'visible' : 'none'}`);
  }, [showBorder]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map?.current?.setLayoutProperty('route', 'visibility', `${showRoad ? 'visible' : 'none'}`);
  }, [showRoad]);

  // const markerClicked = (title: any) => {
  //   window.alert(title);
  // };

  const showPoints = (geo: any, mapProp: any, classes: any = '', withPredict: any = true) => {
    // Render custom marker components
    geo.features.forEach((feature: any) => {
      // Create a React ref
      const ref: any = React.createRef();
      // Create a new DOM node and save it to the React ref
      // @ts-ignore
      ref.current = document.createElement('div');
      // Render a Marker Component on our new DOM node
      // @ts-ignore
      ReactDOM.render(
        // onClick={markerClicked}
        // @ts-ignore
        <Marker feature={feature} classProp={feature.properties.markerClass || classes} />,
        ref.current
      );

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(ref.current).setLngLat(feature.geometry.coordinates).addTo(mapProp);
    });

    if (withPredict) {
      predictPoints(
        geo.features[0].geometry.coordinates[0],
        geo.features[0].geometry.coordinates[1],
        mapProp
      );
    }
  };

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    const parkings = document.querySelectorAll('.marker--parking');

    parkings.forEach((item: any) => {
      item.classList.toggle('hidden');
    });
  }, [showParking]);

  useEffect(() => {
    try {
      if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
        mapboxgl.setRTLTextPlugin(
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
          null,
          true // Lazy load the plugin
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    // second template
    map.current.on('load', () => {
      // Add a data source containing GeoJSON data.
      map.current.addSource('border', {
        type: 'geojson',
        data: borderGeo,
      });

      map.current.addSource('route', {
        type: 'geojson',
        data: roadGeo,
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          visibility: 'visible',
        },
        paint: {
          'line-color': '#ff0000',
          'line-width': 2,
        },
      });

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        id: 'border',
        type: 'fill',
        source: 'border', // reference the data source
        layout: {},
        paint: {
          'fill-color': 'rgba(119,0,255,0.74)', // blue color fill
          'fill-opacity': 0.5,
        },
      });
      // Add a black outline around the polygon.
      map.current.addLayer({
        id: 'outline',
        type: 'line',
        source: 'border',
        layout: {},
        paint: {
          'line-color': '#7700ff',
          'line-width': 2,
        },
      });
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addPopup = (el: JSX.Element, lati: number, lngi: number) => {
      const placeholder = document.createElement('div');
      ReactDOM.render(el, placeholder);

      popup
        .setDOMContent(placeholder)
        .setLngLat({lng: lngi, lat: lati})
        .setMaxWidth('20rem')
        .addTo(map.current);
    };

    map.current.on('click', 'route', (e: any) => {
      map.current.getCanvas().style.cursor = 'pointer';
      addPopup(<ZaerinInfoPopup data={e.features[0].properties} />, e.lngLat.lat, e.lngLat.lng);
    });

    map.current.on('mousemove', 'route', () => {
      map.current.getCanvas().style.cursor = 'pointer';
    });

    map.current.on('mouseleave', 'route', () => {
      map.current.getCanvas().style.cursor = '';
    });

    map.current.on('click', 'border', (e: any) => {
      map.current.getCanvas().style.cursor = 'pointer';
      addPopup(<ZaerinInfoPopup data={e.features[0].properties} />, e.lngLat.lat, e.lngLat.lng);
    });

    map.current.on('mousemove', 'border', () => {
      map.current.getCanvas().style.cursor = 'pointer';
    });

    map.current.on('mouseleave', 'border', () => {
      map.current.getCanvas().style.cursor = '';
    });

    showPoints(MehranGeoJson, map.current);
    predictPoints(46.0651, 33.1103, map.current);
    predictPoints(46.0736, 33.103, map.current);
    showPoints(KhosraviGeoJson, map.current);
    showPoints(avareziTehranQomGeo, map.current);
    showPoints(avareziQazvinZanjanJson, map.current);
    showPoints(avareziQomKashanJson, map.current);
    showPoints(parkingsGeoJson, map.current, 'marker--parking', false);

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    // Clean up on unmount
    // eslint-disable-next-line consistent-return
    // return () => map.current.remove();
  }, []);

  const updateArea = (e: any, action: any) => {
    console.log('action => ', action);
    const data = mapDraw.current.getAll();
    console.log('e => ', e);
    console.log('mapDraw data => ', data);
    console.log('polygon => ', data?.features[0]?.geometry?.coordinates);
    //     const answer = document.getElementById('calculated-area');
    //     if (data.features.length > 0) {
    //       const area = turf.area(data);
    // // Restrict the area to 2 decimal points.
    //       const rounded_area = Math.round(area * 100) / 100;
    //       answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
    //     } else {
    //       answer.innerHTML = '';
    //       if (e.type !== 'draw.delete')
    //         alert('Click the map to draw a polygon.');
    //     }
  };

  useEffect(() => {
    if (mapDraw.current) return;

    mapDraw.current = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: 'draw_polygon',
    });

    map.current.addControl(mapDraw.current);

    map.current.on('draw.create', (e: any) => updateArea(e, 'created'));
    map.current.on('draw.delete', (e: any) => updateArea(e, 'deleted'));
    map.current.on('draw.update', (e: any) => updateArea(e, 'updated'));

    // return () => map.current.remove();
  });

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">ابر حرکتی زائران کربلا</legend>

      <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
        <ButtonToggle
          name="overTime"
          title="جاده های کشور"
          selected={showRoad}
          onChange={setShowRoad}
          defaultIcon={clockIcon}
          activeIcon={clockActiveIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="flourQuota"
          title="پارکینگ های زائرین"
          selected={showParking}
          onChange={setShowParking}
          // selected={flourQuota}
          // disabled={loading}
          // onChange={setFlourQuota}
          defaultIcon={chartBoxIcon}
          activeIcon={chartBoxActiveIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="isExtortion"
          title="گذرگاه های مرزی"
          selected={showBorder}
          onChange={setShowBorder}
          defaultIcon={extortionIcon}
          activeIcon={extortionActiveIcon}
          showCheckedIcon
        />
      </div>

      <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
        <ButtonToggle
          name="inActivity"
          title="عوارضی های بین راهی"
          // selected={bakeryWithoutTransaction}
          // onChange={setBakeryWithoutTransaction}
          defaultIcon={inactivityIcon}
          activeIcon={inactivityEnableIcon}
          showCheckedIcon
          disabled
        />
        <ButtonToggle
          name="unusualTransaction"
          title="پایگاه های هلال احمر"
          disabled
          // selected={unusualTransaction}
          // onChange={setUnusualTransaction}
          defaultIcon={unusualTransactionIcon}
          activeIcon={unusualTransactionEnableIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="unusualTransaction"
          title="موکب ها"
          disabled
          // selected={unusualTransaction}
          // onChange={setUnusualTransaction}
          defaultIcon={unusualTransactionIcon}
          activeIcon={unusualTransactionEnableIcon}
          showCheckedIcon
        />
      </div>
      <div>
        <div className="sidebar hidden">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </fieldset>
  );
};

export default GeneralLookAtTheLocationOfProcessions;
