export default class UserService {
    constructor() {
        this.headers = {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
    }

    createUser(email, password) {
        let body = JSON.stringify({email: email, password: password})
        return (
            fetch('http://localhost:8080/api/v1/users',
            {
              method: 'POST',
              headers: this.headers,
              boad: body
            })
        )
    }

    signIn(email, password) {
        let body = JSON.stringify({email: email, password: password})
        return (
            fetch('http://localhost:8080/api/v1/authentication',
            {
              method: 'POST',
              headers: this.headers,
              boad: body
            })
        )
    }
}
