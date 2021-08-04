System.register(["./SigCaptX-Globals"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_Globals_1, SigCaptX_Globals_2, SigCaptX_Globals_3, PadControl, Screen_Display1, Screen_Display2, Screen_Display3, Display_Utils;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
                SigCaptX_Globals_2 = SigCaptX_Globals_1_1;
                SigCaptX_Globals_3 = SigCaptX_Globals_1_1;
            }
        ],
        execute: function () {
            // This class sets up the main properties to be used for the display depending on which
            // STU has been detected.
            PadControl = /** @class */ (function () {
                function PadControl(width, height, checkBoxSize, numScreens, buttonTextSource) {
                    this.font = "Verdana";
                    this.height = height;
                    this.titleBold = true;
                    this.width = width;
                    this.checkBoxSize = checkBoxSize;
                    switch (width) {
                        case 640:
                            this.range = SigCaptX_Globals_2.padRange.STU500;
                            this.type = SigCaptX_Globals_2.padType.STU500;
                            if (checkBoxSize == SigCaptX_Globals_1.checkSizeSelection.LARGE) {
                                this.checkSize = SigCaptX_Globals_1.checkSize.STU500_Large;
                            }
                            else {
                                this.checkSize = SigCaptX_Globals_1.checkSize.STU500_Small;
                            }
                            this.buttonBold = false;
                            this.buttonSize = 22;
                            this.buttonWidth = 110;
                            this.textBold = false;
                            this.textLS = 30;
                            this.textSize = 16;
                            this.titleSize = 22;
                            this.xButtonLeft = 30;
                            this.xButtonRight = 500;
                            this.yButton = 415;
                            this.yText = 120;
                            this.yTitle = 10;
                            break;
                        case 800:
                            this.range = SigCaptX_Globals_2.padRange.STU5X0;
                            this.type = SigCaptX_Globals_2.padType.STU5X0;
                            if (checkBoxSize == SigCaptX_Globals_1.checkSizeSelection.LARGE) {
                                this.checkSize = SigCaptX_Globals_1.checkSize.STU5X0_Large;
                            }
                            else {
                                this.checkSize = SigCaptX_Globals_1.checkSize.STU5X0_Small;
                            }
                            this.buttonBold = false;
                            this.buttonSize = 22;
                            this.buttonWidth = 110;
                            this.textBold = false;
                            this.textLS = 30;
                            this.textSize = 16;
                            this.titleSize = 22;
                            this.xButtonLeft = 30;
                            this.xButtonRight = 660;
                            this.yButton = 415;
                            this.yText = 120;
                            this.yTitle = 10;
                            break;
                        case 396:
                            this.range = SigCaptX_Globals_2.padRange.STU300;
                            this.type = SigCaptX_Globals_2.padType.STU300;
                            if (checkBoxSize == SigCaptX_Globals_1.checkSizeSelection.LARGE) {
                                this.checkSize = SigCaptX_Globals_1.checkSize.STU300_Large;
                            }
                            else {
                                this.checkSize = SigCaptX_Globals_1.checkSize.STU300_Small;
                            }
                            this.buttonBold = true;
                            this.buttonSize = 8;
                            this.buttonWidth = 70;
                            this.textBold = false;
                            this.textLS = 12;
                            this.textSize = 8;
                            this.titleSize = 8;
                            this.xButtonLeft = 10;
                            this.xButtonRight = 316;
                            this.yButton = 82;
                            this.yText = 20;
                            this.yTitle = 2;
                            break;
                        case 320:
                            this.range = SigCaptX_Globals_2.padRange.STU430;
                            this.type = SigCaptX_Globals_2.padType.STU430;
                            if (checkBoxSize == SigCaptX_Globals_1.checkSizeSelection.LARGE) {
                                this.checkSize = SigCaptX_Globals_1.checkSize.STU430_Large;
                            }
                            else {
                                this.checkSize = SigCaptX_Globals_1.checkSize.STU430_Small;
                            }
                            this.buttonBold = true;
                            this.buttonSize = 12;
                            this.buttonWidth = 70;
                            this.textBold = true;
                            this.textLS = 15;
                            this.textSize = 9;
                            this.titleSize = 11;
                            this.xButtonLeft = 5;
                            this.xButtonRight = 243;
                            this.yButton = 170;
                            this.yText = 40;
                            this.yTitle = 3;
                            break;
                    }
                }
                return PadControl;
            }());
            exports_1("PadControl", PadControl);
            // This class sets up the object definitions for the first screen in the wizard sequence
            Screen_Display1 = /** @class */ (function () {
                function Screen_Display1(pad, buttonTextSource) {
                    // Object 1 - set up the "Step 1 of 3" text box
                    this.stepMsg1 = new SigCaptX_Globals_2.TextObject("Step 1 of 3", "right", 2, pad.font, pad.textSize, true);
                    // Object 2 - set up the "Check boxes provide options...." text message
                    this.text = "Check boxes provide options for the signing process and can be transferred to the document";
                    switch (pad.range) {
                        case SigCaptX_Globals_2.padRange.STU300:
                            this.xPos = 10;
                            this.yPos = 20;
                            break;
                        case SigCaptX_Globals_2.padRange.STU430:
                            this.xPos = 10;
                            this.yPos = 40;
                            // If using large check box the text message must be moved up
                            if (pad.checkSize == SigCaptX_Globals_1.checkSize.STU430_Large) {
                                this.yPos = 32;
                            }
                            break;
                        case SigCaptX_Globals_2.padRange.STU500:
                            this.xPos = 30;
                            this.yPos = 120;
                            break;
                        case SigCaptX_Globals_2.padRange.STU5X0:
                            this.xPos = 30;
                            this.yPos = 120;
                            break;
                    }
                    this.infoText = new SigCaptX_Globals_2.TextObject(this.text, this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold);
                    if (pad.range === SigCaptX_Globals_2.padRange.STU5X0) {
                        this.infoText.fontForeColor = SigCaptX_Globals_1.padColors.BLUE;
                        this.infoText.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Set up the details for the check box object
                    // If we are setting up the STU 300 definitions for the large checkbox sample then we need to adjust the position
                    // of the check box otherwise the screen gets too crowded
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300 && pad.checkSize == SigCaptX_Globals_1.checkSize.STU300_Large) {
                        this.xPos = pad.width / 4;
                        this.yPos = 44;
                    }
                    else if (pad.range == SigCaptX_Globals_2.padRange.STU430 && pad.checkSize == SigCaptX_Globals_1.checkSize.STU430_Large) {
                        this.xPos = pad.width / 8;
                        this.yPos = pad.height / 2 - 25;
                    }
                    else {
                        this.xPos = pad.width / 6;
                        this.yPos = pad.height / 2;
                    }
                    this.checkboxObj = new SigCaptX_Globals_1.CheckboxObject(this.xPos, this.yPos, pad.font, pad.checkSize, SigCaptX_Globals_3.CHECKBOX_USETICKSYMBOL);
                    // Set up the details of the "I am signing as a representative" text box
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300 && pad.checkSize == SigCaptX_Globals_1.checkSize.STU300_Large) {
                        // If we are setting up the STU 300 definitions for the large checkbox sample then we need to adjust the position
                        // of the "I am signing..." text to prevent overlapping
                        this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
                        this.yPos = 44 + pad.checkSize - pad.textSize;
                    }
                    else if (pad.range == SigCaptX_Globals_2.padRange.STU430 && pad.checkSize == SigCaptX_Globals_1.checkSize.STU430_Large) {
                        this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
                        this.yPos = this.checkboxObj.yPos + pad.checkSize - pad.textSize;
                    }
                    else {
                        this.xPos = this.checkboxObj.xPos + 2 * pad.checkSize;
                        this.yPos = pad.height / 2 + pad.checkSize - pad.textSize;
                    }
                    this.signingText = new SigCaptX_Globals_2.TextObject("I am signing as a representative", this.xPos, this.yPos, pad.font, pad.textSize);
                    if (pad.range === SigCaptX_Globals_2.padRange.STU5X0) {
                        this.signingText.fontForeColor = SigCaptX_Globals_1.padColors.GREEN;
                        this.signingText.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Set up the "When you are ready" text object. Done in separate function because also used later for screen 2
                    this.nextToContinue = Display_Utils.setupContinueText(pad, buttonTextSource);
                    // Set up the Next and Cancel button 
                    this.xPos = pad.xButtonRight;
                    this.yPos = pad.yButton;
                    this.text = "Next";
                    // Set up the source of the button depending on what the user has selected on the HTML document
                    switch (buttonTextSource) {
                        case SigCaptX_Globals_1.textSource.UTF8:
                            this.text = "下一個";
                            break;
                        case SigCaptX_Globals_1.textSource.REMOTE:
                            // Override the positions of the buttons when using images
                            this.xPos = "right";
                            this.yPos = "bottom";
                            break;
                    }
                    this.nextButton = new SigCaptX_Globals_2.ButtonObject(this.xPos, this.yPos, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, SigCaptX_Globals_1.buttonEvent.NEXT, this.text);
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.nextButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                        this.nextButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                    }
                    if (buttonTextSource === SigCaptX_Globals_1.textSource.REMOTE) {
                        this.nextButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "RightArrow");
                    }
                    this.cancelButton = Display_Utils.setupCancelButton(pad, buttonTextSource, SigCaptX_Globals_2.buttonFunction.PREVIOUS);
                    // Set up the rectangle or line object used to improve the screen aesthetics  
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300) {
                        this.step1Line = new SigCaptX_Globals_2.RectangleObject(5, 15, pad.width - 3, 15, 1, SigCaptX_Globals_3.SOLIDLINE);
                    }
                    else {
                        //print("Defining step1Rectangle for pad " + pad.range);
                        this.step1Rectangle = new SigCaptX_Globals_2.RectangleObject("left", pad.height / 8, "right", pad.height * 4 / 5, 1, SigCaptX_Globals_3.OUTLINE);
                    }
                }
                return Screen_Display1;
            }());
            exports_1("Screen_Display1", Screen_Display1);
            // This class sets up the object definitions for the second screen in the wizard sequence
            Screen_Display2 = /** @class */ (function () {
                function Screen_Display2(pad, buttonTextSource) {
                    // Set up the "Step 2 of 3" text message object
                    this.stepMsg2 = new SigCaptX_Globals_2.TextObject("Step 2 of 3", "right", 2, pad.font, pad.textSize, true);
                    this.stepMsg2.fontForeColor = SigCaptX_Globals_1.padColors.BLACK;
                    this.stepMsg2.backForeColor = SigCaptX_Globals_1.padColors.WHITE;
                    // Set up the informational text object
                    this.text = "Radio buttons provide options for the signing process and can be transferred to the document";
                    switch (pad.range) {
                        case SigCaptX_Globals_2.padRange.STU300:
                            this.xPos = 10;
                            this.yPos = 20;
                            this.fontSize = 8;
                            this.fontBold = false;
                            break;
                        case SigCaptX_Globals_2.padRange.STU430:
                            this.xPos = 10;
                            this.yPos = 40;
                            this.fontSize = 9;
                            this.fontBold = true;
                            break;
                        case SigCaptX_Globals_2.padRange.STU500:
                        case SigCaptX_Globals_2.padRange.STU5X0:
                            this.xPos = 30;
                            this.yPos = 120;
                            this.fontSize = 16;
                            this.fontBold = false;
                            break;
                    }
                    this.infoObject = new SigCaptX_Globals_2.TextObject(this.text, this.xPos, this.yPos, "Verdana", this.fontSize, this.fontBold);
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.infoObject.fontForeColor = SigCaptX_Globals_1.padColors.BLUE;
                        this.infoObject.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Next define the radio buttons
                    switch (pad.range) {
                        case SigCaptX_Globals_2.padRange.STU300:
                            this.xPos = 50;
                            this.yPos = 50;
                            break;
                        case SigCaptX_Globals_2.padRange.STU430:
                            this.xPos = 40;
                            this.yPos = 90;
                            break;
                        case SigCaptX_Globals_2.padRange.STU500:
                            this.xPos = 100;
                            this.yPos = 220;
                            break;
                        case SigCaptX_Globals_2.padRange.STU5X0:
                            this.xPos = 100;
                            this.yPos = 220;
                            break;
                    }
                    this.maleRadio = new SigCaptX_Globals_2.RadioObject(this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold, "Male", "Gender", true);
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.maleRadio.fontForeColor = SigCaptX_Globals_1.padColors.GREEN;
                        this.maleRadio.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Now the second radio button - the "Female" option
                    switch (pad.range) {
                        case SigCaptX_Globals_2.padRange.STU300:
                            this.xPos = 240;
                            this.yPos = 50;
                            break;
                        case SigCaptX_Globals_2.padRange.STU430:
                            this.xPos = 200;
                            this.yPos = 90;
                            break;
                        case SigCaptX_Globals_2.padRange.STU500:
                            this.xPos = 350;
                            this.yPos = 220;
                            break;
                        case SigCaptX_Globals_2.padRange.STU5X0:
                            this.xPos = 500;
                            this.yPos = 220;
                            break;
                    }
                    this.femaleRadio = new SigCaptX_Globals_2.RadioObject(this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold, "Female", "Gender", false);
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.femaleRadio.fontForeColor = SigCaptX_Globals_1.padColors.GREEN;
                        this.femaleRadio.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Set up the "Press NEXT to continue" object  
                    this.nextToContinue = Display_Utils.setupContinueText(pad, buttonTextSource);
                    // Set up the rectangle or line object for display aesthetics
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300) {
                        this.step2Line = new SigCaptX_Globals_2.RectangleObject(5, 15, pad.width - 3, 15, 1, SigCaptX_Globals_3.SOLIDLINE);
                    }
                    else {
                        this.step2Rectangle = new SigCaptX_Globals_2.RectangleObject("left", pad.height / 8, "right", pad.height * 4 / 5, 1, SigCaptX_Globals_3.OUTLINE);
                    }
                    // Set up the Next and Previous button objects
                    // Set up the source of the button depending on what the user has selected on the HTML document
                    this.xPos = pad.xButtonRight;
                    this.yPos = pad.yButton;
                    this.text = "Next";
                    switch (buttonTextSource) {
                        case SigCaptX_Globals_1.textSource.UTF8:
                            this.text = "下一個";
                            break;
                        case SigCaptX_Globals_1.textSource.REMOTE:
                            // Override the positions of the buttons when using images
                            this.xPos = "right";
                            this.yPos = "bottom";
                            break;
                    }
                    this.nextButton = new SigCaptX_Globals_2.ButtonObject(this.xPos, this.yPos, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, SigCaptX_Globals_1.buttonEvent.NEXT, this.text);
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.nextButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                        this.nextButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                    }
                    if (buttonTextSource === SigCaptX_Globals_1.textSource.REMOTE) {
                        this.nextButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "RightArrow");
                    }
                    this.cancelButton = Display_Utils.setupPreviousButton(pad, buttonTextSource);
                }
                return Screen_Display2;
            }());
            exports_1("Screen_Display2", Screen_Display2);
            // This class sets up the object definitions for the third screen in the wizard sequence
            Screen_Display3 = /** @class */ (function () {
                function Screen_Display3(pad, buttonTextSource) {
                    // Set up the "Step 3 of 3" text message object
                    this.stepMsg3 = new SigCaptX_Globals_2.TextObject("Step 3 of 3", "right", 2, pad.font, pad.textSize, true);
                    this.stepMsg3.fontForeColor = SigCaptX_Globals_1.padColors.BLACK;
                    this.stepMsg3.backForeColor = SigCaptX_Globals_1.padColors.WHITE;
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.stepMsg3.fontForeColor = SigCaptX_Globals_1.padColors.BLACK;
                        this.stepMsg3.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Set up the rectangle object for screen aesthetics 
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300) {
                        this.step3Rectangle = new SigCaptX_Globals_2.RectangleObject(5, 15, pad.width - 5, 15, 1, SigCaptX_Globals_3.SOLIDLINE);
                    }
                    else {
                        this.step3Rectangle = new SigCaptX_Globals_2.RectangleObject("left", pad.height / 8, "right", pad.height * 4 / 5, 1, SigCaptX_Globals_3.OUTLINE);
                    }
                    // Set up the "Please sign" text object
                    this.pleaseSign = new SigCaptX_Globals_2.TextObject("Please now sign below", "center", pad.yText, pad.font, pad.textSize, pad.textBold);
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.pleaseSign.fontForeColor = SigCaptX_Globals_1.padColors.BLUE;
                        this.pleaseSign.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Set up the "X" object for marking where the signature is to be input  
                    switch (pad.range) {
                        case SigCaptX_Globals_2.padRange.STU300:
                            this.fontSize = 18;
                            this.xPos = 30;
                            this.yPos = 100;
                            this.fontBold = pad.textBold;
                            break;
                        case SigCaptX_Globals_2.padRange.STU430:
                            this.fontSize = 15;
                            this.xPos = 20;
                            this.yPos = 100;
                            this.fontBold = false;
                            break;
                        case SigCaptX_Globals_2.padRange.STU500:
                            this.fontSize = 32;
                            this.xPos = 70;
                            this.yPos = 230;
                            this.fontBold = pad.textBold;
                            break;
                        case SigCaptX_Globals_2.padRange.STU5X0:
                            this.fontSize = 32;
                            this.xPos = 80;
                            this.yPos = 250;
                            this.fontBold = pad.textBold;
                            break;
                    }
                    this.XMark = new SigCaptX_Globals_2.TextObject("X", this.xPos, this.yPos, pad.font, this.fontSize, this.fontBold);
                    if (pad.range === SigCaptX_Globals_2.padRange.STU5X0) {
                        this.XMark.fontForeColor = SigCaptX_Globals_1.padColors.RED;
                        this.XMark.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Set up the underlining for the signature
                    switch (pad.range) {
                        case SigCaptX_Globals_2.padRange.STU300:
                            this.fontSize = 18;
                            this.xPos = 110;
                            this.yPos = 250;
                            this.text = "..............................";
                            break;
                        case SigCaptX_Globals_2.padRange.STU430:
                            this.fontSize = 15;
                            this.xPos = 40;
                            this.yPos = 100;
                            this.text = "..............................";
                            break;
                        case SigCaptX_Globals_2.padRange.STU500:
                            this.fontSize = 15;
                            this.xPos = 85;
                            this.yPos = 250;
                            this.text = "....................................................................";
                            break;
                        case SigCaptX_Globals_2.padRange.STU5X0:
                            this.fontSize = 32;
                            this.xPos = 110;
                            this.yPos = 250;
                            this.text = "........................................";
                            break;
                    }
                    this.sigMarkerLine = new SigCaptX_Globals_2.TextObject(this.text, this.xPos, this.yPos, pad.font, this.fontSize, pad.textBold);
                    if (pad.range === SigCaptX_Globals_2.padRange.STU5X0) {
                        this.sigMarkerLine.fontForeColor = SigCaptX_Globals_1.padColors.GREEN;
                        this.sigMarkerLine.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Set up the signatory objects
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300) {
                        this.xPos = "left";
                        this.yPos = pad.yText;
                    }
                    else {
                        this.xPos = "right";
                        this.yPos = 0.65 * pad.height;
                    }
                    this.who = new SigCaptX_Globals_2.WhoObject("J Smith", this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold);
                    // Set up the Reason for signing text object  
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300) {
                        this.xPos = "left";
                        this.yPos = 2;
                    }
                    else {
                        this.xPos = "right";
                        this.yPos = 0.65 * pad.height + pad.textLS;
                    }
                    this.why = new SigCaptX_Globals_2.WhyObject("I certify that the information is correct", this.xPos, this.yPos, pad.font, pad.textSize, pad.textBold);
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.why.fontForeColor = SigCaptX_Globals_1.padColors.BLUE;
                        this.why.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    // Set up the OK button object
                    this.okButton = new SigCaptX_Globals_2.ButtonObject(pad.xButtonRight, pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, SigCaptX_Globals_1.buttonEvent.OK, "OK");
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.okButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                        this.okButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                    }
                    // Set up the source of the button depending on what the user has selected on the HTML document
                    switch (buttonTextSource) {
                        case SigCaptX_Globals_1.textSource.UTF8:
                            this.okButton.buttonText = "好";
                            break;
                        case SigCaptX_Globals_1.textSource.REMOTE:
                            // Override the positions of the buttons when using images
                            this.okButton.xPos = "right";
                            this.okButton.yPos = "bottom";
                            this.okButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "Accept");
                            break;
                    }
                    // Set up the Clear button object
                    this.clearButton = new SigCaptX_Globals_2.ButtonObject("center", pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, SigCaptX_Globals_1.buttonEvent.CLEAR, "Clear");
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        this.clearButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                        this.clearButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                    }
                    // Set up the source of the button depending on what the user has selected on the HTML document
                    switch (buttonTextSource) {
                        case SigCaptX_Globals_1.textSource.UTF8:
                            this.clearButton.buttonText = "肃清";
                            break;
                        case SigCaptX_Globals_1.textSource.REMOTE:
                            // Override the positions of the buttons when using images
                            this.clearButton.xPos = "centre";
                            this.clearButton.yPos = "bottom";
                            this.clearButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "Clear");
                            break;
                    }
                    // Set up the Cancel button object
                    this.cancelButton = Display_Utils.setupCancelButton(pad, buttonTextSource, SigCaptX_Globals_2.buttonFunction.CANCEL);
                    this.signatureFontSize = pad.textSize;
                    // Finally add 2 objects which are specific to the 300
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300) {
                        this.line = new SigCaptX_Globals_2.RectangleObject(5, 15, pad.width - 3, 15, 1, SigCaptX_Globals_3.SOLIDLINE);
                        this.penSymbol = new SigCaptX_Globals_2.TextObject("\x3f", "right", 25, "WingDings", 30, false);
                    }
                }
                return Screen_Display3;
            }());
            exports_1("Screen_Display3", Screen_Display3);
            Display_Utils = /** @class */ (function () {
                function Display_Utils() {
                }
                // Function to set up the properties of the Next button 
                Display_Utils.setupNextButton = function (pad, buttonTextSource) {
                    // Set up the Next button object
                    var nextButton = new SigCaptX_Globals_2.ButtonObject(pad.xButtonRight, pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, SigCaptX_Globals_1.buttonEvent.NEXT, "Next");
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        nextButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                        nextButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                    }
                    // Set up the source of the button depending on what the user has selected on the HTML document
                    switch (buttonTextSource) {
                        case SigCaptX_Globals_1.textSource.UTF8:
                            nextButton.buttonText = "下一個";
                            break;
                        case SigCaptX_Globals_1.textSource.REMOTE:
                            // Override the positions of the buttons when using images
                            nextButton.xPos = "right";
                            nextButton.yPos = "bottom";
                            nextButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "RightArrow");
                            break;
                    }
                    return nextButton;
                };
                // Function to set up the properties of the Cancel button
                Display_Utils.setupCancelButton = function (pad, buttonTextSource, buttonFunc) {
                    var imageFilePrefix;
                    var cancelButton = new SigCaptX_Globals_2.ButtonObject(pad.xButtonLeft, pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, "Cancel", "Cancel");
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        cancelButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                        cancelButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                    }
                    if (buttonFunc == SigCaptX_Globals_2.buttonFunction.PREVIOUS) {
                        imageFilePrefix = "LeftArrow";
                    }
                    else {
                        imageFilePrefix = "Cancel";
                    }
                    // Set up the source of the button depending on what the user has selected on the HTML document
                    switch (buttonTextSource) {
                        case SigCaptX_Globals_1.textSource.UTF8:
                            cancelButton.buttonText = "取消";
                            break;
                        case SigCaptX_Globals_1.textSource.REMOTE:
                            // Override the positions of the buttons when using images
                            cancelButton.xPos = "left";
                            cancelButton.yPos = "bottom";
                            cancelButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, imageFilePrefix);
                            break;
                    }
                    return cancelButton;
                };
                // Function to set up the properties of the Previous button (arrow)
                Display_Utils.setupPreviousButton = function (pad, buttonTextSource) {
                    // Set up the Previous button object
                    var previousButton = new SigCaptX_Globals_2.ButtonObject(pad.xButtonLeft, pad.yButton, pad.font, pad.buttonSize, pad.buttonWidth, pad.buttonBold, SigCaptX_Globals_1.buttonEvent.CANCEL, "Previous");
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        previousButton.fontForeColor = SigCaptX_Globals_1.padColors.WHITE;
                        previousButton.fontBackColor = SigCaptX_Globals_1.padColors.PURPLE;
                    }
                    // Set up the source of the button depending on what the user has selected on the HTML document
                    switch (buttonTextSource) {
                        case SigCaptX_Globals_1.textSource.UTF8:
                            previousButton.buttonText = "取消";
                            break;
                        case SigCaptX_Globals_1.textSource.REMOTE:
                            // Override the positions of the buttons when using images
                            previousButton.xPos = "left";
                            previousButton.yPos = "bottom";
                            previousButton.imageFile = Display_Utils.setButtonImageFile(buttonTextSource, pad.range, "LeftArrow");
                            break;
                    }
                    return previousButton;
                };
                // Function to set up the properties of the text which prompts the user to press Next or right arrow to continue
                Display_Utils.setupContinueText = function (pad, buttonTextSource) {
                    var text;
                    var yPos;
                    if (buttonTextSource == SigCaptX_Globals_1.textSource.LOCAL || buttonTextSource == SigCaptX_Globals_1.textSource.REMOTE) {
                        text = "Press right arrow to continue";
                    }
                    else {
                        if (pad.range == SigCaptX_Globals_2.padRange.STU300) {
                            text = "Press Next to continue";
                        }
                        else {
                            text = "When you are ready press NEXT to continue";
                        }
                    }
                    if (pad.range == SigCaptX_Globals_2.padRange.STU300) {
                        yPos = "bottom";
                    }
                    else {
                        yPos = pad.height * 2 / 3;
                    }
                    var nextToContinue = new SigCaptX_Globals_2.TextObject(text, "center", yPos, "Verdana", pad.textSize, false);
                    // For the colour pads set up the font colours
                    if (pad.range == SigCaptX_Globals_2.padRange.STU5X0) {
                        nextToContinue.fontForeColor = SigCaptX_Globals_1.padColors.BLUE;
                        nextToContinue.fontBackColor = SigCaptX_Globals_1.padColors.WHITE;
                    }
                    /* The text of the "When ready press Next to continue" message varies depending on which pad is in use
                      (there is less space available on the 300) and whether the user has selected images for the
                        Next and Cancel buttons because the images are arrows, not words */
                    return nextToContinue;
                };
                // Function to define the image file which is used for a given button
                Display_Utils.setButtonImageFile = function (buttonTextSource, currentPadRange, imagePrefix) {
                    var filePath;
                    var imageFile;
                    filePath = SigCaptX_Globals_1.IMAGESDIR;
                    switch (currentPadRange) {
                        case SigCaptX_Globals_2.padRange.STU300:
                            imageFile = filePath + imagePrefix + "300.png";
                            break;
                        case SigCaptX_Globals_2.padRange.STU430:
                            imageFile = filePath + imagePrefix + "430.png";
                            break;
                        case SigCaptX_Globals_2.padRange.STU500:
                            imageFile = filePath + imagePrefix + "500.png";
                            break;
                        case SigCaptX_Globals_2.padRange.STU5X0:
                            imageFile = filePath + imagePrefix + "530.png";
                            break;
                    }
                    return imageFile;
                };
                return Display_Utils;
            }());
            exports_1("Display_Utils", Display_Utils);
        }
    };
});
