declare global {
    interface Window {
        numScreenDisplays: number;
        pad: any;
        scriptIsRunning: boolean;
        sigCtl: any;
        sdkPtr: any;
        width: number;
        wizCtl: any;
    }
}
export declare class WizardEventController {
    static body_onload(): void;
    static start_stop(numScreens: any): void;
    static stop(): void;
    static script_Completed(stopScriptNow: any): void;
    static script_Cancelled(): void;
    static wizardStart: (numScreens: any) => void;
    static onWizClose: (wizCtlV: any, status: any) => void;
    static start_wizard: () => void;
    static actionWhenRestarted: (callback?: any) => void;
    static timedDetect: () => void;
    static onWizCtlConstructor: (wizCtlV: any, status: any) => void;
    static onWizCtlPutLicence: (sigCtlV: any, status: any) => void;
    static onPutVisibleWindow: (wizCtlV: any, status: any) => void;
    static onPadConnect: (wizCtlV: any, connected: any, status: any) => void;
    static onErrorClose: (wizCtlG: any, status: any) => void;
    static onGetPadWidth: (wizCtlV: any, padWidth: any, status: any) => void;
    static onGetPadHeight: (wizCtlV: any, padHeight: any, status: any) => void;
    static onDetectRunning: () => void;
    static start: () => void;
    static start_onSigCtlConstructor: (sigCtlV: any, status: any) => void;
    static start_onSigCtlPutLicence: (sigCtlV: any, status: any) => void;
    static start_onSigCtlGetFileVersion: (sigCtlV: any, property: any, status: any) => void;
    static start_onWizCtlConstructor: (wizCtlV: any, status: any) => void;
    static start_onWizCtlGetFileVersion: (WizCtlV: any, property: any, status: any) => void;
    static stopScript: () => void;
    static onReset: (wizCtlV: any, status: any) => void;
    static onClose: (wizCtlV: any, status: any) => void;
}
