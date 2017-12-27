import UserAuth from "./user-auth";
import Headers from '../headers';

export default class ApiTokenAuth implements UserAuth {
    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }

    decorateHeaders(headers: Headers): void {
        headers['X-Cybozu-API-Token'] = this.token;
    }
}
