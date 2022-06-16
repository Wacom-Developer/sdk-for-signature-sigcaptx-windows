/* **************************************************************************
  SigCaptX-Wizard-Main.js

  This file contains the main functions for displaying the 3 screens in the
  wizard sequence and processing the input from the user

  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.

  v1.0

***************************************************************************/
/* eslint-disable camelcase */

import { addButtonObject, addCheckBox, addLine, addObjectImage, addRadioButton, addRectangle, addSignatureObject, addTextObject, buttonEvent, callbackStatusOK, padColors, padRange, padType, radioSelection, setFont, setFontBackColor, setFontForeColor, textSource, userMessage } from "../src/components/WizUtils.js";
import { actionWhenRestarted, scriptCancelled, scriptCompleted } from "../src/components/SessionControl.js";

let buttonSource = textSource.STANDARD;
let padDefs = null;
let Scrn1 = null;
let Scrn2 = null;
let Scrn3 = null;
let sigCtlCopy = null;
let wizCtlTest = null;

/* The const step1() is the controlling routine for setting up and displaying the objects
   on the first screen in the wizard sequence. This is the screen with the checkbox */
export const step1 = (wizCtl, sigCtl, pad, Screen1, Screen2, Screen3, buttonTextSource) =>
{
  // First take localised copies of the function parameters so that they can be used in
  // the functions that follow below without having to be continually passed around
  Scrn1 = Screen1;
  Scrn2 = Screen2;
  Scrn3 = Screen3;
  padDefs = pad;
  sigCtlCopy = sigCtl;
  buttonSource = buttonTextSource;

  wizCtl.Reset(step1_onWizCtlReset);
};

const step1_onWizCtlReset = (wizCtlV, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    setFont(wizCtlV, Scrn1.stepMsg1.fontName, Scrn1.stepMsg1.fontSize, Scrn1.stepMsg1.fontBold, false, step1_onPutFontStepMsg1);
  }
  else
  {
    if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
    {
      actionWhenRestarted(window.Step1);
    }
  }
};

const step1_onPutFontStepMsg1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontStepMsg1", status))
  {
    addTextObject(wizCtlV, Scrn1.stepMsg1, step1_onAddTextStep1);
  }
};

const step1_onAddTextStep1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddTextObjectStep1", status))
  {
    if (padDefs.Range === padRange.STU300)
    {
      addLine(wizCtlV, Scrn1.step1Line, step1_onAddRectangle);
    }
    else
    {
      addRectangle(wizCtlV, Scrn1.step1Rectangle, step1_onAddRectangle);
    }
  }
};

const step1_onAddRectangle = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl Primitive", status))
  {
    setFont(wizCtlV, Scrn1.infoText.fontName, Scrn1.infoText.fontSize, Scrn1.infoText.fontBold, false, step1_onPutFontInfoText);
  }
};

const step1_onPutFontInfoText = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontInfoText", status))
  {
    /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
    if (Scrn1.infoText.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn1.infoText.fontForeColor, step1_onSetFontForeColor);
    }
    else
    {
      addTextObject(wizCtlV, Scrn1.infoText, step1_onAddTextInfoText);
    }
  }
  else
  {
    addTextObject(wizCtlV, Scrn1.infoText, step1_onAddTextInfoText);
  }
};

const step1_onSetFontForeColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColor", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn1.infoText.fontBackColor, step1_onSetFontBackColor);
  }
};

const step1_onSetFontBackColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColor", status))
  {
    // After setting up the font colours set up the text string itself
    addTextObject(wizCtlV, Scrn1.infoText, step1_onAddTextInfoText);
  }
};

const step1_onAddTextInfoText = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddTextInfoText", status))
  {
    setFont(wizCtlV, Scrn1.checkboxObj.fontName, Scrn1.checkboxObj.fontSize, Scrn1.checkboxObj.fontBold, false, step1_onPutFontCheckbox);
  }
};

