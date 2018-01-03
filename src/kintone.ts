import AppAPI from "./api/app-api";
import UserAuth from "./auth/user-auth";
import Connection from "./connection";
import GuestContext from "./guest-context";

export default class Kintone {
    public readonly app: AppAPI;

    public constructor(baseUrl: string, userAuth: UserAuth) {
        const setting = {
            baseUrl: baseUrl,
            userAuth: userAuth,
        };
        const conn = new Connection(setting);
        this.app = new AppAPI(conn);
    }

    public setGuestContext(context: GuestContext) {
        this.app.setGuestContext(context);
    }
}
