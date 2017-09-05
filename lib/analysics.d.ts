import { sendParams } from "./models";
export declare class analytics {
    private _debug;
    private _userAgent;
    private _baseUrl;
    private _debugPath;
    private _collectPath;
    private _batchPath;
    private _tid;
    private _version;
    private _cid;
    private _queue;
    /**
     *
     * @param tid Tracking ID
     * @param cid Anonymous Client ID
     * @param userAgent User Agent
     * @param debug debug
     * @param version Version
     */
    constructor(tid: string, cid?: string, userAgent?: string, debug?: boolean, version?: number);
    /**
     * pageview
     * @param hostname Document hostname
     * @param url Page
     * @param title Title
     */
    pageview(hostname: string, url: string, title: string): this;
    /**
     * Event
     * @param category Event Category. Required.
     * @param action Event Action. Required.
     * @param label Event label.
     * @param value Event value.
     */
    event(category: string, action: string, label?: string, value?: string): this;
    /**
     * screenview
     * @param name App name
     * @param ver App version
     * @param id App Id
     * @param aiid App Installer Id
     * @param path Screen name
     * @param opts Custom param
     */
    screenview(name: string, ver: string, id: string, aiid: string, path: string): this;
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
    transaction(trnID: any, trnAffil: any, trnRev: any, trnShip: any, trnTax: any, currCode: any): this;
    /**
     * Send a "social" request
     *
     * @param  {string} socialAction  Social Action
     * @param  {string} socialNetwork Social Network
     * @param  {string} socialTarget  Social Target
     *
     * @return {Promise}
     */
    social(socialAction: any, socialNetwork: any, socialTarget: any): this;
    /**
     * Send a "exception" request
     *
     * @param  {string} exDesc   Exception description
     * @param  {Number} exFatal  Exception is fatal?
     * @param  {string} clientID uuidV4
     *
     * @return {Promise}
     */
    exception(exDesc: any, exFatal: any): this;
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
    refund(trnID: any, evCategory?: string, evAction?: string, nonInteraction?: number): this;
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
    item(trnID: any, itemName: any, itemPrice: any, itemQty: any, itemSku: any, itemVariation: any, currCode: any): this;
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
    timingTrk(timingCtg: any, timingVar: any, timingTime: any, timingLbl: any, dns: any, pageDownTime: any, redirTime: any, tcpConnTime: any, serverResTime: any): this;
    /**
     * create a request params
     * @param hitType hit type
     * @param params param
     */
    createParams(hitType: string, ...params: any[]): sendParams;
    private push(params);
    append(params: any): this;
    private getBody(params?);
    /**
     * send a request to google-analytics
     * @param params param
     */
    send(params?: sendParams | sendParams[]): Promise<void>;
}
