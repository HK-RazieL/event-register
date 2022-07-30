export const LOGGED_IN = "LOGGED_IN";

export function loggedIn(data) {
    return { type: LOGGED_IN, data }
}