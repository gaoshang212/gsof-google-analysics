"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const request = require("request");
const qs = require("querystring");
class analytics {
    /**
     *
     * @param tid Tracking ID
     * @param cid Anonymous Client ID
     * @param userAgent User Agent
     * @param debug debug
     * @param version Version
     */
    constructor(tid, cid, userAgent = '', debug = false, version = 1) {
        this._baseUrl = 'https://www.google-analytics.com';
        this._debugPath = '/debug';
        this._collectPath = '/collect';
        this._batchPath = '/batch';
        this._queue = [];
        this._debug = debug;
        // User-agent
        this._userAgent = userAgent;
        // Google generated ID
        this._tid = tid;
        // Google API version
        this._version = version;
        this._cid = cid || uuid.v4();
    }
    /**
     * pageview
     * @param hostname Document hostname
     * @param url Page
     * @param title Title
     */
    pageview(hostname, url, title) {
        const params = this.createParams('pageview', { dh: hostname, dp: url, dt: title });
        this.push(params);
        //return this.send(params);
        return this;
    }
    /**
     * Event
     * @param category Event Category. Required.
     * @param action Event Action. Required.
     * @param label Event label.
     * @param value Event value.
     */
    event(category, action, label, value) {
        let params = { ec: category, ea: action };
        if (label)
            params['el'] = label;
        if (value)
            params['ev'] = value;
        //return this.send(this.createParams('event', params));
        this.push(this.createParams('event', params));
        return this;
    }
    /**
     * screenview
     * @param name App name
     * @param ver App version
     * @param id App Id
     * @param aiid App Installer Id
     * @param path Screen name
     * @param opts Custom param
     */
    screenview(name, ver, id, aiid, path) {
        const params = this.createParams('screenview', {
            an: name,
            av: ver,
            aid: id,
            aiid: aiid,
            cd: path
        });
        //return this.send(params);
        this.push(params);
        return this;
    }
    /**
     * Send a "transaction" request
     *
     * @param  {string} trnID    Transaction ID
     * @param  {string} trnAffil Transaction affiliation
     * @param  {string} trnRev   Transaction Revenue
     * @param  {Number} trnShip  Transaction shipping
     * @param  {Number} trnTax   Transaction tax
     * @param  {string} currCode Currency code
     * @param  {string} clientID uuidV4
     *
     * @return {Promise}
     */
    transaction(trnID, trnAffil, trnRev, trnShip, trnTax, currCode) {
        let params = { ti: trnID };
        if (trnAffil)
            params['ta'] = trnAffil;
        if (trnRev)
            params['tr'] = trnRev;
        if (trnShip)
            params['ts'] = trnShip;
        if (trnTax)
            params['tt'] = trnTax;
        if (currCode)
            params['cu'] = currCode;
        //return this.send(this.createParams('transaction', params));
        this.push(this.createParams('transaction', params));
        return this;
    }
    /**
     * Send a "social" request
     *
     * @param  {string} socialAction  Social Action
     * @param  {string} socialNetwork Social Network
     * @param  {string} socialTarget  Social Target
     *
     * @return {Promise}
     */
    social(socialAction, socialNetwork, socialTarget) {
        const params = this.createParams('social', { sa: socialAction, sn: socialNetwork, st: socialTarget });
        this.push(params);
        //return this.send(params);
        return this;
    }
    /**
     * Send a "exception" request
     *
     * @param  {string} exDesc   Exception description
     * @param  {Number} exFatal  Exception is fatal?
     * @param  {string} clientID uuidV4
     *
     * @return {Promise}
     */
    exception(exDesc, exFatal) {
        const params = this.createParams('exception', { exd: exDesc, exf: exFatal });
        //return this.send(params);
        this.push(params);
        return this;
    }
    /**
     * Send a "refund" request
     *
     * @param {string} trnID          Transaction ID
     * @param {string} evCategory     Event category
     * @param {string} evAction       Event action
     * @param {Number} nonInteraction Non-interaction parameter
     * @param {string} clientID       uuidV4
     *
     * @returns {Promise}
     */
    refund(trnID, evCategory = 'Ecommerce', evAction = 'Refund', nonInteraction = 1) {
        const params = this.createParams('event', {
            ec: evCategory,
            ea: evAction,
            ni: nonInteraction,
            ti: trnID,
            pa: 'refund'
        });
        //return this.send(params);
        this.push(params);
        return this;
    }
    /**
     * Send a "item" request
     * @param  {string} trnID         Transaction ID
     * @param  {string} itemName      Item name
     * @param  {Number} itemPrice     Item price
     * @param  {string} itemQty       Item quantity
     * @param  {string} itemSku       Item SKU
     * @param  {string} itemVariation Item variation / category
     * @param  {string} currCode      Currency code
     * @param  {string} clientID      uuidV4
     * @return {Promise}
     */
    item(trnID, itemName, itemPrice, itemQty, itemSku, itemVariation, currCode) {
        let params = {
            ti: trnID,
            in: itemName
        };
        if (itemPrice)
            params['ip'] = itemPrice;
        if (itemQty)
            params['iq'] = itemQty;
        if (itemSku)
            params['ic'] = itemSku;
        if (itemVariation)
            params['iv'] = itemVariation;
        if (currCode)
            params['cu'] = currCode;
        this.push(this.createParams('item', params));
        return this;
        //return this.send(this.createParams('item', params));
    }
    /**
     * Send a "timing tracking" request
     * @param  {string} timingCtg     Timing category
     * @param  {string} timingVar     Timing variable
     * @param  {Number} timingTime    Timing time
     * @param  {string} timingLbl     Timing label
     * @param  {Number} dns           DNS load time
     * @param  {Number} pageDownTime  Page download time
     * @param  {Number} redirTime     Redirect time
     * @param  {Number} tcpConnTime   TCP connect time
     * @param  {Number} serverResTime Server response time
     * @param  {string} clientID      uuidV4
     * @return {Promise}
     */
    timingTrk(timingCtg, timingVar, timingTime, timingLbl, dns, pageDownTime, redirTime, tcpConnTime, serverResTime) {
        let params = {
            utc: timingCtg,
            utv: timingVar,
            utt: timingTime
        };
        if (timingLbl)
            params['url'] = timingLbl;
        if (dns)
            params['dns'] = dns;
        if (pageDownTime)
            params['pdt'] = pageDownTime;
        if (redirTime)
            params['rrt'] = redirTime;
        if (tcpConnTime)
            params['tcp'] = tcpConnTime;
        if (serverResTime)
            params['srt'] = serverResTime;
        this.push(this.createParams('timing', params));
        return this;
        //return this.send(this.createParams('timing', params));
    }
    /**
     * create a request params
     * @param hitType hit type
     * @param params param
     */
    createParams(hitType, ...params) {
        let result = Object.assign({ v: this._version, tid: this._tid, cid: this._cid, t: hitType }, ...params);
        return result;
    }
    push(params) {
        if (!params) {
            return;
        }
        let str = qs.stringify(params);
        if (!str || str.length <= 0) {
            return;
        }
        this._queue.push(str);
    }
    append(params) {
        if (!params) {
            return this;
        }
        let qstring = qs.stringify(params);
        if (!qstring || qstring.length === 0) {
            return this;
        }
        if (this._queue.length === 0) {
            this._queue.push(qstring);
        }
        else {
            let lastindex = this._queue.length - 1;
            this._queue[lastindex] = this._queue[lastindex] + `&${qstring}`;
        }
        return this;
    }
    getBody(params) {
        if (!params) {
            return this._queue.splice(0, 20);
        }
        if (!(params instanceof Array)) {
            params = [params];
        }
        return params.map(i => qs.stringify(i));
    }
    /**
     * send a request to google-analytics
     * @param params param
     */
    send(params) {
        let promise = new Promise((resolve, reject) => {
            let qstrings = this.getBody(params);
            const batch = qstrings.length > 1;
            let url;
            if (this._debug) {
                url = `${this._baseUrl}${this._debugPath}${this._collectPath}`;
            }
            else {
                url = `${this._baseUrl}${batch ? this._batchPath : this._collectPath}`;
            }
            let req = { url: url };
            req['body'] = qstrings.join('\n');
            if (this._userAgent !== '') {
                req['headers'] = { 'User-Agent': this._userAgent };
            }
            request.post(req, (err, httpResponse, body) => {
                if (err)
                    return reject(err);
                let json = {};
                if (body && (httpResponse.headers['content-type'] !== 'image/gif')) {
                    json = JSON.parse(body);
                }
                if (httpResponse.statusCode === 200) {
                    if (this._debug) {
                        if (json.hitParsingResult[0].valid) {
                            return resolve();
                        }
                        return reject(json);
                    }
                    return resolve();
                }
                if (httpResponse.headers['content-type'] !== 'image/gif')
                    return reject(json);
                return reject(body);
            });
        });
        return promise;
    }
}
exports.analytics = analytics;
//# sourceMappingURL=analysics.js.map