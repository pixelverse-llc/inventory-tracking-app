import {StrichSDK, PopupScanner, BarcodeReader} from "https://cdn.jsdelivr.net/npm/@pixelverse/strichjs-sdk@latest";

export async function initializeSDK() {
    const licenseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE5NThkMi1jOGU4LTRhMTUtODM0Ni01MWE1MTY5OTBhMTAiLCJpc3MiOiJzdHJpY2guaW8iLCJhdWQiOlsiaHR0cHM6Ly9waXhlbHZlcnNlLWxsYy5naXRodWIuaW8vaW52ZW50b3J5LXRyYWNraW5nLWFwcC8iXSwiaWF0IjoxNzQzNDMyMjQ2LCJuYmYiOjE3NDM0MzIyNDYsImNhcGFiaWxpdGllcyI6e30sInZlcnNpb24iOjF9.kG8WWatvju1RLlu8aZGVaKjrJU9Kr79RdvQFi6lomiU';
    return await StrichSDK.initialize(licenseKey);
}

export {StrichSDK, PopupScanner, BarcodeReader}
