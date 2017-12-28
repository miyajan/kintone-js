import Setting from './setting';
import fetch from 'node-fetch';

export default class Connection {
    private readonly setting: Setting;

    constructor(setting: Setting) {
        this.setting = setting;
    }

    public requestGet(path: string): Promise<any> {
        const url = this.setting.baseUrl + path;
        const headers = {};

        this.setting.userAuth.customizeHeaders(headers);
        if (this.setting.basicAuth !== undefined) {
            this.setting.basicAuth.customizeHeaders(headers);
        }

        return fetch(url, {
            method: 'GET',
            headers: headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(new Error(res.statusText));
            }
        });
    }
}
