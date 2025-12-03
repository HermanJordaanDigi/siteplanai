# Places API (New) - Complete Documentation

## Overview

The Places API (New) provides location data and imagery for establishments, geographic locations, and points of interest. It's built on one of the most accurate, up-to-date, and comprehensive place models of the real world.

## Service Endpoint

**Base URL**: `https://places.googleapis.com`

**Discovery Document**: `https://places.googleapis.com/$discovery/rest?version=v1`

## Why Use Places API (New)

Create location-aware features to make detailed location data available to your users. Example use cases:

- Display condo rentals within major metropolitan areas with results targeted specifically to cities
- Include place details in a pickup or delivery status update
- Display a list of parks in an area along with user-submitted photos and reviews
- Provide people planning trips with contact information, reviews, and price levels for establishments along the way

## Key Features

### Place Search
- **Text Search**: Query places based on text input
- **Nearby Search**: Find places near a specific location
- **Autocomplete**: Provide type-ahead predictions for geographic searches

### Place Details
- Operating hours
- Summary and descriptions
- User reviews and ratings
- Contact information
- Address components
- Price levels

### Place Photos
- High-quality photos of locations
- User-submitted images
- Photo references for retrieval

## API Methods

### REST Resource: v1.places

| Method | Endpoint | Description |
|--------|----------|-------------|
| **autocomplete** | `POST /v1/places:autocomplete` | Returns predictions for the given input |
| **get** | `GET /v1/{name=places/*}` | Get place details based on resource name (format: `places/{place_id}`) |
| **searchNearby** | `POST /v1/places:searchNearby` | Search for places near locations |
| **searchText** | `POST /v1/places:searchText` | Text query based place search |

### REST Resource: v1.places.photos

| Method | Endpoint | Description |
|--------|----------|-------------|
| **getMedia** | `GET /v1/{name=places/*/photos/*/media}` | Get photo media with a photo reference string |

## How It Works

Places API (New) accepts requests as a standard URL with a specific service endpoint and returns a JSON response. It supports authorization by:
- **API Key**
- **OAuth Token**

### Example Request

Place Details request using an API key:

```http
GET https://places.googleapis.com/v1/places/GyuEmsRBfy61i59si0?fields=addressComponents&key=YOUR_API_KEY
```

## Getting Started

### 1. Prerequisites
- Set up your Google Cloud project
- Enable billing for your project

### 2. Enable the API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Library**
3. Search for "Places API (New)"
4. Click **Enable**

### 3. Get an API Key
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Restrict your API key (recommended):
   - Application restrictions (HTTP referrers, IP addresses, etc.)
   - API restrictions (limit to Places API)

### 4. Make Your First Request

#### Text Search Example

```bash
curl -X POST \
  'https://places.googleapis.com/v1/places:searchText' \
  -H 'Content-Type: application/json' \
  -H 'X-Goog-Api-Key: YOUR_API_KEY' \
  -H 'X-Goog-FieldMask: places.displayName,places.formattedAddress' \
  -d '{
    "textQuery": "pizza restaurants in New York"
  }'
```

#### Place Details Example

```bash
curl -X GET \
  'https://places.googleapis.com/v1/places/PLACE_ID?fields=displayName,formattedAddress,rating' \
  -H 'X-Goog-Api-Key: YOUR_API_KEY'
```

#### Autocomplete Example

```bash
curl -X POST \
  'https://places.googleapis.com/v1/places:autocomplete' \
  -H 'Content-Type: application/json' \
  -H 'X-Goog-Api-Key: YOUR_API_KEY' \
  -d '{
    "input": "1600 Amphitheatre"
  }'
```

## Place IDs

Place IDs uniquely identify a place in the Google Places database and on Google Maps. You can obtain place IDs from:
- Places API (New)
- Geocoding API
- Routes API
- Address Validation API

Once you have a place ID, use it to request detailed information about the establishment or point of interest.

## Field Masks

Use field masks to specify which fields to return in the response. This helps:
- Reduce response size
- Improve performance
- Control costs (you're only charged for requested fields)

### Common Fields

**Basic Information**:
- `displayName`
- `formattedAddress`
- `location` (lat/lng)
- `types`

**Contact Information**:
- `phoneNumber`
- `websiteUri`
- `businessStatus`

**Reviews & Ratings**:
- `rating`
- `userRatingCount`
- `reviews`

**Operating Hours**:
- `regularOpeningHours`
- `currentOpeningHours`

**Photos**:
- `photos`

## Response Format

Responses are returned in JSON format:

```json
{
  "places": [
    {
      "id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
      "displayName": {
        "text": "Google Sydney",
        "languageCode": "en"
      },
      "formattedAddress": "48 Pirrama Rd, Pyrmont NSW 2009, Australia",
      "location": {
        "latitude": -33.866489,
        "longitude": 151.195692
      },
      "rating": 4.4,
      "userRatingCount": 8560
    }
  ]
}
```

## Best Practices

1. **Use Field Masks**: Only request the data you need
2. **Cache Results**: Store place details to reduce API calls
3. **Restrict API Keys**: Limit usage to specific domains/apps
4. **Handle Errors**: Implement proper error handling for rate limits and invalid requests
5. **Monitor Usage**: Track your API usage in Google Cloud Console

## Pricing

Places API (New) uses a pay-as-you-go pricing model. Costs vary based on:
- Request type (autocomplete, details, search, photos)
- Fields requested (Basic, Contact, Atmosphere data)
- Volume of requests

See [Google Maps Platform Pricing](https://developers.google.com/maps/pricing-and-plans) for details.

## Migration from Legacy Places API

If you're using the legacy Places API, consider migrating to Places API (New) for:
- Better performance
- More accurate data
- Additional features
- Improved field selection

See the [migration guide](https://developers.google.com/maps/documentation/places/web-service/migrate) for details.

## Resources

- [Official Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [API Reference](https://developers.google.com/maps/documentation/places/web-service/reference/rest)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-places-api)
- [GitHub Samples](https://github.com/googlemaps/)
- [Issue Tracker](https://issuetracker.google.com/issues/new?component=188872&template=787713)

## Support

- **Stack Overflow**: Ask questions under the `google-places-api` tag
- **GitHub**: Fork samples and try them yourself
- **Discord**: Chat with fellow developers
- **Issue Tracker**: Report bugs and issues
