import Cookies from 'js-cookie'

const jwtTokenKey = 'my-jwt-token'

export const setJwtToken = (value: string) => {
    Cookies.set(jwtTokenKey, value, {expires: 30})
}

export const getJwtToken = (): string | undefined => {
    return Cookies.get(jwtTokenKey)
}