const step1_onPutFontCheckbox = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontCheckbox", status))
  {
    addCheckBox(wizCtlV, Scrn1.checkboxObj.xPos, Scrn1.checkboxObj.yPos, Scrn1.checkboxObj.options, step1_onAddCheck);
  }
};

const step1_onAddCheck = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddCheck", status))
  {
    setFont(wizCtlV, Scrn1.signingText.fontName, Scrn1.signingText.fontSize, Scrn1.signingText.fontBold, false, step1_onPutFontSigningText);
  }
};

const step1_onPutFontSigningText = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontSigningText", status))
  {
    /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
    if (Scrn1.signingText.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn1.signingText.fontForeColor, step1_onSetSigningTextFontForeColor);
    }
    else
    {
      addTextObject(wizCtlV, Scrn1.signingText, step1_onAddTextSigningText);
    }
  }
};

const step1_onSetSigningTextFontForeColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetSigningTextFontForeColor", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn1.signingText.fontBackColor, step1_onSetSigningTextFontBackColor);
  }
};

const step1_onSetSigningTextFontBackColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetSigningTextFontBackColor", status))
  {
    // After setting up the font colours set up the text string itself
    addTextObject(wizCtlV, Scrn1.signingText, step1_onAddTextSigningText);
  }
};

const step1_onAddTextSigningText = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddTextSigningText", status))
  {
    if (Scrn1.nextToContinue.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn1.nextToContinue.fontForeColor, step1_onSetContinueTextFontForeColor);
    }
    else
    {
      addTextObject(wizCtlV, Scrn1.nextToContinue, step1_onAddTextNextCont);
    }
  }
};

const step1_onSetContinueTextFontForeColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetContinueTextFontForeColor", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn1.nextToContinue.fontBackColor, step1_onSetContinueTextFontBackColor);
  }
};

const step1_onSetContinueTextFontBackColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetContinueTextFontBackColor", status))
  {
    // After setting up the font colours set up the text string itself
    addTextObject(wizCtlV, Scrn1.nextToContinue, step1_onAddTextNextCont);
  }
};

const step1_onAddTextNextCont = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddTextNextCont", status))
  {
    setFont(wizCtlV, padDefs.Font, Scrn1.cancelButton.buttonSize, Scrn1.cancelButton.buttonBold, false, step1_onPutFontCancel);
  }
};

const step1_onPutFontCancel = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontCancel", status))
  {
    if (buttonSource === textSource.STANDARD || buttonSource === textSource.UTF8)
    {
      // Set up font colours if required for colour pads
      if (Scrn1.cancelButton.fontForeColor !== "")
      {
        setFontForeColor(wizCtlV, Scrn1.cancelButton.fontForeColor, step1_onSetCancelButtonFontForeColor);
      }
      else
      {
        addButtonObject(wizCtlV, Scrn1.cancelButton, step1_onAddCancelButton);
      }
    }
    else
    {
      addObjectImage(wizCtlV, Scrn1.cancelButton, step1_onAddCancelButton, Scrn1.cancelButton.imageFile);
    }
  }
};

const step1_onSetCancelButtonFontForeColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl setFontCancelButtonForeColor", status))
  {
    setFontBackColor(wizCtlV, Scrn1.cancelButton.fontBackColor, step1_onSetCancelButtonFontBackColor);
  }
};

const step1_onSetCancelButtonFontBackColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl setCancelButtonFontBackColor", status))
  {
    addButtonObject(wizCtlV, Scrn1.cancelButton, step1_onAddCancelButton);
  }
};

const step1_onAddCancelButton = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddCancelButton", status))
  {
    /* If the user has chosen to use images for the buttons then add the image object, otherwise a standard button object */
    if (buttonSource === textSource.STANDARD || buttonSource === textSource.UTF8)
    {
      addButtonObject(wizCtlV, Scrn1.nextButton, step1_onAddNextButton);
    }
    else
    {
      addObjectImage(wizCtlV, Scrn1.nextButton, step1_onAddNextButton);
    }
  }
};

