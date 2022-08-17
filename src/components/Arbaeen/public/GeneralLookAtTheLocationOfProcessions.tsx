import React, {useRef, useEffect, useState} from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import geoJson from "./zaerin-geo.json";

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJmYW5hYmJhc2lpIiwiYSI6ImNsNXRuNW82cjBpdmIzZHAzM2N5YmUxMHMifQ.9Oe2j9ApsiywqNAb2ZY6vg';


const Marker: React.FC<any> = ({onClick, children, feature}) => {
  const onClickHandler = () => {
    onClick(feature.properties.description);
  };

  return (
    <div onClick={onClickHandler} className="marker">
      {children}
    </div>
  );
};

const GeneralLookAtTheLocationOfProcessions = () => {


  const mapContainer = useRef(null);

  // const marker = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lng, setLng] = useState(53.6880);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lat, setLat] = useState(32.4279);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useState(4.5);

  const markerClicked = (title: any) => {
    window.alert(title);
  };

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    });

    // map.on('load', () => {
    //   map.addSource('national-park', {
    //     'type': 'geojson',
    //     'data': {
    //       'type': 'FeatureCollection',
    //       'features': [
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //             'type': 'Polygon',
    //             'coordinates': [
    //               [
    //             [46.05331,33.127632],
    //             [46.03975296,33.0951369],
    //             [46.0948562,33.087946],
    //             [46.122150,33.0734186],
    //             [46.121807,33.117137],
    //             [46.092281,33.120731],
    //             [46.067905,33.127119],
    //             [46.05331,33.127632]
    //               ]
    //             ]
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //             'type': 'Point',
    //             'coordinates': [46.111191,33.102665]
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //             'type': 'Point',
    //             'coordinates': [46.101191,33.100665]
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //             'type': 'Point',
    //             'coordinates': [46.100191,33.100055]
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //             'type': 'Point',
    //             'coordinates': [46.1200000,33.110000]
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'geometry': {
    //             'type': 'Point',
    //             'coordinates': [46.049999,33.110000]
    //           }
    //         }
    //       ]
    //     }
    //   });
    //
    //   map.addLayer({
    //     'id': 'park-boundary',
    //     'type': 'fill',
    //     'source': 'national-park',
    //     'paint': {
    //       'fill-color': '#B42222',
    //       'fill-opacity': 0.4
    //     },
    //     'filter': ['==', '$type', 'Polygon']
    //   });
    //
    //   map.addLayer({
    //     'id': 'park-volcanoes',
    //     'type': 'circle',
    //     'source': 'national-park',
    //     'paint': {
    //       'circle-radius': 6,
    //       'circle-color': '#186500'
    //     },
    //     'filter': ['==', '$type', 'Point']
    //   });
    // });

    // second template
    map.on('load', () => {
// Add a data source containing GeoJSON data.
      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
// These coordinates outline Maine.
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
        }
      });

// Add a new layer to visualize the polygon.
      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5
        }
      });
// Add a black outline around the polygon.
      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 3
        }
      });
    });

    // Render custom marker components
    geoJson.features.forEach((feature) => {
      // Create a React ref
      const ref: any = React.createRef();
      // Create a new DOM node and save it to the React ref
      // @ts-ignore
      ref.current = document.createElement("div");
      // Render a Marker Component on our new DOM node
      // @ts-ignore
      ReactDOM.render(
        // @ts-ignore
        <Marker onClick={markerClicked} feature={feature}/>,
        ref.current
      );

      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(ref.current)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        ابر حرکتی زائران کربلا
      </legend>
      <div>
        {/* <div className="sidebar"> */}
        {/*  Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}
        {/* </div> */}
        <div ref={mapContainer} className="map-container"/>
      </div>
    </fieldset>
  )
}

export default GeneralLookAtTheLocationOfProcessions;