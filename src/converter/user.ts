import UserModel from "../model/user";
import UserResponse from "../response/user";

export default class User {
    public fromResponseToModel(response: UserResponse): UserModel {
        return {
            code: response.code,
            name: response.name,
        };
    }
}
