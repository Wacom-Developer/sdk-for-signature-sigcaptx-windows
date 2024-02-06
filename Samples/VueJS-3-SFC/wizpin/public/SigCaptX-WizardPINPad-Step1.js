/* **************************************************************************
  SigCaptX-WizardPINPad-Step1.js

  The function step1() is the controlling routine for setting up and displaying the objects
  on the PIN pad screen - in this case this is the first and only screen in the wizard sequence.
  The objects themselves are set up in SigCaptX-WizardPINPad-PadDefs.js

  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.

   v1.0

***************************************************************************/

import { addButtonObject, addInputObject, addInputObjectEcho, addTextObject, buttonEvent, callbackStatusOK, PIN_MAXLENGTH, PIN_MINLENGTH, setFont, setFontBackColor, setFontForeColor, userMessage } from "../src/components/WizUtils.js";
import { actionWhenRestarted, scriptCancelled, scriptCompleted } from "../src/components/SessionControl.js";

let inputObj = null;
let Scrn1 = null;
let wizCtlCopy = null;

/* step1() is the controlling routine for setting up and displaying the objects on the screen. */
export const step1 = (wizCtl, Screen1) =>
{
  // Keep module copies of the 2 variables passed in as parameters so they can be referred to later
  // without having to be passed around multiple times from one function to the next
  Scrn1 = Screen1;
  wizCtlCopy = wizCtl;

  wizCtl.Reset(step1_onWizCtlReset);
};

const step1_onWizCtlReset = (wizCtlV, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    setFont(wizCtlV, Scrn1.enterBelow.fontName, Scrn1.enterBelow.fontSize, Scrn1.enterBelow.fontBold, false, onPutFontEnterBelow);
  }
  else
  {
    if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
    {
      actionWhenRestarted(window.step1);
    }
  }
};

/* Add the text object "Enter a 4 digit PIN code below...." */
const onPutFontEnterBelow = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontEnterBelow", status))
  {
    // If font colour is required do it now
    if (Scrn1.enterBelow.fontForeColor !== null && Scrn1.enterBelow.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn1.enterBelow.fontForeColor, step1_onSetFontForeColorEnterBelow);
    }
    else
    {
      addTextObject(wizCtlV, Scrn1.enterBelow, step1_onAddEnterBelow);
    }
  }
};

const step1_onSetFontForeColorEnterBelow = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColorEnterBelow", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn1.enterBelow.fontBackColor, step1_onSetFontBackColorEnterBelow);
  }
};

const step1_onSetFontBackColorEnterBelow = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColorEnterBelow", status))
  {
    // After setting up the font colours set up the text string itself
    addTextObject(wizCtlV, Scrn1.enterBelow, step1_onAddEnterBelow);
  }
};

/* Next 9 functions - add the buttons for the 9 PINs */
const step1_onAddEnterBelow = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl step1 AddEnterBelow", status))
  {
    // If font colour is required do it now
    if (Scrn1.pin1.fontForeColor !== null && Scrn1.pin1.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn1.pin1.fontForeColor, step1_onSetFontForeColorPin1);
    }
    else
    {
      addButtonObject(wizCtlV, Scrn1.pin1, step1_onAddPin1Button);
    }
  }
};

const step1_onSetFontForeColorPin1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColorPin1", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn1.pin1.fontBackColor, step1_onSetFontBackColorPin1);
  }
};

const step1_onSetFontBackColorPin1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColorPin1", status))
  {
    // After setting up the font colours set up the text string itself
    addButtonObject(wizCtlV, Scrn1.pin1, step1_onAddPin1Button);
  }
};

const step1_onAddPin1Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontEnterBelow", status))
  {
    addButtonObject(wizCtlV, Scrn1.pin2, onAddPin2Button);
  }
};

const onAddPin2Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPin2Button", status))
  {
    addButtonObject(wizCtlV, Scrn1.pin3, onAddPin3Button);
  }
};

const onAddPin3Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPin3Button", status))
  {
    addButtonObject(wizCtlV, Scrn1.pin4, onAddPin4Button);
  }
};

const onAddPin4Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPin4Button", status))
  {
    addButtonObject(wizCtlV, Scrn1.pin5, onAddPin5Button);
  }
};

const onAddPin5Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPin5Button", status))
  {
    addButtonObject(wizCtlV, Scrn1.pin6, onAddPin6Button);
  }
};

