"use client";

import { useState } from "react";
import { ArrowLeft, Camera, Save, RefreshCw, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddressAutocomplete } from "@/components/site-plans/address-autocomplete";
import { InteractiveMap } from "@/components/site-plans/interactive-map";
import { MapControls } from "@/components/site-plans/map-controls";
import { toast } from "sonner";
import Image from "next/image";

import { Textarea } from "@/components/ui/textarea";

export default function NewSitePlanPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 40.7128,
    lng: -74.006, // Default to New York
  });
  const [zoom, setZoom] = useState(18);
  const [heading, setHeading] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [refinementPrompt, setRefinementPrompt] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const handleAddressSelect = (
    selectedAddress: string,
    lat: number,
    lng: number
  ) => {
    setAddress(selectedAddress);
    setLocation({ lat, lng });
    setZoom(18); // Reset zoom when new address is selected
    setHeading(0);
    setTilt(0);
    setGeneratedImage(null); // Reset generated image
    setRefinementPrompt("");
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 22));
    setGeneratedImage(null);
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1));
    setGeneratedImage(null);
  };

  const handleRotateLeft = () => {
    setHeading((prev) => (prev - 90 + 360) % 360);
    setTilt(45); // Auto-tilt when rotating for better view
    setGeneratedImage(null);
  };

  const handleRotateRight = () => {
    setHeading((prev) => (prev + 90) % 360);
    setTilt(45); // Auto-tilt when rotating for better view
    setGeneratedImage(null);
  };

  const handleResetView = () => {
    if (address) {
      setZoom(18);
      setHeading(0);
      setTilt(0);
      setGeneratedImage(null);
      toast.success("View reset");
    } else {
      toast.error("Please select an address first");
    }
  };

  const handleToggleMapType = () => {
    // Toggle between 0 (top-down) and 45 (tilted)
    setTilt((prev) => (prev === 0 ? 45 : 0));
    setGeneratedImage(null);
    toast.info(tilt === 0 ? "Switched to 3D view" : "Switched to 2D view");
  };

  const handleMapChange = (
    newCenter: { lat: number; lng: number },
    newZoom: number,
    newHeading: number,
    newTilt: number
  ) => {
    setLocation(newCenter);
    setZoom(newZoom);
    setHeading(newHeading);
    setTilt(newTilt);
    setGeneratedImage(null);
  };

  const handleGenerate = async (isRefinement = false) => {
    if (!address) {
      toast.error("Please select an address first");
      return;
    }

    setIsGenerating(true);

    try {
      const body = {
        address,
        lat: location.lat,
        lng: location.lng,
        zoom,
        heading,
        tilt,
        image: isRefinement ? generatedImage : undefined,
        prompt: isRefinement ? refinementPrompt : undefined,
      };

      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error details:", errorData);
        throw new Error(errorData.details || errorData.error || "Failed to generate site plan");
      }

      const data = await response.json();
      
      if (data.image) {
        setGeneratedImage(data.image);
        toast.success(isRefinement ? "Site plan updated!" : "Site plan generated!");
        if (isRefinement) {
            setRefinementPrompt(""); // Clear prompt after successful refinement
        }
      } else {
        throw new Error("No image returned");
      }
      
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate site plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `site-plan-${address.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveAsDraft = () => {
    if (!address) {
      toast.error("Please select an address first");
      return;
    }

    toast.info("Site plan creation coming soon", {
      description: "Database integration will be available in a future update.",
    });

    setTimeout(() => {
      router.push("/site-plans");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Site Plan</h1>
        <p className="text-muted-foreground">
          Search for a property, adjust the view, and generate a professional site plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (Map or Result) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4 overflow-hidden min-h-[600px] flex flex-col">
            <div className="relative flex-1">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-50 backdrop-blur-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                  <p className="text-lg font-medium">
                    {generatedImage ? "Refining Site Plan..." : "Generating Site Plan..."}
                  </p>
                  <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                </div>
              ) : null}

              {generatedImage ? (
                <div className="relative w-full h-full min-h-[500px] flex flex-col">
                  <div className="relative flex-1 bg-muted/20 rounded-lg border border-dashed border-muted overflow-hidden">
                    <img 
                      src={generatedImage} 
                      alt="Generated Site Plan" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        setGeneratedImage(null);
                        setRefinementPrompt("");
                      }}
                      className="shadow-md"
                    >
                      Back to Map
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <InteractiveMap
                    apiKey={apiKey}
                    center={location}
                    zoom={zoom}
                    heading={heading}
                    tilt={tilt}
                    onMapChange={handleMapChange}
                    className="h-[600px]"
                  />
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
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar (Controls & Info) */}
        <div className="space-y-4">
          {/* Address Search */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <AddressAutocomplete
              apiKey={apiKey}
              onAddressSelect={handleAddressSelect}
              className="w-full"
            />
            {address && (
              <p className="mt-3 text-sm text-muted-foreground">
                Selected: <span className="font-medium text-foreground">{address}</span>
              </p>
            )}
          </Card>

          {/* Action Buttons & Refinement */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              {!generatedImage && (
                <Button
                  size="lg"
                  onClick={() => handleGenerate(false)}
                  disabled={!address || isGenerating}
                  className="w-full"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  {isGenerating ? "Generating..." : "Capture & Generate"}
                </Button>
              )}

              {generatedImage && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="refinement" className="text-sm font-medium">
                      Refine Result
                    </label>
                    <Textarea
                      id="refinement"
                      placeholder="E.g., Add a pool in the backyard, make the driveway wider..."
                      value={refinementPrompt}
                      onChange={(e) => setRefinementPrompt(e.target.value)}
                      className="resize-none"
                    />
                    <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleGenerate(true)}
                        disabled={isGenerating || !refinementPrompt.trim()}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refine Plan
                    </Button>
                  </div>
                  
                  <div className="pt-2 border-t space-y-2">
                    <Button className="w-full" onClick={handleSaveAsDraft}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                    </Button>
                    <Button variant="secondary" className="w-full" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Instructions</h2>
            <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
              <li>Search for a property address.</li>
              <li>Adjust the map view (zoom, rotate) to frame the property.</li>
              <li>Click &quot;Capture & Generate&quot; to create the site plan.</li>
              <li>Use the text box to refine the result (e.g., &quot;Add a pool&quot;).</li>
              <li>Download the final image.</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
