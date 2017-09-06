"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const tid = process.env.GOOGLE_TRACKINGID;
if (tid) {
    function test() {
        return __awaiter(this, void 0, void 0, function* () {
            let ga = new _1.analytics(tid, 'A22DA03C-BDF7-11E2-B50E-BC563DC62100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Electron/1.7.6 Safari/537.36', true);
            yield ga.screenview('test-mac', '0.0.1', 'com.gsof.test', 'com.gsof.test', 'APP')
                .append({ sr: '1920*1080', ul: 'zh-CN' })
                .send();
        });
    }
    test();
}
else {
    console.log('tid can not be empty. ');
}
//# sourceMappingURL=test.js.map