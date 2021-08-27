import { HTMLIds } from './SigCaptX-Globals';
declare global {
    interface Window {
        sdkPtr: any;
    }
}
export declare class SigCapture {
    static dynCapt: any;
    static hash: any;
    static sigCtl: any;
    sigObject: any;
    get sigObj(): any;
    set sigObj(value: any);
    constructor();
    capture(): void;
    static onGetInitialHash: () => void;
    static onDynCaptCapture: (dynCaptV: any, SigObjV: any, status: any) => void;
    static onRenderBitmap: (sigObjV: any, bmpObj: any, status: any) => void;
    static onGetSigText: (sigObjV: any, text: any, status: any) => void;
    enableRestoreButton: () => void;
    clearSignature: () => void;
    displaySignatureDetails: () => void;
    onGetIsCaptured: (sigObj: any, isCaptured: any, status: any) => void;
    onGetWho: (sigObjV: any, who: any, status: any) => void;
    onGetWhen: (sigObjV: any, when: any, status: any) => void;
    onGetWhy: (sigObjV: any, why: any, status: any) => void;
    verifySignedData: () => void;
    onGetHashForVerification: () => void;
    onCheckSignedData: (hash: any, status: any) => void;
    setSignatureText: () => void;
    onPutSigText: (sigObjV: any, status: any) => void;
    onRenderBitmapFromSigText: (sigObjV: any, bmpObj: any, status: any) => void;
    aboutBox: () => void;
    onAboutBox: (sigCtlV: any, status: any) => void;
}
export declare class Utils {
    static print(txt: any): void;
    static callbackStatusOK(methodName: any, status: any): boolean;
    static clearTextBox: () => void;
}
export declare const HTMLTags: HTMLIds;
export declare const sigCapt: SigCapture;
