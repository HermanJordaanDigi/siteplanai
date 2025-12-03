"use client";

import { useState, useCallback } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { cn } from "@/lib/utils";

interface InteractiveMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  heading?: number;
  tilt?: number;
  onMapChange?: (
    center: { lat: number; lng: number },
    zoom: number,
    heading: number,
    tilt: number
  ) => void;
  className?: string;
}

export function InteractiveMap({
  apiKey,
  center,
  zoom,
  heading = 0,
  tilt = 0,
  onMapChange,
  className,
}: InteractiveMapProps) {
  const [mapTypeId] = useState<"satellite" | "roadmap">("satellite");

  const handleCameraChange = useCallback(
    (ev: {
      detail: {
        center: { lat: number; lng: number };
        zoom: number;
        heading: number;
        tilt: number;
      };
    }) => {
      const newCenter = {
        lat: ev.detail.center.lat,
        lng: ev.detail.center.lng,
      };
      const newZoom = ev.detail.zoom;
      const newHeading = ev.detail.heading;
      const newTilt = ev.detail.tilt;

      if (onMapChange) {
        onMapChange(newCenter, newZoom, newHeading, newTilt);
      }
    },
    [onMapChange]
  );

  return (
    <div className={cn("relative w-full h-[500px] rounded-lg overflow-hidden", className)}>
      {!apiKey ? (
        <div className="flex items-center justify-center h-full bg-muted">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Google Maps API Key Required</p>
            <p className="text-xs text-muted-foreground">
              Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file
            </p>
          </div>
        </div>
      ) : (
        <APIProvider apiKey={apiKey}>
          <Map
            center={center}
            zoom={zoom}
            heading={heading}
            tilt={tilt}
            mapId="site-plan-map"
            mapTypeId={mapTypeId}
            disableDefaultUI={true}
            onCameraChanged={handleCameraChange}
            gestureHandling="greedy"
            reuseMaps={true}
          >
            <AdvancedMarker position={center} />
          </Map>
        </APIProvider>
      )}
    </div>
  );
}
