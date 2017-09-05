import { analytics } from "../";

const tid = process.env.GOOGLE_TRACKINGID;
if (tid) {

    async function test() {
        let ga = new analytics(tid, 'A22DA03C-BDF7-11E2-B50E-BC563DC62100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Electron/1.7.6 Safari/537.36');

        await ga.screenview('test-mac', '0.0.1', 'com.gsof.test', 'com.gsof.test', 'APP')
            .append({ sr: '1920*1080', ul: 'zh-CN' })
            .send();
    }

    test();
} else {
    console.log('tid can not be empty. ')
}