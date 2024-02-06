/* **************************************************************************
  SigCaptX-Wizard-Main.js
   
  This file contains the main control functions for controlling the 
  wizard session plus some global variables and functions for defining the object classes
  which are defined in SigCaptX-Wizard-PadDefs.js.
  
  Copyright (c) 2018 Wacom Co. Ltd. All rights reserved.
  
  v4.0
  
***************************************************************************/


/* The function step1() is the controlling routine for setting up and displaying the objects
   on the first screen in the wizard sequence. This is the screen with the checkbox */
function step1()
{
  wizCtl.Reset(step1_onWizCtlReset);
  
  function step1_onWizCtlReset(wizCtlV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      setFont(display_1.stepMsg1.fontName, display_1.stepMsg1.fontSize,display_1.stepMsg1.fontBold, false, step1_onPutFontStepMsg1);
    }
    else
    {
      vue_app.userMsg("WizCtl Reset" + status);
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
      {
        actionWhenRestarted(window.Step1);
      }
    }
  }
  
  function step1_onPutFontStepMsg1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontStepMsg1", status))
    {
       addTextObject(display_1.stepMsg1, step1_onAddTextStep1);
    }
  }

  function step1_onAddTextStep1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddObject", status))
    {
      if (pad.Range == "300")
      {
        addLine(display_1.step1Line, step1_onAddRectangle);
      }
      else
      { 
         addRectangle( display_1.step1Rectangle, step1_onAddRectangle);
      }
    }
  }
  
  function step1_onAddRectangle(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Primitive", status))
    {
      setFont(display_1.infoText.fontName, display_1.infoText.fontSize, display_1.infoText.fontBold, false, step1_onPutFontInfoText);
    }
  }
  
  function step1_onPutFontInfoText(wizCtlV, status)
  {   
    if(callbackStatusOK("WizCtl PutFontInfoText", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (display_1.infoText.fontForeColor != "")
      {
        setFontForeColor(display_1.infoText.fontForeColor, step1_onSetFontForeColor);
      }
      else
      {  
         addTextObject(display_1.infoText, step1_onAddTextInfoText);
      }
    }
    else
    {
      addTextObject(display_1.infoText, step1_onAddTextInfoText);
    }
  }
  
  function step1_onSetFontForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.infoText.fontBackColor, step1_onSetFontBackColor);
    }
  }
  
  function step1_onSetFontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_1.infoText, step1_onAddTextInfoText);
    }
  }
  
  function step1_onAddTextInfoText(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddTextInfoText", status))
    {
      setFont(display_1.checkboxObj.fontName, display_1.checkboxObj.fontSize, display_1.checkboxObj.fontBold, false, step1_onPutFontCheckbox);
    }
  }
  
  function step1_onPutFontCheckbox(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontCheckbox", status))
    {
      addCheckBox(display_1.checkboxObj.xPos, display_1.checkboxObj.yPos, display_1.checkboxObj.options, step1_onAddCheck);
    }
  }
  
  function step1_onAddCheck(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddCheck", status))
    {
      setFont(display_1.signingText.fontName, display_1.signingText.fontSize, display_1.signingText.fontBold, false, step1_onPutFontSigningText);
    }
  }
  
  function step1_onPutFontSigningText(wizCtlV, status)
  {
    if (callbackStatusOK("WizCtl PutFontSigningText", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (display_1.signingText.fontForeColor != "")
      {
        setFontForeColor(display_1.signingText.fontForeColor, step1_onSetSigningTextFontForeColor);
      }
      else
      {
        addTextObject(display_1.signingText, step1_onAddTextSigningText);
      }
    }
  }
  
  function step1_onSetSigningTextFontForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetSigningTextFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.signingText.fontBackColor, step1_onSetSigningTextFontBackColor);
    }
  }
  
  function step1_onSetSigningTextFontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetSigningTextFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_1.signingText, step1_onAddTextSigningText);
    }
  }
  
  function step1_onAddTextSigningText(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddTextSigningText", status))
    {
      if (display_1.nextToContinue.fontForeColor != "")
      {
        setFontForeColor(display_1.nextToContinue.fontForeColor, step1_onSetContinueTextFontForeColor);
      }
      else
      {
        addTextObject(display_1.nextToContinue, step1_onAddTextNextCont);
      }
    }
  }

  function step1_onSetContinueTextFontForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetContinueTextFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.nextToContinue.fontBackColor, step1_onSetContinueTextFontBackColor);
    }
  }
  
  function step1_onSetContinueTextFontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetContinueTextFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_1.nextToContinue, step1_onAddTextNextCont);
    }
  }
  
  function step1_onAddTextNextCont(wizCtlV, status)
  {
    //vue_app.userMsg("step1_onAddTextNextCont");
    if(callbackStatusOK("WizCtl AddTextNextCont", status))
    {
      setFont(pad.Font, display_1.cancelButton.buttonSize, display_1.cancelButton.buttonBold, false, step1_onPutFontCancel);
    }
  }
  
  function step1_onPutFontCancel(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontCancel", status))
    {
      var buttonSource = getButtonSourceFromHTMLDoc();

      if (buttonSource == textSource.STANDARD) 
      {
        // Set up font colours if required for colour pads
        if (display_1.cancelButton.fontForeColor != "")
        {
          setFontForeColor(display_1.cancelButton.fontForeColor, step1_onSetCancelButtonFontForeColor);
        }
        else
        {
          addButtonObject(display_1.cancelButton, step1_onAddCancelButton);
        }
      }
      else
      {
        addObjectImage(display_1.cancelButton, step1_onAddCancelButton, display_1.cancelButton.imageFile);
      }
    }
    
    function step1_onSetCancelButtonFontForeColor(wizCtlV, status)
    {
      if(callbackStatusOK("WizCtl setFontCancelButtonForeColor", status))
      {
        setFontBackColor(display_1.cancelButton.fontBackColor, step1_onSetCancelButtonFontBackColor);
      }
    }
    
    function step1_onSetCancelButtonFontBackColor(wizCtlV, status)
    {
      if(callbackStatusOK("WizCtl setCancelButtonFontBackColor", status))
      {
        addButtonObject(display_1.cancelButton, step1_onAddCancelButton);
      }
    }   
  }
  
  function step1_onAddCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddCancelButton", status))
    {
      /* If the user has chosen to use images for the buttons then add the image object, otherwise a standard button object */
      var buttonSource = getButtonSourceFromHTMLDoc();

      if (buttonSource == textSource.STANDARD)
      {
        addButtonObject(display_1.nextButton, step1_onAddNextButton);
      }
      else
      {
        addObjectImage(display_1.nextButton, step1_onAddNextButton, buttonSource);
      }
    }
  }
  
  function step1_onAddNextButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddNextButton", status))
    {
      wizCtl.Display(step1_onDisplay);
    }
  }
  
  function step1_onDisplay(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      wizCtl.SetEventHandler(step1_Handler);
    }
  }
}

