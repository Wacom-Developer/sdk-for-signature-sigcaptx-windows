System.register(["./SigCaptX-Globals", "./sigcaptx"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_Globals_1, sigcaptx_1, SessionControl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            },
            function (sigcaptx_1_1) {
                sigcaptx_1 = sigcaptx_1_1;
            }
        ],
        execute: function () {
            SessionControl = /** @class */ (function () {
                function SessionControl() {
                }
                /* This static is called if connection with the SigCaptX service has to be re-initiated because for whatever reason it has stopped or failed */
                SessionControl.actionWhenRestarted = function () {
                    sigcaptx_1.SigCapture.sigCtl = null;
                    sigcaptx_1.SigCapture.dynCapt = null;
                    if (null != sigcaptx_1.HTMLTags.imageBox.firstChild) {
                        sigcaptx_1.HTMLTags.imageBox.removeChild(sigcaptx_1.HTMLTags.imageBox.firstChild);
                    }
                    //let timeout = setTimeout(timedDetect, TIMEOUT);
                    // pass the starting service port  number as configured in the registry
                    console.log("Starting up WacomGSS_SignatureSDK");
                    var wgssSignatureSDK = new WacomGSS_SignatureSDK(SessionControl.onDetectRunning, SigCaptX_Globals_1.SERVICEPORT);
                    window.sdkPtr = wgssSignatureSDK;
                };
                SessionControl.timedDetect = function () {
                    if (window.sdkPtr.running) {
                        sigcaptx_1.Utils.print("Signature SDK Service detected.");
                        SessionControl.start();
                    }
                    else {
                        sigcaptx_1.Utils.print("Signature SDK Service not detected.");
                    }
                };
                SessionControl.onDetectRunning = function () {
                    if (window.sdkPtr.running) {
                        sigcaptx_1.Utils.print("Signature SDK Service detected.");
                        //clearTimeout(timeout);
                        sigcaptx_1.Utils.print("Starting...");
                        SessionControl.start();
                    }
                    else {
                        sigcaptx_1.Utils.print("Signature SDK Service not detected.");
                    }
                };
                SessionControl.start = function () {
                    //print("checking if SDK is running: " + wgssSignatureSDK.running);
                    if (window.sdkPtr.running) {
                        sigcaptx_1.Utils.print("Checking components ...");
                        sigcaptx_1.SigCapture.sigCtl = new window.sdkPtr.SigCtl(SessionControl.onSigCtlConstructor);
                    }
                };
                SessionControl.onSigCtlConstructor = function (sigCtlV, status) {
                    if (sigcaptx_1.Utils.callbackStatusOK("SigCtl Constructor", status)) {
                        sigCtlV.PutLicence(SigCaptX_Globals_1.LICENCEKEY, SessionControl.onSigCtlPutLicence);
                    }
                };
                SessionControl.onDynCaptConstructor = function (dynCaptV, status) {
                    if (sigcaptx_1.Utils.callbackStatusOK("DynCapt Constructor", status)) {
                        sigcaptx_1.SigCapture.sigCtl.GetSignature(SessionControl.onGetSignature);
                    }
                };
                SessionControl.onSigCtlPutLicence = function (sigCtlV, status) {
                    if (sigcaptx_1.Utils.callbackStatusOK("SigCtl PutLicence", status)) {
                        sigcaptx_1.SigCapture.dynCapt = new window.sdkPtr.DynamicCapture(SessionControl.onDynCaptConstructor);
                    }
                };
                SessionControl.onGetSignature = function (sigCtlV, sigObjV, status) {
                    if (sigcaptx_1.Utils.callbackStatusOK("SigCapt GetSignature", status)) {
                        sigCtlV.GetProperty("Component_FileVersion", SessionControl.onSigCtlGetFileVersion);
                    }
                };
                SessionControl.onGetSigCaptXVersion = function (version, status) {
                    if (sigcaptx_1.Utils.callbackStatusOK("SigCaptX GetVersion", status)) {
                        sigcaptx_1.Utils.print("SigCaptX  v" + version);
                        sigcaptx_1.SigCapture.sigCtl.GetProperty("Component_FileVersion", SessionControl.onSigCtlGetFileVersion);
                    }
                };
                SessionControl.onSigCtlGetFileVersion = function (sigCtlV, property, status) {
                    if (sigcaptx_1.Utils.callbackStatusOK("SigCtl GetProperty", status)) {
                        sigcaptx_1.Utils.print("DLL: flSigCOM.dll  v" + property.text);
                        sigcaptx_1.SigCapture.dynCapt.GetProperty("Component_FileVersion", SessionControl.onDynCaptGetFileVersion);
                    }
                };
                SessionControl.onDynCaptGetFileVersion = function (dynCaptV, property, status) {
                    if (sigcaptx_1.Utils.callbackStatusOK("DynCapt GetProperty", status)) {
                        sigcaptx_1.Utils.print("DLL: flSigCapt.dll v" + property.text);
                        sigcaptx_1.Utils.print("Test application ready.");
                        sigcaptx_1.Utils.print("Press 'Capture' to capture a signature.");
                        /*
                        if('static' === typeof callback)
                        {
                          callback();
                        }
                        */
                    }
                };
                return SessionControl;
            }());
            exports_1("SessionControl", SessionControl);
        }
    };
});
