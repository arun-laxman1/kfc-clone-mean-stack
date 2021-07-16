# bigdatacloud-reverse-geocoding
Reverse geocoding browser-based typescript library, using free Bigdatacloud API

## Features

- Connects with Bigdatacloud.com and using reverse geocode API for acquiring the location info.
- Using promises (no callback hell anymore)

## Installation
$`npm i -S bigdatacloud-reverse-geocoding`

or

$`yarn add bigdatacloud-reverse-geocoding`

## Usage (very clear and simple)
```javascript
import ReverseGeocode, { ILocation, IGeocode } from "bigdatacloud-reverse-geocoding";
const geocode = new ReverseGeocode();
const location: ILocation = { lat: 33.23323, long: -76.33443};
const place: IGeocode = await geocode.locate(location);
console.log(place.locality);
```
### Optional initialization

You can use options. There are four parameters:
                    
| Name | Default value | Description  |
| ------------- | ---------- | --------------------------------------- |
| language  | `en` | The language of the Bigdatacloud answer. This is the only parameter that you would normally use. <br/> `new ReverseGeocode({language:"cn"})` |
| api  | `https://api.bigdatacloud.net` | The API host |
|endpoint | `/data/reverse-geocode-client` | The API endpoint |
| format | `latitude=${lat}&longitude=${long}`<br/>`&localityLanguage=${lang}` | The query string with placeholders |


## Links

[Bigdatacloud API](https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocode-to-city-api)