/* This is the event handler for the user input on the first screen of the wizard */
function step1_Handler(ctl, id, type, status)
{
  function step1_onGetObjectState(wizCtlV, objState, status)
  {
    if(wgssSignatureSDK.VariantType.VARIANT_NUM == objState.type && 1 == objState.num)
    {
      vue_app.userMsg("Check box was selected");
    }
    step2();
  }
    
  if(wgssSignatureSDK.ResponseStatus.OK == status)
  {
    switch(id) 
    {
      case buttonEvent.NEXT:
        wizCtl.GetObjectState("Check", step1_onGetObjectState);
        break;
      case buttonEvent.CHECK:
        break;
      case buttonEvent.CANCEL:
        vue_app.script_Cancelled();
        break;
      default:
        vue_app.userMsg("Unexpected event: " + id);
        alert("Unexpected event: " + id);
        break;
    }
  }
  else
  {
    vue_app.userMsg("Wizard window closed");
    vue_app.script_Cancelled();
  }
}

/* The function step2() is the controlling routine for setting up and displaying the objects
   on the screen screen in the wizard sequence, i.e. the one with the radio buttons */
function step2()
{
  wizCtl.Reset(step2_onWizCtlReset);

  function step2_onWizCtlReset(wizCtlV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      setFont(display_2.stepMsg2.fontName, display_2.stepMsg2.fontSize, display_2.stepMsg2.fontWeight, false, step2_onPutFont);
    }
    else
    {
      vue_app.userMsg("WizCtl Reset" + status);
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
      {
        actionWhenRestarted(window.Step2);
      }
    }
  }
    
  function step2_onPutFont(wizCtlV, status)
  {
    var fontForeColor = "";
    
    if(callbackStatusOK("WizCtl PutFont", status))
    {
      // In case font colours were changed on the previous screen make sure we revert to black on white now
      if (pad.Range == padRange.STU5X0)
      {
        if (display_2.stepMsg2.fontForeColor != "")
        {
          fontForeColor = display_2.stepMsg2.fontForeColor;
        }
        else
        {
          fontForeColor = padColors.BLACK;
        }
        setFontForeColor(fontForeColor, step2_onSetStepMsg2FontForeColor);
      }
      else
      {
        // For monochrome pads skip the setting of font colours
        addTextObject(display_2.stepMsg2, step2_onAddText1);
      }
    }
  }
  
  function step2_onSetStepMsg2FontForeColor(wizCtlV, status)
  {
    var fontBackColor;
    
    if(callbackStatusOK("WizCtl setStepMsg2FontForeColor", status))
    {
      if (display_2.stepMsg2.fontBackColor != "")
      {
        fontBackColor = display_2.stepMsg2.fontBackColor;
      }
      else
      {
        fontBackColor = padColors.WHITE;
      }
      setFontBackColor(fontBackColor, step2_onSetStepMsg2FontBackColor);
    }
  }
  
  function step2_onSetStepMsg2FontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl setStepMsg2FontBackColor", status))
    {
      addTextObject(display_2.stepMsg2, step2_onAddText1);
    }
  } 
  
  function step2_onAddText1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddObject", status))
    {
      if (pad.Range == padRange.STU300)
      {
         addLine(display_2.step1Line, step2_onAddPrimitive1);
      }
      else
      {
         addRectangle( display_2.step1Rectangle, step2_onAddPrimitive1);
      }
    }
  }
  
  function step2_onAddPrimitive1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Primitive", status))
    {
      setFont(display_2.infoObject.fontName, display_2.infoObject.fontSize, display_2.infoObject.fontBold, false, step2_onPutFont2);
    }
  }
  
  // Now add this text to the WizCtl: "Radio buttons provide options for the signing process and can be transferred to the document"
  function step2_onPutFont2(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFont2", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (display_2.infoObject.fontForeColor != "")
      {
        setFontForeColor(display_2.infoObject.fontForeColor, step2_onSetFontForeColorInfoObject);
      }
      else
      {
        addTextObject(display_2.infoObject, step2_onAddText3);
      }
    }
  }
  
  function step2_onSetFontForeColorInfoObject(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorInfoObject", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_2.infoObject.fontBackColor, step2_onSetFontBackColorInfoObject);
    }
  }
  
  function step2_onSetFontBackColorInfoObject(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorInfoObject", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_2.infoObject, step2_onAddText3);
    }
  }
  
  function step2_onAddText3(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddText3", status))
    {
      addTextObject(display_2.nextToContinue, step2_onAddText4);
    }
  }
  
  function step2_onAddText4(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddText4", status))
    {
      setFont(pad.Font, pad.ButtonSize, pad.TextBold, false, step2_onPutFont5);
    }
  }
  
  function step2_onPutFont5(wizCtlV, status)
  {
    if (callbackStatusOK("WizCtl PutFont5", status ))
    {
      if (display_2.maleRadio.fontForeColor != "")
      {
        setFontForeColor(display_2.maleRadio.fontForeColor, step2_onSetFontForeColorMaleRadio);
      }
      else
      {
        addRadioButton( display_2.maleRadio, step2_onAddRadioButton1);
      }
    }
  }
  
  function step2_onSetFontForeColorMaleRadio()
  {
    if(callbackStatusOK("WizCtl SetFontForeColorMaleRadio", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_2.maleRadio.fontBackColor, step2_onSetFontBackColorMaleRadio);
    }
  }
  
  function step2_onSetFontBackColorMaleRadio(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorMaleRadio", status))
    {
      // After setting up the font colours set up the radio button itself
      addRadioButton( display_2.maleRadio, step2_onAddRadioButton1);
    }
  }
  
  function step2_onAddRadioButton1(wizCtlV, status)
  {
    if (callbackStatusOK("WizCtl AddRadioButton1", status ))
    {
      addRadioButton(display_2.femaleRadio, step2_onAddRadioButton2);
    }
  }
  
  function step2_onAddRadioButton2(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddRadioButton2", status))
    {
      var buttonSource = getButtonSourceFromHTMLDoc();

      if (buttonSource == textSource.STANDARD) 
      {
        // Set up font colours if required for colour pads
        if (display_2.cancelButton.fontForeColor != "")
        {
          setFontForeColor(display_2.cancelButton.fontForeColor, step2_onSetCancelButtonFontForeColor);
        }
        else
        {
          addButtonObject(display_2.cancelButton, step2_onAddCancelButton);
        }
      }
      else
      {
        //vue_app.userMsg("Adding button as an image from source " + buttonSource);
        addObjectImage(display_2.cancelButton, step2_onAddCancelButton, buttonSource);
      }
    }
  }
  
  function step2_onSetCancelButtonFontForeColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl step2_setFontCancelButtonForeColor", status))
    {
      setFontBackColor(display_2.cancelButton.fontBackColor, step2_onSetCancelButtonFontBackColor);
    }
  }
    
  function step2_onSetCancelButtonFontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl step2_setCancelButtonFontBackColor", status))
    {
      addButtonObject(display_2.cancelButton, step2_onAddCancelButton);
    }
  }   
  
  function step2_onAddCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddCancelButton", status))
    {
      var buttonSource = getButtonSourceFromHTMLDoc();

      if (buttonSource == textSource.STANDARD) 
      {
        addButtonObject(display_2.nextButton, step2_onAddNextButton);
      }
      else
      {
        addObjectImage(display_2.nextButton, step2_onAddNextButton, buttonSource);
      }
    }
  }

  function step2_onAddNextButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddNextButton", status))
    {
      wizCtl.Display(step2_onDisplay);
    }
  }
  
  function step2_onDisplay(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      wizCtl.SetEventHandler(step2_Handler);
    }
  }
}

