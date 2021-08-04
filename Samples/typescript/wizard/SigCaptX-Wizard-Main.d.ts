declare global {
    interface Window {
        pad: any;
    }
}
export declare class WizardScreens {
    buttonSource: any;
    screen1: any;
    screen2: any;
    screen3: any;
    constructor(pad: any, buttonTextSource: any);
    step1(): void;
    step1_onWizCtlReset: (wizCtlV: any, status: number) => void;
    step1_onPutFontStepMsg1: (wizCtlV: any, status: any) => void;
    step1_onAddTextStep1: (wizCtlV: any, status: any) => void;
    step1_onAddRectangle: (wizCtlV: any, status: any) => void;
    step1_onAddTextInfoText: (wizCtlV: any, status: any) => void;
    step1_onPutFontCheckbox: (wizCtlV: any, status: any) => void;
    step1_onAddCheck: (wizCtlV: any, status: any) => void;
    step1_onAddTextSigningText: (wizCtlV: any, status: any) => void;
    step1_onAddTextNextCont: (wizCtlV: any, status: any) => void;
    step1_onAddCancelButton: (wizCtlV: any, status: any) => void;
    step1_onAddNextButton: (wizCtlV: any, status: any) => void;
    step1_onDisplay: (wizCtlV: any, status: any) => void;
    step1_onGetObjectState: (wizCtlV: any, objState: any, status: any) => void;
    step1_Handler: (ctl: any, id: any, type: any, status: any) => void;
    step2: () => void;
    step2_onWizCtlReset: (wizCtlV: any, status: any) => void;
    step2_onAddText1: (wizCtlV: any, status: any) => void;
    step2_onAddPrimitive1: (wizCtlV: any, status: any) => void;
    step2_onAddInfoObject: (wizCtlV: any, status: any) => void;
    step2_onAddNextToContinue: (wizCtlV: any, status: any) => void;
    step2_onAddRadioButton1: (wizCtlV: any, status: any) => void;
    step2_onAddRadioButton2: (wizCtlV: any, status: any) => void;
    step2_onAddCancelButton: (wizCtlV: any, status: any) => void;
    step2_onAddNextButton: (wizCtlV: any, status: any) => void;
    step2_onDisplay: (wizCtlV: any, status: any) => void;
    step2_Handler: (ctl: any, id: any, type: any, status: any) => void;
    step3: () => void;
    step3_onWizCtlReset: (wizCtlV: any, status: any) => void;
    step3_onAddStepMsg: (wizCtlV: any, status: any) => void;
    step3_notSTU300: () => void;
    step3_onAddPrimitive1: (wizCtlV: any, status: any) => void;
    step3_onAddPleaseSign: (wizCtlV: any, status: any) => void;
    step3_onAddTextXMark: (wizCtlV: any, status: any) => void;
    step3_onAddMarkerLine: (wizCtlV: any, status: any) => void;
    step3_onPutSignatureFont: (wizCtlV: any, status: any) => void;
    step3_onAddSignature: (wizCtlV: any, status: any) => void;
    step3_onAddWhy: (wizCtlV: any, status: any) => void;
    step3_onAddWho: (wizCtlV: any, status: any) => void;
    step3_onAddOK: (wizCtlV: any, status: any) => void;
    step3_onAddClear: (wizCtlV: any, status: any) => void;
    step3_isSTU300: () => void;
    step3_onAddPrimitiveSTU300: (wizCtlV: any, status: any) => void;
    step3_onPutFontPenSymbol: (wizCtlV: any, status: any) => void;
    step3_onGetFontSTU300: (wizCtlV: any, font: any, status: any) => void;
    step3_onAddText1STU300: (wizCtlV: any, status: any) => void;
    step3_doDisplay: (wizCtlV: any, status: any) => void;
    step3_onDisplay: (wizCtlV: any, status: any) => void;
    step3_Handler: (ctl: any, id: any, type: any, status: any) => void;
}
