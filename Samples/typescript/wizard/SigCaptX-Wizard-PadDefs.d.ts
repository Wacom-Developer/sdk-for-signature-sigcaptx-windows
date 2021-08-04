import { ButtonObject, TextObject } from './SigCaptX-Globals';
export declare class PadControl {
    buttonBold: boolean;
    buttonSize: number;
    buttonWidth: number;
    checkSize: number;
    font: string;
    height: number;
    width: number;
    checkBoxSize: number;
    range: string;
    display1: any;
    textBold: boolean;
    textLS: number;
    textSize: number;
    titleBold: boolean;
    titleSize: number;
    type: string;
    xButtonLeft: number;
    xButtonRight: number;
    yButton: number;
    yButtonRight: number;
    yText: number;
    yTitle: number;
    constructor(width: any, height: any, checkBoxSize: any, numScreens: any, buttonTextSource: any);
}
export declare class Screen_Display1 {
    cancelButton: any;
    checkboxObj: any;
    imageFile: string;
    infoText: any;
    nextButton: any;
    nextToContinue: any;
    signingText: any;
    step1Line: any;
    stepMsg1: any;
    step1Rectangle: any;
    text: string;
    xPos: any;
    yPos: any;
    constructor(pad: any, buttonTextSource: any);
}
export declare class Screen_Display2 {
    cancelButton: any;
    femaleRadio: any;
    fontBold: boolean;
    fontSize: number;
    imageFile: string;
    infoObject: any;
    maleRadio: any;
    nextButton: any;
    nextToContinue: any;
    step2Line: any;
    step2Rectangle: any;
    stepMsg2: any;
    text: string;
    xPos: any;
    yPos: any;
    constructor(pad: any, buttonTextSource: any);
}
export declare class Screen_Display3 {
    cancelButton: any;
    clearButton: any;
    fontBold: boolean;
    fontSize: number;
    line: any;
    okButton: any;
    penSymbol: any;
    pleaseSign: any;
    sigMarkerLine: any;
    signatureFontSize: number;
    step3Rectangle: any;
    stepMsg3: any;
    text: string;
    who: any;
    why: any;
    XMark: any;
    xPos: any;
    yPos: any;
    constructor(pad: any, buttonTextSource: any);
}
export declare class Display_Utils {
    static setupNextButton: (pad: any, buttonTextSource: any) => ButtonObject;
    static setupCancelButton: (pad: any, buttonTextSource: any, buttonFunc: any) => ButtonObject;
    static setupPreviousButton: (pad: any, buttonTextSource: any) => ButtonObject;
    static setupContinueText: (pad: any, buttonTextSource: any) => TextObject;
    static setButtonImageFile: (buttonTextSource: any, currentPadRange: any, imagePrefix: any) => any;
}
