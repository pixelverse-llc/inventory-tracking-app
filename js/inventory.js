import {StrichSDK, PopupScanner} from "https://cdn.jsdelivr.net/npm/@pixelverse/strichjs-sdk@latest";

// list of items to check in or out, objects have a 'barcode' and a 'count' field
let items = [];

function onItemScanned(barcode) {
    let existing = items.find(item => item.barcode === barcode);
    if (existing) {
        existing.count++;
    } else {
        items.push({ barcode, count: 1 });
    }
    updateTable();
}

function updateTable() {
    const listElement = document.getElementById('item-list');
    while (listElement.firstChild) {
        listElement.removeChild(listElement.lastChild);
    }

    document.getElementById('item-list-placeholder').hidden = items.length > 0;
    document.getElementById('item-list').hidden = items.length === 0;
    for (let item of items) {
        const itemElement = document.getElementById('item-template').content.cloneNode(true);
        itemElement.querySelector('.item-barcode').innerHTML = item.barcode;
        itemElement.querySelector('.item-count').innerHTML = `${item.count}x`;
        listElement.appendChild(itemElement);
    }
}

function updateUI() {

    // read mode (in/out) from query parameter
    const queryParams = new URLSearchParams(window.location.search);
    const mode = queryParams.get('mode') ?? 'in';
    if (mode === 'in') {
        document.getElementById('check-in').hidden = false;
    } else { // out
        document.getElementById('check-out').hidden = false;
    }

    // hook up item scanning
    const scanItemsButton = document.getElementById('scan-items');
    const licenseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE5NThkMi1jOGU4LTRhMTUtODM0Ni01MWE1MTY5OTBhMTAiLCJpc3MiOiJzdHJpY2guaW8iLCJhdWQiOlsiaHR0cHM6Ly9waXhlbHZlcnNlLWxsYy5naXRodWIuaW8vaW52ZW50b3J5LXRyYWNraW5nLWFwcC8iXSwiaWF0IjoxNzQzNDMyMjQ2LCJuYmYiOjE3NDM0MzIyNDYsImNhcGFiaWxpdGllcyI6e30sInZlcnNpb24iOjF9.kG8WWatvju1RLlu8aZGVaKjrJU9Kr79RdvQFi6lomiU';
    StrichSDK.initialize(licenseKey)
        .then(() => {
            scanItemsButton.onclick = async () => {
                const barcodes = await PopupScanner.scan({ symbologies: ['ean13', 'ean8', 'upca', 'upce', 'code128']});
                if (barcodes) {
                    onItemScanned(barcodes[0].data);
                }
            };
            scanItemsButton.disabled = false;
        })
        .catch((err) => {
            // see: https://docs.strich.io/reference/classes/SdkError.html
            alert(`Failed to initialize Barcode Scanning: ${err.message}`);
        });
}

updateUI();
