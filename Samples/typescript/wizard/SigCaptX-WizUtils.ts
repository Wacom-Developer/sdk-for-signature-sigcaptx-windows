/***************************************************************************
  SigCaptX-WizUtils.ts
   
  This file contains a number of common routines which are used by the wizard samples
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { BITMAP_BACKGROUNDCOLOR, BITMAP_IMAGEFORMAT, BITMAP_INKCOLOR, BITMAP_INKWIDTH, BITMAP_PADDING_X, BITMAP_PADDING_Y, textSource } from './SigCaptX-Globals';
import { WizardEventController } from './SigCaptX-WizSessionCtrl';
import { HTMLTags } from './sigcaptx';


export class WizDisplay
{
  static callback:any;
  static wizObject:any;

  // Set up the font ready for displaying the next object which could be text or a button or other object
  public static setFont(fontName, fontSize, isBold, useSymbolCharset, callbackRoutine)
  {
    var myFont = new window.sdkPtr.Font(fontName, fontSize);
    myFont.sWeight = (isBold? window.sdkPtr.FontWeight.FW_BOLD : window.sdkPtr.FontWeight.FW_NORMAL);
    if (useSymbolCharset)
    {
      myFont.sCharset = window.sdkPtr.FontCharset.SYMBOL_CHARSET;
    }
    var variantFont = new window.sdkPtr.Variant();
    variantFont.Set(myFont);
    window.wizCtl.PutFont(variantFont, callbackRoutine);
  }

  public static setFontForeColor(foreColor, callbackRoutine)
  {
    var color = new window.sdkPtr.Variant();
    if (foreColor == "")
    {
      // Default foreground colour to black if not supplied
      foreColor = "0R 0G 0B";
    }
    color.Set (foreColor);
    window.wizCtl.SetProperty("ObjectForegroundColor", color, callbackRoutine);
  }

  public static setFontBackColor(backColor, callbackRoutine)
  {
    var color = new window.sdkPtr.Variant();
    if (backColor == "")
    {
      // Default background colour to white if not supplied
      backColor = "1R 1G 1B";
    }
    color.Set (backColor);
    window.wizCtl.SetProperty("ObjectBackgroundColor", color, callbackRoutine);
  }
    
  // Add a text string to the display at co-ordinates specified by values in the text object
  public static setupTextObject(textObject, setFont, useSymbolCharSet, callbackRoutine)
  {
    WizDisplay.wizObject = textObject;
    WizDisplay.callback = callbackRoutine;

    // First set the font and any fore- and background colours if needed for colour pads
    if (setFont || WizDisplay.wizObject.fontForeColor != "")
    {
      WizDisplay.setFont(textObject.fontName, textObject.fontSize, textObject.fontBold, useSymbolCharSet, WizDisplay.setTextObjectForeColor);
    }
    else
    {
      WizDisplay.addTextObject(window.wizCtl, window.sdkPtr.ResponseStatus.OK);
    }
  }	

  public static setTextObjectForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setFont", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (WizDisplay.wizObject.fontForeColor != "")
      {
        WizDisplay.setFontForeColor(WizDisplay.wizObject.fontForeColor, WizDisplay.setTextObjectBackColor);
      }
      else
      {
        WizDisplay.addTextObject(wizCtlV, status);
      }
    }
  }

  public static setTextObjectBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setTextObjectForeColor", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      WizDisplay.setFontBackColor(WizDisplay.wizObject.fontBackColor, WizDisplay.addTextObject);
    }
  }

  public static addTextObject(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setTextObjectBackColor", status))
    {
      var xVar = new window.sdkPtr.Variant();
      var yVar = new window.sdkPtr.Variant();
      var objData = new window.sdkPtr.Variant();
      var options = new window.sdkPtr.Variant();
      
      xVar.Set(WizDisplay.wizObject.xPos);
      yVar.Set(WizDisplay.wizObject.yPos);
      objData.Set(WizDisplay.wizObject.textString);
      
      window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectText, WizDisplay.wizObject.type, xVar, yVar, objData, options, WizDisplay.callback);
    }
  }

  public static setupButtonObject(btnObject, setFont, useSymbolCharSet, callbackRoutine)
  {
    WizDisplay.wizObject = btnObject;
    WizDisplay.callback = callbackRoutine;

    // First set the font and any fore- and background colours if needed for colour pads
    if (setFont || WizDisplay.wizObject.fontForeColor != "")
    {
      WizDisplay.setFont(btnObject.fontName, btnObject.fontSize, btnObject.fontBold, useSymbolCharSet, WizDisplay.setButtonObjectForeColor);
    }
    else
    {
      WizDisplay.addButtonObject(window.wizCtl, window.sdkPtr.ResponseStatus.OK);
    }
  }	

  public static setButtonObjectForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setbuttonobjectfontforecolor", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (WizDisplay.wizObject.fontForeColor != "")
      {
        WizDisplay.setFontForeColor(WizDisplay.wizObject.fontForeColor, WizDisplay.setButtonObjectBackColor);
      }
      else
      {
        WizDisplay.addButtonObject(wizCtlV, status);
      }
    }
  }

  public static setButtonObjectBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setButtonObjectForeColor", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      WizDisplay.setFontBackColor(WizDisplay.wizObject.fontBackColor, WizDisplay.addButtonObject);
    }
  }

  public static addButtonObject(wizCtlv, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setbuttonObjectBackcolor", status))
    {
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
  }

    
  // Add an image to the pad display using properties already defined in the image object
  public static addObjectImage(imageObj, callbackRoutine, imageSource)
  {
    var xVar = new window.sdkPtr.Variant();
    var yVar = new window.sdkPtr.Variant();
    var objData = new window.sdkPtr.Variant();
    var options = new window.sdkPtr.Variant();
    
    xVar.Set(imageObj.xPos);
    yVar.Set(imageObj.yPos);
    objData.Set(imageObj.imageFile);
      
    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectImage, imageObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
  }
    
  // Add a checkbox to the pad display using co-ordinates and options passed in as parameters
  public static addCheckBox(xPosition, yPosition, optionsValue, callbackRoutine)
  {
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
  }

  // Add a signature object to the pad display 
  public static addSignatureObject(sigCtl, callbackRoutine)
  {
    var xVar = new window.sdkPtr.Variant();
    var yVar = new window.sdkPtr.Variant();
    var objData = new window.sdkPtr.Variant();
    var options = new window.sdkPtr.Variant();
      
    xVar.Set(0);
    yVar.Set(0);
    objData.Set(sigCtl);
      
    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectSignature, "Sig", xVar, yVar, objData, options, callbackRoutine);
  }
    
  // Add a rectangle to the pad display (via the wizCtl)
  public static addRectangle( rectangleObj, callbackRoutine)
  {
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
    
    window.wizCtl.AddPrimitive(window.sdkPtr.PrimitiveType.PrimitiveRectangle, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine );
  }
    
  // Add a line to the pad display (via the wizCtl)
  public static addLine(lineObj, callbackRoutine)
  {
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
  }
    

  public static setupRadio(radioObject, setFont, useSymbolCharSet, callbackRoutine)
  {
    WizDisplay.wizObject = radioObject;
    WizDisplay.callback = callbackRoutine;

    // First set the font and any fore- and background colours if needed for colour pads
    if (setFont || WizDisplay.wizObject.fontForeColor != "")
    {
      WizDisplay.setFont(radioObject.fontName, radioObject.fontSize, radioObject.fontBold, useSymbolCharSet, WizDisplay.setRadioObjectForeColor);
    }
    else
    {
      WizDisplay.addRadioButton(window.wizCtl, window.sdkPtr.ResponseStatus.OK);
    }
  }	

  public static setRadioObjectForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setRadioFont", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the radio object */
      if (WizDisplay.wizObject.fontForeColor != "")
      {
        WizDisplay.setFontForeColor(WizDisplay.wizObject.fontForeColor, WizDisplay.setRadioObjectBackColor);
      }
      else
      {
        WizDisplay.addRadioButton(wizCtlV, status);
      }
    }
  }

  public static setRadioObjectBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setRadioObjectForeColor", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the radio object */
      WizDisplay.setFontBackColor(WizDisplay.wizObject.fontBackColor, WizDisplay.addRadioButton);
    }
  }

  // Add a radio button to the pad display (via the wizCtl)
  public static addRadioButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl WizDisplay.setRadioObjectBackColor", status))
    {
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
  }
    
  // Add an input button to the pad display (via the wizCtl)
  public static addInputObject(inputObj, callbackRoutine)
  {
    var xVar = new window.sdkPtr.Variant();
    var yVar = new window.sdkPtr.Variant();
    var objData = new window.sdkPtr.Variant();
    var options = new window.sdkPtr.Variant();

    xVar.Set(0);
    yVar.Set(0);
    objData.Set(inputObj);
    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectInput, "input", xVar, yVar, objData, options, callbackRoutine);
  }
  
  // Add an input echo object to the pad display (via the wizCtl) 
  public static addInputObjectEcho(xPos, yPos, callbackRoutine)
  {
    var xVar = new window.sdkPtr.Variant();
    var yVar = new window.sdkPtr.Variant();
    var objData = new window.sdkPtr.Variant();
    var options = new window.sdkPtr.Variant();
    
    xVar.Set(xPos);
    yVar.Set(yPos);

    window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectInputEcho, "echo", xVar, yVar, objData, options, callbackRoutine);
  }
}
// Display a text message in a multi-line text box on the current HTML document
export function print(txt) 
{
  HTMLTags.txtDisplay.value += txt + "\n";
  HTMLTags.txtDisplay.scrollTop = HTMLTags.txtDisplay.scrollHeight; // scroll to end
}

