import API_HOST from "../config/ApiHost.js"

export default class UserService {
    constructor() {
        this.headers = {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
    }

    createUser(email, password, firstName, lastName) {
        let body = JSON.stringify({
              user: {
                  email: email,
                  password: password,
                  firstName: firstName,
                  lastName: lastName
              }
        })
        return (
            fetch(`${API_HOST}/api/v1/users`,
            {
              method: 'POST',
              headers: this.headers,
              body: body
            })
        )
    }

    signIn(email, password) {
        let body = JSON.stringify({credentials: {email: email, password: password}})
        return (
            fetch(`${API_HOST}/api/v1/authentication`,
            {
              method: 'POST',
              headers: this.headers,
              body: body
            })
        )
    }
}
