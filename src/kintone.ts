import UserAuth from "./auth/user-auth";
import Connection from "./connection";
import App from "./api/app";

export default class Kintone {
    public readonly app: App;

    public constructor(baseUrl: string, userAuth: UserAuth) {
        const setting = {
            baseUrl: baseUrl,
            userAuth: userAuth
        };
        const conn = new Connection(setting);
        this.app = new App(conn);
    }
}
