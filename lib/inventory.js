
// Store 'logged in user' in localStorage
const usernameKey = 'username';

export function getUsername() {
    return localStorage.getItem(usernameKey);
}

export function logOut() {
    localStorage.removeItem(usernameKey);

    // clear items on log out
    localStorage.removeItem(itemsKey);
}

export function logIn(username) {
    localStorage.setItem(usernameKey, username);
}

// Expose a list of items from localStorage
const itemsKey = 'items';

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
