/***************************************************************************
  SigCaptX-WizUtils.ts
   
  This file contains a number of common routines which are used by the wizard samples
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { textSource } from './SigCaptX-Globals';
export declare class WizDisplay {
    static callback: any;
    static wizObject: any;
    static setFont(fontName: any, fontSize: any, isBold: any, useSymbolCharset: any, callbackRoutine: any): void;
    static setFontForeColor(foreColor: any, callbackRoutine: any): void;
    static setFontBackColor(backColor: any, callbackRoutine: any): void;
    static setupTextObject(textObject: any, setFont: any, useSymbolCharSet: any, callbackRoutine: any): void;
    static setTextObjectForeColor(wizCtlV: any, status: any): void;
    static setTextObjectBackColor(wizCtlV: any, status: any): void;
    static addTextObject(wizCtlV: any, status: any): void;
    static setupButtonObject(btnObject: any, setFont: any, useSymbolCharSet: any, callbackRoutine: any): void;
    static setButtonObjectForeColor(wizCtlV: any, status: any): void;
    static setButtonObjectBackColor(wizCtlV: any, status: any): void;
    static addButtonObject(wizCtlv: any, status: any): void;
    static addObjectImage(imageObj: any, callbackRoutine: any, imageSource: any): void;
    static addCheckBox(xPosition: any, yPosition: any, optionsValue: any, callbackRoutine: any): void;
    static addSignatureObject(sigCtl: any, callbackRoutine: any): void;
    static addRectangle(rectangleObj: any, callbackRoutine: any): void;
    static addLine(lineObj: any, callbackRoutine: any): void;
    static setupRadio(radioObject: any, setFont: any, useSymbolCharSet: any, callbackRoutine: any): void;
    static setRadioObjectForeColor(wizCtlV: any, status: any): void;
    static setRadioObjectBackColor(wizCtlV: any, status: any): void;
    static addRadioButton(wizCtlV: any, status: any): void;
    static addInputObject(inputObj: any, callbackRoutine: any): void;
    static addInputObjectEcho(xPos: any, yPos: any, callbackRoutine: any): void;
}
export declare function print(txt: any): void;
export declare function clearTextBox(): void;
export declare function callbackStatusOK(methodName: any, status: any): boolean;
export declare function showSignature(): void;
export declare function getButtonSourceFromHTMLDoc(): textSource.REMOTE | textSource.STANDARD;
