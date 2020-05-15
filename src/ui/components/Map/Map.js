import { loadModules } from "esri-loader";
import React, { useRef } from "react";
import { fields, PresentSym, TatoosSym, BooksSym, RecordsSym, FashionSym } from './Map.constans';

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
        "esri/widgets/Legend"
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, FeatureLayer, Graphic, PopupTemplate, Legend]) => {
  
      const vigoRenderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        legendOptions: {
          title: "Comercio Local Vigo",
        },
        defaultLabel: "Comercio",
        field: "section",
        uniqueValueInfos: [
          {
            value: "Objetos y regalos",
            symbol: PresentSym,
            label: "Objetos y Regalos",
          },
          {
            value: "Tatuajes", // code for U.S. highways
            symbol: TatoosSym,
            label: "Tatuajes",
          },
          {
            value: "Librerías",
            symbol: BooksSym,
            label: "Librerías",
          },
          {
            value: "Moda", // code for U.S. highways
            symbol: FashionSym,
            label: "Moda",
          },
          {
            value: "Discos", // code for U.S. highways
            symbol: RecordsSym,
            label: "Discos",
          },
        ],
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

      const popupTemplate = new PopupTemplate({
        title: "Comercio local Vigo",
        content:
          "<hr /><br /><p><strong>Nombre:  </strong>{name}</p><p><strong>Descripción:  </strong>{description}</p><p><strong>Etiqueta:  </strong>{section}</p>",
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
      const legend = new Legend({
        view: view,
        layerInfos: [
          {
            layer: layer,
          },
        ],
      });

      view.when(() => {
        console.log(tradeData);
        tradeData
          ? updateLayer(tradeData.map((obj) => createGraphics(obj)))
          : console.log("no dta");
        view.ui.add(legend, "bottom-left");
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
