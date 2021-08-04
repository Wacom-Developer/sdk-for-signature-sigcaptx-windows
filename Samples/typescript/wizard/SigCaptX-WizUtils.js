System.register(["./SigCaptX-Globals", "./SigCaptX-WizSessionCtrl", "./sigcaptx"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_Globals_1, SigCaptX_WizSessionCtrl_1, sigcaptx_1, WizDisplay;
    var __moduleName = context_1 && context_1.id;
    // Display a text message in a multi-line text box on the current HTML document
    function print(txt) {
        sigcaptx_1.HTMLTags.txtDisplay.value += txt + "\n";
        sigcaptx_1.HTMLTags.txtDisplay.scrollTop = sigcaptx_1.HTMLTags.txtDisplay.scrollHeight; // scroll to end
    }
    exports_1("print", print);
    function clearTextBox() {
        sigcaptx_1.HTMLTags.txtDisplay.value = "";
    }
    exports_1("clearTextBox", clearTextBox);
    /* This function simply checks the response status set by the previous callback routine and returns true or false.
       If an error status is found an error message is printed containing the name of the calling routine from
       the parameter and the status code    */
    function callbackStatusOK(methodName, status) {
        if (window.sdkPtr.ResponseStatus.OK == status) {
            return true;
        }
        else {
            print(methodName + " error: " + status);
            return false;
        }
    }
    exports_1("callbackStatusOK", callbackStatusOK);
    // Called when the wizard script is completed and displays the image of the captured signature in the
    // signature image on the HTML document. Optionally also displays the SigText string
    function showSignature() {
        print("Showing signature");
        window.sigCtl.GetSignature(onGetSignature);
        function onGetSignature(sigCtlV, sigObjV, status) {
            if (window.sdkPtr.ResponseStatus.OK == status) {
                var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor24BPP;
                var sigObj = sigObjV;
                sigObj.RenderBitmap(SigCaptX_Globals_1.BITMAP_IMAGEFORMAT, sigcaptx_1.HTMLTags.imageBox.clientWidth, sigcaptx_1.HTMLTags.imageBox.clientHeight, SigCaptX_Globals_1.BITMAP_INKWIDTH, SigCaptX_Globals_1.BITMAP_INKCOLOR, SigCaptX_Globals_1.BITMAP_BACKGROUNDCOLOR, outputFlags, SigCaptX_Globals_1.BITMAP_PADDING_X, SigCaptX_Globals_1.BITMAP_PADDING_Y, onRenderBitmap);
            }
            else {
                print("Error retrieving signature");
            }
        }
        function onRenderBitmap(sigObjV, bmpObj, status) {
            if (callbackStatusOK("Signature Render Bitmap", status)) {
                if (null == sigcaptx_1.HTMLTags.imageBox.firstChild) {
                    sigcaptx_1.HTMLTags.imageBox.appendChild(bmpObj.image);
                }
                else {
                    sigcaptx_1.HTMLTags.imageBox.replaceChild(bmpObj.image, sigcaptx_1.HTMLTags.imageBox.firstChild);
                }
                if (sigcaptx_1.HTMLTags.chkSigText.checked) {
                    sigObjV.GetSigText(onGetSigText);
                }
                else {
                    SigCaptX_WizSessionCtrl_1.WizardEventController.stop();
                }
            }
        }
        // Displays the SigText string in the text box on the HTML document
        function onGetSigText(sigObjV, text, status) {
            if (callbackStatusOK("Signature Render Bitmap", status)) {
                print("Sig text successfully obtained: " + text);
                // At this point you can send the contents of "text" to the server 
                // and then validate it at the server end
                print("Stopping script");
                SigCaptX_WizSessionCtrl_1.WizardEventController.stop();
            }
        }
    }
    exports_1("showSignature", showSignature);
    /* Check the HTML document to see whether the user has selected the option to use local or remote images for the button design */
    function getButtonSourceFromHTMLDoc() {
        var buttonSource = SigCaptX_Globals_1.textSource.STANDARD;
        if (sigcaptx_1.HTMLTags.remoteImages.checked) {
            buttonSource = SigCaptX_Globals_1.textSource.REMOTE;
        }
        return buttonSource;
    }
    exports_1("getButtonSourceFromHTMLDoc", getButtonSourceFromHTMLDoc);
    return {
        setters: [
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            },
            function (SigCaptX_WizSessionCtrl_1_1) {
                SigCaptX_WizSessionCtrl_1 = SigCaptX_WizSessionCtrl_1_1;
            },
            function (sigcaptx_1_1) {
                sigcaptx_1 = sigcaptx_1_1;
            }
        ],
        execute: function () {
            WizDisplay = /** @class */ (function () {
                function WizDisplay() {
                }
                // Set up the font ready for displaying the next object which could be text or a button or other object
                WizDisplay.setFont = function (fontName, fontSize, isBold, useSymbolCharset, callbackRoutine) {
                    var myFont = new window.sdkPtr.Font(fontName, fontSize);
                    myFont.sWeight = (isBold ? window.sdkPtr.FontWeight.FW_BOLD : window.sdkPtr.FontWeight.FW_NORMAL);
                    if (useSymbolCharset) {
                        myFont.sCharset = window.sdkPtr.FontCharset.SYMBOL_CHARSET;
                    }
                    var variantFont = new window.sdkPtr.Variant();
                    variantFont.Set(myFont);
                    window.wizCtl.PutFont(variantFont, callbackRoutine);
                };
                WizDisplay.setFontForeColor = function (foreColor, callbackRoutine) {
                    var color = new window.sdkPtr.Variant();
                    if (foreColor == "") {
                        // Default foreground colour to black if not supplied
                        foreColor = "0R 0G 0B";
                    }
                    color.Set(foreColor);
                    window.wizCtl.SetProperty("ObjectForegroundColor", color, callbackRoutine);
                };
                WizDisplay.setFontBackColor = function (backColor, callbackRoutine) {
                    var color = new window.sdkPtr.Variant();
                    if (backColor == "") {
                        // Default background colour to white if not supplied
                        backColor = "1R 1G 1B";
                    }
                    color.Set(backColor);
                    window.wizCtl.SetProperty("ObjectBackgroundColor", color, callbackRoutine);
                };
                // Add a text string to the display at co-ordinates specified by values in the text object
                WizDisplay.setupTextObject = function (textObject, setFont, useSymbolCharSet, callbackRoutine) {
                    WizDisplay.wizObject = textObject;
                    WizDisplay.callback = callbackRoutine;
                    // First set the font and any fore- and background colours if needed for colour pads
                    if (setFont || WizDisplay.wizObject.fontForeColor != "") {
                        WizDisplay.setFont(textObject.fontName, textObject.fontSize, textObject.fontBold, useSymbolCharSet, WizDisplay.setTextObjectForeColor);
                    }
                    else {
                        WizDisplay.addTextObject(window.wizCtl, window.sdkPtr.ResponseStatus.OK);
                    }
                };
                WizDisplay.setTextObjectForeColor = function (wizCtlV, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setFont", status)) {
                        /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
                        if (WizDisplay.wizObject.fontForeColor != "") {
                            WizDisplay.setFontForeColor(WizDisplay.wizObject.fontForeColor, WizDisplay.setTextObjectBackColor);
                        }
                        else {
                            WizDisplay.addTextObject(wizCtlV, status);
                        }
                    }
                };
                WizDisplay.setTextObjectBackColor = function (wizCtlV, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setTextObjectForeColor", status)) {
                        /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
                        WizDisplay.setFontBackColor(WizDisplay.wizObject.fontBackColor, WizDisplay.addTextObject);
                    }
                };
                WizDisplay.addTextObject = function (wizCtlV, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setTextObjectBackColor", status)) {
                        var xVar = new window.sdkPtr.Variant();
                        var yVar = new window.sdkPtr.Variant();
                        var objData = new window.sdkPtr.Variant();
                        var options = new window.sdkPtr.Variant();
                        xVar.Set(WizDisplay.wizObject.xPos);
                        yVar.Set(WizDisplay.wizObject.yPos);
                        objData.Set(WizDisplay.wizObject.textString);
                        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectText, WizDisplay.wizObject.type, xVar, yVar, objData, options, WizDisplay.callback);
                    }
                };
                WizDisplay.setupButtonObject = function (btnObject, setFont, useSymbolCharSet, callbackRoutine) {
                    WizDisplay.wizObject = btnObject;
                    WizDisplay.callback = callbackRoutine;
                    // First set the font and any fore- and background colours if needed for colour pads
                    if (setFont || WizDisplay.wizObject.fontForeColor != "") {
                        WizDisplay.setFont(btnObject.fontName, btnObject.fontSize, btnObject.fontBold, useSymbolCharSet, WizDisplay.setButtonObjectForeColor);
                    }
                    else {
                        WizDisplay.addButtonObject(window.wizCtl, window.sdkPtr.ResponseStatus.OK);
                    }
                };
                WizDisplay.setButtonObjectForeColor = function (wizCtlV, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setbuttonobjectfontforecolor", status)) {
                        /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
                        if (WizDisplay.wizObject.fontForeColor != "") {
                            WizDisplay.setFontForeColor(WizDisplay.wizObject.fontForeColor, WizDisplay.setButtonObjectBackColor);
                        }
                        else {
                            WizDisplay.addButtonObject(wizCtlV, status);
                        }
                    }
                };
                WizDisplay.setButtonObjectBackColor = function (wizCtlV, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setButtonObjectForeColor", status)) {
                        /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
                        WizDisplay.setFontBackColor(WizDisplay.wizObject.fontBackColor, WizDisplay.addButtonObject);
                    }
                };
                WizDisplay.addButtonObject = function (wizCtlv, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setbuttonObjectBackcolor", status)) {
                        var xVar = new window.sdkPtr.Variant();
                        var yVar = new window.sdkPtr.Variant();
                        var objData = new window.sdkPtr.Variant();
                        var options = new window.sdkPtr.Variant();
                        xVar.Set(WizDisplay.wizObject.xPos);
                        yVar.Set(WizDisplay.wizObject.yPos);
                        objData.Set(WizDisplay.wizObject.buttonText);
                        options.Set(WizDisplay.wizObject.buttonWidth);
                        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectButton, WizDisplay.wizObject.buttonType, xVar, yVar, objData, options, WizDisplay.callback);
                    }
                };
                // Add an image to the pad display using properties already defined in the image object
                WizDisplay.addObjectImage = function (imageObj, callbackRoutine, imageSource) {
                    var xVar = new window.sdkPtr.Variant();
                    var yVar = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    xVar.Set(imageObj.xPos);
                    yVar.Set(imageObj.yPos);
                    objData.Set(imageObj.imageFile);
                    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectImage, imageObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
                };
                // Add a checkbox to the pad display using co-ordinates and options passed in as parameters
                WizDisplay.addCheckBox = function (xPosition, yPosition, optionsValue, callbackRoutine) {
                    //print("Setting up check box dimensions");
                    var xVar = new window.sdkPtr.Variant();
                    var yVar = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    xVar.Set(xPosition);
                    yVar.Set(yPosition);
                    objData.Set(" ");
                    options.Set(optionsValue);
                    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectCheckbox, "Check", xVar, yVar, objData, options, callbackRoutine);
                };
                // Add a signature object to the pad display 
                WizDisplay.addSignatureObject = function (sigCtl, callbackRoutine) {
                    var xVar = new window.sdkPtr.Variant();
                    var yVar = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    xVar.Set(0);
                    yVar.Set(0);
                    objData.Set(sigCtl);
                    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectSignature, "Sig", xVar, yVar, objData, options, callbackRoutine);
                };
                // Add a rectangle to the pad display (via the wizCtl)
                WizDisplay.addRectangle = function (rectangleObj, callbackRoutine) {
                    var x1Var = new window.sdkPtr.Variant();
                    var y1Var = new window.sdkPtr.Variant();
                    var x2Var = new window.sdkPtr.Variant();
                    var y2Var = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    x1Var.Set(rectangleObj.x1Pos);
                    y1Var.Set(rectangleObj.y1Pos);
                    x2Var.Set(rectangleObj.x2Pos);
                    y2Var.Set(rectangleObj.y2Pos);
                    objData.Set(rectangleObj.lineWidth);
                    options.Set(rectangleObj.options);
                    window.wizCtl.AddPrimitive(window.sdkPtr.PrimitiveType.PrimitiveRectangle, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine);
                };
                // Add a line to the pad display (via the wizCtl)
                WizDisplay.addLine = function (lineObj, callbackRoutine) {
                    var x1Var = new window.sdkPtr.Variant();
                    var y1Var = new window.sdkPtr.Variant();
                    var x2Var = new window.sdkPtr.Variant();
                    var y2Var = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    x1Var.Set(lineObj.x1Pos);
                    y1Var.Set(lineObj.y1Pos);
                    x2Var.Set(lineObj.x2Pos);
                    y2Var.Set(lineObj.y2Pos);
                    objData.Set(lineObj.lineWidth);
                    options.Set(lineObj.options);
                    window.wizCtl.AddPrimitive(window.sdkPtr.PrimitiveType.PrimitiveLine, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine);
                };
                WizDisplay.setupRadio = function (radioObject, setFont, useSymbolCharSet, callbackRoutine) {
                    WizDisplay.wizObject = radioObject;
                    WizDisplay.callback = callbackRoutine;
                    // First set the font and any fore- and background colours if needed for colour pads
                    if (setFont || WizDisplay.wizObject.fontForeColor != "") {
                        WizDisplay.setFont(radioObject.fontName, radioObject.fontSize, radioObject.fontBold, useSymbolCharSet, WizDisplay.setRadioObjectForeColor);
                    }
                    else {
                        WizDisplay.addRadioButton(window.wizCtl, window.sdkPtr.ResponseStatus.OK);
                    }
                };
                WizDisplay.setRadioObjectForeColor = function (wizCtlV, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setRadioFont", status)) {
                        /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the radio object */
                        if (WizDisplay.wizObject.fontForeColor != "") {
                            WizDisplay.setFontForeColor(WizDisplay.wizObject.fontForeColor, WizDisplay.setRadioObjectBackColor);
                        }
                        else {
                            WizDisplay.addRadioButton(wizCtlV, status);
                        }
                    }
                };
                WizDisplay.setRadioObjectBackColor = function (wizCtlV, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setRadioObjectForeColor", status)) {
                        /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the radio object */
                        WizDisplay.setFontBackColor(WizDisplay.wizObject.fontBackColor, WizDisplay.addRadioButton);
                    }
                };
                // Add a radio button to the pad display (via the wizCtl)
                WizDisplay.addRadioButton = function (wizCtlV, status) {
                    if (callbackStatusOK("WizCtl WizDisplay.setRadioObjectBackColor", status)) {
                        var xVar = new window.sdkPtr.Variant();
                        var yVar = new window.sdkPtr.Variant();
                        var objData = new window.sdkPtr.Variant();
                        var options = new window.sdkPtr.Variant();
                        var objOptn = new window.sdkPtr.ObjectOptions();
                        xVar.Set(WizDisplay.wizObject.xPos);
                        yVar.Set(WizDisplay.wizObject.yPos);
                        objData.Set(WizDisplay.wizObject.buttonLabel);
                        objOptn.AddOption("Group", WizDisplay.wizObject.groupName);
                        objOptn.AddOption("Checked", WizDisplay.wizObject.buttonChecked);
                        options.Set(objOptn);
                        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectRadioButton, WizDisplay.wizObject.buttonLabel, xVar, yVar, objData, options, WizDisplay.callback);
                    }
                };
                // Add an input button to the pad display (via the wizCtl)
                WizDisplay.addInputObject = function (inputObj, callbackRoutine) {
                    var xVar = new window.sdkPtr.Variant();
                    var yVar = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    xVar.Set(0);
                    yVar.Set(0);
                    objData.Set(inputObj);
                    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectInput, "input", xVar, yVar, objData, options, callbackRoutine);
                };
                // Add an input echo object to the pad display (via the wizCtl) 
                WizDisplay.addInputObjectEcho = function (xPos, yPos, callbackRoutine) {
                    var xVar = new window.sdkPtr.Variant();
                    var yVar = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    xVar.Set(xPos);
                    yVar.Set(yPos);
                    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectInputEcho, "echo", xVar, yVar, objData, options, callbackRoutine);
                };
                return WizDisplay;
            }());
            exports_1("WizDisplay", WizDisplay);
        }
    };
});
