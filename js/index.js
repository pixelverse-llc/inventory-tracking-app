import {StrichSDK, PopupScanner} from "https://cdn.jsdelivr.net/npm/@pixelverse/strichjs-sdk@latest";

const getLoggedInUsername = () => {
    return localStorage.getItem('username');
}

function logOut() {
    localStorage.removeItem('username');
    updateUI();
}

function onQRCodeScanned(codeValue) {
    localStorage.setItem('username', codeValue);
    updateUI();
}

function updateUI() {
    if (!getLoggedInUsername()) {
        document.getElementById('logged-out').hidden = false;
        document.getElementById('logged-in').hidden = true;

        const scanQrButton = document.getElementById('scan-qr-button');
        const licenseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE5NThkMi1jOGU4LTRhMTUtODM0Ni01MWE1MTY5OTBhMTAiLCJpc3MiOiJzdHJpY2guaW8iLCJhdWQiOlsiaHR0cHM6Ly9waXhlbHZlcnNlLWxsYy5naXRodWIuaW8vaW52ZW50b3J5LXRyYWNraW5nLWFwcC8iXSwiaWF0IjoxNzQzNDMyMjQ2LCJuYmYiOjE3NDM0MzIyNDYsImNhcGFiaWxpdGllcyI6e30sInZlcnNpb24iOjF9.kG8WWatvju1RLlu8aZGVaKjrJU9Kr79RdvQFi6lomiU';
        StrichSDK.initialize(licenseKey)
            .then(() => {
                scanQrButton.onclick = async () => {
                    const qrCodes = await PopupScanner.scan({ symbologies: ['qr' ]});
                    if (qrCodes) {
                        onQRCodeScanned(qrCodes[0].data);
                    }
                };
                scanQrButton.disabled = false;
            })
            .catch((err) => {
                // see: https://docs.strich.io/reference/classes/SdkError.html
                alert(`Failed to initialize Barcode Scanning: ${err.message}`);
            });
    } else {

        document.getElementById('logged-out').hidden = true;
        document.getElementById('logged-in').hidden = false;

        document.getElementById('username').innerHTML = getLoggedInUsername();
        document.getElementById('log-out').onclick = () => {
            logOut();
        };
    }
}

updateUI();
