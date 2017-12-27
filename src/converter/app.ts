import AppResponse from '../response/app';
import AppModel from '../model/app';
import Datetime from "./datetime";
import User from "./user";

export default class App {
    private readonly datetime: Datetime;
    private readonly user: User;

    constructor() {
        this.datetime = new Datetime();
        this.user = new User();
    }

    public fromResponseToModel(response: AppResponse): AppModel {
        return {
            appId: response.appId,
            code: response.code,
            name: response.name,
            description: response.description,
            spaceId: response.spaceId,
            threadId: response.threadId,
            createdAt: this.datetime.fromStringToDate(response.createdAt),
            creator: this.user.fromResponseToModel(response.creator),
            modifiedAt: this.datetime.fromStringToDate(response.modifiedAt),
            modifier: this.user.fromResponseToModel(response.modifier)
        };
    }
}
