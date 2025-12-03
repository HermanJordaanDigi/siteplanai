import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { address, lat, lng, zoom, heading, tilt, image, prompt: userPrompt } = await request.json();

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || !geminiApiKey) {
      return NextResponse.json(
        { error: "Missing API keys" },
        { status: 500 }
      );
    }

    let inputImageBase64 = image;

    // 1. If no image provided, fetch Static Map
    if (!inputImageBase64) {
      // Note: Static Maps API doesn't support heading/tilt for satellite maps
      // We use a larger size to ensure good quality for the AI
      const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=640x640&maptype=satellite&key=${apiKey}`;

      console.log("Fetching static map from:", staticMapUrl);
      let mapResponse = await fetch(staticMapUrl);
      
      // Fallback to roadmap if satellite is not available (e.g. 403 Forbidden in some regions)
      if (!mapResponse.ok) {
        console.warn(`Failed to fetch satellite map (${mapResponse.status}). Retrying with roadmap...`);
        const fallbackUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=640x640&maptype=roadmap&key=${apiKey}`;
        mapResponse = await fetch(fallbackUrl);
      }

      if (!mapResponse.ok) {
        const errorText = await mapResponse.text();
        console.error("Failed to fetch static map (both satellite and roadmap):", mapResponse.statusText, errorText);
        return NextResponse.json(
          { error: "Failed to capture map view", details: `${mapResponse.statusText}: ${errorText}` },
          { status: 500 }
        );
      }

      const mapBuffer = await mapResponse.arrayBuffer();
      inputImageBase64 = Buffer.from(mapBuffer).toString("base64");
    } else {
        // If image is provided as data URL, strip the prefix
        if (inputImageBase64.startsWith("data:image")) {
            inputImageBase64 = inputImageBase64.split(",")[1];
        }
    }

    // 2. Call Gemini 3 Pro Image Preview
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    const defaultPrompt = `You are an expert architectural draftsperson creating a professional site plan drawing.

TASK: Transform this satellite/aerial image of the property at "${address}" into a precise architectural site plan drawing.

CRITICAL INSTRUCTIONS:
1. PRESERVE THE EXACT LAYOUT: Do not change, move, or reimagine any buildings, structures, or features. The site plan must match the satellite image exactly.
2. This is an IMAGE EDITING task, not image generation. You are converting a photo into a technical drawing of the SAME property.
3. Maintain the exact same viewing angle, orientation, and scale as the input image.

REQUIRED ELEMENTS:
- Property boundary lines (bold, clearly marked)
- All existing buildings and structures (drawn with clean architectural lines)
- Driveways, pathways, and paved areas (clearly delineated)
- Landscaping features: trees (shown as circles with canopy diameter), gardens, lawns
- Any pools, patios, decks, or outdoor structures

STYLE SPECIFICATIONS:
- Use clean, professional architectural line work (not sketchy or artistic)
- Black lines on white background (traditional site plan style)
- Use different line weights: thick for property boundaries, medium for buildings, thin for details
- Include tree symbols (circles) for significant trees visible in the image
- Add hatching or fill patterns to differentiate: buildings (solid), paved areas (crosshatch), grass/landscaping (stipple or light fill)

WHAT TO AVOID:
- Do NOT add features that aren't visible in the image
- Do NOT change the building locations or sizes
- Do NOT make it look like a rendered 3D view or artistic illustration
- Do NOT add decorative elements or embellishments
- Do NOT change the property orientation

OUTPUT: A professional, presentation-ready architectural site plan that accurately represents the property shown in the satellite image, suitable for planning applications, real estate listings, or construction documentation.`;

    const finalPrompt = userPrompt || defaultPrompt;

    console.log("Calling Gemini 3 Pro...");
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [
        { text: finalPrompt },
        {
          inlineData: {
            mimeType: "image/png",
            data: inputImageBase64,
          },
        },
      ],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    // 3. Extract and return the generated image
    let generatedImageBase64 = null;
    let generatedText = "";

    // The response structure might vary slightly based on the SDK version/model, 
    // but typically it's in candidates[0].content.parts
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.text) {
          generatedText += part.text;
        } else if (part.inlineData) {
          generatedImageBase64 = part.inlineData.data;
        }
      }
    }

    if (!generatedImageBase64) {
      console.error("No image generated by Gemini:", generatedText);
      return NextResponse.json(
        { error: "Failed to generate site plan image", details: generatedText },
        { status: 500 }
      );
    }

    // Return the image as a data URL
    const dataUrl = `data:image/png;base64,${generatedImageBase64}`;

    return NextResponse.json({ 
      image: dataUrl,
      text: generatedText 
    });

  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
