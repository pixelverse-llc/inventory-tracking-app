// a set of utility functions to manage a fake 'logged-in' state in localStorage

const usernameKey = 'username';

export function getUsername() {
    return localStorage.getItem(usernameKey);
}

export function logOut() {
    localStorage.removeItem(usernameKey);
}

export function logIn(username) {
    localStorage.setItem(usernameKey, username);
}
