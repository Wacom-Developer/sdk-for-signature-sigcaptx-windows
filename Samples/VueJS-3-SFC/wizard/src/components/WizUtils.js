/***************************************************************************
  WizUtils.js

  This file contains various utility functions, constants and global variables

  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.

   v1.0

***************************************************************************/
import { stop } from "./SessionControl.js";

export const buttonTextSource = "";
export const BITMAP_BACKGROUNDCOLOR = 0x00FFFFFF;
export const BITMAP_IMAGEFORMAT = "bmp";
export const BITMAP_INKCOLOR = 0x00000000;
export const BITMAP_INKWIDTH = 0.7;
export const BITMAP_PADDING_X = 4;
export const BITMAP_PADDING_Y = 4;
export const LICENCEKEY = "<<license>>";
export const SERVICEPORT = 8000; //  Port used for the SigCaptX service
export const SOLIDLINE = 1; // Used for drawing lines and rectangles
export const OUTLINE = 4; // Ditto
export const CHECKBOX_USETICKSYMBOL = 2; // Specifies whether the tick symbol should be used to show that the checkbox has been clicked
export const TIMEOUT = 1500; //  Timeout value for connecting to the port used for the SigCaptX service

export const buttonEvent =
{
  NEXT: "Next",
  CHECK: "Check",
  CANCEL: "Cancel",
  CLEAR: "Clear",
  OK: "OK"
};

export const buttonFunction =
{
  PREVIOUS: "PREVIOUS",
  CANCEL: "CANCEL"
};

export const checkSize =
{
  STU300_Small: 12,
  STU300_Large: 20,
  STU430_Small: 12,
  STU430_Large: 30,
  STU500_Small: 22,
  STU500_Large: 40,
  STU5X0_Small: 22,
  STU5X0_Large: 40
};

export const checkSizeSelection =
{
  LARGE: "LARGE",
  STANDARD: "STANDARD"
};

export const padColors =
{
  BLUE: "0R 0G 0.8B",
  GREEN: "0R 0.8G 0B",
  BLACK: "0R 0G 0B",
  WHITE: "1R 1G 1B",
  PURPLE: "0.7R 0.3G 1B",
  RED: "0.6R 0G 0.2B"
};

export const padRange =
{
  STU300: "300",
  STU430: "430",
  STU500: "500",
  STU5X0: "5X0"
};

export const padType =
{
  STU300: "Wacom STU-300",
  STU430: "Wacom STU-430",
  STU500: "Wacom STU-500",
  STU5X0: "Wacom STU-520, 530, 540 or 541"
};

export const radioSelection =
{
  MALE: "Male",
  FEMALE: "Female"
};

export const textSource = {
  LOCAL: 1,
  REMOTE: 2,
  UTF8: 3,
  STANDARD: 4
};

// Set up the functions used for defining the various objects which are to be displayed on the pad
export function TextObject ()
{
  this.textString = "";
  this.xPos = "";
  this.yPos = "";
  this.fontName = "";
  this.fontSize = 0;
  this.fontBackColor = "";
  this.fontForeColor = "";
}

export function CheckboxObject ()
{
  this.xPos = "";
  this.yPos = "";
  this.options = "";
  this.fontName = "";
  this.fontSize = "";
  this.fontBackColor = "";
  this.fontForeColor = "";
}

export function RadioObject ()
{
  this.xPos = "";
  this.yPos = "";
  this.buttonLabel = "";
  this.groupName = "";
  this.buttonChecked = "";
  this.fontBackColor = "";
  this.fontForeColor = "";
}

export function ButtonObject ()
{
  this.xPos = "";
  this.yPos = "";
  this.buttonType = "";
  this.buttonText = "";
  this.width = "";
  this.imageFile = "";
  this.fontBackColor = "";
  this.fontForeColor = "";
}

export function RectangleObject ()
{
  this.x1Pos = "";
  this.y1Pos = "";
  this.x2Pos = "";
  this.y2Pos = "";
  this.lineWidth = "";
  this.options = "";
  this.fontBackColor = "";
  this.fontForeColor = "";
}

export function LineObject ()
{
  this.x1Pos = "";
  this.y1Pos = "";
  this.x2Pos = "";
  this.y2Pos = "";
  this.lineWidth = "";
  this.options = "";
  this.fontBackColor = "";
  this.fontForeColor = "";
}

export const userMessage = (msg) =>
{
  const msgBox = document.getElementById("txtDisplay");
  msgBox.value += msg + "\n";
  msgBox.scrollTop = msgBox.scrollHeight;
};