export function clearTextBox()
{
  HTMLTags.txtDisplay.value = "";
}
 
/* This function simply checks the response status set by the previous callback routine and returns true or false.
   If an error status is found an error message is printed containing the name of the calling routine from 
   the parameter and the status code    */
export function callbackStatusOK ( methodName, status )
{
  if(window.sdkPtr.ResponseStatus.OK == status)
  {
    return true;
  }
  else
  {
    print(methodName + " error: " + status);
    return false;
  }
} 

// Called when the wizard script is completed and displays the image of the captured signature in the
// signature image on the HTML document. Optionally also displays the SigText string
export function showSignature()
{
  print("Showing signature");
  window.sigCtl.GetSignature(onGetSignature);
  
  function onGetSignature(sigCtlV, sigObjV, status)
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor24BPP;
      var sigObj = sigObjV;
      sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, HTMLTags.imageBox.clientWidth, HTMLTags.imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, onRenderBitmap);
    }
    else
    {
      print("Error retrieving signature");
    }
  }
  
  function onRenderBitmap(sigObjV, bmpObj, status) 
  {
    if(callbackStatusOK("Signature Render Bitmap", status))
    {
      if(null == HTMLTags.imageBox.firstChild)
      {
        HTMLTags.imageBox.appendChild(bmpObj.image);
      }
      else
      {
        HTMLTags.imageBox.replaceChild(bmpObj.image, HTMLTags.imageBox.firstChild);
      }
      if (HTMLTags.chkSigText.checked)
      {
        sigObjV.GetSigText(onGetSigText);
      }
      else
      {
        WizardEventController.stop();
      }
    } 
  }
  
  // Displays the SigText string in the text box on the HTML document
  function onGetSigText(sigObjV, text, status) 
  {
    if(callbackStatusOK("Signature Render Bitmap", status))
    {
     print("Sig text successfully obtained: " + text);
  
     // At this point you can send the contents of "text" to the server 
     // and then validate it at the server end
 
     print("Stopping script");
     WizardEventController.stop();
    }
  }
}


/* Check the HTML document to see whether the user has selected the option to use local or remote images for the button design */
export function getButtonSourceFromHTMLDoc()
{
  var buttonSource = textSource.STANDARD;

  if (HTMLTags.remoteImages.checked)
  {
    buttonSource = textSource.REMOTE;
  }
  return buttonSource;
}

