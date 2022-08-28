import React, {useRef, useEffect, useState} from 'react';
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  'pk.eyJ1IjoiZXJmYW5hYmJhc2lpIiwiYSI6ImNsNXRuNW82cjBpdmIzZHAzM2N5YmUxMHMifQ.9Oe2j9ApsiywqNAb2ZY6vg';

const GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lng, setLng] = useState(46.4153);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lat, setLat] = useState(33.635);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });
  });

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به موقعیت موکبها و پایگاه های هلال احمر
      </legend>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </fieldset>
  );
};

export default GeneralLookAtTheLocationOfProcessionsAndRedCrescentBases;
