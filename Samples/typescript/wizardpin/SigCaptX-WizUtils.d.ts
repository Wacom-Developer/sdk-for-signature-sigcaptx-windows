export declare class WizDisplay {
    static setFont(fontName: any, fontSize: any, isBold: any, useSymbolCharset: any, callbackRoutine: any): void;
    static setFontForeColor(foreColor: any, callbackRoutine: any): void;
    static setFontBackColor(backColor: any, callbackRoutine: any): void;
    static addTextObject(textObject: any, callbackRoutine: any): void;
    static addButtonObject(buttonObj: any, callbackRoutine: any): void;
    static addObjectImage(imageObj: any, callbackRoutine: any, imageSource: any): void;
    static addCheckBox(xPosition: any, yPosition: any, optionsValue: any, callbackRoutine: any): void;
    static addSignatureObject(sigCtl: any, callbackRoutine: any): void;
    static addRectangle(rectangleObj: any, callbackRoutine: any): void;
    static addLine(lineObj: any, callbackRoutine: any): void;
    static addRadioButton(radioButtonObj: any, callbackRoutine: any): void;
    static addInputObject(inputObj: any, callbackRoutine: any): void;
    static addInputObjectEcho(xPos: any, yPos: any, callbackRoutine: any): void;
}
export declare function print(txt: any): void;
export declare function clearTextBox(): void;
export declare function callbackStatusOK(methodName: any, status: any): boolean;