const step1_onAddNextButton = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddNextButton", status))
  {
    wizCtlTest = wizCtlV;
    wizCtlV.Display(step1_onDisplay);
  }
};

const step1_onDisplay = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl Display", status))
  {
    wizCtlV.SetEventHandler(step1_Handler);
  }
};

/* This is the event handler for the user input on the first screen of the wizard */
const step1_Handler = (wizCtlV, id, type, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    switch (id)
    {
      case buttonEvent.NEXT:
        wizCtlTest.GetObjectState("Check", step1_onGetObjectState);
        break;
      case buttonEvent.CHECK:
        break;
      case buttonEvent.CANCEL:
        scriptCancelled(wizCtlTest);
        break;
      default:
        userMessage("Unexpected event: " + id);
        alert("Unexpected event: " + id);
        break;
    }
  }
  else
  {
    scriptCancelled(wizCtlTest);
  }
};

const step1_onGetObjectState = (wizCtlV, objState, status) =>
{
  if (window.wgssSignatureSDK.VariantType.VARIANT_NUM === objState.type && objState.num === 1)
  {
    // userMessage("Check box was selected");
  }
  step2(wizCtlTest);
};

/* The const step2() is the controlling routine for setting up and displaying the objects
   on the screen screen in the wizard sequence, i.e. the one with the radio buttons */
export const step2 = (wizCtlV) =>
{
  wizCtlV.Reset(step2_onWizCtlReset);
};

const step2_onWizCtlReset = (wizCtlV, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    setFont(wizCtlV, Scrn2.stepMsg2.fontName, Scrn2.stepMsg2.fontSize, Scrn2.stepMsg2.fontWeight, false, step2_onPutFont);
  }
  else
  {
    if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
    {
      actionWhenRestarted(window.Step2);
    }
  }
};

const step2_onPutFont = (wizCtlV, status) =>
{
  let fontForeColor = "";

  if (callbackStatusOK("WizCtl PutFont", status))
  {
    // In case font colours were changed on the previous screen make sure we revert to black on white now
    if (padDefs.Range === padRange.STU5X0)
    {
      if (Scrn2.stepMsg2.fontForeColor !== "")
      {
        fontForeColor = Scrn2.stepMsg2.fontForeColor;
      }
      else
      {
        fontForeColor = padColors.BLACK;
      }
      setFontForeColor(wizCtlV, fontForeColor, step2_onSetStepMsg2FontForeColor);
    }
    else
    {
      // For monochrome pads skip the setting of font colours
      addTextObject(wizCtlV, Scrn2.stepMsg2, step2_onAddText1);
    }
  }
};

const step2_onSetStepMsg2FontForeColor = (wizCtlV, status) =>
{
  let fontBackColor = "";

  if (callbackStatusOK("WizCtl setStepMsg2FontForeColor", status))
  {
    if (Scrn2.stepMsg2.fontBackColor !== "")
    {
      fontBackColor = Scrn2.stepMsg2.fontBackColor;
    }
    else
    {
      fontBackColor = padColors.WHITE;
    }
    setFontBackColor(wizCtlV, fontBackColor, step2_onSetStepMsg2FontBackColor);
  }
};

const step2_onSetStepMsg2FontBackColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl setStepMsg2FontBackColor", status))
  {
    addTextObject(wizCtlV, Scrn2.stepMsg2, step2_onAddText1);
  }
};

const step2_onAddText1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddObject", status))
  {
    if (padDefs.Range === padRange.STU300)
    {
      addLine(wizCtlV, Scrn2.step1Line, step2_onAddPrimitive1);
    }
    else
    {
      addRectangle(wizCtlV, Scrn2.step1Rectangle, step2_onAddPrimitive1);
    }
  }
};

const step2_onAddPrimitive1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl Primitive", status))
  {
    setFont(wizCtlV, Scrn2.infoObject.fontName, Scrn2.infoObject.fontSize, Scrn2.infoObject.fontBold, false, step2_onPutFont2);
  }
};

