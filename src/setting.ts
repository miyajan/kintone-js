import BasicAuth from "./auth/basic-auth";
import UserAuth from "./auth/user-auth";

export default interface Setting {
    readonly baseUrl: string;
    readonly userAuth: UserAuth;
    readonly basicAuth?: BasicAuth;
}
