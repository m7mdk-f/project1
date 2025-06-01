"use client";

import { LatLngExpression } from "leaflet";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import type { MapContainerProps, TileLayerProps } from "react-leaflet";

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl:
      "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  });
}

type Props = {
  location: LatLngExpression | null;
  setLocation: (pos: LatLngExpression) => void;
  errorProp?: string;

};

export default function Step3Location({ location, setLocation, errorProp }: Props) {
  const [isClient, setIsClient] = useState(false);

  const [MapContainer, setMapContainer] = useState<
    React.ComponentType<MapContainerProps> | null
  >(null);
  const [TileLayer, setTileLayer] = useState<
    React.ComponentType<TileLayerProps> | null
  >(null);
  const [LocationSelector, setLocationSelector] = useState<
    React.ComponentType<{
      position: LatLngExpression | null;
      setPosition: (pos: LatLngExpression) => void;
    }> | null
  >(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      import("react-leaflet").then((leaflet) => {
        setMapContainer(() => leaflet.MapContainer);
        setTileLayer(() => leaflet.TileLayer);
      });

      import("./LocationSelector").then((mod) => {
        setLocationSelector(() => mod.default);
      });
    }
  }, [isClient]);

  return (
    <div>
      <h3 className="heading-secondary text-3xl">حدد موقع متجرك</h3>
      <p className="text-sm text-gray-700 mt-2 mb-7">
        يرجى التحقق من صحة الموقع المحدد ليتمكن مندوبي شركات الشحن الوصول له بسهولة
      </p>
      <div className="space-y-6">
        {isClient && MapContainer && TileLayer && LocationSelector ? (
          <MapContainer
            center={[30.03343, 31.24727]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "350px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector position={location} setPosition={setLocation} />
          </MapContainer>
        ) : (
          <p>جارٍ تحميل الخريطة...</p>
        )}
        {errorProp && <p className="text-red-600 mt-2">{errorProp}</p>}

        {location && (
          <p className="mt-2 text-gray-700">
            الموقع المحدد:{" "}
            {Array.isArray(location)
              ? `${location[0].toFixed(5)}, ${location[1].toFixed(5)}`
              : `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
          </p>
        )}
      </div>
    </div>
  );
}