// Now add this text to the WizCtl: "Radio buttons provide options for the signing process and can be transferred to the document"
const step2_onPutFont2 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFont2", status))
  {
    /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
    if (Scrn2.infoObject.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn2.infoObject.fontForeColor, step2_onSetFontForeColorInfoObject);
    }
    else
    {
      addTextObject(wizCtlV, Scrn2.infoObject, step2_onAddText3);
    }
  }
};

const step2_onSetFontForeColorInfoObject = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColorInfoObject", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn2.infoObject.fontBackColor, step2_onSetFontBackColorInfoObject);
  }
};

const step2_onSetFontBackColorInfoObject = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColorInfoObject", status))
  {
    // After setting up the font colours set up the text string itself
    addTextObject(wizCtlV, Scrn2.infoObject, step2_onAddText3);
  }
};

const step2_onAddText3 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddText3", status))
  {
    addTextObject(wizCtlV, Scrn2.nextToContinue, step2_onAddText4);
  }
};

const step2_onAddText4 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddText4", status))
  {
    setFont(wizCtlV, padDefs.Font, padDefs.ButtonSize, padDefs.TextBold, false, step2_onPutFont5);
  }
};

const step2_onPutFont5 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFont5", status))
  {
    if (Scrn2.maleRadio.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn2.maleRadio.fontForeColor, step2_onSetFontForeColorMaleRadio);
    }
    else
    {
      addRadioButton(wizCtlV, Scrn2.maleRadio, step2_onAddRadioButton1);
    }
  }
};

const step2_onSetFontForeColorMaleRadio = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColorMaleRadio", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn2.maleRadio.fontBackColor, step2_onSetFontBackColorMaleRadio);
  }
};

const step2_onSetFontBackColorMaleRadio = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColorMaleRadio", status))
  {
    // After setting up the font colours set up the radio button itself
    addRadioButton(wizCtlV, Scrn2.maleRadio, step2_onAddRadioButton1);
  }
};

const step2_onAddRadioButton1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddRadioButton1", status))
  {
    addRadioButton(wizCtlV, Scrn2.femaleRadio, step2_onAddRadioButton2);
  }
};

const step2_onAddRadioButton2 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddRadioButton2", status))
  {
    if (buttonSource === textSource.STANDARD || buttonSource === textSource.UTF8)
    {
      // Set up font colours if required for colour pads
      if (Scrn2.cancelButton.fontForeColor !== "")
      {
        setFontForeColor(wizCtlV, Scrn2.cancelButton.fontForeColor, step2_onSetCancelButtonFontForeColor);
      }
      else
      {
        addButtonObject(wizCtlV, Scrn2.cancelButton, step2_onAddCancelButton);
      }
    }
    else
    {
      // print("Adding button as an image from source " + buttonSource);
      addObjectImage(wizCtlV, Scrn2.cancelButton, step2_onAddCancelButton);
    }
  }
};

const step2_onSetCancelButtonFontForeColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl step2_setFontCancelButtonForeColor", status))
  {
    setFontBackColor(wizCtlV, Scrn2.cancelButton.fontBackColor, step2_onSetCancelButtonFontBackColor);
  }
};

const step2_onSetCancelButtonFontBackColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl step2_setCancelButtonFontBackColor", status))
  {
    addButtonObject(wizCtlV, Scrn2.cancelButton, step2_onAddCancelButton);
  }
};

const step2_onAddCancelButton = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddCancelButton", status))
  {
    if (buttonSource === textSource.STANDARD || buttonSource === textSource.UTF8)
    {
      addButtonObject(wizCtlV, Scrn2.nextButton, step2_onAddNextButton);
    }
    else
    {
      addObjectImage(wizCtlV, Scrn2.nextButton, step2_onAddNextButton);
    }
  }
};

const step2_onAddNextButton = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddNextButton", status))
  {
    wizCtlV.Display(step2_onDisplay);
  }
};

