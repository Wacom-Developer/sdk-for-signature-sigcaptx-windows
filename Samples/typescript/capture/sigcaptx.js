System.register(["./SigCaptX-CaptSessionCtrl", "./SigCaptX-Globals"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_CaptSessionCtrl_1, SigCaptX_Globals_1, SigCapture, Hashing, Utils, eventHandler, HTMLTags, sigCapt, captureEvent, clearEvent, verifyEvent, aboutEvent, restoreEvent, showSigEvent, showSigEvent2, chkShowSigTextEvent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (SigCaptX_CaptSessionCtrl_1_1) {
                SigCaptX_CaptSessionCtrl_1 = SigCaptX_CaptSessionCtrl_1_1;
            },
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            }
        ],
        execute: function () {
            SigCapture = /** @class */ (function () {
                function SigCapture() {
                    var _this = this;
                    //  This function enables the Restore button if the user has selected the option to output SigText
                    this.enableRestoreButton = function () {
                        if (HTMLTags.checkShowSigtext.checked) {
                            HTMLTags.btnRestore.disabled = false;
                        }
                        else {
                            HTMLTags.btnRestore.disabled = true;
                        }
                    };
                    /* This function clears the current signature image from the signature control on the form */
                    this.clearSignature = function () {
                        if (null != HTMLTags.imageBox.firstChild) {
                            HTMLTags.imageBox.removeChild(HTMLTags.imageBox.firstChild);
                        }
                        if (null == sigCapt.sigObj) {
                            SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted(); // See SigCaptX-SessionControl.js
                            return;
                        }
                        sigCapt.sigObj.Clear(onClearSig);
                        function onClearSig(sigObjV, status) {
                            if (window.sdkPtr.ResponseStatus.OK != status) {
                                Utils.print("ClearSignature() error: " + status);
                                if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                                    Utils.print("Session error. Restarting the session.");
                                    SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted(); // See SigCaptX-SessionControl.js
                                }
                            }
                        }
                    };
                    /* This function displays the details of the signature in the text box on the HTML form */
                    this.displaySignatureDetails = function () {
                        if (!window.sdkPtr.running || null == sigCapt.sigObj) {
                            Utils.print("Session error. Restarting the session.");
                            SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted(); // See SigCaptX-SessionControl.js
                            return;
                        }
                        sigCapt.sigObj.GetIsCaptured(_this.onGetIsCaptured);
                    };
                    this.onGetIsCaptured = function (sigObj, isCaptured, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            if (!isCaptured) {
                                Utils.print("No signature has been captured yet.");
                                return;
                            }
                            sigObj.GetWho(_this.onGetWho);
                        }
                        else {
                            Utils.print("Signature GetWho error: " + status);
                            if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                                Utils.print("Session error. Restarting the session.");
                                SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted(); // See SigCaptX-SessionControl.js
                            }
                        }
                    };
                    this.onGetWho = function (sigObjV, who, status) {
                        if (Utils.callbackStatusOK("Signature GetWho", status)) {
                            Utils.print("  Name:   " + who);
                            var tz = window.sdkPtr.TimeZone.TimeLocal;
                            sigCapt.sigObj.GetWhen(tz, _this.onGetWhen);
                        }
                    };
                    this.onGetWhen = function (sigObjV, when, status) {
                        if (Utils.callbackStatusOK("Signature GetWhen", status)) {
                            Utils.print("  Date:   " + when.toString());
                            sigCapt.sigObj.GetWhy(_this.onGetWhy);
                        }
                    };
                    this.onGetWhy = function (sigObjV, why, status) {
                        if (Utils.callbackStatusOK("Signature GetWhy", status)) {
                            Utils.print("  Reason: " + why);
                        }
                    };
                    // This function recalculates the hash value from the first and last names
                    // and checks it against the hash embedded in the signature object
                    this.verifySignedData = function () {
                        Utils.print("Verifying signed data...");
                        if (null == sigCapt.sigObj) {
                            SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted();
                            return;
                        }
                        SigCapture.hash = null;
                        sigCapt.sigObj.GetIsCaptured(_this.onGetIsCaptured);
                    };
                    this.onGetHashForVerification = function () {
                        sigCapt.sigObj.CheckSignedData(SigCapture.hash, _this.onCheckSignedData);
                    };
                    this.onCheckSignedData = function (hash, status) {
                        Utils.print("Verify result: " + status);
                        if (window.sdkPtr.SignedData.DataGood == status) {
                            Utils.print("Signed Data OK");
                        }
                        else {
                            Utils.print("Signed Data Has Changed");
                        }
                    };
                    /* This function takes the SigText value currently displayed on the HTML form and uses it to recreate the signature image shown in the signature control tag on the form */
                    this.setSignatureText = function () {
                        if (null == sigCapt.sigObj) {
                            SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted(); // See SigCaptX-SessionControl.js
                            return;
                        }
                        /* First of all take the SigText value currently displayed in the txtSignature field on the form and assign it to the sigObj object */
                        sigCapt.sigObj.PutSigText(HTMLTags.textSig.value, _this.onPutSigText);
                    };
                    this.onPutSigText = function (sigObjV, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            /* Now that the sigObj has been populated with the signature data (via the SigText) it can be used to geberate a signature image */
                            var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor24BPP;
                            sigCapt.sigObj.RenderBitmap(SigCaptX_Globals_1.BITMAP_IMAGEFORMAT, HTMLTags.imageBox.clientWidth, HTMLTags.imageBox.clientHeight, SigCaptX_Globals_1.BITMAP_INKWIDTH, SigCaptX_Globals_1.BITMAP_INKCOLOR, SigCaptX_Globals_1.BITMAP_BACKGROUNDCOLOR, outputFlags, SigCaptX_Globals_1.BITMAP_PADDING_X, SigCaptX_Globals_1.BITMAP_PADDING_Y, _this.onRenderBitmapFromSigText);
                        }
                        else {
                            Utils.print("SetSignatureText() error: " + status);
                            if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                                Utils.print("Session error. Restarting the session.");
                                SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted(); // See SigCaptX-SessionControl.js
                            }
                        }
                    };
                    /* Take the image generated by RenderBitmap and use it to populate the signature image control on the form */
                    this.onRenderBitmapFromSigText = function (sigObjV, bmpObj, status) {
                        if (Utils.callbackStatusOK("Signature Render Bitmap", status)) {
                            if (null == HTMLTags.imageBox.firstChild) {
                                HTMLTags.imageBox.appendChild(bmpObj.image);
                            }
                            else {
                                HTMLTags.imageBox.replaceChild(bmpObj.image, HTMLTags.imageBox.firstChild);
                            }
                        }
                    };
                    // Displays version and licence information about the current Signature SDK and SigCaptX installation
                    this.aboutBox = function () {
                        if (!window.sdkPtr.running || null == SigCapture.sigCtl) {
                            Utils.print("Session error. Restarting the session.");
                            SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted();
                            return;
                        }
                        SigCapture.sigCtl.AboutBox(_this.onAboutBox);
                    };
                    this.onAboutBox = function (sigCtlV, status) {
                        if (window.sdkPtr.ResponseStatus.OK != status) {
                            Utils.print("AboutBox error: " + status);
                            if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                                Utils.print("Session error. Restarting the session.");
                                SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted();
                            }
                        }
                    };
                    this.sigObject = null;
                    SigCapture.dynCapt = null;
                    SigCapture.sigCtl = null;
                }
                Object.defineProperty(SigCapture.prototype, "sigObj", {
                    get: function () {
                        return this.sigObject;
                    },
                    set: function (value) {
                        this.sigObject = value;
                    },
                    enumerable: false,
                    configurable: true
                });
                /*  This is the main function for capturing the signature from the pad */
                SigCapture.prototype.capture = function () {
                    console.log("Starting capture");
                    Utils.print("Starting capture");
                    if (!window.sdkPtr.running || null == SigCapture.dynCapt) {
                        Utils.print("Session error. Restarting the session.");
                        SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted(); // See SigCaptX-CaptSessionCtrl.js
                        return;
                    }
                    // Construct a hash object to contain the hash
                    SigCapture.hash = new window.sdkPtr.Hash(onHashConstructor);
                    function onHashConstructor(hashV, status) {
                        if (window.sdkPtr.ResponseStatus.OK == status) {
                            Hashing.GetHash(hashV, SigCapture.onGetInitialHash);
                        }
                        else {
                            Utils.print("Hash Constructor error: " + status);
                            if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                                Utils.print("Error: invalid session. Restarting the session.");
                                SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted();
                            }
                        }
                    }
                };
                // If the hash value has been calculated successfully next steps is to capture the signature
                SigCapture.onGetInitialHash = function () {
                    var firstName = HTMLTags.firstName.value;
                    var lastName = HTMLTags.lastName.value;
                    var fullName = firstName + " " + lastName;
                    SigCapture.dynCapt.Capture(SigCapture.sigCtl, fullName, "Document Approval", SigCapture.hash, null, SigCapture.onDynCaptCapture);
                };
                SigCapture.onDynCaptCapture = function (dynCaptV, SigObjV, status) {
                    if (window.sdkPtr.ResponseStatus.INVALID_SESSION == status) {
                        Utils.print("Error: invalid session. Restarting the session.");
                        SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted(); // See SigCaptX-SessionControl.js
                    }
                    else {
                        /* Check the status returned from the signature capture */
                        switch (status) {
                            case window.sdkPtr.DynamicCaptureResult.DynCaptOK:
                                sigCapt.sigObj = SigObjV; // Populate the sigObj static property for later use
                                Utils.print("Signature captured successfully");
                                /* Set the RenderBitmap flags as appropriate depending on whether the user wants to use a picture image or B64 text value */
                                if (HTMLTags.checkBoxUseB64.checked) {
                                    var outputFlags = window.sdkPtr.RBFlags.RenderOutputBase64 | window.sdkPtr.RBFlags.RenderColor32BPP;
                                }
                                else {
                                    var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor32BPP;
                                }
                                sigCapt.sigObj.RenderBitmap(SigCaptX_Globals_1.BITMAP_IMAGEFORMAT, HTMLTags.imageBox.clientWidth, HTMLTags.imageBox.clientHeight, SigCaptX_Globals_1.BITMAP_INKWIDTH, SigCaptX_Globals_1.BITMAP_INKCOLOR, SigCaptX_Globals_1.BITMAP_BACKGROUNDCOLOR, outputFlags, SigCaptX_Globals_1.BITMAP_PADDING_X, SigCaptX_Globals_1.BITMAP_PADDING_Y, SigCapture.onRenderBitmap);
                                break;
                            case window.sdkPtr.DynamicCaptureResult.DynCaptCancel:
                                Utils.print("Signature capture cancelled");
                                break;
                            case window.sdkPtr.DynamicCaptureResult.DynCaptPadError:
                                Utils.print("No capture service available");
                                break;
                            case window.sdkPtr.DynamicCaptureResult.DynCaptError:
                                Utils.print("Tablet Error");
                                break;
                            case window.sdkPtr.DynamicCaptureResult.DynCaptNotLicensed:
                                Utils.print("No valid Signature Capture licence found");
                                break;
                            default:
                                Utils.print("Capture Error " + status);
                                break;
                        }
                    }
                };
                SigCapture.onRenderBitmap = function (sigObjV, bmpObj, status) {
                    if (Utils.callbackStatusOK("Signature Render Bitmap", status)) {
                        /* If the user wants to demonstrate the use of B64 image strings then define an image and set its source to the B64 string*/
                        if (HTMLTags.checkBoxUseB64.checked) {
                            Utils.print("base64_image:>" + bmpObj + "<");
                            var img = new Image();
                            img.src = "data:image/png;base64," + bmpObj;
                            if (null == HTMLTags.imageBox.firstChild) {
                                HTMLTags.imageBox.appendChild(img);
                            }
                            else {
                                HTMLTags.imageBox.replaceChild(img, HTMLTags.imageBox.firstChild);
                            }
                        }
                        else {
                            /* If RenderBitmap generated a standard image (picture) then just place that picture in the img control on the HTML form */
                            if (null == HTMLTags.imageBox.firstChild) {
                                HTMLTags.imageBox.appendChild(bmpObj.image);
                            }
                            else {
                                HTMLTags.imageBox.replaceChild(bmpObj.image, HTMLTags.imageBox.firstChild);
                            }
                        }
                        /* If the user chose the option to show the SigText value on the form then call the function to do this */
                        if (HTMLTags.checkShowSigtext.checked) {
                            sigObjV.GetSigText(SigCapture.onGetSigText);
                        }
                    }
                };
                /* This function takes the SigText value returned by the callback and places it in the txtSignature tag on the form */
                SigCapture.onGetSigText = function (sigObjV, text, status) {
                    if (Utils.callbackStatusOK("Signature Render Bitmap", status)) {
                        HTMLTags.textSig.value = text;
                    }
                };
                return SigCapture;
            }());
            exports_1("SigCapture", SigCapture);
            Hashing = /** @class */ (function () {
                function Hashing() {
                }
                // This function calculates a hash value using the first and last names on the HTML form
                Hashing.GetHash = function (hash, callback) {
                    Hashing.callbackFunc = callback;
                    Utils.print("Creating hash:");
                    hash.Clear(Hashing.onClear);
                };
                Hashing.onClear = function (hashV, status) {
                    if (Utils.callbackStatusOK("Hash Clear", status)) {
                        hashV.PutType(window.sdkPtr.HashType.HashMD5, Hashing.onPutType);
                    }
                };
                Hashing.onPutType = function (hashV, status) {
                    if (Utils.callbackStatusOK("Hash PutType", status)) {
                        var vFname = new window.sdkPtr.Variant();
                        vFname.Set(HTMLTags.firstName.value);
                        hashV.Add(vFname, Hashing.onAddFname);
                    }
                };
                Hashing.onAddFname = function (hashV, status) {
                    if (Utils.callbackStatusOK("Hash Add", status)) {
                        var vLname = new window.sdkPtr.Variant();
                        vLname.Set(HTMLTags.lastName.value);
                        hashV.Add(vLname, Hashing.onAddLname);
                    }
                };
                Hashing.onAddLname = function (hashV, status) {
                    if (Utils.callbackStatusOK("Hash Add", status)) {
                        Hashing.callbackFunc();
                    }
                };
                return Hashing;
            }());
            Utils = /** @class */ (function () {
                function Utils() {
                }
                // Display a text message in a multi-line text box on the current HTML document
                Utils.print = function (txt) {
                    HTMLTags.txtDisplay.value += txt + "\n";
                    HTMLTags.txtDisplay.scrollTop = HTMLTags.txtDisplay.scrollHeight; // scroll to end
                };
                /* This function simply checks the response status set by the previous callback routine and returns true or false.
                If an error status is found an error message is printed containing the name of the calling routine from
                the parameter and the status code    */
                Utils.callbackStatusOK = function (methodName, status) {
                    if (window.sdkPtr.ResponseStatus.OK == status) {
                        return true;
                    }
                    else {
                        Utils.print(methodName + " error: " + status);
                        return false;
                    }
                };
                Utils.clearTextBox = function () {
                    HTMLTags.txtDisplay.value = "";
                };
                return Utils;
            }());
            exports_1("Utils", Utils);
            eventHandler = /** @class */ (function () {
                function eventHandler(htmlElement, eventType, handlerFunc) {
                    this.btnEvent = document.getElementById(htmlElement);
                    this.btnEvent.addEventListener(eventType, handlerFunc);
                }
                return eventHandler;
            }());
            // Set up global variables referencing the HTML elements needed later
            exports_1("HTMLTags", HTMLTags = new SigCaptX_Globals_1.HTMLIds());
            exports_1("sigCapt", sigCapt = new SigCapture());
            // Now start up the session
            SigCaptX_CaptSessionCtrl_1.SessionControl.actionWhenRestarted();
            captureEvent = new eventHandler("capture", "click", sigCapt.capture);
            clearEvent = new eventHandler("clear", "click", sigCapt.clearSignature);
            verifyEvent = new eventHandler("verify", "click", sigCapt.verifySignedData);
            aboutEvent = new eventHandler("licinfo", "click", sigCapt.aboutBox);
            restoreEvent = new eventHandler("restore", "click", sigCapt.setSignatureText);
            showSigEvent = new eventHandler("sigdetails", "click", sigCapt.displaySignatureDetails);
            showSigEvent2 = new eventHandler("imageBox", "dblclick", sigCapt.displaySignatureDetails);
            chkShowSigTextEvent = new eventHandler("chkShowSigText", "click", sigCapt.enableRestoreButton);
        }
    };
});
