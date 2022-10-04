/***************************************************************************
  SigCaptX-Utils.js
   
  This file contains a number of common routines which are used by the capture and wizard samples
  
  Copyright (c) 2022 Wacom Ltd. All rights reserved.
    
***************************************************************************/

// Display a text message in a multi-line text box on the current HTML document
function print(txt) 
{
  window.txtDisplay.value += txt + "\n";
  window.txtDisplay.scrollTop = window.txtDisplay.scrollHeight; // scroll to end
}

function clearTextBox()
{
  window.txtDisplay.value = "";
}
 
/* This function simply checks the response status set by the previous callback routine and returns true or false.
   If an error status is found an error message is printed containing the name of the calling routine from 
   the parameter and the status code    */
function callbackStatusOK ( methodName, status )
{
  if (typeof status === 'number')  // Not sure why this is needed but it happens very occasionally
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK)
    {
      return true;
    }
    else
    {
      print(methodName + " error: " + status);
      return false;
    }
  }
  else
  {
    return true;
  }
} 
 
 // Displays version and licence information about the current Signature SDK and SigCaptX installation
function aboutBox()
{
  if(!window.wgssSignatureSDK.running || window.sigCtl === null)
  {
    print("Session error. Restarting the session.");
    actionWhenRestarted(window.aboutBox);
    return;
  }
  sigCtl.AboutBox(onAboutBox);
  
  function onAboutBox(sigCtlV, status) 
  {
    if(status !== wgssSignatureSDK.ResponseStatus.OK) 
    {
      print("AboutBox error: " + status);
      if(status === wgssSignatureSDK.ResponseStatus.INVALID_SESSION)
      {
        print("Session error. Restarting the session.");
        actionWhenRestarted(window.AboutBox);
      }
    }
  }
}

/* Called if the user double-clicks on the signature image on the HTML document or clicks the Signature Details button
 - it displays basic capture details about the signature */
function displaySignatureDetails(sigObj)
{
  if(!wgssSignatureSDK.running || sigObj === null)
  {
    print("Session error. Restarting the session." );
    actionWhenRestarted(window.displaySignatureDetails);
    return;
  }
  sigObj.GetIsCaptured(onGetIsCaptured);
  
  function onGetIsCaptured(sigObj, isCaptured, status)
  {
    if(status === wgssSignatureSDK.ResponseStatus.OK) 
    {
      if(!isCaptured)
      {
        print("No signature has been captured yet." );
        return;
      }
      sigObj.GetWho(onGetWho);
    }
    else 
    {
      print("Signature GetWho error: " + status);
      if(status === wgssSignatureSDK.ResponseStatus.INVALID_SESSION)
      {
        print("Session error. Restarting the session.");
        actionWhenRestarted(window.displaySignatureDetails);
      }
    }
  }
  
  // Displays the name of the person who entered the signature
  function onGetWho(sigObjV, who, status) 
  {
    if(callbackStatusOK("SigCaptX GetWho", status))
    {
      print("  Name:   " + who);
      var tz = wgssSignatureSDK.TimeZone.TimeLocal;
      sigObj.GetWhen(tz, onGetWhen);
    } 
  }
  
  // Displays the time of signature capture
  function onGetWhen(sigObjV, when, status) 
  {
    if(callbackStatusOK("SigCaptX GetWhen", status))
    {
      print("  Date:   " + when.toString() );
      sigObj.GetWhy(onGetWhy);
    } 
  }

  // Displays the reason for signature capture  
  function onGetWhy(sigObjV, why, status) 
  {
    if(callbackStatusOK("SigCaptX GetWhy", status))
    {
      print("  Reason: " + why);
    } 
  } 
}
 
// Called when the wizard script is completed and displays the image of the captured signature in the
// signature image on the HTML document. Optionally also displays the SigText string
function showSignature()
{
  sigCtl.GetSignature(onGetSignature);
  
  function onGetSignature(sigCtlV, sigObjV, status)
  {
    if(callbackStatusOK("Error retrieving signature", status))
    {
      var outputFlags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor24BPP;
      var sigObj = sigObjV;
      //print("Rendering bitmap");
      sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, window.imageBox.clientWidth, window.imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, onRenderBitmap);
    }
  }
  
  function onRenderBitmap(sigObjV, bmpObj, status) 
  {
    if(callbackStatusOK("Signature Render Bitmap", status))
    {
      /* RenderBitmap generated a standard image (picture) so just place that picture in the img control on the HTML form */
      if(window.imageBox.firstChild === null)
      {
        window.imageBox.appendChild(bmpObj.image);
      }
      else
      {
        window.imageBox.replaceChild(bmpObj.image, window.imageBox.firstChild);
      }
      if (window.bShowSigText)
      {
        sigObjV.GetSigText(onGetSigText);
      }
      else
      {
        wizardEventController.stop();
      }
    } 
  }
  
  // Displays the SigText string in the text box on the HTML document
  function onGetSigText(sigObjV, text, status) 
  {
    if(callbackStatusOK("Signature Render Bitmap", status))
    {
     // At this point you can send the contents of "text" to the server 
     // and then validate it at the server end
 
     print("Stopping script");
		 print(text);
     wizardEventController.stop();
    }
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
  color.Set (foreColor);
  wizCtl.SetProperty("ObjectForegroundColor", color, callbackRoutine);
}

function setFontBackColor(backColor, callbackRoutine)
{
  var color = new wgssSignatureSDK.Variant();
  if (backColor === "")
  {
    // Default background colour to white if not supplied
    backColor = "1R 1G 1B";
  }
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
  
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectButton, buttonObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
}
  
// Add an image to the pad display using properties already defined in the image object
function addObjectImage(imageObj, callbackRoutine, imageSource)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();
  
  xVar.Set(imageObj.xPos);
  yVar.Set(imageObj.yPos);
  objData.Set(imageObj.imageFile);
    
  wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectImage, imageObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
}
  
// Add a checkbox to the pad display using co-ordinates and options passed in as parameters
function addCheckBox(xPosition, yPosition, optionsValue, callbackRoutine)
{
  var xVar = new wgssSignatureSDK.Variant();
  var yVar = new wgssSignatureSDK.Variant();
  var objData = new wgssSignatureSDK.Variant();
  var options = new wgssSignatureSDK.Variant();

  xVar.Set(xPosition);
  yVar.Set(yPosition);
  objData.Set(" ");
  options.Set(optionsValue);

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