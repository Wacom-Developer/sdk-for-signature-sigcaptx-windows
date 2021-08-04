/* **************************************************************************
  SigCaptX-Globals.ts
   
  This file contains enumerators, function objects and global variables common to various functions
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
System.register([], function (exports_1, context_1) {
    "use strict";
    var wgssSignatureSDK, SOLIDLINE, OUTLINE, CHECKBOX_USETICKSYMBOL, BITMAP_BACKGROUNDCOLOR, BITMAP_IMAGEFORMAT, BITMAP_INKCOLOR, BITMAP_INKWIDTH, BITMAP_PADDING_X, BITMAP_PADDING_Y, TIMEOUT, SERVICEPORT, LICENCEKEY, PIN_MAXLENGTH, PIN_MINLENGTH, padRange, padType, buttonFunction, checkSizeSelection, checkSize, padColors, textSource, buttonEvent, radioSelection, TextObject, CheckboxObject, RadioObject, ButtonObject, RectangleObject, LineObject;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {/* **************************************************************************
              SigCaptX-Globals.ts
               
              This file contains enumerators, function objects and global variables common to various functions
              
              Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
              
               v1.0
              
            ***************************************************************************/
            /* Define global variables */
            exports_1("wgssSignatureSDK", wgssSignatureSDK = null); // Signature SDK object
            exports_1("SOLIDLINE", SOLIDLINE = 1); // Used for drawing lines and rectangles
            exports_1("OUTLINE", OUTLINE = 4); // Ditto
            exports_1("CHECKBOX_USETICKSYMBOL", CHECKBOX_USETICKSYMBOL = 2); // Specifies whether the tick symbol should be used to show that the checkbox has been clicked
            exports_1("BITMAP_BACKGROUNDCOLOR", BITMAP_BACKGROUNDCOLOR = 0x00FFFFFF);
            exports_1("BITMAP_IMAGEFORMAT", BITMAP_IMAGEFORMAT = "bmp");
            exports_1("BITMAP_INKCOLOR", BITMAP_INKCOLOR = 0x00000000);
            exports_1("BITMAP_INKWIDTH", BITMAP_INKWIDTH = 0.7);
            exports_1("BITMAP_PADDING_X", BITMAP_PADDING_X = 4);
            exports_1("BITMAP_PADDING_Y", BITMAP_PADDING_Y = 4);
            exports_1("TIMEOUT", TIMEOUT = 1500); //  Timeout value for connecting to the port used for the SigCaptX service
            exports_1("SERVICEPORT", SERVICEPORT = 10500); //  Port used for the SigCaptX service
            exports_1("LICENCEKEY", LICENCEKEY = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA"); // Licence key used for sigCtl and wizCtl in SigCaptX-SessionControl.js
            exports_1("PIN_MAXLENGTH", PIN_MAXLENGTH = 4); //  Max lenght of PIN 
            exports_1("PIN_MINLENGTH", PIN_MINLENGTH = 1); //  Min length of PIN
            (function (padRange) {
                padRange["STU300"] = "300";
                padRange["STU430"] = "430";
                padRange["STU500"] = "500";
                padRange["STU5X0"] = "5X0";
            })(padRange || (padRange = {}));
            exports_1("padRange", padRange);
            ;
            (function (padType) {
                padType["STU300"] = "Wacom STU-300";
                padType["STU430"] = "Wacom STU-430";
                padType["STU500"] = "Wacom STU-500";
                padType["STU5X0"] = "Wacom STU-520, 530, 540 or 541";
            })(padType || (padType = {}));
            exports_1("padType", padType);
            ;
            (function (buttonFunction) {
                buttonFunction["PREVIOUS"] = "PREVIOUS";
                buttonFunction["CANCEL"] = "CANCEL";
            })(buttonFunction || (buttonFunction = {}));
            exports_1("buttonFunction", buttonFunction);
            ;
            (function (checkSizeSelection) {
                checkSizeSelection["LARGE"] = "LARGE";
                checkSizeSelection["STANDARD"] = "STANDARD";
            })(checkSizeSelection || (checkSizeSelection = {}));
            exports_1("checkSizeSelection", checkSizeSelection);
            ;
            (function (checkSize) {
                checkSize[checkSize["STU300_Small"] = 12] = "STU300_Small";
                checkSize[checkSize["STU300_Large"] = 20] = "STU300_Large";
                checkSize[checkSize["STU430_Small"] = 12] = "STU430_Small";
                checkSize[checkSize["STU430_Large"] = 30] = "STU430_Large";
                checkSize[checkSize["STU500_Small"] = 22] = "STU500_Small";
                checkSize[checkSize["STU500_Large"] = 40] = "STU500_Large";
                checkSize[checkSize["STU5X0_Small"] = 22] = "STU5X0_Small";
                checkSize[checkSize["STU5X0_Large"] = 40] = "STU5X0_Large";
            })(checkSize || (checkSize = {}));
            exports_1("checkSize", checkSize);
            ;
            (function (padColors) {
                padColors["BLUE"] = "0R 0G 0.8B";
                padColors["GREEN"] = "0R 0.8G 0B";
                padColors["BLACK"] = "0R 0G 0B";
                padColors["WHITE"] = "1R 1G 1B";
                padColors["PURPLE"] = "0.7R 0.3G 1B";
                padColors["RED"] = "0.6R 0G 0.2B";
            })(padColors || (padColors = {}));
            exports_1("padColors", padColors);
            ;
            (function (textSource) {
                textSource[textSource["LOCAL"] = 1] = "LOCAL";
                textSource[textSource["REMOTE"] = 2] = "REMOTE";
                textSource[textSource["UTF8"] = 3] = "UTF8";
                textSource[textSource["STANDARD"] = 4] = "STANDARD";
            })(textSource || (textSource = {}));
            exports_1("textSource", textSource);
            ;
            (function (buttonEvent) {
                buttonEvent["NEXT"] = "Next";
                buttonEvent["CHECK"] = "Check";
                buttonEvent["CANCEL"] = "Cancel";
                buttonEvent["CLEAR"] = "Clear";
                buttonEvent["OK"] = "OK";
            })(buttonEvent || (buttonEvent = {}));
            exports_1("buttonEvent", buttonEvent);
            ;
            (function (radioSelection) {
                radioSelection["MALE"] = "Male";
                radioSelection["FEMALE"] = "Female";
            })(radioSelection || (radioSelection = {}));
            exports_1("radioSelection", radioSelection);
            ;
            // Set up the classes used for defining the various objects which are to be displayed on the pad
            TextObject = /** @class */ (function () {
                function TextObject(textString, xPos, yPos, fontName, fontSize, fontBold, type) {
                    this.textString = textString;
                    this.xPos = xPos;
                    this.yPos = yPos;
                    this.fontName = fontName;
                    this.fontSize = fontSize;
                    if (fontBold) {
                        this.fontBold = fontBold;
                    }
                    if (type) {
                        this.type = type;
                    }
                    else {
                        this.type = "txt";
                    }
                    this.fontBackColor = " ";
                    this.fontForeColor = " ";
                }
                return TextObject;
            }());
            exports_1("TextObject", TextObject);
            CheckboxObject = /** @class */ (function () {
                function CheckboxObject(xPos, yPos, fontName, fontSize, options) {
                    this.xPos = xPos;
                    this.yPos = yPos;
                    this.fontName = fontName;
                    this.fontSize = fontSize;
                    this.options = options;
                    this.fontBackColor = " ";
                    this.fontForeColor = " ";
                }
                return CheckboxObject;
            }());
            exports_1("CheckboxObject", CheckboxObject);
            ;
            RadioObject = /** @class */ (function () {
                function RadioObject(xPos, yPos, label, group, checked) {
                    this.xPos = xPos;
                    this.yPos = yPos;
                    this.buttonLabel = label;
                    this.groupName = group;
                    this.buttonChecked = checked;
                    this.fontBackColor = " ";
                    this.fontForeColor = " ";
                }
                return RadioObject;
            }());
            exports_1("RadioObject", RadioObject);
            ;
            ButtonObject = /** @class */ (function () {
                function ButtonObject(xPos, yPos, buttonSize, buttonWidth, buttonBold, buttonType, buttonText) {
                    this.xPos = xPos;
                    this.yPos = yPos;
                    this.buttonSize = buttonSize;
                    this.buttonWidth = buttonWidth;
                    this.buttonBold = buttonBold;
                    this.buttonType = buttonType;
                    if (buttonText) {
                        this.buttonText = buttonText;
                    }
                    else {
                        this.buttonText = buttonType;
                    }
                    this.fontBackColor = " ";
                    this.fontForeColor = " ";
                    this.imageFile = " ";
                }
                return ButtonObject;
            }());
            exports_1("ButtonObject", ButtonObject);
            ;
            RectangleObject = /** @class */ (function () {
                function RectangleObject(x1Pos, y1Pos, x2Pos, y2Pos, width, options) {
                    this.x1Pos = x1Pos;
                    this.y1Pos = y1Pos;
                    this.x2Pos = x2Pos;
                    this.y2Pos = y2Pos;
                    this.lineWidth = width;
                    this.options = options;
                }
                return RectangleObject;
            }());
            exports_1("RectangleObject", RectangleObject);
            ;
            LineObject = /** @class */ (function () {
                function LineObject(x1Pos, y1Pos, x2Pos, y2Pos, width, options) {
                    this.x1Pos = x1Pos;
                    this.y1Pos = y1Pos;
                    this.x2Pos = x2Pos;
                    this.y2Pos = y2Pos;
                    this.lineWidth = width;
                    this.options = options;
                }
                return LineObject;
            }());
            exports_1("LineObject", LineObject);
            ;
        }
    };
});
