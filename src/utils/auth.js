const TokenKey = 'token'

export function getToken() {
    return sessionStorage.getItem(TokenKey)
}
export function setToken(key) {
    return sessionStorage.setItem(key, TokenKey)
}
export function removeToken() {
    return sessionStorage.removeItem(TokenKey)
}