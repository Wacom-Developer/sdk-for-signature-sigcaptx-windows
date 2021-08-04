declare global {
    interface Window {
        inputObj: any;
        sdkPtr: any;
        step1: any;
        wizCtl: any;
    }
}
export declare class PINScreen {
    screen: any;
    constructor(pad: any);
    step1: () => void;
    step1_onWizCtlReset: (wizCtlV: any, status: any) => void;
    onPutFontEnterBelow: (wizCtlV: any, status: any) => void;
    step1_onSetFontForeColorEnterBelow: (wizCtlV: any, status: any) => void;
    step1_onSetFontBackColorEnterBelow: (wizCtlV: any, status: any) => void;
    step1_onAddEnterBelow: (wizCtlV: any, status: any) => void;
    step1_onSetFontForeColorPin1: (wizCtlV: any, status: any) => void;
    step1_onSetFontBackColorPin1: (wizCtlV: any, status: any) => void;
    step1_onAddPin1Button: (wizCtlV: any, status: any) => void;
    onAddPin2Button: (wizCtlV: any, status: any) => void;
    onAddPin3Button: (wizCtlV: any, status: any) => void;
    onAddPin4Button: (wizCtlV: any, status: any) => void;
    onAddPin5Button: (wizCtlV: any, status: any) => void;
    onAddPin6Button: (wizCtlV: any, status: any) => void;
    onAddPin7Button: (wizCtlV: any, status: any) => void;
    onAddPin8Button: (wizCtlV: any, status: any) => void;
    onAddPin9Button: (wizCtlV: any, status: any) => void;
    onInputObjCtr: (inputObjV: any, status: any) => void;
    onInputObjMinLen: (inputObjV: any, status: any) => void;
    onInputObjMaxLen: (inputObjV: any, status: any) => void;
    onAddObjectInput: (wizCtlV: any, status: any) => void;
    onAddObjectInputEcho: (wizCtlV: any, status: any) => void;
    step1_onSetFontForeColorCancelButton: (wizCtlV: any, status: any) => void;
    step1_onSetFontBackColorCancelButton: (wizCtlV: any, status: any) => void;
    step1_onAddCancelButton: (wizCtlV: any, status: any) => void;
    onAddNextButton: (wizCtlV: any, status: any) => void;
    onDisplay: (wizCtlV: any, status: any) => void;
    step1_Handler: (ctl: any, id: any, type: any, status: any) => void;
    onInputObjGetText: (inputObjV: any, text: any, status: any) => void;
}
