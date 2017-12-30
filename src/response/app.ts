import User from "./user";

export default interface App {
    appId: string;
    code: string;
    name: string;
    description: string;
    spaceId: string | null;
    threadId: string | null;
    createdAt: string;
    creator: User;
    modifiedAt: string;
    modifier: User;
}
