/***************************************************************************
  SigCaptX-Utils.js
   
  This file contains a number of common routines which are used by the capture, wizard and PIN pad samples
  
  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
 
/* This function simply checks the response status set by the previous callback routine and returns true or false.
   If an error status is found an error message is printed containing the name of the calling routine from 
   the parameter and the status code    */
function callbackStatusOK ( methodName, status )
{
  if(wgssSignatureSDK.ResponseStatus.OK == status)
  {
    return true;
  }
  else
  {
    vue_app.userMsg(methodName + " error: " + status);
    return false;
  }
} 
 
// Set up the font ready for displaying the next object which could be text or a button or other object
function setFont(fontName, fontSize, isBold, useSymbolCharset, callbackRoutine)
{
  var myFont = new wgssSignatureSDK.Font(fontName, fontSize);
  myFont.sWeight = (isBold? wgssSignatureSDK.FontWeight.FW_BOLD : wgssSignatureSDK.FontWeight.FW_NORMAL);
  if (useSymbolCharset)
  {
    myFont.sCharset = wgssSignatureSDK.FontCharset.SYMBOL_CHARSET;
  }
  var variantFont = new wgssSignatureSDK.Variant();
  variantFont.Set(myFont);
  wizCtl.PutFont(variantFont, callbackRoutine);
}

function setFontForeColor(foreColor, callbackRoutine)
{
  var color = new wgssSignatureSDK.Variant();
  if (foreColor == "")
  {
    // Default foreground colour to black if not supplied
    foreColor = "0R 0G 0B";
  }
  //vue_app.userMsg("Setting foreground colour to " + foreColor);
  color.Set (foreColor);
  wizCtl.SetProperty("ObjectForegroundColor", color, callbackRoutine);
}

function setFontBackColor(backColor, callbackRoutine)
{
  var color = new wgssSignatureSDK.Variant();
  if (backColor == "")
  {
    // Default background colour to white if not supplied
    backColor = "1R 1G 1B";
  }
  //vue_app.userMsg("Setting background colour to " + backColor);
  color.Set (backColor);
  wizCtl.SetProperty("ObjectBackgroundColor", color, callbackRoutine);
}
  
// Add a text string to the display at co-ordinates specified by values in the text object
function addTextObject(textObject, callbackRoutine)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
  
  xVar.Set(textObject.xPos);
  yVar.Set(textObject.yPos);
  objData.Set(textObject.textString);
  
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectText, textObject.type, xVar, yVar, objData, options, callbackRoutine);	
}	
 
// Add a button to the pad display using properties already defined in the button object 
function addButtonObject(buttonObj, callbackRoutine)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
    
  xVar.Set(buttonObj.xPos);
  yVar.Set(buttonObj.yPos);
  objData.Set(buttonObj.buttonText);
  options.Set(buttonObj.width);
  
  //vue_app.userMsg("Adding button at " + buttonObj.xPos + " / " + buttonObj.yPos + ". Value: " + buttonObj.buttonText + " Type: " + buttonObj.buttonType);
  
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectButton, buttonObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
}
  
// Add an image to the pad display using properties already defined in the image object
function addObjectImage(imageObj, callbackRoutine, imageSource)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();

  //vue_app.userMsg("Placing button image at " + imageObj.xPos + " / " + imageObj.yPos + " using file " + imageObj.imageFile);
  //vue_app.userMsg("Image type is " + imageObj.buttonType);
  //vue_app.userMsg("Full path for object image is " + imageObj.imageFile);
  
  xVar.Set(imageObj.xPos);
  yVar.Set(imageObj.yPos);
  objData.Set(imageObj.imageFile);
    
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectImage, imageObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
}
  
