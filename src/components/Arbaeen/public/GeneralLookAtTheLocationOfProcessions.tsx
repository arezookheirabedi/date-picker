import React, {useRef, useEffect, useState} from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MehranGeoJson from "../geos/mehran-border-geo.json";
import KhosraviGeoJson from "../geos/khosravi-border-geo.json";
import avareziTehranQomGeo from "../geos/avarezi-tehran-qom-geo.json";
import avareziQazvinZanjanJson from "../geos/avarezi-qazvin-zanjan.json";
import avareziQomKashanJson from "../geos/avarezi-qom-kashan.geo.json";
import parkingsGeoJson from "../geos/parkings-geo.json";
import {roadGeo} from "../geos/road-geo";
import ButtonToggle from "../../Form/ButtonToggle";
import clockIcon from "../../../assets/images/icons/clock.svg";
import clockActiveIcon from "../../../assets/images/icons/clock-active.svg";
import chartBoxIcon from "../../../assets/images/icons/chart-box.svg";
import chartBoxActiveIcon from "../../../assets/images/icons/chart-box-active.svg";
import extortionIcon from "../../../assets/images/icons/extortion.svg";
import extortionActiveIcon from "../../../assets/images/icons/extortion-active.svg";
import inactivityIcon from "../../../assets/images/icons/inactivity.svg";
import inactivityEnableIcon from "../../../assets/images/icons/inactivity-enable.svg";
import unusualTransactionIcon from "../../../assets/images/icons/unusualTransaction.svg";
import unusualTransactionEnableIcon from "../../../assets/images/icons/unusualTransaction-enable.svg";

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJmYW5hYmJhc2lpIiwiYSI6ImNsNXRuNW82cjBpdmIzZHAzM2N5YmUxMHMifQ.9Oe2j9ApsiywqNAb2ZY6vg';


const ZaerinInfoPopup: React.FC<any> = ({data}) => {

  return <div className="w-80 max-h-60 overflow-y-auto px-4 custom-scrollbar-gray">
    <h1 className="text-sm text-bold pb-3">{data.name}</h1>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران : </span>
      <span>۵۳۴,۵۳۴</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد افراد بومی : </span>
      <span>۲۳۴,۲۳۴</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان تهران : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان مرکزی : </span>
      <span>۱۹,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان البرز : </span>
      <span>۲۲,۱۶۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان اردبیل : </span>
      <span>۹,۵۲۹</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان آذربایجان شرقی : </span>
      <span>۲,۶۵۴</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان آذربایجان غربی : </span>
      <span>۵,۱۸۸</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان بوشهر : </span>
      <span>۱,234</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان چهارمحال و بختیاری : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان ایلام : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان اصفهان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان فارس : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان گیلان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان گلستان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان همدان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان هرمزگان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان خراسان شمالی : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان خوزستان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان خراسان رضوی : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان خراسان جنوبی : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان کهگلویه و بویراحمر : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان کردستان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان کرمان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان کرمانشاه : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان لرستان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان مازندران : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان قزوین : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان قم : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان سیستان و بلوچستان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان سمنان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان یزد : </span>
      <span>۲۳,۲۳۱</span>
    </div>
    <div className="flex item-center justify-between border-b border-gray-300 pb-1 pt-1">
      <span>تعداد زائران استان زنجان : </span>
      <span>۲۳,۲۳۱</span>
    </div>
  </div>
}


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
        className={`marker  ${classProp || ''}`}>
        {children}
      </div>
    );
  }
;


