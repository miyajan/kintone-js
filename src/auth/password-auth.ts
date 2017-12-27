import HeadersDecorator from "./headers-decorator";
import Headers from '../headers';

export default class PasswordAuth implements HeadersDecorator {
    private readonly username: string;
    private readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    decorateHeaders(headers: Headers): void {
        headers['X-Cybozu-Authorization'] = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    }
}
