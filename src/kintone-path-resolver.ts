import GuestContext from "./guest-context";

export default class KintonePathResolver {
    public static resolve(path: string, context?: GuestContext) {
        if (context === undefined || context.guestSpaceId === undefined) {
            return `/k${path}`;
        }

        return `/k/guest/${context.guestSpaceId}${path}`;
    }
}