const step2_onDisplay = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl Display", status))
  {
    wizCtlV.SetEventHandler(step2_Handler);
  }
};

/* This is the event handler for the user input on the second screen of the wizard */
const step2_Handler = (ctl, id, type, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    switch (id)
    {
      case buttonEvent.NEXT:
        step3(ctl);
        break;
      case buttonEvent.CHECK:
        break;
      case buttonEvent.CANCEL:
        step1(wizCtlTest, sigCtlCopy, padDefs, Scrn1, Scrn2, Scrn3, buttonSource);
        break;
      case radioSelection.MALE:
        break;
      case radioSelection.FEMALE:
        break;
      default:
        userMessage("Unexpected event: " + id);
        alert("Unexpected event: " + id);
        break;
    }
  }
  else
  {
    userMessage("Wizard window closed");
    scriptCancelled(wizCtlTest);
  }
};

/* The const step3() is the controlling routine for setting up and displaying the objects
   on the third screen in the wizard sequence i.e. the signature capture itself.
   The objects themselves are set up in SigCaptX-Wizard-PadDefs.js */
export const step3 = (wizCtlV) =>
{
  wizCtlTest.Reset(step3_onWizCtlReset);
};

const step3_onWizCtlReset = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl Reset", status))
  {
    setFont(wizCtlV, Scrn3.stepMsg3.fontName, Scrn3.stepMsg3.fontSize, Scrn3.stepMsg3.fontBold, false, step3_onPutFont);
  }
};

const step3_onPutFont = (wizCtlV, status) =>
{
  let fontForeColor = "";

  if (callbackStatusOK("WizCtl step3 PutFont", status))
  {
    // In case font colours were changed on the previous screen make sure we revert to black on white now

    if (padDefs.Range === padRange.STU5X0)
    {
      if (Scrn3.stepMsg3.fontForeColor !== "")
      {
        fontForeColor = Scrn3.stepMsg3.fontForeColor;
      }
      else
      {
        fontForeColor = padColors.BLACK;
      }
      setFontForeColor(wizCtlV, fontForeColor, step3_onSetStepMsg3FontForeColor);
    }
    else
    {
      addTextObject(wizCtlV, Scrn3.stepMsg3, step3_onAddText1);
    }
  }
};

const step3_onSetStepMsg3FontForeColor = (wizCtlV, status) =>
{
  let fontBackColor = "";

  if (callbackStatusOK("WizCtl setStepMsg3FontForeColor", status))
  {
    if (Scrn3.stepMsg3.fontBackColor !== "")
    {
      fontBackColor = Scrn3.stepMsg3.fontBackColor;
    }
    else
    {
      fontBackColor = padColors.WHITE;
    }
    setFontBackColor(wizCtlV, fontBackColor, step3_onSetStepMsg3FontBackColor);
  }
};

const step3_onSetStepMsg3FontBackColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl setStepMsg2FontBackColor", status))
  {
    addTextObject(wizCtlV, Scrn3.stepMsg3, step3_onAddText1);
  }
};

const step3_onAddText1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddText1", status))
  {
    /* Because of the very different dimensions of the STU 300 we have to have use a different layout for the buttons and text etc
        so there are separate routines just for the 300 */
    if (padType.STU300 === padDefs.Type)
    {
      step3_isSTU300(wizCtlV);
    }
    else
    {
      step3_notSTU300(wizCtlV);
    }
  }
};

const step3_notSTU300 = (wizCtlV) =>
{
  addRectangle(wizCtlV, Scrn3.step2Rectangle, step3_onAddPrimitive1);
};

const step3_onAddPrimitive1 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPrimitive", status))
  {
    setFont(wizCtlV, Scrn3.pleaseSign.fontName, Scrn3.pleaseSign.fontSize, Scrn3.pleaseSign.fontBold, false, step3_onPutFont2);
  }
};

const step3_onPutFont2 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFont2", status))
  {
    /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
    if (Scrn3.pleaseSign.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn3.pleaseSign.fontForeColor, step3_onSetFontForeColorPleaseSign);
    }
    else
    {
      addTextObject(wizCtlV, Scrn3.pleaseSign, step3_onAddText2);
    }
  }
};

