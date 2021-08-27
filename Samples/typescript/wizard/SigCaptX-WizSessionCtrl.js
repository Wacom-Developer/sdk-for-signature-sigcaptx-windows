System.register(["./SigCaptX-WizUtils", "./SigCaptX-Globals", "./SigCaptX-Wizard-PadDefs", "./SigCaptX-Wizard-Main.js", "./sigcaptx"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_WizUtils_1, SigCaptX_Globals_1, SigCaptX_Wizard_PadDefs_1, SigCaptX_Wizard_Main_js_1, sigcaptx_1, WizardEventController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SigCaptX_WizUtils_1_1) {
                SigCaptX_WizUtils_1 = SigCaptX_WizUtils_1_1;
            },
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            },
            function (SigCaptX_Wizard_PadDefs_1_1) {
                SigCaptX_Wizard_PadDefs_1 = SigCaptX_Wizard_PadDefs_1_1;
            },
            function (SigCaptX_Wizard_Main_js_1_1) {
                SigCaptX_Wizard_Main_js_1 = SigCaptX_Wizard_Main_js_1_1;
            },
            function (sigcaptx_1_1) {
                sigcaptx_1 = sigcaptx_1_1;
            }
        ],
        execute: function () {
            WizardEventController = /** @class */ (function () {
                function WizardEventController() {
                    this.start_onWizCtlConstructor = function (wizCtlV, status) {
                        if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl constructor", status)) {
                            window.sigCtl.GetSignature(WizardEventController.start_onGetSignature);
                        }
                    };
                }
                WizardEventController.body_onload = function () {
                    SigCaptX_WizUtils_1.clearTextBox();
                    WizardEventController.actionWhenRestarted();
                };
                WizardEventController.start_stop = function (numScreens) {
                    if (window.scriptIsRunning) {
                        WizardEventController.stop();
                    }
                    else {
                        WizardEventController.wizardStart(numScreens);
                    }
                };
                WizardEventController.stop = function () {
                    if (!window.scriptIsRunning) {
                        SigCaptX_WizUtils_1.print("Script not running");
                    }
                    else {
                        WizardEventController.stopScript();
                    }
                };
                WizardEventController.script_Completed = function (stopScriptNow) {
                    SigCaptX_WizUtils_1.print("Script completed");
                    if (stopScriptNow) {
                        WizardEventController.stopScript();
                    }
                    else {
                        SigCaptX_WizUtils_1.showSignature();
                    }
                };
                WizardEventController.script_Cancelled = function () {
                    SigCaptX_WizUtils_1.print("Script cancelled");
                    WizardEventController.stop();
                };
                // called to start off the wizard session
                WizardEventController.wizardStart = function (numScreens) {
                    window.numScreenDisplays = numScreens;
                    if (!window.sdkPtr.running) {
                        SigCaptX_WizUtils_1.print("Session error. Restarting the session.");
                        WizardEventController.actionWhenRestarted(WizardEventController.wizardStart);
                        return;
                    }
                    if (null != window.wizCtl) {
                        window.wizCtl.Close(WizardEventController.onWizClose);
                        return;
                    }
                    WizardEventController.start_wizard();
                };
                WizardEventController.onWizClose = function (wizCtlV, status) {
                    if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                        SigCaptX_WizUtils_1.print("Session error. Restarting the session.");
                        WizardEventController.actionWhenRestarted(WizardEventController.wizardStart);
                    }
                    else {
                        window.wizCtl = null;
                        WizardEventController.start_wizard();
                    }
                };
                WizardEventController.start_wizard = function () {
                    window.scriptIsRunning = true;
                    window.wizCtl = new window.sdkPtr.WizCtl(WizardEventController.onWizCtlConstructor);
                };
                /* This is called if connection with the SigCaptX service has to be re-initiated because for whatever reason it has stopped or failed */
                WizardEventController.actionWhenRestarted = function (callback) {
                    window.sigObj = null;
                    window.sigCtl = null;
                    window.dynCapt = null;
                    window.wizCtl = null;
                    window.pad = null;
                    if (null != sigcaptx_1.HTMLTags.imageBox.firstChild) {
                        sigcaptx_1.HTMLTags.imageBox.removeChild(sigcaptx_1.HTMLTags.imageBox.firstChild);
                    }
                    // pass the starting service port  number as configured in the registry
                    console.log("Starting up WacomGSS_SignatureSDK");
                    var wgssSignatureSDK = new WacomGSS_SignatureSDK(WizardEventController.onDetectRunning, SigCaptX_Globals_1.SERVICEPORT);
                };
                WizardEventController.timedDetect = function () {
                    if (window.sdkPtr.running) {
                        SigCaptX_WizUtils_1.print("Signature SDK Service detected.");
                        WizardEventController.start();
                    }
                    else {
                        SigCaptX_WizUtils_1.print("Signature SDK Service not detected.");
                    }
                };
                WizardEventController.onWizCtlConstructor = function (wizCtlV, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        var visible = (true == sigcaptx_1.HTMLTags.chkDisplayWizard.checked);
                        SigCaptX_WizUtils_1.print("Enabling licence");
                        window.wizCtl.PutLicence(SigCaptX_Globals_1.LICENCEKEY, WizardEventController.onWizCtlPutLicence);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("WizCtl Constructor error: " + status);
                        window.wizCtl = null;
                        if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                            SigCaptX_WizUtils_1.print("Session error. Restarting the session.");
                            WizardEventController.actionWhenRestarted(WizardEventController.wizardStart);
                        }
                    }
                };
                WizardEventController.onWizCtlPutLicence = function (sigCtlV, status) {
                    if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PutLicence", status) == true) {
                        //print("License set OK - now checking chkDisplayWizard");
                        var visible = (true == sigcaptx_1.HTMLTags.chkDisplayWizard.checked);
                        window.wizCtl.PutVisibleWindow(visible, WizardEventController.onPutVisibleWindow);
                    }
                };
                WizardEventController.onPutVisibleWindow = function (wizCtlV, status) {
                    if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PutVisibleWindow", status) == true) {
                        window.wizCtl.PadConnect(WizardEventController.onPadConnect);
                    }
                };
                WizardEventController.onPadConnect = function (wizCtlV, connected, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status && connected) {
                        window.wizCtl.GetPadWidth(WizardEventController.onGetPadWidth);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("Unable to make connection to the Pad. Check it is plugged in and try again.");
                        window.wizCtl.Close(WizardEventController.onErrorClose);
                    }
                };
                WizardEventController.onErrorClose = function (wizCtlG, status) {
                    window.wizCtl = null;
                };
                WizardEventController.onGetPadWidth = function (wizCtlV, padWidth, status) {
                    if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl GetPadWidth", status) == true) {
                        window.width = padWidth;
                        window.wizCtl.GetPadHeight(WizardEventController.onGetPadHeight);
                    }
                };
                WizardEventController.onGetPadHeight = function (wizCtlV, padHeight, status) {
                    var buttonTextSource;
                    var chkBoxSize;
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        /* If the user wants a large check box pass this as a parameter to CPad_STU in SigCaptX-Wizard-PadDefs.js */
                        /* Note that this code is also used by the PIN pad sample which doesn't have the user options so make sure
                            the tags exist first */
                        if (sigcaptx_1.HTMLTags.chkLargeCheckbox != null) {
                            if (sigcaptx_1.HTMLTags.chkLargeCheckbox.checked) {
                                chkBoxSize = SigCaptX_Globals_1.checkSizeSelection.LARGE;
                            }
                            else {
                                chkBoxSize = SigCaptX_Globals_1.checkSizeSelection.STANDARD;
                            }
                        }
                        /* Decide what parameter to pass to Screen1() in SigCaptX-WizardCheckbox-PadDefs.js
                            This depends on what the user has selected on the HTML form. Make sure the tags exist first */
                        if (sigcaptx_1.HTMLTags.utf8ButtonText != null) {
                            if (sigcaptx_1.HTMLTags.utf8ButtonText.checked) {
                                buttonTextSource = SigCaptX_Globals_1.textSource.UTF8;
                            }
                            else {
                                if (sigcaptx_1.HTMLTags.remoteImages.checked) {
                                    buttonTextSource = SigCaptX_Globals_1.textSource.REMOTE;
                                }
                                else {
                                    buttonTextSource = SigCaptX_Globals_1.textSource.STANDARD;
                                }
                            }
                        }
                        window.pad = new SigCaptX_Wizard_PadDefs_1.PadControl(window.width, padHeight, chkBoxSize, window.numScreenDisplays, buttonTextSource);
                        //print("Calling screen1 with button source " + buttonTextSource);
                        var wizardScreenSequence = new SigCaptX_Wizard_Main_js_1.WizardScreens(window.pad, buttonTextSource);
                        wizardScreenSequence.step1();
                    }
                    else {
                        SigCaptX_WizUtils_1.print("WizCtl PutVisibleWindow error: " + status);
                    }
                };
                WizardEventController.onDetectRunning = function () {
                    if (window.sdkPtr.running) {
                        SigCaptX_WizUtils_1.print("Signature SDK Service detected.");
                        //clearTimeout(timeout);
                        SigCaptX_WizUtils_1.print("Starting...");
                        WizardEventController.start();
                    }
                    else {
                        SigCaptX_WizUtils_1.print("Signature SDK Service not detected.");
                    }
                };
                WizardEventController.start = function () {
                    if (window.sdkPtr.running) {
                        SigCaptX_WizUtils_1.print("Checking components ...");
                        window.sigCtl = new window.sdkPtr.SigCtl(WizardEventController.start_onSigCtlConstructor);
                    }
                };
                WizardEventController.start_onSigCtlConstructor = function (sigCtlV, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        sigCtlV.PutLicence(SigCaptX_Globals_1.LICENCEKEY, WizardEventController.start_onSigCtlPutLicence);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("SigCtl constructor error: " + status);
                    }
                };
                WizardEventController.start_onDynCaptConstructor = function (dynCaptV, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        window.sigCtl.GetSignature(WizardEventController.start_onGetSignature);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("DynCapt constructor error: " + status);
                    }
                };
                WizardEventController.start_onSigCtlPutLicence = function (sigCtlV, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        window.dynCapt = new window.sdkPtr.DynamicCapture(WizardEventController.start_onDynCaptConstructor);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("SigCtl constructor error: " + status);
                    }
                };
                WizardEventController.start_onGetSignature = function (sigCtlV, sigObjV, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        window.sigObj = sigObjV;
                        sigCtlV.GetProperty("Component_FileVersion", WizardEventController.start_onSigCtlGetFileVersion);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("SigCapt GetSignature error: " + status);
                    }
                };
                WizardEventController.start_onGetSigCaptXVersion = function (version, status) {
                    if (SigCaptX_WizUtils_1.callbackStatusOK("SigCaptX GetVersion", status)) {
                        SigCaptX_WizUtils_1.print("SigCaptX  v" + version);
                        window.sigCtl.GetProperty("Component_FileVersion", WizardEventController.start_onSigCtlGetFileVersion);
                    }
                };
                WizardEventController.start_onSigCtlGetFileVersion = function (sigCtlV, property, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        SigCaptX_WizUtils_1.print("DLL: flSigCOM.dll  v" + property.text);
                        window.dynCapt.GetProperty("Component_FileVersion", WizardEventController.start_onDynCaptGetFileVersion);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("SigCtl GetProperty error: " + status);
                    }
                };
                WizardEventController.start_onDynCaptGetFileVersion = function (dynCaptV, property, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        SigCaptX_WizUtils_1.print("DLL: flSigCapt.dll v" + property.text);
                        SigCaptX_WizUtils_1.print("Test application ready.");
                        SigCaptX_WizUtils_1.print("Press 'Start Wizard' to capture a signature.");
                    }
                    else {
                        SigCaptX_WizUtils_1.print("DynCapt GetProperty error: " + status);
                    }
                };
                // called to stop the wizard script
                WizardEventController.stopScript = function () {
                    window.scriptIsRunning = false;
                    sigcaptx_1.HTMLTags.btnStartStop.value = "Start Wizard";
                    if (null != window.wizCtl) {
                        window.wizCtl.Reset(WizardEventController.onReset);
                    }
                };
                WizardEventController.onReset = function (wizCtlV, status) {
                    if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl Reset", status)) {
                        window.wizCtl.Close(WizardEventController.onClose);
                    }
                };
                WizardEventController.onClose = function (wizCtlV, status) {
                    if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl PadDisconnect", status)) {
                        window.wizCtl = null;
                        SigCaptX_WizUtils_1.print("Pad disconnected");
                    }
                };
                return WizardEventController;
            }());
            exports_1("WizardEventController", WizardEventController);
        }
    };
});