// Set up the font ready for displaying the next object which could be text or a button or other object
export const setFont = (wizCtlV, fontName, fontSize, isBold, useSymbolCharset, callbackRoutine) =>
{
  const myFont = new window.wgssSignatureSDK.Font(fontName, fontSize);
  myFont.sWeight = (isBold ? window.wgssSignatureSDK.FontWeight.FW_BOLD : window.wgssSignatureSDK.FontWeight.FW_NORMAL);
  if (useSymbolCharset)
  {
    myFont.sCharset = window.wgssSignatureSDK.FontCharset.SYMBOL_CHARSET;
  }
  const variantFont = new window.wgssSignatureSDK.Variant();
  variantFont.Set(myFont);
  wizCtlV.PutFont(variantFont, callbackRoutine);
};

export const setFontForeColor = (wizCtlV, foreColor, callbackRoutine) =>
{
  const color = new window.wgssSignatureSDK.Variant();
  if (foreColor === "")
  {
    // Default foreground colour to black if not supplied
    foreColor = padColors.BLACK;
  }
  color.Set(foreColor);
  wizCtlV.SetProperty("ObjectForegroundColor", color, callbackRoutine);
};

export const setFontBackColor = (wizCtlV, backColor, callbackRoutine) =>
{
  const color = new window.wgssSignatureSDK.Variant();
  if (backColor === "")
  {
    // Default background colour to white if not supplied
    backColor = padColors.WHITE;
  }
  color.Set(backColor);
  wizCtlV.SetProperty("ObjectBackgroundColor", color, callbackRoutine);
};

export const addTextObject = (wizCtlV, textObject, callbackRoutine) =>
{
  const xVar = new window.wgssSignatureSDK.Variant();
  const yVar = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  xVar.Set(textObject.xPos);
  yVar.Set(textObject.yPos);
  objData.Set(textObject.textString);

  wizCtlV.AddObject(window.wgssSignatureSDK.ObjectType.ObjectText, textObject.type, xVar, yVar, objData, options, callbackRoutine);
};

