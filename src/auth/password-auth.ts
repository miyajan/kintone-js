import Headers from "../headers";
import UserAuth from "./user-auth";

export default class PasswordAuth implements UserAuth {
    private readonly username: string;
    private readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    public customizeHeaders(headers: Headers): void {
        headers["X-Cybozu-Authorization"] = Buffer.from(`${this.username}:${this.password}`).toString("base64");
    }
}
