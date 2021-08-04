System.register([], function (exports_1, context_1) {
    "use strict";
    var WizDisplay;
    var __moduleName = context_1 && context_1.id;
    // Display a text message in a multi-line text box on the current HTML document
    function print(txt) {
        var txtDisplay = document.getElementById("txtDisplay");
        txtDisplay.value += txt + "\n";
        txtDisplay.scrollTop = txtDisplay.scrollHeight; // scroll to end
    }
    exports_1("print", print);
    function clearTextBox() {
        var txtDisplay = document.getElementById("txtDisplay");
        txtDisplay.value = "";
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
    return {
        setters: [],
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
                WizDisplay.addTextObject = function (textObject, callbackRoutine) {
                    var xVar = new window.sdkPtr.Variant();
                    var yVar = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    xVar.Set(textObject.xPos);
                    yVar.Set(textObject.yPos);
                    objData.Set(textObject.textString);
                    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectText, textObject.type, xVar, yVar, objData, options, callbackRoutine);
                };
                // Add a button to the pad display using properties already defined in the button object 
                WizDisplay.addButtonObject = function (buttonObj, callbackRoutine) {
                    var xVar = new window.sdkPtr.Variant();
                    var yVar = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    xVar.Set(buttonObj.xPos);
                    yVar.Set(buttonObj.yPos);
                    objData.Set(buttonObj.buttonText);
                    options.Set(buttonObj.buttonWidth);
                    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectButton, buttonObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
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
                // Add a radio button to the pad display (via the wizCtl)
                WizDisplay.addRadioButton = function (radioButtonObj, callbackRoutine) {
                    var xVar = new window.sdkPtr.Variant();
                    var yVar = new window.sdkPtr.Variant();
                    var objData = new window.sdkPtr.Variant();
                    var options = new window.sdkPtr.Variant();
                    var objOptn = new window.sdkPtr.ObjectOptions();
                    xVar.Set(radioButtonObj.xPos);
                    yVar.Set(radioButtonObj.yPos);
                    objData.Set(radioButtonObj.buttonLabel);
                    objOptn.AddOption("Group", radioButtonObj.groupName);
                    objOptn.AddOption("Checked", radioButtonObj.buttonChecked);
                    options.Set(objOptn);
                    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectRadioButton, radioButtonObj.buttonLabel, xVar, yVar, objData, options, callbackRoutine);
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