const onAddPin6Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPin6Button", status))
  {
    addButtonObject(wizCtlV, Scrn1.pin7, onAddPin7Button);
  }
};

const onAddPin7Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPin7Button", status))
  {
    addButtonObject(wizCtlV, Scrn1.pin8, onAddPin8Button);
  }
};

const onAddPin8Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPin8Button", status))
  {
    addButtonObject(wizCtlV, Scrn1.pin9, onAddPin9Button);
  }
};

/* Next create the input object for accepting the input from the user */
const onAddPin9Button = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPin9Button", status))
  {
    inputObj = new window.wgssSignatureSDK.InputObj(onInputObjCtr);
  }
};

const onInputObjCtr = (inputObjV, status) =>
{
  if (callbackStatusOK("InputObj constructor", status))
  {
    inputObjV.PutMinLength(PIN_MINLENGTH, onInputObjMinLen);
  }
};

/* The input obj has a minimum and maximum length */
const onInputObjMinLen = (inputObjV, status) =>
{
  if (callbackStatusOK("InputObj PutMinLength", status))
  {
    inputObjV.PutMaxLength(PIN_MAXLENGTH, onInputObjMaxLen);
  }
};

const onInputObjMaxLen = (inputObjV, status) =>
{
  if (callbackStatusOK("InputObj PutMaxLength", status))
  {
    addInputObject(wizCtlCopy, inputObjV, onAddObjectInput);
  }
};

/* Now add the input echo object */
const onAddObjectInput = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl addInputObj", status))
  {
    addInputObjectEcho(wizCtlCopy, "centre", Scrn1.yInputEcho, onAddObjectInputEcho);
  }
};

/* Finally add the Next and Cancel buttons */
const onAddObjectInputEcho = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddInputEcho", status))
  {
    // If font colour is required do it now
    if (Scrn1.cancelButton.fontForeColor !== null && Scrn1.cancelButton.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn1.cancelButton.fontForeColor, step1_onSetFontForeColorCancelButton);
    }
    else
    {
      addButtonObject(wizCtlV, Scrn1.cancelButton, step1_onAddCancelButton);
    }
  }
};

const step1_onSetFontForeColorCancelButton = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColorCancelButton", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn1.cancelButton.fontBackColor, step1_onSetFontBackColorCancelButton);
  }
};

const step1_onSetFontBackColorCancelButton = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColorCancelButton", status))
  {
    // After setting up the font colours set up the text string itself
    addButtonObject(wizCtlV, Scrn1.cancelButton, step1_onAddCancelButton);
  }
};

const step1_onAddCancelButton = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddCancelButtno", status))
  {
    addButtonObject(wizCtlV, Scrn1.nextButton, onAddNextButton);
  }
};

const onAddNextButton = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddNextButton", status))
  {
    wizCtlV.Display(onDisplay);
  }
};

const onDisplay = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl Display", status))
  {
    wizCtlV.SetEventHandler(step1_Handler);
  }
};

/* This function handles the events generated by the user input on the pad */
const step1_Handler = (ctl, id, type, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    switch (id)
    {
      case "input":
        switch (type)
        {
          case 4:
            break; // userMessage("min chars entered")
          case 5:
            break; // userMessage("max chars entered")
          case 6:
            break; // userMessage("attempted to exceed min/max chars")
          default:
            userMessage("Input unexpected type: " + type);
            break;
        }
        break;
      case buttonEvent.CLEAR:
        break; // handled by the InputObj control
      case buttonEvent.OK:
        inputObj.GetText(onInputObjGetText);
        break;
      case buttonEvent.CANCEL:
        userMessage("Cancel");
        scriptCompleted(true, wizCtlCopy);
        break;
      default:
        userMessage("Exception: step1_Handler(): " + "unexpected event: " + id);
        break;
    }
  }
  else
  {
    userMessage("Wizard window closed");
    scriptCancelled();
  }
};

/* Called when user clicks OK to signify that PIN input is complete */
const onInputObjGetText = (inputObjV, text, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    userMessage("Code entered: " + text);
    scriptCompleted(true, wizCtlCopy);
  }
  else
  {
    userMessage("InputObj GetText error: " + status);
    scriptCancelled(wizCtlCopy);
  }
};
