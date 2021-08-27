/* **************************************************************************
  SigCaptX-Wizard-Main.ts
   
  This file contains the main control functions for controlling the
  wizard session.

  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
System.register(["./SigCaptX-Globals", "./SigCaptX-WizUtils", "./SigCaptX-WizSessionCtrl", "./SigCaptX-Wizard-PadDefs"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_Globals_1, SigCaptX_WizUtils_1, SigCaptX_WizSessionCtrl_1, SigCaptX_Wizard_PadDefs_1, WizardScreens;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            },
            function (SigCaptX_WizUtils_1_1) {
                SigCaptX_WizUtils_1 = SigCaptX_WizUtils_1_1;
            },
            function (SigCaptX_WizSessionCtrl_1_1) {
                SigCaptX_WizSessionCtrl_1 = SigCaptX_WizSessionCtrl_1_1;
            },
            function (SigCaptX_Wizard_PadDefs_1_1) {
                SigCaptX_Wizard_PadDefs_1 = SigCaptX_Wizard_PadDefs_1_1;
            }
        ],
        execute: function () {/* **************************************************************************
              SigCaptX-Wizard-Main.ts
               
              This file contains the main control functions for controlling the
              wizard session.
            
              Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
              
              v1.0
              
            ***************************************************************************/
            WizardScreens = /** @class */ (function () {
                function WizardScreens(pad, buttonTextSource) {
                    var _this = this;
                    this.step1_onWizCtlReset = function (wizCtlV, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            SigCaptX_WizUtils_1.WizDisplay.setFont(_this.screen1.stepMsg1.fontName, _this.screen1.stepMsg1.fontSize, _this.screen1.stepMsg1.fontBold, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step1_onPutFontStepMsg1);
                        }
                        else {
                            SigCaptX_WizUtils_1.print("WizCtl Reset" + status);
                            if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                                SigCaptX_WizSessionCtrl_1.WizardEventController.actionWhenRestarted(_this.step1);
                            }
                        }
                    };
                    this.step1_onPutFontStepMsg1 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PutFontStepMsg1", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen1.stepMsg1, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step1_onAddTextStep1);
                        }
                    };
                    this.step1_onAddTextStep1 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addObject", status)) {
                            if (window.pad.range == "300") {
                                SigCaptX_WizUtils_1.WizDisplay.addLine(_this.screen1.step1Line, _this.step1_onAddRectangle);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addRectangle(_this.screen1.step1Rectangle, _this.step1_onAddRectangle);
                            }
                        }
                    };
                    this.step1_onAddRectangle = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl Primitive", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen1.infoText, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step1_onAddTextInfoText);
                        }
                    };
                    this.step1_onAddTextInfoText = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addTextInfoText", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setFont(_this.screen1.checkboxObj.fontName, _this.screen1.checkboxObj.fontSize, _this.screen1.checkboxObj.fontBold, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step1_onPutFontCheckbox);
                        }
                    };
                    this.step1_onPutFontCheckbox = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PutFontCheckbox", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addCheckBox(_this.screen1.checkboxObj.xPos, _this.screen1.checkboxObj.yPos, _this.screen1.checkboxObj.options, _this.step1_onAddCheck);
                        }
                    };
                    this.step1_onAddCheck = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddCheck", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen1.signingText, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step1_onAddTextSigningText);
                        }
                    };
                    this.step1_onAddTextSigningText = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addTextSigningText", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen1.nextToContinue, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step1_onAddTextNextCont);
                        }
                    };
                    this.step1_onAddTextNextCont = function (wizCtlV, status) {
                        //print("step1_onAddTextNextCont");
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addTextNextCont", status)) {
                            if (_this.buttonSource === SigCaptX_Globals_1.textSource.STANDARD) {
                                SigCaptX_WizUtils_1.WizDisplay.setupButtonObject(_this.screen1.cancelButton, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step1_onAddCancelButton);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addObjectImage(_this.screen1.cancelButton, _this.step1_onAddCancelButton, _this.screen1.cancelButton.imageFile);
                            }
                        }
                    };
                    this.step1_onAddCancelButton = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddCancelButton", status)) {
                            /* If the user has chosen to use images for the buttons then add the image object, otherwise a standard button object */
                            if (_this.buttonSource == SigCaptX_Globals_1.textSource.STANDARD) {
                                SigCaptX_WizUtils_1.WizDisplay.setupButtonObject(_this.screen1.nextButton, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step1_onAddNextButton);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addObjectImage(_this.screen1.nextButton, _this.step1_onAddNextButton, _this.buttonSource);
                            }
                        }
                    };
                    this.step1_onAddNextButton = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddNextButton", status)) {
                            window.wizCtl.Display(_this.step1_onDisplay);
                        }
                    };
                    this.step1_onDisplay = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl Display", status)) {
                            window.wizCtl.SetEventHandler(_this.step1_Handler);
                        }
                    };
                    /* This is the event handler for the user input on the first screen of the wizard */
                    this.step1_onGetObjectState = function (wizCtlV, objState, status) {
                        if (window.sdkPtr.VariantType.VARIANT_NUM == objState.type && 1 == objState.num) {
                            SigCaptX_WizUtils_1.print("Check box was selected");
                        }
                        _this.step2();
                    };
                    this.step1_Handler = function (ctl, id, type, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            switch (id) {
                                case SigCaptX_Globals_1.buttonEvent.NEXT:
                                    window.wizCtl.GetObjectState("Check", _this.step1_onGetObjectState);
                                    break;
                                case SigCaptX_Globals_1.buttonEvent.CHECK:
                                    break;
                                case SigCaptX_Globals_1.buttonEvent.CANCEL:
                                    SigCaptX_WizSessionCtrl_1.WizardEventController.script_Cancelled();
                                    break;
                                default:
                                    SigCaptX_WizUtils_1.print("Unexpected event: " + id);
                                    alert("Unexpected event: " + id);
                                    break;
                            }
                        }
                        else {
                            SigCaptX_WizUtils_1.print("Wizard window closed");
                            SigCaptX_WizSessionCtrl_1.WizardEventController.script_Cancelled();
                        }
                    };
                    /* The step2() is the controlling routine for setting up and displaying the objects
                      on the screen screen in the wizard sequence, i.e. the one with the radio buttons */
                    this.step2 = function () {
                        window.wizCtl.Reset(_this.step2_onWizCtlReset);
                    };
                    this.step2_onWizCtlReset = function (wizCtlV, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen2.stepMsg2, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step2_onAddText1);
                        }
                        else {
                            SigCaptX_WizUtils_1.print("WizCtl Reset" + status);
                            if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                                SigCaptX_WizSessionCtrl_1.WizardEventController.actionWhenRestarted(_this.step2);
                            }
                        }
                    };
                    this.step2_onAddText1 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addObject", status)) {
                            if (window.pad.range == SigCaptX_Globals_1.padRange.STU300) {
                                SigCaptX_WizUtils_1.WizDisplay.addLine(_this.screen2.step2Line, _this.step2_onAddPrimitive1);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addRectangle(_this.screen2.step2Rectangle, _this.step2_onAddPrimitive1);
                            }
                        }
                    };
                    this.step2_onAddPrimitive1 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl Primitive", status)) {
                            // Now add this text to the WizCtl: "Radio buttons provide options for the signing process and can be transferred to the document"
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen2.infoObject, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step2_onAddInfoObject);
                        }
                    };
                    this.step2_onAddInfoObject = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addInfoObject", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen2.nextToContinue, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step2_onAddNextToContinue);
                        }
                    };
                    this.step2_onAddNextToContinue = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addNextToContinue", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupRadio(_this.screen2.maleRadio, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step2_onAddRadioButton1);
                        }
                    };
                    this.step2_onAddRadioButton1 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addRadioButton1", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupRadio(_this.screen2.femaleRadio, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step2_onAddRadioButton2);
                        }
                    };
                    this.step2_onAddRadioButton2 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addRadioButton2", status)) {
                            if (_this.buttonSource == SigCaptX_Globals_1.textSource.STANDARD) {
                                SigCaptX_WizUtils_1.WizDisplay.setupButtonObject(_this.screen2.cancelButton, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step2_onAddCancelButton);
                            }
                            else {
                                //print("Adding button as an image from source " + buttonSource);
                                SigCaptX_WizUtils_1.WizDisplay.addObjectImage(_this.screen2.cancelButton, _this.step2_onAddCancelButton, _this.buttonSource);
                            }
                        }
                    };
                    this.step2_onAddCancelButton = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddCancelButton", status)) {
                            if (_this.buttonSource == SigCaptX_Globals_1.textSource.STANDARD) {
                                SigCaptX_WizUtils_1.WizDisplay.setupButtonObject(_this.screen2.nextButton, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step2_onAddNextButton);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addObjectImage(_this.screen2.nextButton, _this.step2_onAddNextButton, _this.buttonSource);
                            }
                        }
                    };
                    this.step2_onAddNextButton = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddNextButton", status)) {
                            window.wizCtl.Display(_this.step2_onDisplay);
                        }
                    };
                    this.step2_onDisplay = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl Display", status)) {
                            window.wizCtl.SetEventHandler(_this.step2_Handler);
                        }
                    };
                    /* This is the event handler for the user input on the second screen of the wizard */
                    this.step2_Handler = function (ctl, id, type, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            switch (id) {
                                case SigCaptX_Globals_1.buttonEvent.NEXT:
                                    _this.step3();
                                    break;
                                case SigCaptX_Globals_1.buttonEvent.CHECK:
                                    break;
                                case SigCaptX_Globals_1.buttonEvent.CANCEL:
                                    _this.step1();
                                    break;
                                case SigCaptX_Globals_1.radioSelection.MALE:
                                    break;
                                case SigCaptX_Globals_1.radioSelection.FEMALE:
                                    break;
                                default:
                                    SigCaptX_WizUtils_1.print("Unexpected event: " + id);
                                    alert("Unexpected event: " + id);
                                    break;
                            }
                        }
                        else {
                            SigCaptX_WizUtils_1.print("Wizard window closed");
                            SigCaptX_WizSessionCtrl_1.WizardEventController.script_Cancelled();
                        }
                    };
                    /* The this.step3() is the controlling routine for setting up and displaying the objects
                       on the third screen in the wizard sequence i.e. the signature capture itself.
                       The objects themselves are set up in SigCaptX-Wizard-PadDefs.js */
                    this.step3 = function () {
                        window.wizCtl.Reset(_this.step3_onWizCtlReset);
                    };
                    this.step3_onWizCtlReset = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl Reset", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen3.stepMsg3, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_onAddStepMsg);
                        }
                    };
                    this.step3_onAddStepMsg = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addText1", status)) {
                            /* Because of the very different dimensions of the STU 300 we have to have use a different layout for the buttons and text etc
                               so there are separate routines just for the 300 */
                            if (SigCaptX_Globals_1.padType.STU300 == window.pad.type) {
                                _this.step3_isSTU300();
                            }
                            else {
                                _this.step3_notSTU300();
                            }
                        }
                    };
                    this.step3_notSTU300 = function () {
                        SigCaptX_WizUtils_1.WizDisplay.addRectangle(_this.screen3.step3Rectangle, _this.step3_onAddPrimitive1);
                    };
                    this.step3_onAddPrimitive1 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPrimitive", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen3.pleaseSign, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_onAddPleaseSign);
                        }
                    };
                    this.step3_onAddPleaseSign = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addPleaseSign", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen3.XMark, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_onAddTextXMark);
                        }
                    };
                    this.step3_onAddTextXMark = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addTextXMark", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen3.sigMarkerLine, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_onAddMarkerLine);
                        }
                    };
                    this.step3_onAddMarkerLine = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddMarkerLine", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setFont(window.pad.font, _this.screen3.signatureFontSize, window.pad.textBold, false, _this.step3_onPutSignatureFont);
                        }
                    };
                    this.step3_onPutSignatureFont = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PutSignatureFont", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addSignatureObject(window.sigCtl, _this.step3_onAddSignature);
                        }
                    };
                    this.step3_onAddSignature = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addSignature", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen3.why, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_onAddWhy);
                        }
                    };
                    this.step3_onAddWhy = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl  WizDisplay.addWhy", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen3.who, SigCaptX_Globals_1.DONTSETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_onAddWho);
                        }
                    };
                    this.step3_onAddWho = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddWho", status)) {
                            if (_this.buttonSource == SigCaptX_Globals_1.textSource.STANDARD) {
                                SigCaptX_WizUtils_1.WizDisplay.setupButtonObject(_this.screen3.okButton, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_onAddOK);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addObjectImage(_this.screen3.okButton, _this.step3_onAddOK, _this.buttonSource);
                            }
                        }
                    };
                    this.step3_onAddOK = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddOK", status)) {
                            if (_this.buttonSource == SigCaptX_Globals_1.textSource.STANDARD) {
                                SigCaptX_WizUtils_1.WizDisplay.setupButtonObject(_this.screen3.clearButton, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_onAddClear);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addObjectImage(_this.screen3.clearButton, _this.step3_onAddClear, _this.buttonSource);
                            }
                        }
                    };
                    this.step3_onAddClear = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddClear", status)) {
                            if (_this.buttonSource == SigCaptX_Globals_1.textSource.STANDARD) {
                                SigCaptX_WizUtils_1.WizDisplay.setupButtonObject(_this.screen3.cancelButton, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.DONTUSEWINGDINGS, _this.step3_doDisplay);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addObjectImage(_this.screen3.cancelButton, _this.step3_doDisplay, _this.buttonSource);
                            }
                        }
                    };
                    // The following group of functions are only applicable to the STU 300 
                    this.step3_isSTU300 = function () {
                        SigCaptX_WizUtils_1.WizDisplay.addLine(_this.screen3.line, _this.step3_onAddPrimitiveSTU300);
                    };
                    // STU 300
                    this.step3_onAddPrimitiveSTU300 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPrimitiveSTU300", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setFont(_this.screen3.penSymbol.fontName, _this.screen3.penSymbol.fontSize, window.pad.textBold, 2, _this.step3_onPutFontPenSymbol);
                        }
                    };
                    // STU 300
                    this.step3_onPutFontPenSymbol = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PutFontPenSymbol", status)) {
                            window.wizCtl.GetFont(_this.step3_onGetFontSTU300);
                        }
                    };
                    // STU 300
                    this.step3_onGetFontSTU300 = function (wizCtlV, font, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl GetFontSTU300", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setupTextObject(_this.screen3.penSymbol, SigCaptX_Globals_1.SETFONT, SigCaptX_Globals_1.USEWINGDINGS, _this.step3_onAddText1STU300);
                        }
                    };
                    // STU 300
                    this.step3_onAddText1STU300 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addText1STU300", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.setFont(window.pad.font, window.pad.signatureFontSize, window.sdkPtr.FontWeight.FW_NORMAL, false, _this.step3_onPutSignatureFont);
                        }
                    };
                    // end of STU300 functions
                    // These next 2 functions are called regardless of the STU currently in use
                    this.step3_doDisplay = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddCancelButton", status)) {
                            window.wizCtl.Display(_this.step3_onDisplay);
                        }
                    };
                    this.step3_onDisplay = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl Display", status)) {
                            window.wizCtl.SetEventHandler(_this.step3_Handler);
                        }
                    };
                    /* This is the event handler for the user input on the third screen of the wizard i.e. signature capture*/
                    this.step3_Handler = function (ctl, id, type, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            switch (id) {
                                case SigCaptX_Globals_1.buttonEvent.OK:
                                    SigCaptX_WizUtils_1.print("OK selected");
                                    SigCaptX_WizSessionCtrl_1.WizardEventController.script_Completed(false);
                                    break;
                                case SigCaptX_Globals_1.buttonEvent.CLEAR:
                                    SigCaptX_WizUtils_1.print("Clear");
                                    break;
                                case SigCaptX_Globals_1.buttonEvent.CANCEL:
                                    SigCaptX_WizUtils_1.print("Previous");
                                    SigCaptX_WizSessionCtrl_1.WizardEventController.script_Cancelled();
                                    break;
                                default:
                                    alert("Unexpected event: " + id);
                                    break;
                            }
                        }
                        else {
                            SigCaptX_WizUtils_1.print("Wizard window closed");
                            SigCaptX_WizSessionCtrl_1.WizardEventController.script_Cancelled();
                        }
                    };
                    this.buttonSource = SigCaptX_WizUtils_1.getButtonSourceFromHTMLDoc();
                    this.screen1 = new SigCaptX_Wizard_PadDefs_1.Screen_Display1(pad, buttonTextSource);
                    this.screen2 = new SigCaptX_Wizard_PadDefs_1.Screen_Display2(pad, buttonTextSource);
                    this.screen3 = new SigCaptX_Wizard_PadDefs_1.Screen_Display3(pad, buttonTextSource);
                }
                WizardScreens.prototype.step1 = function () {
                    window.wizCtl.Reset(this.step1_onWizCtlReset);
                };
                return WizardScreens;
            }());
            exports_1("WizardScreens", WizardScreens);
        }
    };
});
