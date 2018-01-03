import DeployStatus from "./deploy-status";

export default interface AppDeployStatus {
    app: number | string;
    status: DeployStatus;
}
