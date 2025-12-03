"use client";

/// <reference types="@types/google.maps" />

import { useState, useEffect, useCallback } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressAutocompleteProps {
  apiKey: string;
  onAddressSelect: (address: string, lat: number, lng: number) => void;
  className?: string;
}

interface PlacePrediction {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
    structuredFormat: {
      mainText: {
        text: string;
      };
      secondaryText?: {
        text: string;
      };
    };
  };
}

function AddressAutocompleteInner({
  onAddressSelect,
  className,
}: Omit<AddressAutocompleteProps, "apiKey">) {
  const placesLibrary = useMapsLibrary("places");
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPredictions = useCallback(async (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Call our API route which uses the new Places API
      const response = await fetch("/api/places/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }

      const data = await response.json();
      setPredictions(data.suggestions || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!inputValue.trim()) {
      setPredictions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchPredictions(inputValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, fetchPredictions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = async (placeId: string, description: string) => {
    setInputValue(description);
    setShowSuggestions(false);
    setPredictions([]);

    try {
      // Call our API route to get place details
      const response = await fetch("/api/places/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placeId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch place details");
      }

      const place = await response.json();

      if (place.location) {
        const lat = place.location.latitude;
        const lng = place.location.longitude;
        const address = place.formattedAddress || description;
        onAddressSelect(address, lat, lng);
      }
    } catch (error) {
      console.error("Error selecting place:", error);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setPredictions([]);
    setShowSuggestions(false);
  };

  if (!placesLibrary) {
    return (
      <div className={cn("relative w-full", className)}>
        <Label htmlFor="address-input">Property Address</Label>
        <div className="mt-2">
          <Input
            id="address-input"
            disabled
            placeholder="Loading Google Maps..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Label htmlFor="address-input">Property Address</Label>
      <div className="relative mt-2">
        <Input
          id="address-input"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Enter a property address..."
          className="pr-10"
          disabled={isLoading}
        />
        {inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {predictions.length > 0 && showSuggestions && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-lg">
          <ul className="max-h-60 overflow-auto py-1">
            {predictions.map((suggestion) => {
              const { placeId, text, structuredFormat } = suggestion.placePrediction;
              return (
                <li
                  key={placeId}
                  className="cursor-pointer px-4 py-2 hover:bg-accent text-sm"
                  onClick={() => handleSelect(placeId, text.text)}
                >
                  <div className="font-medium">
                    {structuredFormat.mainText.text}
                  </div>
                  {structuredFormat.secondaryText && (
                    <div className="text-xs text-muted-foreground">
                      {structuredFormat.secondaryText.text}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function AddressAutocomplete({
  apiKey,
  onAddressSelect,
  className,
}: AddressAutocompleteProps) {
  if (!apiKey) {
    return (
      <div className={cn("relative w-full", className)}>
        <Label htmlFor="address-input">Property Address</Label>
        <div className="mt-2">
          <Input
            id="address-input"
            disabled
            placeholder="Google Maps API Key Required"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <AddressAutocompleteInner
        onAddressSelect={onAddressSelect}
        className={className}
      />
    </APIProvider>
  );
}
