"use client";
import React from "react";
import { Marker, useMapEvents } from "react-leaflet";
import type { LocationSelectorProps } from "./types";

export default function LocationSelector({
  position,
  setPosition,
}: LocationSelectorProps) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}
