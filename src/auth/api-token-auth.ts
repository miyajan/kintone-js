import Headers from "../headers";
import UserAuth from "./user-auth";

export default class ApiTokenAuth implements UserAuth {
    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }

    public customizeHeaders(headers: Headers): void {
        headers["X-Cybozu-API-Token"] = this.token;
    }
}
