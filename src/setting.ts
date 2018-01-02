import UserAuth from "./auth/user-auth";
import BasicAuth from './auth/basic-auth';

export default interface Setting {
    readonly baseUrl: string;
    readonly userAuth: UserAuth;
    readonly basicAuth?: BasicAuth;
}