const GeneralLookAtTheLocationOfProcessions = () => {

  function predictPoints(lnt: any, lng: any, map: any) {
    const i1: any = lnt;
    const i2: any = lng;

    setInterval(() => {
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
      ref.current = document.createElement("div");
      // Render a Marker Component on our new DOM node
      // @ts-ignore
      ReactDOM.render(
        // onClick={markerClicked}
        // @ts-ignore
        <Marker classProp={markerCondition === 0 ? 'marker--native' : 'marker--normal'}/>,
        ref.current
      );


      // console.log('lat => ', ((i1 + parseFloat((Math.random() / predict[Math.floor(Math.random() * 3)]).toFixed(5)))))
      // console.log('lng => ', ((i2 + parseFloat((Math.random() / predict[Math.floor(Math.random() * 3)]).toFixed(5)))))

      // Create a Mapbox Marker at our new DOM node
      const mapboxglMarker = new mapboxgl.Marker(ref.current);

      if (condition === 0) {
        mapboxglMarker
          .setLngLat([(parseFloat(i1) + (parseFloat((Math.random() / 100).toFixed(8)))), (parseFloat(i2) + (parseFloat((Math.random() / 100).toFixed(8))))])
          .addTo(map);
      } else if (condition === 1) {
        mapboxglMarker
          .setLngLat([(parseFloat(i1) - (parseFloat((Math.random() / 100).toFixed(8)))), (parseFloat(i2) - (parseFloat((Math.random() / 100).toFixed(8))))])
          .addTo(map);
      } else if (condition === 2) {
        mapboxglMarker
          .setLngLat([(parseFloat(i1) + (parseFloat((Math.random() / 100).toFixed(8)))), (parseFloat(i2) - (parseFloat((Math.random() / 100).toFixed(8))))])
          .addTo(map);
      } else if (condition === 3) {
        mapboxglMarker
          .setLngLat([(parseFloat(i1) - (parseFloat((Math.random() / 100).toFixed(8)))), (parseFloat(i2) + (parseFloat((Math.random() / 100).toFixed(8))))])
          .addTo(map);
      }

    }, 20000)
  }

  const mapContainer = useRef(null);
  const map: any = useRef(null);

  // const marker = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [lng, setLng] = useState(46.0856);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lat, setLat] = useState(33.1073);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useState(12.5);

  const [showBorder, setShowBorder] = useState<any>(true);
  const [showRoad, setShowRoad] = useState<any>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showParking, setShowParking] = useState<any>(true);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map?.current?.setLayoutProperty(
      'border',
      'visibility',
      `${showBorder ? 'visible' : 'none'}`
    );
    map?.current?.setLayoutProperty(
      'outline',
      'visibility',
      `${showBorder ? 'visible' : 'none'}`
    );


  }, [showBorder])



  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map?.current?.setLayoutProperty(
      'route',
      'visibility',
      `${showRoad ? 'visible' : 'none'}`
    );

  }, [showRoad])


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
      ref.current = document.createElement("div");
      // Render a Marker Component on our new DOM node
      // @ts-ignore
      ReactDOM.render(
        // onClick={markerClicked}
        // @ts-ignore
        <Marker feature={feature} classProp={feature.properties.markerClass || classes}/>,
        ref.current
      );

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(ref.current)
        .setLngLat(feature.geometry.coordinates)
        .addTo(mapProp);
    });


    if (withPredict) {
      predictPoints(geo.features[0].geometry.coordinates[0], geo.features[0].geometry.coordinates[1], mapProp);
    }

  }

  useEffect(()=> {
    if (!map.current) return; // wait for map to initialize
    const parkings = document.querySelectorAll('.marker--parking');

    parkings.forEach((item : any)=> {
      item.classList.toggle('hidden')
    })

  },[showParking])

  // Initialize map when component mounts
  useEffect(() => {

    if (map.current) return; // initialize map only once

    if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
      mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
        true // Lazy load the plugin
      );
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    });

    // second template
    map.current.on('load', () => {
// Add a data source containing GeoJSON data.
      map.current.addSource('border', {
        'type': 'geojson',
        'data': {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "name": "مرز مهران"
              },
              "geometry": {
                'type': 'Polygon',
// These coordinates outline border.
                'coordinates': [
                  [
                    [46.05331, 33.127632],
                    [46.03975296, 33.0951369],
                    [46.0948562, 33.087946],
                    [46.122150, 33.0734186],
                    [46.121807, 33.117137],
                    [46.092281, 33.120731],
                    [46.067905, 33.127119],
                    [46.05331, 33.127632],
                  ]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "name": "مرز خسروی"
              },
              "geometry": {
                'type': 'Polygon',
// These coordinates outline border.
                'coordinates': [
                  [
                    [45.464687, 34.394870],
                    [45.466232, 34.383821],
                    [45.472240, 34.375887],
                    [45.484771, 34.385237],
                    [45.485115, 34.395295],
                    [45.476188, 34.402094],
                    [45.464687, 34.394870]
                  ]
                ]
              }
            }
          ]
        }
      });

      map.current.addSource('route', {
        'type': 'geojson',
        'data': roadGeo
      });

      map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': 'visible'
        },
        'paint': {
          'line-color': '#ff0000',
          'line-width': 2
        }
      });

// Add a new layer to visualize the polygon.
      map.current.addLayer({
        'id': 'border',
        'type': 'fill',
        'source': 'border', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': 'rgba(119,0,255,0.74)', // blue color fill
          'fill-opacity': 0.5
        }
      });
// Add a black outline around the polygon.
      map.current.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'border',
        'layout': {},
        'paint': {
          'line-color': '#7700ff',
          'line-width': 2
        }
      });
    });

    const popup = new mapboxgl.Popup({
      closeButton: false
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
    }

    map.current.on('click', 'route', (e: any) => {
      map.current.getCanvas().style.cursor = 'pointer';

      addPopup(<ZaerinInfoPopup data={e.features[0].properties}/>, e.lngLat.lat, e.lngLat.lng);

    });

    map.current.on('mousemove', 'route', () => {
      map.current.getCanvas().style.cursor = 'pointer';

    });

    map.current.on('mouseleave', 'route', () => {
      map.current.getCanvas().style.cursor = '';
    });


    map.current.on('click', 'border', (e: any) => {
      map.current.getCanvas().style.cursor = 'pointer';

      addPopup(<ZaerinInfoPopup data={e.features[0].properties}/>, e.lngLat.lat, e.lngLat.lng);

    });

    map.current.on('mousemove', 'border', () => {
      map.current.getCanvas().style.cursor = 'pointer';

    });

    map.current.on('mouseleave', 'border', () => {
      map.current.getCanvas().style.cursor = '';
    });

    showPoints(MehranGeoJson, map.current);
    predictPoints(46.0651, 33.1103, map.current)
    predictPoints(46.0736, 33.1030, map.current)
    showPoints(KhosraviGeoJson, map.current);
    showPoints(avareziTehranQomGeo, map.current);
    showPoints(avareziQazvinZanjanJson, map.current)
    showPoints(avareziQomKashanJson, map.current)
    showPoints(parkingsGeoJson, map.current, 'marker--parking', false)

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    // Clean up on unmount
    // eslint-disable-next-line consistent-return
    // return () => map.current.remove();
  }, []);


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        ابر حرکتی زائران کربلا
      </legend>

      <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
        <ButtonToggle
          name="overTime"
          title="جاده های کشور"
          selected={showRoad}
          // disabled={loading}
          onChange={setShowRoad}
          defaultIcon={clockIcon}
          activeIcon={clockActiveIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="flourQuota"
          title="پارکینگ های زائرین"
          selected={showParking}
          // disabled={loading}
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
          // disabled={loading}
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
        <div ref={mapContainer} className="map-container"/>
      </div>
    </fieldset>
  )
}

export default GeneralLookAtTheLocationOfProcessions;