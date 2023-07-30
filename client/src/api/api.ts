import { DefaultHeadersType, LoginData, SignUpData, TypeUser } from "../utils/types"
import { API_BASE_URL } from "../utils/vars"

type AuthApiConfig = {
    method: 'POST',
    headers: Partial<DefaultHeadersType>,
    body: string
}

export class Api {

    protected headers = () => {
        return {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + this.authToken() || ''
        }
    }
    API_BASE_URL = API_BASE_URL
    // constructor() { console.log(this.headers()) }

    async getUser(userId: string) {
        const config = {
            headers: this.headers()
        }
        return await fetch(`${this.API_BASE_URL}/users/${userId}`, config)
    }
    async getAllUsers() {
        const config = {
            headers: this.headers()
        }
        return await fetch(`${this.API_BASE_URL}/users`, config)
    }
    async updateUser(userId: string, payload: TypeUser) {
        const config = {
            method: 'PATCH',
            headers: this.headers(),
            body: JSON.stringify(payload)
        }
        return fetch(`${this.API_BASE_URL}/users/${userId}`, config)
    }
    async login(data: LoginData) {
        const config = {
            method: 'POST',
            headers: { ...this.headers() },
            body: JSON.stringify(data)
        } as AuthApiConfig
        console.log(config.body)
        delete config.headers.authorization
        return fetch(`${this.API_BASE_URL}/auth/login`, config)
    }
    async signup(data: SignUpData) {
        const config = {
            method: 'POST',
            headers: { ...this.headers() },
            body: JSON.stringify(data)
        } as AuthApiConfig
        delete config.headers.authorization
        return fetch(`${this.API_BASE_URL}/auth/signup`, config)
    }

    async getS3SecureUrl({ objectName, key }: { objectName: string, key: string }) {
        return fetch(`${API_BASE_URL}/s3/getSecureUrl?objectName=${objectName}&key=${key}`, {
            headers: this.headers()
        })
    }

    async sendObjectToS3(url: string, file: File) {
        return fetch(url, {
            method: 'PUT',
            headers: {
                "content-type": "multipart/form-data"
            },
            body: file
        })
    }

    protected authToken() {
        const token = window.localStorage.getItem('token')
        // if (!token) throw new Error('Token not found')
        return token
    }
}

export const API = new Api() 