// Add a button to the pad display using properties already defined in the button object
export const addButtonObject = (wizCtlV, buttonObj, callbackRoutine) =>
{
  const xVar = new window.wgssSignatureSDK.Variant();
  const yVar = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  xVar.Set(buttonObj.xPos);
  yVar.Set(buttonObj.yPos);
  objData.Set(buttonObj.buttonText);
  options.Set(buttonObj.width);

  wizCtlV.AddObject(window.wgssSignatureSDK.ObjectType.ObjectButton, buttonObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
};

// Add an image to the pad display using properties already defined in the image object
export const addObjectImage = (wizCtlV, imageObj, callbackRoutine) =>
{
  const xVar = new window.wgssSignatureSDK.Variant();
  const yVar = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  xVar.Set(imageObj.xPos);
  yVar.Set(imageObj.yPos);
  objData.Set(imageObj.imageFile);

  wizCtlV.AddObject(window.wgssSignatureSDK.ObjectType.ObjectImage, imageObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
};

// Add a checkbox to the pad display using co-ordinates and options passed in as parameters
export const addCheckBox = (wizCtlV, xPosition, yPosition, optionsValue, callbackRoutine) =>
{
  const xVar = new window.wgssSignatureSDK.Variant();
  const yVar = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  xVar.Set(xPosition);
  yVar.Set(yPosition);
  objData.Set(" ");
  options.Set(optionsValue);

  wizCtlV.AddObject(window.wgssSignatureSDK.ObjectType.ObjectCheckbox, "Check", xVar, yVar, objData, options, callbackRoutine);
};

// Add a signature object to the pad display
export const addSignatureObject = (wizCtlV, sigCtl, callbackRoutine) =>
{
  const xVar = new window.wgssSignatureSDK.Variant();
  const yVar = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  xVar.Set(0);
  yVar.Set(0);
  objData.Set(sigCtl);

  wizCtlV.AddObject(window.wgssSignatureSDK.ObjectType.ObjectSignature, "Sig", xVar, yVar, objData, options, callbackRoutine);
};

// Add a rectangle to the pad display (via the wizCtl)
export const addRectangle = (wizCtlV, rectangleObj, callbackRoutine) =>
{
  const x1Var = new window.wgssSignatureSDK.Variant();
  const y1Var = new window.wgssSignatureSDK.Variant();
  const x2Var = new window.wgssSignatureSDK.Variant();
  const y2Var = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  x1Var.Set(rectangleObj.x1Pos);
  y1Var.Set(rectangleObj.y1Pos);
  x2Var.Set(rectangleObj.x2Pos);
  y2Var.Set(rectangleObj.y2Pos);
  objData.Set(rectangleObj.lineWidth);
  options.Set(rectangleObj.options);

  wizCtlV.AddPrimitive(window.wgssSignatureSDK.PrimitiveType.PrimitiveRectangle, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine);
};

// Add a line to the pad display (via the wizCtl)
export const addLine = (wizCtlV, lineObj, callbackRoutine) =>
{
  const x1Var = new window.wgssSignatureSDK.Variant();
  const y1Var = new window.wgssSignatureSDK.Variant();
  const x2Var = new window.wgssSignatureSDK.Variant();
  const y2Var = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  x1Var.Set(lineObj.x1Pos);
  y1Var.Set(lineObj.y1Pos);
  x2Var.Set(lineObj.x2Pos);
  y2Var.Set(lineObj.y2Pos);
  objData.Set(lineObj.lineWidth);
  options.Set(lineObj.options);

  wizCtlV.AddPrimitive(window.wgssSignatureSDK.PrimitiveType.PrimitiveLine, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine);
};

// Add a radio button to the pad display (via the wizCtl)
export const addRadioButton = (wizCtlV, radioButtonObj, callbackRoutine) =>
{
  const xVar = new window.wgssSignatureSDK.Variant();
  const yVar = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();
  const objOptn = new window.wgssSignatureSDK.ObjectOptions();

  xVar.Set(radioButtonObj.xPos);
  yVar.Set(radioButtonObj.yPos);

  objData.Set(radioButtonObj.buttonLabel);
  objOptn.AddOption("Group", radioButtonObj.groupName);
  objOptn.AddOption("Checked", radioButtonObj.buttonChecked);
  options.Set(objOptn);

  wizCtlV.AddObject(window.wgssSignatureSDK.ObjectType.ObjectRadioButton, radioButtonObj.buttonLabel, xVar, yVar, objData, options, callbackRoutine);
};

// Add an input button to the pad display (via the wizCtl)
export const addInputObject = (wizCtlV, inputObj, callbackRoutine) =>
{
  const xVar = new window.wgssSignatureSDK.Variant();
  const yVar = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  xVar.Set(0);
  yVar.Set(0);
  objData.Set(inputObj);
  wizCtlV.AddObject(window.wgssSignatureSDK.ObjectType.ObjectInput, "input", xVar, yVar, objData, options, callbackRoutine);
};

// Add an input echo object to the pad display (via the wizCtl)
export const addInputObjectEcho = (wizCtlV, xPos, yPos, callbackRoutine) =>
{
  const xVar = new window.wgssSignatureSDK.Variant();
  const yVar = new window.wgssSignatureSDK.Variant();
  const objData = new window.wgssSignatureSDK.Variant();
  const options = new window.wgssSignatureSDK.Variant();

  xVar.Set(xPos);
  yVar.Set(yPos);

  wizCtlV.AddObject(window.wgssSignatureSDK.ObjectType.ObjectInputEcho, "echo", xVar, yVar, objData, options, callbackRoutine);
};

export const showSignature = (sigCtl, wizCtl) =>
{
  sigCtl.GetSignature(onGetSignature);

  function onGetSignature (sigCtlV, sigObjV, status)
  {
    if (window.wgssSignatureSDK.ResponseStatus.OK === status)
    {
      const outputFlags = window.wgssSignatureSDK.RBFlags.RenderOutputPicture | window.wgssSignatureSDK.RBFlags.RenderColor24BPP;
      const imageBox = document.getElementById("imageBox");
      const sigObj = sigObjV;
      sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, imageBox.clientWidth, imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, onRenderBitmap);
    }
    else
    {
      document.getElementById("statusText").innerHTML += "<br>Error retrieving signature";
    }
  }

  function onRenderBitmap (sigObjV, bmpObj, status)
  {
    if (callbackStatusOK("Signature Render Bitmap", status))
    {
      const imageBox = document.getElementById("imageBox");
      if (imageBox.firstChild === null)
      {
        imageBox.appendChild(bmpObj.image);
      }
      else
      {
        imageBox.replaceChild(bmpObj.image, imageBox.firstChild);
      }
      if (document.getElementById("chkSigText").checked)
      {
        sigObjV.GetSigText(onGetSigText);
      }
      else
      {
        stop(wizCtl);
      }
    }
  }

  // Displays the SigText string in the text box on the HTML document
  function onGetSigText (sigObjV, text, status)
  {
    if (callbackStatusOK("Signature Render Bitmap", status))
    {
      // userMessage("Sig text successfully obtained: " + text);

      // At this point you can send the contents of "text" to the server
      // and then validate it at the server end

      userMessage(text);
      userMessage("Stopping script");
      stop(wizCtl);
    }
  }
};

/* This function simply checks the response status set by the previous callback routine and returns true or false.
   If an error status is found an error message is printed containing the name of the calling routine from
   the parameter and the status code    */
export const callbackStatusOK = (methodName, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    return true;
  }
  else
  {
    userMessage(methodName + " error: " + status);
    return false;
  }
};
