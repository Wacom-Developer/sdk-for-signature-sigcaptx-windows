declare global {
    interface Window {
        AboutBox: any;
        Capture: any;
        displaySignatureDetails: any;
        ClearSignature: any;
        SetSignatureText: any;
        VerifySig: any;
        sdkPtr: any;
    }
}
export declare class SessionControl {
    static actionWhenRestarted(): void;
    static timedDetect(): void;
    static onDetectRunning(): void;
    static start(): void;
    static onSigCtlConstructor(sigCtlV: any, status: any): void;
    static onDynCaptConstructor(dynCaptV: any, status: any): void;
    static onSigCtlPutLicence(sigCtlV: any, status: any): void;
    static onGetSignature(sigCtlV: any, sigObjV: any, status: any): void;
    static onGetSigCaptXVersion(version: any, status: any): void;
    static onSigCtlGetFileVersion(sigCtlV: any, property: any, status: any): void;
    static onDynCaptGetFileVersion(dynCaptV: any, property: any, status: any): void;
}
