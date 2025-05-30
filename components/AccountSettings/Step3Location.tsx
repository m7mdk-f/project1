"use client";
import React, { useEffect, useState } from "react";

type Props = {
  location: any; // Use LatLngExpression type if you want (imported from leaflet)
  setLocation: (pos: any) => void;
  address: string;
  setAddress: (val: string) => void;
  district: string;
  setDistrict: (val: string) => void;
  street: string;
  setStreet: (val: string) => void;
  postalCode: string;
  setPostalCode: (val: string) => void;
};

export default function Step3Location({
  location,
  setLocation,
  address,
  setAddress,
  district,
  setDistrict,
  street,
  setStreet,
  postalCode,
  setPostalCode,
}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only import leaflet and related components when in the browser (client)
  let MapContainer, TileLayer, LocationSelector;
  let L;
  if (isClient) {
    // Dynamic require/import inside useEffect won't work for hooks usage, so just require here
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const leaflet = require("react-leaflet");
    MapContainer = leaflet.MapContainer;
    TileLayer = leaflet.TileLayer;
    LocationSelector = require("./LocationSelector").default;

    // Leaflet itself
    L = require("leaflet");

    // Setup Leaflet icons only once
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }

  return (
    <div>
      <h3 className="heading-secondary text-3xl">حدد موقع متجرك</h3>
      <p className="text-sm text-gray-700 mt-2 mb-7">
        يرجى التحقق من صحة الموقع المحدد ليتمكن منندوبي شركات الشحن الوصول له
        بسهولة
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

        {location && (
          <p className="mt-2 text-gray-700">
            الموقع المحدد:{" "}
            {Array.isArray(location)
              ? `${location[0].toFixed(5)}, ${location[1].toFixed(5)}`
              : `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-[48%]">
            <label className="block mb-1 font-semibold">العنوان</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="أدخل العنوان"
            />
          </div>

          <div className="w-full sm:w-[48%]">
            <label className="block mb-1 font-semibold">الحي</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="أدخل اسم الحي"
            />
          </div>

          <div className="w-full sm:w-[48%]">
            <label className="block mb-1 font-semibold">الشارع</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="أدخل اسم الشارع"
            />
          </div>

          <div className="w-full sm:w-[48%]">
            <label className="block mb-1 font-semibold">الرمز البريدي</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="أدخل الرمز البريدي"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
