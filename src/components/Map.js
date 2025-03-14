"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import { renderToStaticMarkup } from "react-dom/server";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import IconStyle from "ol/style/Icon";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";

const OrderMap = ({heights, lang, long }) => {
  console.log(Number(lang),Number(long))
    const dotIconSVG = renderToStaticMarkup(
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="5" fill="red" stroke="white" strokeWidth="2" />
        </svg>
      );
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const warehouseCoords = [67.0723, 24.9263];
    const customerCoords = [Number(long), Number(lang)];

    const warehousePoint = new Feature({
      geometry: new Point(fromLonLat(warehouseCoords)),
    });

    const customerPoint = new Feature({
      geometry: new Point(fromLonLat(customerCoords)),
    });
    const dotIconURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dotIconSVG)}`;
    const iconStyle = new Style({
        image: new IconStyle({
          anchor: [0.5, 0.5], 
          src: dotIconURL, 
        }),
      });

    warehousePoint.setStyle(iconStyle);
    customerPoint.setStyle(iconStyle);

    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [warehousePoint, customerPoint],
      }),
    });

    const lineFeature = new Feature({
      geometry: new LineString([fromLonLat(warehouseCoords), fromLonLat(customerCoords)]),
    });

    const lineLayer = new VectorLayer({
      source: new VectorSource({
        features: [lineFeature],
      }),
      style: new Style({
        stroke: new Stroke({
          color: "blue",
          width: 3,
        }),
      }),
    });

    mapRef.current = new Map({
      target: "order-map",
      layers: [
        new TileLayer({ source: new OSM() }),
        markerLayer,
        lineLayer,
      ],
      view: new View({
        center: fromLonLat(customerCoords),
        zoom: 14,
      }),
    });
  }, []);

  return <div id="order-map" className={`${heights? "h-[50vh]" : 'h-36'} cursor-grab w-full` }/>;
};

export default dynamic(() => Promise.resolve(OrderMap), { ssr: false });
