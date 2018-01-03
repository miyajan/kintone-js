import AppDeployStatusModel from "../model/app-deploy-status";
import AppDeployStatusResponse from "../response/app-deploy-status";

export default class AppDeployStatus {
    public fromResponseToModel(response: AppDeployStatusResponse): AppDeployStatusModel {
        return {
            app: response.app,
            status: response.status,
        };
    }
}
