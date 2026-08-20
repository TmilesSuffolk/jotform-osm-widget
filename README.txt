Jotform Custom Widget: OpenStreetMap Pin Drop with Geocoding

This widget allows a user to click on an OpenStreetMap-powered map, drop a pin, return latitude and longitude, and perform reverse geocoding to show the address.

How to use:
1. Host these widget files on a static site (GitHub Pages, Netlify, AWS S3, etc.).
2. Upload manifest.json to Jotform’s Widget Developer console.
3. Set index.html as the main entry file.
4. Add the widget to any Jotform form.
5. The widget returns data:
   {
     "lat": 37.0000,
     "lng": -76.5000,
     "address": "123 Example St, Suffolk VA",
     "raw": "Full geocoding string"
   }
