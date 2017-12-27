import UserResponse from '../response/user';
import UserModel from '../model/user';

export default class User {
    public fromResponseToModel(response: UserResponse): UserModel {
        return {
            code: response.code,
            name: response.name
        };
    }
}