const step3_onSetFontForeColorPleaseSign = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColorPleaseSign", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn3.pleaseSign.fontBackColor, step3_onSetFontBackColorPleaseSign);
  }
};

const step3_onSetFontBackColorPleaseSign = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColorPleaseSign", status))
  {
    // After setting up the font colours set up the text string itself
    addTextObject(wizCtlV, Scrn3.pleaseSign, step3_onAddText2);
  }
};

const step3_onAddText2 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddText2", status))
  {
    setFont(wizCtlV, Scrn3.XMark.fontName, Scrn3.XMark.fontSize, Scrn3.XMark.fontBold, false, step3_onPutFontXMark);
  }
};

const step3_onPutFontXMark = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl FontXMark", status))
  {
    /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
    if (Scrn3.XMark.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn3.XMark.fontForeColor, step3_onSetFontForeColorXMark);
    }
    else
    {
      addTextObject(wizCtlV, Scrn3.XMark, step3_onAddTextXMark);
    }
  }
  else
  {
    addTextObject(wizCtlV, Scrn3.XMark, step3_onAddTextXMark);
  }
};

const step3_onSetFontForeColorXMark = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColorXMark", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn3.XMark.fontBackColor, step3_onSetFontBackColorXMark);
  }
};

const step3_onSetFontBackColorXMark = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColorXMark", status))
  {
    // After setting up the font colours set up the text string itself
    addTextObject(wizCtlV, Scrn3.XMark, step3_onAddTextXMark);
  }
};

const step3_onAddTextXMark = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddTextXMark", status))
  {
    addTextObject(wizCtlV, Scrn3.sigMarkerLine, step3_onAddMarkerLine);
  }
};

const step3_onAddMarkerLine = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddMarkerLine", status))
  {
    setFont(wizCtlV, padDefs.Font, Scrn3.signatureFontSize, padDefs.TextBold, false, step3_onPutSignatureFont);
  }
};

const step3_onPutSignatureFont = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutSignatureFont", status))
  {
    addSignatureObject(wizCtlV, sigCtlCopy, step3_onAddSignature);
  }
};

const step3_onAddSignature = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddSignature", status))
  {
    /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
    if (Scrn3.why.fontForeColor !== "")
    {
      setFontForeColor(wizCtlV, Scrn3.why.fontForeColor, step3_onSetFontForeColorWhy);
    }
    else
    {
      addTextObject(wizCtlV, Scrn3.who, step3_onAddWho);
    }
  }
  else
  {
    addTextObject(wizCtlV, Scrn3.who, step3_onAddWho);
  }
};

const step3_onSetFontForeColorWhy = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontForeColorWhy", status))
  {
    // If a foreground colour has been set then we assume a background colour must also be required
    setFontBackColor(wizCtlV, Scrn3.why.fontBackColor, step3_onSetFontBackColorWhy);
  }
};

const step3_onSetFontBackColorWhy = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl SetFontBackColorWhy", status))
  {
    // After setting up the font colours set up the text string itself
    addTextObject(wizCtlV, Scrn3.who, step3_onAddWho);
  }
};

const step3_onAddWho = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddWho", status))
  {
    addTextObject(wizCtlV, Scrn3.why, step3_onAddWhy);
  }
};

const step3_onAddWhy = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddWhy", status))
  {
    setFont(wizCtlV, Scrn3.okButton.fontName, Scrn3.okButton.buttonSize, Scrn3.okButton.fontBold, false, step3_onPutFontOK);
  }
};