/* This is the event handler for the user input on the second screen of the wizard */
function step2_Handler(ctl, id, type, status)
{ 
  if(wgssSignatureSDK.ResponseStatus.OK == status)
  {
    switch(id) {
      case buttonEvent.NEXT:
        step3();
        break;
      case buttonEvent.CHECK:
        break;
      case buttonEvent.CANCEL:
        step1();
        break;
      case radioSelection.MALE:
        break;
      case radioSelection.FEMALE:
        break;
      default:
        vue_app.userMsg("Unexpected event: " + id);
        alert("Unexpected event: " + id);
      break;
    } 
  }
  else
  {
    vue_app.userMsg("Wizard window closed");
    vue_app.script_Cancelled();
  }
}

/* The function Step3() is the controlling routine for setting up and displaying the objects
   on the third screen in the wizard sequence i.e. the signature capture itself.
   The objects themselves are set up in SigCaptX-Wizard-PadDefs.js */
function step3()
{
  wizCtl.Reset(step3_onWizCtlReset);

  function step3_onWizCtlReset(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Reset", status))
    {
      setFont(display_3.stepMsg3.fontName, display_3.stepMsg3.fontSize, display_3.stepMsg3.fontBold, false, step3_onPutFont);
    }
  }

  function step3_onPutFont(wizCtlV, status)
  {
    var fontForeColor;
    
    if(callbackStatusOK("WizCtl step3 PutFont", status))
    {
      // In case font colours were changed on the previous screen make sure we revert to black on white now
      
      if (pad.Range == padRange.STU5X0)
      {
        if (display_3.stepMsg3.fontForeColor != "")
        {
          fontForeColor = display_3.stepMsg3.fontForeColor;
        }
        else
        {
          fontForeColor = padColors.BLACK;
        }
        setFontForeColor(fontForeColor, step3_onSetStepMsg3FontForeColor);
      }
      else
      {
        addTextObject(display_3.stepMsg3, step3_onAddText1);
      }
    }
  }
  
  function step3_onSetStepMsg3FontForeColor(wizCtlV, status)
  {
    var fontBackColor;
    
    if(callbackStatusOK("WizCtl setStepMsg3FontForeColor", status))
    {
      if (display_3.stepMsg3.fontBackColor != "")
      {
        fontBackColor = display_3.stepMsg3.fontBackColor;
      }
      else
      {
        fontBackColor = padColors.WHITE;
      }
      setFontBackColor(fontBackColor, step3_onSetStepMsg3FontBackColor);
    }
  }
  
  function step3_onSetStepMsg3FontBackColor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl setStepMsg2FontBackColor", status))
    {
      addTextObject(display_3.stepMsg3, step3_onAddText1);
    }
  }  

  function step3_onAddText1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddText1", status))
    {
      /* Because of the very different dimensions of the STU 300 we have to have use a different layout for the buttons and text etc
         so there are separate routines just for the 300 */
      if(padType.STU300 == pad.Type)
      {
        step3_isSTU300();
      }
      else
      {
        step3_notSTU300();
      }      
    }
  }
  
  function step3_notSTU300()
  {
    addRectangle( display_3.step2Rectangle, step3_onAddPrimitive1);
  }

  function step3_onAddPrimitive1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPrimitive", status))
    {
      setFont(display_3.pleaseSign.fontName, display_3.pleaseSign.fontSize, display_3.pleaseSign.fontBold, false, step3_onPutFont2);
    }
  }

  function step3_onPutFont2(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFont2", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (display_3.pleaseSign.fontForeColor != "")
      {
        setFontForeColor(display_3.pleaseSign.fontForeColor, step3_onSetFontForeColorPleaseSign);
      }
      else
      {
        addTextObject(display_3.pleaseSign, step3_onAddText2);
      }
    }
  }
  
  function step3_onSetFontForeColorPleaseSign(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorPleaseSign", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_3.pleaseSign.fontBackColor, step3_onSetFontBackColorPleaseSign);
    }
  }
  
  function step3_onSetFontBackColorPleaseSign(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorPleaseSign", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_3.pleaseSign, step3_onAddText2);
    }
  }

  function step3_onAddText2(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddText2", status))
    {
      setFont(display_3.XMark.fontName, display_3.XMark.fontSize, display_3.XMark.fontBold, false, step3_onPutFontXMark);
    }
  }

  function step3_onPutFontXMark(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl FontXMark", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (display_3.XMark.fontForeColor != "")
      {
        setFontForeColor(display_3.XMark.fontForeColor, step3_onSetFontForeColorXMark);
      }
      else
      {
        addTextObject(display_3.XMark, step3_onAddTextXMark);
      }
    }
    else
    {
      addTextObject(display_3.XMark, step3_onAddTextXMark);
    }
  }
  
  function step3_onSetFontForeColorXMark(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorXMark", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_3.XMark.fontBackColor, step3_onSetFontBackColorXMark);
    }
  }
  
  function step3_onSetFontBackColorXMark(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorXMark", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_3.XMark, step3_onAddTextXMark);
    }
  }
   
  function step3_onAddTextXMark(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddTextXMark", status))
    {
      addTextObject(display_3.sigMarkerLine, step3_onAddMarkerLine);
    }
  }

  function step3_onAddMarkerLine(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddMarkerLine", status))
    {
      setFont(pad.Font, display_3.signatureFontSize, pad.TextBold, false, step3_onPutSignatureFont);
    }
  }

  function step3_onPutSignatureFont(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutSignatureFont", status))
    {
      addSignatureObject(sigCtl, step3_onAddSignature);
    }
  }

  function step3_onAddSignature(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddSignature", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (display_3.why.fontForeColor != "")
      {
        setFontForeColor(display_3.why.fontForeColor, step3_onSetFontForeColorWhy);
      }
      else
      {
        addTextObject(display_3.who, step3_onAddWho);
      }
    }
    else
    {
      addTextObject(display_3.who, step3_onAddWho);
    }
  }
  
  function step3_onSetFontForeColorWhy(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorWhy", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_3.why.fontBackColor, step3_onSetFontBackColorWhy);
    }
  }
  
  function step3_onSetFontBackColorWhy(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorWhy", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_3.who, step3_onAddWho);
    }
  }

  function step3_onAddWho(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddWho", status))
    {
      addTextObject(display_3.why, step3_onAddWhy);
    }
  }
 
  function step3_onAddWhy(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddWhy", status))
    {
      setFont(display_3.okButton.fontName, display_3.okButton.buttonSize, display_3.okButton.fontBold, false, step3_onPutFontOK);
    }
  }

  function step3_onPutFontOK(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontOK", status))
    {
      var buttonSource = getButtonSourceFromHTMLDoc();
            
      if (buttonSource == textSource.STANDARD) 
      {
        // Set up font colours if required for colour pads
        if (display_3.okButton.fontForeColor != "")
        {
          setFontForeColor(display_3.okButton.fontForeColor, step3_onSetOKButtonFontForeColor);
        }
        else
        {
          addButtonObject(display_3.okButton, step3_onAddOK);
        }
      }
      else
      {
        addObjectImage(display_3.okButton, step3_onAddOK, buttonSource);
      }
    }
    
    function step3_onSetOKButtonFontForeColor(wizCtlV, status)
    {
      if(callbackStatusOK("WizCtl step3 setFontOKButtonForeColor", status))
      {
        setFontBackColor(display_3.okButton.fontBackColor, step3_onSetOKButtonFontBackColor);
      }
    }
    
    function step3_onSetOKButtonFontBackColor(wizCtlV, status)
    {
      if(callbackStatusOK("WizCtl step3_setOKButtonFontBackColor", status))
      {
        addButtonObject(display_3.okButton, step3_onAddOK);
      }
    }   
  }

  function step3_onAddOK(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddOK", status))
    {
      var buttonSource = getButtonSourceFromHTMLDoc();
            
      if (buttonSource == textSource.STANDARD) 
      {
        addButtonObject(display_3.clearButton, step3_onAddClear);
      }
      else
      {
        addObjectImage(display_3.clearButton, step3_onAddClear, buttonSource);
      }
    }
  }

  function step3_onAddClear(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddClear", status))
    {
      var buttonSource = getButtonSourceFromHTMLDoc();
            
      if (buttonSource == textSource.STANDARD) 
      {
        addButtonObject(display_3.cancelButton, step3_doDisplay);
      }
      else
      {
        addObjectImage(display_3.cancelButton, step3_doDisplay, buttonSource);
      }
    }
  }

  // The following group of functions are only applicable to the STU 300 

  function step3_isSTU300()
  {
    addLine(display_3.line, step3_onAddPrimitiveSTU300);
  }
  
  // STU 300
  function step3_onAddPrimitiveSTU300(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPrimitiveSTU300", status))
    {
      setFont(display_3.penSymbol.fontName, display_3.penSymbol.fontSize, pad.TextBold, wgssSignatureSDK.FontCharset.SYMBOL_CHARSET, step3_onPutFontPenSymbol);
    }
  }
  
  // STU 300
  function step3_onPutFontPenSymbol(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontPenSymbol", status))
    {
      wizCtl.GetFont(step3_onGetFontSTU300);
    }
  }
  
  // STU 300
  function step3_onGetFontSTU300(wizCtlV, font, status)
  {
    if(callbackStatusOK("WizCtl GetFontSTU300", status))
    {
      addTextObject(display_3.penSymbol, step3_onAddText1STU300);
    }
  }
  
  // STU 300
  function step3_onAddText1STU300(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddText1STU300", status))
    {
      setFont(pad.Font, pad.signatureFontSize, wgssSignatureSDK.FontWeight.FW_NORMAL, false, step3_onPutSignatureFont);
    }
  }
  // end of STU300 functions

  // These next 2 functions are called regardless of the STU currently in use
  function step3_doDisplay(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddCancelButton", status))
    {
      wizCtl.Display(step3_onDisplay);
    }
  }

  function step3_onDisplay(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      wizCtl.SetEventHandler(step3_Handler);
    }
  }
}

/* This is the event handler for the user input on the third screen of the wizard i.e. signature capture*/
function step3_Handler(ctl, id, type, status)
{    
  if(wgssSignatureSDK.ResponseStatus.OK == status)
  {
    switch(id) {
      case buttonEvent.OK:
        vue_app.userMsg("OK selected");
        vue_app.script_Completed(false);
        break;
      case buttonEvent.CLEAR:
        vue_app.userMsg("Clear");
        break;
      case buttonEvent.CANCEL:
        vue_app.userMsg("Previous");
        vue_app.script_Cancelled();
        break;
      default:
        alert("Unexpected event: " + id);
        break;
    }
  }
  else
  {
    vue_app.userMsg("Wizard window closed");
    vue_app.script_Cancelled();
  }
}

/* Check the HTML document to see whether the user has selected the option to use local or remote images for the button design */
function getButtonSourceFromHTMLDoc()
{
  var buttonSource = textSource.STANDARD;

  if (document.getElementById("local").checked)
  {
     buttonSource = textSource.LOCAL;
  }
  else
  {
    if (document.getElementById("remote").checked)
    {
      buttonSource = textSource.REMOTE;
    }
  }
  return buttonSource;
}