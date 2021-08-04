System.register(["./SigCaptX-WizUtils", "./SigCaptX-Globals", "./SigCaptX-WizardPINPad-PadDefs", "./SigCaptX-WizardPINPad-Step1"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_WizUtils_1, SigCaptX_Globals_1, SigCaptX_WizardPINPad_PadDefs_1, SigCaptX_WizardPINPad_Step1_1, WizardEventController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SigCaptX_WizUtils_1_1) {
                SigCaptX_WizUtils_1 = SigCaptX_WizUtils_1_1;
            },
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            },
            function (SigCaptX_WizardPINPad_PadDefs_1_1) {
                SigCaptX_WizardPINPad_PadDefs_1 = SigCaptX_WizardPINPad_PadDefs_1_1;
            },
            function (SigCaptX_WizardPINPad_Step1_1_1) {
                SigCaptX_WizardPINPad_Step1_1 = SigCaptX_WizardPINPad_Step1_1_1;
            }
        ],
        execute: function () {
            WizardEventController = /** @class */ (function () {
                function WizardEventController() {
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
                    window.sigCtl = null;
                    window.wizCtl = null;
                    window.pad = null;
                    var imageBox = document.getElementById("imageBox");
                    if (null != imageBox.firstChild) {
                        imageBox.removeChild(imageBox.firstChild);
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
                        var visible = (true == document.getElementById("chkDisplayWizard").checked);
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
                        var visible = (true == document.getElementById("chkDisplayWizard").checked);
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
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        window.pad = new SigCaptX_WizardPINPad_PadDefs_1.PadControl(window.width, padHeight); // See SigCaptX-WizardPINPad-PadDefs
                        var wizardScreenSequence = new SigCaptX_WizardPINPad_Step1_1.PINScreen(window.pad);
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
                WizardEventController.start_onSigCtlPutLicence = function (sigCtlV, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        sigCtlV.GetProperty("Component_FileVersion", WizardEventController.start_onSigCtlGetFileVersion);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("SigCtl constructor error: " + status);
                    }
                };
                WizardEventController.start_onSigCtlGetFileVersion = function (sigCtlV, property, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        SigCaptX_WizUtils_1.print("DLL: flSigCOM.dll  v" + property.text);
                        window.wizCtl = new window.sdkPtr.WizCtl(WizardEventController.start_onWizCtlConstructor);
                    }
                    else {
                        SigCaptX_WizUtils_1.print("SigCtl GetProperty error: " + status);
                    }
                };
                WizardEventController.start_onWizCtlConstructor = function (wizCtlV, status) {
                    if (SigCaptX_WizUtils_1.callbackStatusOK("WizCtl constructor", status)) {
                        wizCtlV.GetProperty("Component_FileVersion", WizardEventController.start_onWizCtlGetFileVersion);
                    }
                };
                WizardEventController.start_onWizCtlGetFileVersion = function (WizCtlV, property, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        SigCaptX_WizUtils_1.print("DLL: flWizCOM.dll v" + property.text);
                        SigCaptX_WizUtils_1.print("Test application ready.");
                        SigCaptX_WizUtils_1.print("Press 'Start Wizard' to capture a signature.");
                    }
                    else {
                        SigCaptX_WizUtils_1.print("WizCtl GetProperty error: " + status);
                    }
                };
                // called to stop the wizard script
                WizardEventController.stopScript = function () {
                    window.scriptIsRunning = false;
                    document.getElementById("btnStartStopWizard").value = "Start Wizard";
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
