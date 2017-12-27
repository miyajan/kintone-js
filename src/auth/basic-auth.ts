import HeadersDecorator from './headers-decorator';
import Headers from '../headers';

export default class BasicAuth implements HeadersDecorator {
    private readonly username: string;
    private readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    decorateHeaders(headers: Headers): void {
        headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
}
