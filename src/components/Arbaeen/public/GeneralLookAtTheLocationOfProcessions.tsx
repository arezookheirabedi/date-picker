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


const Marker: React.FC<any> = ({children, feature, classProp}) => {
  // const onClickHandler = () => {
  //   onClick(feature.properties.description);
  // };

  return (
    <div
      // onClick={onClickHandler}
      className={`marker ${feature && feature.properties.from ? 'marker--native' : 'marker--normal'} ${classProp || ''}`}>
      {children}
    </div>
  );
};


const GeneralLookAtTheLocationOfProcessions = () => {

  function predictPoints(lnt: any, lng: any, map: any) {
    const i1: any = lnt;
    const i2: any = lng;
    setInterval(() => {
      const predict = [100, 100, 100];
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
        <Marker/>,
        ref.current
      );


      // Create a Mapbox Marker at our new DOM node
      const mapboxglMarker = new mapboxgl.Marker(ref.current);
      if (Math.floor(Math.random() * 2)) {
        mapboxglMarker
          .setLngLat([(i1 + parseFloat((Math.random() / predict[Math.floor(Math.random() * 3)]).toFixed(5))), (i2 + parseFloat((Math.random() / predict[Math.floor(Math.random() * 3)]).toFixed(5)))])
          .addTo(map);
      } else {
        mapboxglMarker
          .setLngLat([(i1 - parseFloat((Math.random() / predict[Math.floor(Math.random() * 3)]).toFixed(5))), (i2 - parseFloat((Math.random() / predict[Math.floor(Math.random() * 3)]).toFixed(5)))])
          .addTo(map);
      }

    }, 10000)
  }

  const mapContainer = useRef(null);

  // const marker = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [lng, setLng] = useState(46.0856);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lat, setLat] = useState(33.1073);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useState(12.5);

  // const markerClicked = (title: any) => {
  //   window.alert(title);
  // };

  const showPoints = (geo: any, map: any, classes: any = '', withPredict: any = true) => {
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
        <Marker feature={feature} classProp={classes}/>,
        ref.current
      );

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(ref.current)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });


    if (withPredict) {
      predictPoints(geo.features[0].geometry.coordinates[0], geo.features[0].geometry.coordinates[1], map);
    }

  }

  // Initialize map when component mounts
  useEffect(() => {

    if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
      mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
        true // Lazy load the plugin
      );
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    });

    // second template
    map.on('load', () => {
// Add a data source containing GeoJSON data.
      map.addSource('border', {
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


// Add a new layer to visualize the polygon.
      map.addLayer({
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
      map.addLayer({
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
        .addTo(map);
    }


    map.on('click', 'border', (e: any) => {
      map.getCanvas().style.cursor = 'pointer';

      addPopup(<ZaerinInfoPopup data={e.features[0].properties}/>, e.lngLat.lat, e.lngLat.lng);

    });

    map.on('mousemove', 'border', () => {
      map.getCanvas().style.cursor = 'pointer';

    });

    map.on('mouseleave', 'border', () => {
      map.getCanvas().style.cursor = '';
    });

    showPoints(MehranGeoJson, map);
    predictPoints(46.0651,33.1103,map)
    predictPoints(46.0736,33.1030,map)
    predictPoints(46.0552,33.1021,map)
    predictPoints(46.1031,33.1089,map)
    showPoints(KhosraviGeoJson, map);
    showPoints(avareziTehranQomGeo, map);
    showPoints(avareziQazvinZanjanJson, map)
    showPoints(avareziQomKashanJson, map)
    showPoints(parkingsGeoJson, map, 'marker--parking', false)

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // Clean up on unmount
    return () => map.remove();
  }, []);


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        ابر حرکتی زائران کربلا
      </legend>
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