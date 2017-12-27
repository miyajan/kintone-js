import App from '../../../src/api/app';
import Connection from '../../../src/connection';
import PasswordAuth from '../../../src/auth/password-auth';
import BasicAuth from '../../../src/auth/basic-auth';
import assert = require('assert');

describe('App', function () {
    let sut: App;

    beforeEach(function () {
        const baseUrl = process.env.BASE_URL || '';
        const kintoneUsername = process.env.KINTONE_USERNAME || '';
        const kintonePassword = process.env.KINTONE_PASSWORD || '';
        const passwordAuth = new PasswordAuth(kintoneUsername, kintonePassword);
        const basicUsername = process.env.BASIC_USERNAME || '';
        const basicPassword = process.env.BASIC_PASSWORD || '';
        const basicAuth = new BasicAuth(basicUsername, basicPassword);
        const setting = {
            baseUrl: baseUrl,
            userAuth: passwordAuth,
            basicAuth: basicAuth
        };
        const conn = new Connection(setting);
        sut = new App(conn);
    });

    describe('getApp', function () {
        it('should get app', function () {
            return sut.getApp(2).then(app => {
                assert(app.appId === '2');
                assert(app.code === '');
                assert(app.name === '問い合わせ管理');
                assert(app.description === '<div>お客様からのお問い合わせ内容・対応履歴を記録するアプリです。<div>対応状況の管理・見える化ができるので、対応漏れを防止します。<span style="line-height: 1.5;">また、ノウハウの共有や対応方針の相談もこのアプリで可能です。<br /><br /></span></div><div><span style="line-height: 1.5;">※</span>開発者向けコミュニティ「cybozu.com developer network」で公開している プラグインや、JavaScript サンプルコードを<span style="line-height: 1.5;">読み込むことで、</span></div><div><span style="line-height: 1.5;">　条件書式を設定する</span><span style="line-height: 1.5;">カスタマイズが可能です。　詳細はこちら→<b><a href="https://cybozudev.zendesk.com/hc/ja/articles/203501084">プラグイン</a></b>／</span><b><span style="line-height: 1.5;"><a href="https://cybozudev.zendesk.com/hc/ja/articles/202640970">JavaScript サンプルコード</a></span></b></div><div>　なお、JavaScript カスタマイズはスタンダードコースでのみ利用できます。　→価格詳細は<b><a href="https://kintone.cybozu.com/jp/price/">こちら</a></b><br /></div></div>');
                assert(app.spaceId === null);
                assert(app.threadId === null);
                assert(app.createdAt.getTime() === new Date('2017-12-27T14:36:08.000Z').getTime());
                assert.deepEqual(app.creator, {
                    code: 'user1',
                    name: 'user1'
                });
                assert(app.modifiedAt.getTime() === new Date('2017-12-27T14:36:08.000Z').getTime());
                assert.deepEqual(app.modifier, {
                    code: 'user1',
                    name: 'user1'
                });
            });
        });
    });
});
