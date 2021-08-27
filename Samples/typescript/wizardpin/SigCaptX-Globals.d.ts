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
export declare const TIMEOUT = 1500;
export declare const SERVICEPORT = 10500;
export declare const LICENCEKEY = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA";
export declare const PIN_MAXLENGTH = 4;
export declare const PIN_MINLENGTH = 1;
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
export declare class TextObject {
    textString: string;
    xPos: any;
    yPos: any;
    fontBold: boolean;
    fontName: string;
    fontSize: number;
    fontBackColor: string;
    fontForeColor: string;
    type: string;
    constructor(textString: any, xPos: any, yPos: any, fontName: any, fontSize: any, fontBold?: any, type?: any);
}
export declare class CheckboxObject {
    xPos: any;
    yPos: any;
    options: any;
    fontName: string;
    fontSize: number;
    fontBackColor: string;
    fontForeColor: string;
    constructor(xPos: any, yPos: any, fontName: any, fontSize: any, options: any);
}
export declare class RadioObject {
    xPos: any;
    yPos: any;
    buttonLabel: string;
    groupName: string;
    buttonChecked: boolean;
    fontBackColor: string;
    fontForeColor: string;
    constructor(xPos: any, yPos: any, label: any, group: any, checked: any);
}
export declare class ButtonObject {
    xPos: any;
    yPos: any;
    buttonBold: boolean;
    buttonSize: number;
    buttonType: string;
    buttonText: string;
    buttonWidth: number;
    width: number;
    imageFile: string;
    fontBackColor: string;
    fontForeColor: string;
    constructor(xPos: any, yPos: any, buttonSize: any, buttonWidth: any, buttonBold: any, buttonType: any, buttonText?: any);
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
export declare class LineObject {
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
