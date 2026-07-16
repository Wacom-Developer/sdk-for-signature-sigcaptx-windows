export declare var wgssSignatureSDK: any;
export declare var SOLIDLINE: number;
export declare var OUTLINE: number;
export declare var CHECKBOX_USETICKSYMBOL: number;
export declare const BITMAP_BACKGROUNDCOLOR = 16777215;
export declare const BITMAP_IMAGEFORMAT = "bmp";
export declare const BITMAP_INKCOLOR = 0;
export declare const BITMAP_INKWIDTH = 0.7;
export declare const BITMAP_PADDING_X = 4;
export declare const BITMAP_PADDING_Y = 4;
export declare const DONTSETFONT = false;
export declare const DONTUSEWINGDINGS = false;
export declare const SETFONT = true;
export declare const USEWINGDINGS = true;
export declare const IMAGESDIR = "http://gsdt.wacom.eu/SigCaptX/images/";
export declare const TIMEOUT = 1500;
export declare const SERVICEPORT = 10500;
export declare const LICENCEKEY = "<<license>>";
export declare enum padRange {
    STU300 = "300",
    STU430 = "430",
    STU500 = "500",
    STU5X0 = "5X0"
}
export declare enum padType {
    STU300 = "Wacom STU-300",
    STU430 = "Wacom STU-430",
    STU500 = "Wacom STU-500",
    STU5X0 = "Wacom STU-520, 530, 540 or 541"
}
export declare enum buttonFunction {
    PREVIOUS = "PREVIOUS",
    CANCEL = "CANCEL"
}
export declare enum checkSizeSelection {
    LARGE = "LARGE",
    STANDARD = "STANDARD"
}
export declare enum checkSize {
    STU300_Small = 12,
    STU300_Large = 20,
    STU430_Small = 12,
    STU430_Large = 30,
    STU500_Small = 22,
    STU500_Large = 40,
    STU5X0_Small = 22,
    STU5X0_Large = 40
}
export declare enum padColors {
    BLUE = "0R 0G 0.8B",
    GREEN = "0R 0.8G 0B",
    BLACK = "0R 0G 0B",
    WHITE = "1R 1G 1B",
    PURPLE = "0.7R 0.3G 1B",
    RED = "0.6R 0G 0.2B"
}
export declare enum textSource {
    LOCAL = 1,
    REMOTE = 2,
    UTF8 = 3,
    STANDARD = 4
}
export declare enum buttonEvent {
    NEXT = "Next",
    CHECK = "Check",
    CANCEL = "Cancel",
    CLEAR = "Clear",
    OK = "OK"
}
export declare enum radioSelection {
    MALE = "Male",
    FEMALE = "Female"
}
export declare class HTMLIds {
    btnStartStop: any;
    chkDisplayWizard: any;
    chkLargeCheckbox: any;
    chkSigText: any;
    imageBox: any;
    remoteImages: any;
    txtDisplay: any;
    utf8ButtonText: any;
    constructor();
}
export declare class WizObject {
    xPos: any;
    yPos: any;
    fontBold: boolean;
    fontName: string;
    fontSize: number;
    fontBackColor: string;
    fontForeColor: string;
    constructor(xPos: any, yPos: any, fontName: any, fontSize: any, fontBold?: any);
}
export declare class TextObject extends WizObject {
    textString: string;
    type: string;
    constructor(textString: any, xPos: any, yPos: any, fontName: any, fontSize: any, fontBold?: any);
}
export declare class WhoObject extends WizObject {
    textString: string;
    type: string;
    constructor(textString: any, xPos: any, yPos: any, fontName: any, fontSize: any, fontBold?: any);
}
export declare class WhyObject extends WizObject {
    textString: string;
    type: string;
    constructor(textString: any, xPos: any, yPos: any, fontName: any, fontSize: any, fontBold?: any);
}
export declare class CheckboxObject extends WizObject {
    options: any;
    constructor(xPos: any, yPos: any, fontName: any, fontSize: any, options: any);
}
export declare class RadioObject extends WizObject {
    buttonLabel: string;
    groupName: string;
    buttonChecked: boolean;
    constructor(xPos: any, yPos: any, fontName: any, fontSize: any, fontBold: any, label: any, group: any, checked: any);
}
export declare class ButtonObject extends WizObject {
    buttonBold: boolean;
    buttonSize: number;
    buttonType: string;
    buttonText: string;
    buttonWidth: number;
    width: number;
    imageFile: string;
    constructor(xPos: any, yPos: any, fontName: any, buttonSize: any, buttonWidth: any, buttonBold: any, buttonType: any, buttonText?: any);
}
export declare class RectangleObject {
    x1Pos: any;
    y1Pos: any;
    x2Pos: any;
    y2Pos: any;
    lineWidth: number;
    options: any;
    fontBackColor: string;
    fontForeColor: string;
    constructor(x1Pos: any, y1Pos: any, x2Pos: any, y2Pos: any, width: any, options: any);
}
