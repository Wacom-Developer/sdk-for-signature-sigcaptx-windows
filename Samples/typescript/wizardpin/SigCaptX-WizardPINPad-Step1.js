System.register(["./SigCaptX-WizUtils", "./SigCaptX-Globals", "./SigCaptX-WizSessionCtrl", "./SigCaptX-WizardPINPad-PadDefs"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_WizUtils_1, SigCaptX_Globals_1, SigCaptX_WizSessionCtrl_1, SigCaptX_WizardPINPad_PadDefs_1, PINScreen;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SigCaptX_WizUtils_1_1) {
                SigCaptX_WizUtils_1 = SigCaptX_WizUtils_1_1;
            },
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            },
            function (SigCaptX_WizSessionCtrl_1_1) {
                SigCaptX_WizSessionCtrl_1 = SigCaptX_WizSessionCtrl_1_1;
            },
            function (SigCaptX_WizardPINPad_PadDefs_1_1) {
                SigCaptX_WizardPINPad_PadDefs_1 = SigCaptX_WizardPINPad_PadDefs_1_1;
            }
        ],
        execute: function () {
            PINScreen = /** @class */ (function () {
                function PINScreen(pad) {
                    var _this = this;
                    this.step1 = function () {
                        window.wizCtl.Reset(_this.step1_onWizCtlReset);
                    };
                    this.step1_onWizCtlReset = function (wizCtlV, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            SigCaptX_WizUtils_1.WizDisplay.setFont(_this.screen.enterBelow.fontName, _this.screen.enterBelow.fontSize, _this.screen.enterBelow.fontBold, false, _this.onPutFontEnterBelow);
                        }
                        else {
                            if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                                SigCaptX_WizSessionCtrl_1.WizardEventController.actionWhenRestarted(window.step1);
                            }
                        }
                    };
                    /* Add the text object "Enter a 4 digit PIN code below...." */
                    this.onPutFontEnterBelow = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PutFontEnterBelow", status)) {
                            // If font colour is required do it now
                            if (_this.screen.enterBelow.fontForeColor != null && _this.screen.enterBelow.fontForeColor != "") {
                                SigCaptX_WizUtils_1.WizDisplay.setFontForeColor(_this.screen.enterBelow.fontForeColor, _this.step1_onSetFontForeColorEnterBelow);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addTextObject(_this.screen.enterBelow, _this.step1_onAddEnterBelow);
                            }
                        }
                    };
                    this.step1_onSetFontForeColorEnterBelow = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.setFontForeColorEnterBelow", status)) {
                            // If a foreground colour has been set then we assume a background colour must also be required
                            SigCaptX_WizUtils_1.WizDisplay.setFontBackColor(_this.screen.enterBelow.fontBackColor, _this.step1_onSetFontBackColorEnterBelow);
                        }
                    };
                    this.step1_onSetFontBackColorEnterBelow = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.setFontBackColorEnterBelow", status)) {
                            // After setting up the font colours set up the text string itself
                            SigCaptX_WizUtils_1.WizDisplay.addTextObject(_this.screen.enterBelow, _this.step1_onAddEnterBelow);
                        }
                    };
                    /* Next 9 functions - add the buttons for the 9 PINs */
                    this.step1_onAddEnterBelow = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl step1 AddEnterBelow", status)) {
                            // If font colour is required do it now
                            if (_this.screen.pin1.fontForeColor != null && _this.screen.pin1.fontForeColor != "") {
                                SigCaptX_WizUtils_1.WizDisplay.setFontForeColor(_this.screen.pin1.fontForeColor, _this.step1_onSetFontForeColorPin1);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin1, _this.step1_onAddPin1Button);
                            }
                        }
                    };
                    this.step1_onSetFontForeColorPin1 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.setFontForeColorPin1", status)) {
                            // If a foreground colour has been set then we assume a background colour must also be required
                            SigCaptX_WizUtils_1.WizDisplay.setFontBackColor(_this.screen.pin1.fontBackColor, _this.step1_onSetFontBackColorPin1);
                        }
                    };
                    this.step1_onSetFontBackColorPin1 = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.setFontBackColorPin1", status)) {
                            // After setting up the font colours set up the text string itself
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin1, _this.step1_onAddPin1Button);
                        }
                    };
                    this.step1_onAddPin1Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PutFontEnterBelow", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin2, _this.onAddPin2Button);
                        }
                    };
                    this.onAddPin2Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPin2Button", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin3, _this.onAddPin3Button);
                        }
                    };
                    this.onAddPin3Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPin3Button", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin4, _this.onAddPin4Button);
                        }
                    };
                    this.onAddPin4Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPin4Button", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin5, _this.onAddPin5Button);
                        }
                    };
                    this.onAddPin5Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPin5Button", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin6, _this.onAddPin6Button);
                        }
                    };
                    this.onAddPin6Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPin6Button", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin7, _this.onAddPin7Button);
                        }
                    };
                    this.onAddPin7Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPin7Button", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin8, _this.onAddPin8Button);
                        }
                    };
                    this.onAddPin8Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPin8Button", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.pin9, _this.onAddPin9Button);
                        }
                    };
                    /* Next create the input object for accepting the input from the user */
                    this.onAddPin9Button = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddPin9Button", status)) {
                            window.inputObj = new window.sdkPtr.InputObj(_this.onInputObjCtr);
                        }
                    };
                    this.onInputObjCtr = function (inputObjV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("InputObj constructor", status)) {
                            window.inputObj.PutMinLength(SigCaptX_Globals_1.PIN_MINLENGTH, _this.onInputObjMinLen);
                        }
                    };
                    /* The input obj has a minimum and maximum length */
                    this.onInputObjMinLen = function (inputObjV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("InputObj PutMinLength", status)) {
                            window.inputObj.PutMaxLength(SigCaptX_Globals_1.PIN_MAXLENGTH, _this.onInputObjMaxLen);
                        }
                    };
                    this.onInputObjMaxLen = function (inputObjV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("InputObj PutMaxLength", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addInputObject(window.inputObj, _this.onAddObjectInput);
                        }
                    };
                    /* Now add the input echo object */
                    this.onAddObjectInput = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addInputObj", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addInputObjectEcho("centre", _this.screen.yInputEcho, _this.onAddObjectInputEcho);
                        }
                    };
                    /* Finally add the Next and Cancel buttons */
                    this.onAddObjectInputEcho = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.addInputEcho", status)) {
                            // If font colour is required do it now
                            if (_this.screen.cancelButton.fontForeColor != null && _this.screen.cancelButton.fontForeColor != "") {
                                SigCaptX_WizUtils_1.WizDisplay.setFontForeColor(_this.screen.cancelButton.fontForeColor, _this.step1_onSetFontForeColorCancelButton);
                            }
                            else {
                                SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.cancelButton, _this.step1_onAddCancelButton);
                            }
                        }
                    };
                    this.step1_onSetFontForeColorCancelButton = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.setFontForeColorCancelButton", status)) {
                            // If a foreground colour has been set then we assume a background colour must also be required
                            SigCaptX_WizUtils_1.WizDisplay.setFontBackColor(_this.screen.cancelButton.fontBackColor, _this.step1_onSetFontBackColorCancelButton);
                        }
                    };
                    this.step1_onSetFontBackColorCancelButton = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl WizDisplay.setFontBackColorCancelButton", status)) {
                            // After setting up the font colours set up the text string itself
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.cancelButton, _this.step1_onAddCancelButton);
                        }
                    };
                    this.step1_onAddCancelButton = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddCancelButtno", status)) {
                            SigCaptX_WizUtils_1.WizDisplay.addButtonObject(_this.screen.nextButton, _this.onAddNextButton);
                        }
                    };
                    this.onAddNextButton = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl AddNextButton", status)) {
                            window.wizCtl.Display(_this.onDisplay);
                        }
                    };
                    this.onDisplay = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl Display", status)) {
                            window.wizCtl.SetEventHandler(_this.step1_Handler);
                        }
                    };
                    /* Thishandles the events generated by the user input on the pad */
                    this.step1_Handler = function (ctl, id, type, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            switch (id) {
                                case "input":
                                    switch (type) {
                                        case 4:
                                            break; //print("min chars entered")
                                        case 5:
                                            break; //print("max chars entered")
                                        case 6:
                                            break; //print("attempted to exceed min/max chars")
                                        default:
                                            SigCaptX_WizUtils_1.print("Input unexpected type: " + type);
                                            break;
                                    }
                                    break;
                                case SigCaptX_Globals_1.buttonEvent.CLEAR:
                                    break; // handled by the InputObj control
                                case SigCaptX_Globals_1.buttonEvent.OK:
                                    window.inputObj.GetText(_this.onInputObjGetText);
                                    break;
                                case SigCaptX_Globals_1.buttonEvent.CANCEL:
                                    SigCaptX_WizUtils_1.print("Cancel");
                                    SigCaptX_WizSessionCtrl_1.WizardEventController.script_Completed(true);
                                    break;
                                default:
                                    SigCaptX_WizUtils_1.print("Exception: step1_Handler(): " + "unexpected event: " + id);
                                    break;
                            }
                        }
                        else {
                            SigCaptX_WizUtils_1.print("Wizard window closed");
                            SigCaptX_WizSessionCtrl_1.WizardEventController.script_Cancelled();
                        }
                    };
                    /* Called when user clicks OK to signify that PIN input is complete */
                    this.onInputObjGetText = function (inputObjV, text, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            SigCaptX_WizUtils_1.print("Code entered: " + text);
                            SigCaptX_WizSessionCtrl_1.WizardEventController.script_Completed(true);
                        }
                        else {
                            SigCaptX_WizUtils_1.print("InputObj GetText error: " + status);
                            SigCaptX_WizSessionCtrl_1.WizardEventController.script_Cancelled();
                        }
                    };
                    this.screen = new SigCaptX_WizardPINPad_PadDefs_1.Screen_Display1(pad);
                }
                return PINScreen;
            }());
            exports_1("PINScreen", PINScreen);
        }
    };
});
