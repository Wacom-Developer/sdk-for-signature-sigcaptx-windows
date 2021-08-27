System.register(["./SigCaptX-Globals"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_Globals_1, PadControl, Screen_Display1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            }
        ],
        execute: function () {
            PadControl = /** @class */ (function () {
                function PadControl(width, height) {
                    this.font = "Verdana";
                    this.height = height;
                    this.titleBold = true;
                    this.width = width;
                    switch (width) {
                        case 640:
                            this.range = SigCaptX_Globals_1.padRange.STU500;
                            this.type = SigCaptX_Globals_1.padType.STU500;
                            this.textSize = 16;
                            this.yText = 10;
                            this.yLSText = 28;
                            this.buttonSize = 22;
                            this.buttonWidth = 110;
                            this.yButtonCancel = 415;
                            this.yButtonNext = 415;
                            this.xButtonCancel = 30;
                            this.xButtonNext = 500;
                            break;
                        case 800:
                            this.range = SigCaptX_Globals_1.padRange.STU5X0;
                            this.type = SigCaptX_Globals_1.padType.STU5X0;
                            this.textSize = 16;
                            this.yText = 10;
                            this.yLSText = 28;
                            this.buttonSize = 22;
                            this.buttonWidth = 110;
                            this.yButtonCancel = 415;
                            this.yButtonNext = 415;
                            this.xButtonCancel = 30;
                            this.xButtonNext = 660;
                            break;
                        case 396:
                            this.range = SigCaptX_Globals_1.padRange.STU300;
                            this.type = SigCaptX_Globals_1.padType.STU300;
                            this.textSize = 8;
                            this.yText = 5;
                            this.yLSText = 6;
                            this.buttonSize = 15;
                            this.buttonWidth = 55;
                            this.xButtonCancel = 335;
                            this.xButtonNext = 335;
                            // Note that yButtonCancel and yButtonNext for the 300 are calculated later in screen1() below
                            break;
                        case 320:
                            this.range = SigCaptX_Globals_1.padRange.STU430;
                            this.type = SigCaptX_Globals_1.padType.STU430;
                            this.textSize = 9;
                            this.yText = 10;
                            this.yLSText = 7;
                            this.buttonSize = 12;
                            this.buttonWidth = 70;
                            this.yButtonCancel = 170;
                            this.yButtonNext = 170;
                            this.xButtonCancel = 5;
                            this.xButtonNext = 243;
                            break;
                    }
                }
                return PadControl;
            }());
            exports_1("PadControl", PadControl);
            // Function to define the x and y values and other properties for all the objects on the screen (only 1 screen with the PIN Pad)
            Screen_Display1 = /** @class */ (function () {
                function Screen_Display1(pad) {
                    // Calculate the x and y co-ordinates for the various screen objects
                    // bearing in mind that for the buttons the x value for each column is always the same
                    // and the y value for each row is always the same
                    this.keyWidth = pad.width / 10;
                    if (pad.range == SigCaptX_Globals_1.padRange.STU300) {
                        this.yInputEcho = 20;
                        this.xButtonCol1 = pad.width / 2 - pad.buttonWidth - pad.buttonWidth / 2;
                        this.xButtonCol2 = pad.width / 2 - pad.buttonWidth / 2;
                        this.xButtonCol3 = pad.width / 2 + pad.buttonWidth / 2;
                        this.yButtonRow1 = pad.yText + 7 * pad.yLSText;
                        this.yButtonRow2 = pad.yText + 7 * pad.yLSText + pad.buttonSize;
                        this.yButtonRow3 = pad.yText + 7 * pad.yLSText + (2 * pad.buttonSize);
                        pad.yButtonCancel = this.yButtonRow1;
                        pad.yButtonNext = this.yButtonRow3;
                    }
                    else {
                        this.yInputEcho = pad.yText + 4 * pad.yLSText;
                        this.xButtonCol1 = pad.width / 2 - this.keyWidth / 2 - 2 * this.keyWidth;
                        this.xButtonCol2 = pad.width / 2 - this.keyWidth / 2;
                        this.xButtonCol3 = pad.width / 2 - this.keyWidth / 2 + 2 * this.keyWidth;
                        this.yButtonRow1 = pad.yText + 7 * pad.yLSText;
                        this.yButtonRow2 = pad.yText + 7 * pad.yLSText + this.keyWidth;
                        this.yButtonRow3 = pad.yText + 7 * pad.yLSText + (2 * this.keyWidth);
                    }
                    // Set up the text object for the "Enter a 4 digit PIN..." prompt
                    this.enterBelow = new SigCaptX_Globals_1.TextObject("Enter a 4 digit PIN code below", "center", pad.yText, pad.font, pad.textSize, pad.titleBold, "txt");
                    this.enterBelow.fontForeColor = SigCaptX_Globals_1.padColors.BLUE;
                    this.enterBelow.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    // Set up the 9 button objects for the PIN numbers
                    this.pin1 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol1, this.yButtonRow1, pad.buttonSize, pad.buttonWidth, pad.titleBold, "1", "1");
                    this.pin1.fontForeColor = SigCaptX_Globals_1.padColors.BLUE;
                    this.pin1.fontBackColor = SigCaptX_Globals_1.padColors.GREEN;
                    this.pin2 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol2, this.yButtonRow1, pad.buttonSize, pad.buttonWidth, pad.titleBold, "2", "2");
                    this.pin3 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol3, this.yButtonRow1, pad.buttonSize, pad.buttonWidth, pad.titleBold, "3", "3");
                    this.pin4 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol1, this.yButtonRow2, pad.buttonSize, pad.buttonWidth, pad.titleBold, "4", "4");
                    this.pin5 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol2, this.yButtonRow2, pad.buttonSize, pad.buttonWidth, pad.titleBold, "5", "5");
                    this.pin6 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol3, this.yButtonRow2, pad.buttonSize, pad.buttonWidth, pad.titleBold, "6", "6");
                    this.pin7 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol1, this.yButtonRow3, pad.buttonSize, pad.buttonWidth, pad.titleBold, "7", "7");
                    this.pin8 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol2, this.yButtonRow3, pad.buttonSize, pad.buttonWidth, pad.titleBold, "8", "8");
                    this.pin9 = new SigCaptX_Globals_1.ButtonObject(this.xButtonCol3, this.yButtonRow3, pad.buttonSize, pad.buttonWidth, pad.titleBold, "9", "9");
                    // Finally set up the button objects for the Confirm and Cancel buttons
                    this.nextButton = new SigCaptX_Globals_1.ButtonObject(pad.xButtonNext, pad.yButtonNext, pad.buttonSize, pad.buttonWidth, pad.titleBold, SigCaptX_Globals_1.buttonEvent.OK, "Confirm");
                    this.nextButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                    this.nextButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                    this.cancelButton = new SigCaptX_Globals_1.ButtonObject(pad.xButtonCancel, pad.yButtonCancel, pad.buttonSize, pad.buttonWidth, pad.titleBold, SigCaptX_Globals_1.buttonEvent.CANCEL, "Cancel");
                    this.cancelButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                    this.cancelButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                }
                return Screen_Display1;
            }());
            exports_1("Screen_Display1", Screen_Display1);
        }
    };
});
