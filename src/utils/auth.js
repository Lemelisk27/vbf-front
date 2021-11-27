import decode from "jwt-decode"

class AuthService {
    getToken() {
        return localStorage.getItem("token")
    }

    getUser() {
        return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }

    isTokenCurrent(token) {
        try {
            const decoded = decode(token)
            if (decoded.exp > Date.now() / 1000) {
                return true
            }else {
                return false
            }
        }
        catch (err) {
            return false
        }
    }

    saveUser(data) {
        localStorage.setItem("user", JSON.stringify(data))
    }

    logOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/"
    }
}

export default new AuthService()