import decode from "jwt-decode"

class AuthService {
    getToken() {
        return localStorage.getItem("token")
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token)
            if (decoded.exp < Date.now() / 1000) {
                return true
            }else {
                return false
            }
        }
        catch (err) {
            return false
        }
    }
}

export default new AuthService()