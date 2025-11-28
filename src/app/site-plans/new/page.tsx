"use client";

import { useState } from "react";
import { ArrowLeft, Camera, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AddressAutocomplete } from "@/components/site-plans/address-autocomplete";
import { InteractiveMap } from "@/components/site-plans/interactive-map";
import { MapControls } from "@/components/site-plans/map-controls";
import { toast } from "sonner";

export default function NewSitePlanPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 40.7128,
    lng: -74.006, // Default to New York
  });
  const [zoom, setZoom] = useState(18);
  const [isCapturing, setIsCapturing] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const handleAddressSelect = (
    selectedAddress: string,
    lat: number,
    lng: number
  ) => {
    setAddress(selectedAddress);
    setLocation({ lat, lng });
    setZoom(18); // Reset zoom when new address is selected
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 22));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1));
  };

  const handleRotateLeft = () => {
    toast.info("Rotation feature coming soon");
  };

  const handleRotateRight = () => {
    toast.info("Rotation feature coming soon");
  };

  const handleResetView = () => {
    if (address) {
      setZoom(18);
      toast.success("View reset");
    } else {
      toast.error("Please select an address first");
    }
  };

  const handleToggleMapType = () => {
    toast.info("Map type toggle coming soon");
  };

  const handleCapture = async () => {
    if (!address) {
      toast.error("Please select an address first");
      return;
    }

    setIsCapturing(true);

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsCapturing(false);
    toast.info("AI generation is coming soon! You can save this as a draft.");
  };

  const handleSaveAsDraft = () => {
    if (!address) {
      toast.error("Please select an address first");
      return;
    }

    // In real implementation, this would save to the database
    // For now, just show a message
    toast.info("Site plan creation coming soon", {
      description: "Database integration will be available in a future update.",
    });

    // Navigate to gallery or dashboard
    setTimeout(() => {
      router.push("/site-plans");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create New Site Plan</h1>
        <p className="text-muted-foreground mt-2">
          Search for a property address and capture your desired map view to
          generate a professional site plan.
        </p>
      </div>

      <div className="space-y-6">
        {/* Instructions Card */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">
            How to create your site plan:
          </h2>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-medium text-foreground">1.</span>
              <span>Search and select a property address</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground">2.</span>
              <span>Adjust the map view using zoom and rotate controls</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground">3.</span>
              <span>
                Click &quot;Capture & Generate&quot; to create your site plan
              </span>
            </li>
          </ol>
        </div>

        {/* Address Search */}
        <div className="rounded-lg border bg-card p-6">
          <AddressAutocomplete
            apiKey={apiKey}
            onAddressSelect={handleAddressSelect}
            className="max-w-2xl"
          />
          {address && (
            <p className="mt-3 text-sm text-muted-foreground">
              Selected: <span className="font-medium text-foreground">{address}</span>
            </p>
          )}
        </div>

        {/* Map Section */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Map View</h2>
          <div className="relative">
            <InteractiveMap
              apiKey={apiKey}
              center={location}
              zoom={zoom}
              onMapChange={(newCenter, newZoom) => {
                setLocation(newCenter);
                setZoom(newZoom);
              }}
            />

            {/* Map Controls Overlay */}
            <div className="absolute top-4 right-4 z-10">
              <MapControls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onRotateLeft={handleRotateLeft}
                onRotateRight={handleRotateRight}
                onResetView={handleResetView}
                onToggleMapType={handleToggleMapType}
              />
            </div>
          </div>

          {/* Map Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </div>
            <div>Zoom: {zoom}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            onClick={handleCapture}
            disabled={!address || isCapturing}
            className="flex-1"
          >
            <Camera className="mr-2 h-5 w-5" />
            {isCapturing ? "Generating..." : "Capture & Generate Site Plan"}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleSaveAsDraft}
            disabled={!address}
            className="flex-1 sm:flex-none"
          >
            <Save className="mr-2 h-5 w-5" />
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
