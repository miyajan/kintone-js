import AppInfoModel from "../model/app-info";
import AppInfoResponse from "../response/app-info";

export default class AppInfo {
    public fromResponseToModel(response: AppInfoResponse): AppInfoModel {
        return {
            app: response.app,
            revision: response.revision,
        };
    }
}