const step3_onPutFontOK = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontOK", status))
  {
    if (buttonSource === textSource.STANDARD || buttonSource === textSource.UTF8)
    {
      // Set up font colours if required for colour pads
      if (Scrn3.okButton.fontForeColor !== "")
      {
        setFontForeColor(wizCtlV, Scrn3.okButton.fontForeColor, step3_onSetOKButtonFontForeColor);
      }
      else
      {
        addButtonObject(wizCtlV, Scrn3.okButton, step3_onAddOK);
      }
    }
    else
    {
      addObjectImage(wizCtlV, Scrn3.okButton, step3_onAddOK);
    }
  }
};

const step3_onSetOKButtonFontForeColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl step3 setFontOKButtonForeColor", status))
  {
    setFontBackColor(wizCtlV, Scrn3.okButton.fontBackColor, step3_onSetOKButtonFontBackColor);
  }
};

const step3_onSetOKButtonFontBackColor = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl step3_setOKButtonFontBackColor", status))
  {
    addButtonObject(wizCtlV, Scrn3.okButton, step3_onAddOK);
  }
};

const step3_onAddOK = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddOK", status))
  {
    if (buttonSource === textSource.STANDARD || buttonSource === textSource.UTF8)
    {
      addButtonObject(wizCtlV, Scrn3.clearButton, step3_onAddClear);
    }
    else
    {
      addObjectImage(wizCtlV, Scrn3.clearButton, step3_onAddClear);
    }
  }
};

const step3_onAddClear = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddClear", status))
  {
    if (buttonSource === textSource.STANDARD || buttonSource === textSource.UTF8)
    {
      addButtonObject(wizCtlV, Scrn3.cancelButton, step3_doDisplay);
    }
    else
    {
      addObjectImage(wizCtlV, Scrn3.cancelButton, step3_doDisplay);
    }
  }
};

// The following group of functions are only applicable to the STU 300

const step3_isSTU300 = (wizCtlV) =>
{
  addLine(wizCtlV, Scrn3.line, step3_onAddPrimitiveSTU300);
};

// STU 300
const step3_onAddPrimitiveSTU300 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddPrimitiveSTU300", status))
  {
    setFont(wizCtlV, Scrn3.penSymbol.fontName, Scrn3.penSymbol.fontSize, padDefs.TextBold, window.wgssSignatureSDK.FontCharset.SYMBOL_CHARSET, step3_onPutFontPenSymbol);
  }
};

// STU 300
const step3_onPutFontPenSymbol = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl PutFontPenSymbol", status))
  {
    wizCtlV.GetFont(step3_onGetFontSTU300);
  }
};

// STU 300
const step3_onGetFontSTU300 = (wizCtlV, font, status) =>
{
  if (callbackStatusOK("WizCtl GetFontSTU300", status))
  {
    addTextObject(wizCtlV, Scrn3.penSymbol, step3_onAddText1STU300);
  }
};

// STU 300
const step3_onAddText1STU300 = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddText1STU300", status))
  {
    setFont(wizCtlV, padDefs.Font, padDefs.signatureFontSize, window.wgssSignatureSDK.FontWeight.FW_NORMAL, false, step3_onPutSignatureFont);
  }
};
// end of STU300 functions

// These next 2 functions are called regardless of the STU currently in use
const step3_doDisplay = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl AddCancelButton", status))
  {
    wizCtlV.Display(step3_onDisplay);
  }
};

const step3_onDisplay = (wizCtlV, status) =>
{
  if (callbackStatusOK("WizCtl Display", status))
  {
    wizCtlV.SetEventHandler(step3_Handler);
  }
};

/* This is the event handler for the user input on the third screen of the wizard i.e. signature capture */
const step3_Handler = (ctl, id, type, status) =>
{
  if (window.wgssSignatureSDK.ResponseStatus.OK === status)
  {
    switch (id)
    {
      case buttonEvent.OK:
        scriptCompleted(false, wizCtlTest);
        break;
      case buttonEvent.CLEAR:
        break;
      case buttonEvent.CANCEL:
        scriptCancelled(wizCtlTest);
        break;
      default:
        alert("Unexpected event: " + id);
        break;
    }
  }
  else
  {
    userMessage("Wizard window closed");
    scriptCancelled(wizCtlTest);
  }
};
