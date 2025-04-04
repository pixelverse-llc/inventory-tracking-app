// Expose a list of items from localStorage
const itemsKey = 'items';

export function clearItems() {
    localStorage.removeItem(itemsKey);
}

export function loadItems() {
    const itemsStr = localStorage.getItem(itemsKey);
    return itemsStr === null ? [] : JSON.parse(itemsStr);
}

export function storeItems(items) {
    localStorage.setItem(itemsKey, JSON.stringify(items));
}

export function addItem(item) {
    const myItems = loadItems();
    const existingItemIdx = myItems.findIndex(it => it.barcode === item.barcode);
    if (existingItemIdx === -1) {
        myItems.push(item);
    } else {
        myItems[existingItemIdx].count += item.count;
    }
    storeItems(myItems);
}

export function removeItem(item) {
    const myItems = loadItems();
    const existingItemIdx = myItems.findIndex(it => it.barcode === item.barcode);
    if (existingItemIdx === -1) {
        myItems.splice(existingItemIdx, 1);
    } else {
        myItems[existingItemIdx].count -= item.count;
        if (myItems[existingItemIdx].count <= 0) {
            myItems.splice(existingItemIdx, 1);
        }
    }
    storeItems(myItems);
}
