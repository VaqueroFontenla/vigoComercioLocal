import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export const Map = ({ tradeData }) => {
  const mapRef = useRef();

  // lazy load the required ArcGIS API for JavaScript modules and CSS
  tradeData &&
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/PopupTemplate",
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, FeatureLayer, Graphic, PopupTemplate]) => {
      const fields = [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid",
        },
        {
          name: "name",
          alias: "Nombre",
          type: "string",
        },
        {
          name: "description",
          alias: "Descripción",
          type: "string",
        },
        {
          name: "address",
          alias: "Dirección",
          type: "string",
        },
        {
          name: "section",
          alias: "Categoría",
          type: "string",
        },
        {
          name: "phone",
          alias: "Telefono",
          type: "string",
        },
        {
          name: "web",
          alias: "Web",
          type: "string",
        },
      ];
      // Symbol for freeways
      const FashionSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        size: 10,
        color: "black",
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: "white",
        },
      };
      // Symbol for freeways
      const BooksSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        size: 10,
        color: "green",
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: "white",
        },
      };

      // Symbol for freeways
      const RecordsSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        size: 10,
        color: "red",
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: "white",
        },
      };
      // Symbol for freeways
      const TatoosSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        size: 10,
        color: "purple",
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: "white",
        },
      };
      const PresentSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        size: 10,
        color: "yellow",
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: "white",
        },
      };

      const vigoRenderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        legendOptions: {
          title: "Comercio Local Vigo"
        },
        defaultSymbol: PresentSym,
        defaultLabel: "Comercio",
        field: "section",
        uniqueValueInfos: [
          {
            value: "Objetos y regalos",
            symbol: PresentSym,
            label: "Objetos y Regalos"
          },
          {
            value: "Tatuajes", // code for U.S. highways
            symbol: TatoosSym,
            label: "Tatuajes"
          },
          {
            value: "Librerías",
            symbol: BooksSym,
            label: "Librerías"
          },
          {
            value: "Moda", // code for U.S. highways
            symbol: FashionSym,
            label: "Moda"
          },
          {
            value: "Discos", // code for U.S. highways
            symbol: RecordsSym,
            label: "Discos"
          }
        ]
      };
      const map = new ArcGISMap({
        basemap: "streets",
      });

      // load the map view at the ref's DOM node
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-8.72, 42.24],
        zoom: 15,
      });

      const markerSymbol = {
        type: "simple-marker",
        color: [100, 100, 100],
        outline: {
          color: [255, 255, 255, 0.7],
          width: 0.5,
        },
        size: "10px",
      };

      const popupTemplate = new PopupTemplate({
        title: "Comercio local Vigo",
        content: "{*}",
      });

      const layer = new FeatureLayer({
        source: [],
        fields: fields,
        popupTemplate: popupTemplate,
        spatialReference: { wkid: 102100 },
        objectIdField: "ObjectID",
        geometryType: "point",
        renderer: vigoRenderer,
      });

      map.add(layer);

      const createGraphics = (business) => {
        let point = {
          type: "point",
          x: business.longitude,
          y: business.latitude,
        };
        let position = new Graphic({
          geometry: point,
          attributes: business,
        });

        return position;
      };

      function updateLayer(graphics) {
        let edits = { addFeatures: graphics };
        layer.applyEdits(edits);
      }

      view.when(() => {
        console.log(tradeData);
        tradeData
          ? updateLayer(tradeData.map((obj) => createGraphics(obj)))
          : console.log("no dta");
      });

      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });

  return <div className="webmap" ref={mapRef} />;
};