// Add a checkbox to the pad display using co-ordinates and options passed in as parameters
function addCheckBox(xPosition, yPosition, optionsValue, callbackRoutine)
{
  //vue_app.userMsg("Setting up check box dimensions");
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
    
  //vue_app.userMsg("Placing check box at " + xPosition + " / " + yPosition);

  xVar.Set(xPosition);
  yVar.Set(yPosition);
  objData.Set(" ");
  options.Set(optionsValue);
    
  //vue_app.userMsg("Putting check box object");
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectCheckbox, "Check", xVar, yVar, objData, options, callbackRoutine);
}

// Add a signature object to the pad display 
function addSignatureObject(sigCtl, callbackRoutine)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
    
  xVar.Set(0);
  yVar.Set(0);
  objData.Set(sigCtl);
    
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectSignature, "Sig", xVar, yVar, objData, options, callbackRoutine);
}
  
// Add a rectangle to the pad display (via the wizCtl)
function addRectangle( rectangleObj, callbackRoutine)
{
  var x1Var = new wgssSignatureSDK.Variant();
  var y1Var = new wgssSignatureSDK.Variant();
  var x2Var = new wgssSignatureSDK.Variant();
  var y2Var = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
 
  x1Var.Set(rectangleObj.x1Pos);
  y1Var.Set(rectangleObj.y1Pos);
  x2Var.Set(rectangleObj.x2Pos);
  y2Var.Set(rectangleObj.y2Pos);
  objData.Set(rectangleObj.lineWidth);
  options.Set(rectangleObj.options);
   
  wizCtl.AddPrimitive(wgssSignatureSDK.PrimitiveType.PrimitiveRectangle, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine );
}
  
// Add a line to the pad display (via the wizCtl)
function addLine(lineObj, callbackRoutine)
{
  var x1Var = new wgssSignatureSDK.Variant();
  var y1Var = new wgssSignatureSDK.Variant();
  var x2Var = new wgssSignatureSDK.Variant();
  var y2Var = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
  
  x1Var.Set(lineObj.x1Pos);
  y1Var.Set(lineObj.y1Pos);
  x2Var.Set(lineObj.x2Pos);
  y2Var.Set(lineObj.y2Pos);
  objData.Set(lineObj.lineWidth);
  options.Set(lineObj.options);
     
  wizCtl.AddPrimitive(wgssSignatureSDK.PrimitiveType.PrimitiveLine, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine);
}
  
// Add a radio button to the pad display (via the wizCtl)
function addRadioButton(radioButtonObj, callbackRoutine)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
  var objOptn = new wgssSignatureSDK.ObjectOptions();
  
  xVar.Set(radioButtonObj.xPos);
  yVar.Set(radioButtonObj.yPos);
  
  objData.Set(radioButtonObj.buttonLabel);
  objOptn.AddOption("Group", radioButtonObj.groupName);
  objOptn.AddOption("Checked", radioButtonObj.buttonChecked);
  options.Set(objOptn);
    
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectRadioButton, radioButtonObj.buttonLabel, xVar, yVar, objData, options, callbackRoutine);
}
  
// Add an input button to the pad display (via the wizCtl)
function addInputObject(inputObj, callbackRoutine)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();

  xVar.Set(0);
  yVar.Set(0);
  objData.Set(inputObj);
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectInput, "input", xVar, yVar, objData, options, callbackRoutine);
}
 
// Add an input echo object to the pad display (via the wizCtl) 
function addInputObjectEcho(xPos, yPos, callbackRoutine)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
  
  xVar.Set(xPos);
  yVar.Set(yPos);

  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectInputEcho, "echo", xVar, yVar, objData, options, callbackRoutine);
}

// Find out and return the current directory
function getCurrentDir() 
{
  var scriptFullName = window.location.pathname; // gets /c:/pathname/file.html
  scriptFullName = scriptFullName.replace(/\//g,"\\"); //convert all '/' to '\'
  var scriptPath = scriptFullName.substring( 1, scriptFullName.lastIndexOf("\\")+1 ); // c:\pathname\  
  scriptPath = unescape(scriptPath); // change %20 back to space
  return scriptPath;
}