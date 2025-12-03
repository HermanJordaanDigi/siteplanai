You can programmatically adjust tilt and rotation (heading) on a vector map. In this example, we add some buttons to programmatically adjust tilt and heading.

## Understand the code

### Setting tilt and heading

- Call`setTilt()`to set the tilt angle of the map. Use`getTilt()`to get the current tilt value.
- Call`setHeading()`to set the heading of the map. Use`getHeading()`to get the current heading value.

### TypeScript

```typescript
function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: {
        lat: 37.7893719,
        lng: -122.3942,
      },
      zoom: 16,
      heading: 320,
      tilt: 47.5,
      mapId: "90f87356969d889c",
    }
  );
 
  const buttons: [string, string, number, google.maps.ControlPosition][] = [
    ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
    ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],
    ["Tilt Down", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
    ["Tilt Up", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
  ];

  buttons.forEach(([text, mode, amount, position]) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("button");

    controlUI.classList.add("ui-button");
    controlUI.innerText = `${text}`;
    controlUI.addEventListener("click", () => {
      adjustMap(mode, amount);
    });
    controlDiv.appendChild(controlUI);
    map.controls[position].push(controlDiv);
  });

  const adjustMap = function (mode: string, amount: number) {
    switch (mode) {
      case "tilt":
        map.setTilt(map.getTilt()! + amount);
        break;
      case "rotate":
        map.setHeading(map.getHeading()! + amount);
        break;
      default:
        break;
    }
  };
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;https://github.com/googlemaps/js-samples/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/samples/webgl-tilt-rotation/index.ts#L8-L62
```
| **Note:** Read the[guide](https://developers.google.com/maps/documentation/javascript/using-typescript)on using TypeScript and Google Maps.

### JavaScript

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 37.7893719,
      lng: -122.3942,
    },
    zoom: 16,
    heading: 320,
    tilt: 47.5,
    mapId: "90f87356969d889c",
  });
  const buttons = [
    ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
    ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],
    ["Tilt Down", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
    ["Tilt Up", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
  ];

  buttons.forEach(([text, mode, amount, position]) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("button");

    controlUI.classList.add("ui-button");
    controlUI.innerText = `${text}`;
    controlUI.addEventListener("click", () => {
      adjustMap(mode, amount);
    });
    controlDiv.appendChild(controlUI);
    map.controls[position].push(controlDiv);
  });

  const adjustMap = function (mode, amount) {
    switch (mode) {
      case "tilt":
        map.setTilt(map.getTilt() + amount);
        break;
      case "rotate":
        map.setHeading(map.getHeading() + amount);
        break;
      default:
        break;
    }
  };
}

window.initMap = initMap;https://github.com/googlemaps/js-samples/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/dist/samples/webgl-tilt-rotation/docs/index.js#L7-L52
```
| **Note:**The JavaScript is compiled from the TypeScript snippet.

### CSS

```css
/* 
 * Always set the map height explicitly to define the size of the div element
 * that contains the map. 
 */
#map {
  height: 100%;
}

/* 
 * Optional: Makes the sample page fill the window. 
 */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.ui-button {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  height: 40px;
  cursor: pointer;
}
.ui-button:hover {
  background: rgb(235, 235, 235);
}
https://github.com/googlemaps/js-samples/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/dist/samples/webgl-tilt-rotation/docs/style.css#L7-L40
```

### HTML

```html
<html>
  <head>
    <title>Tilt and Rotation</title>

    <link rel="stylesheet" type="text/css" href="./style.css" />
    <script type="module" src="./index.js"></script>
  </head>
  <body>
    <div id="map"></div>

    <!-- 
      The `defer` attribute causes the script to execute after the full HTML
      document has been parsed. For non-blocking uses, avoiding race conditions,
      and consistent behavior across browsers, consider loading using Promises. See
      https://developers.google.com/maps/documentation/javascript/load-maps-js-api
      for more information.
      -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"
      defer
    ></script>
  </body>
</html>https://github.com/googlemaps/js-samples/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/dist/samples/webgl-tilt-rotation/docs/index.html#L8-L30
```

### Try Sample

[JSFiddle.net](https://jsfiddle.net/gh/get/library/pure/googlemaps/js-samples/tree/master/dist/samples/webgl-tilt-rotation/jsfiddle)[Google Cloud Shell](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlemaps/js-samples&cloudshell_git_branch=sample-webgl-tilt-rotation&cloudshell_tutorial=cloud_shell_instructions.md&cloudshell_workspace=.)

### Clone Sample

Git and Node.js are required to run this sample locally. Follow these[instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)to install Node.js and NPM. The following commands clone, install dependencies and start the sample application.  

      git clone -b sample-webgl-tilt-rotation https://github.com/googlemaps/js-samples.git
      cd js-samples
      npm i
      npm start

Other samples can be tried by switching to any branch beginning with`sample-`<var translate="no">SAMPLE_NAME</var>.  

      git checkout sample-<var translate="no"><span class="devsite-syntax-nx">SAMPLE_NAME</span></var>
      npm i
      npm start