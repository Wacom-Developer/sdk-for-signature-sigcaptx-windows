/* **************************************************************************
  SigCaptX-Wizard-Main.js
   
  This file contains the main control statics for controlling the 
  wizard session plus some global variables and statics for defining the object classes
  which are defined in SigCaptX-Wizard-PadDefs.js.
  
  Copyright (c) 2018 Wacom Co. Ltd. All rights reserved.
  
  v4.0
  
***************************************************************************/
import { buttonEvent, padColors, padRange, padType, radioSelection, textSource } from './SigCaptX-Globals';
import { SessionControl } from './SigCaptX-SessionControl';
import { Utils } from './SigCaptX-Utils';

export class WizScreens
{

  /* The static step1() is the controlling routine for setting up and displaying the objects
    on the first screen in the wizard sequence. This is the screen with the checkbox */
  static step1()
  {
    window.wizCtl.Reset(WizScreens.step1_onWizCtlReset);
  }

  static step1_onWizCtlReset(wizCtlV, status)
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      Utils.setFont(window.display_1.stepMsg1.fontName, window.display_1.stepMsg1.fontSize,window.display_1.stepMsg1.fontBold, false, WizScreens.step1_onPutFontStepMsg1);
    }
    else
    {
      Utils.print("WizCtl Reset" + status);
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        SessionControl.actionWhenRestarted();
      }
    }
  }
  
  static step1_onPutFontStepMsg1(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutFontStepMsg1", status))
    {
       Utils.addTextObject(window.display_1.stepMsg1, WizScreens.step1_onAddTextStep1);
    }
  }

  static step1_onAddTextStep1(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddObject", status))
    {
      if (window.pad.Range == "300")
      {
        Utils.addLine(window.display_1.step1Line, WizScreens.step1_onAddRectangle);
      }
      else
      { 
         Utils.addRectangle( window.display_1.step1Rectangle, WizScreens.step1_onAddRectangle);
      }
    }
  }
  
  static step1_onAddRectangle(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Primitive", status))
    {
      Utils.setFont(window.display_1.infoText.fontName, window.display_1.infoText.fontSize, window.display_1.infoText.fontBold, false, WizScreens.step1_onPutFontInfoText);
    }
  }
  
  static step1_onPutFontInfoText(wizCtlV, status)
  {   
    if(Utils.callbackStatusOK("WizCtl PutFontInfoText", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (window.display_1.infoText.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_1.infoText.fontForeColor, WizScreens.step1_onSetFontForeColor);
      }
      else
      {  
         Utils.addTextObject(window.display_1.infoText, WizScreens.step1_onAddTextInfoText);
      }
    }
    else
    {
      Utils.addTextObject(window.display_1.infoText, WizScreens.step1_onAddTextInfoText);
    }
  }
  
  static step1_onSetFontForeColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_1.infoText.fontBackColor, WizScreens.step1_onSetFontBackColor);
    }
  }
  
  static step1_onSetFontBackColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addTextObject(window.display_1.infoText, WizScreens.step1_onAddTextInfoText);
    }
  }
  
  static step1_onAddTextInfoText(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addTextInfoText", status))
    {
      Utils.setFont(window.display_1.checkboxObj.fontName, window.display_1.checkboxObj.fontSize, window.display_1.checkboxObj.fontBold, false, WizScreens.step1_onPutFontCheckbox);
    }
  }
  
  static step1_onPutFontCheckbox(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutFontCheckbox", status))
    {
      Utils.addCheckBox(window.display_1.checkboxObj.xPos, window.display_1.checkboxObj.yPos, window.display_1.checkboxObj.options, WizScreens.step1_onAddCheck);
    }
  }
  
  static step1_onAddCheck(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addCheck", status))
    {
      Utils.setFont(window.display_1.signingText.fontName, window.display_1.signingText.fontSize, window.display_1.signingText.fontBold, false, WizScreens.step1_onPutFontSigningText);
    }
  }
  
  static step1_onPutFontSigningText(wizCtlV, status)
  {
    if (Utils.callbackStatusOK("WizCtl PutFontSigningText", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (window.display_1.signingText.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_1.signingText.fontForeColor, WizScreens.step1_onSetSigningTextFontForeColor);
      }
      else
      {
        Utils.addTextObject(window.display_1.signingText, WizScreens.step1_onAddTextSigningText);
      }
    }
  }
  
  static step1_onSetSigningTextFontForeColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl SetSigningTextFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_1.signingText.fontBackColor, WizScreens.step1_onSetSigningTextFontBackColor);
    }
  }
  
  static step1_onSetSigningTextFontBackColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl SetSigningTextFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addTextObject(window.display_1.signingText, WizScreens.step1_onAddTextSigningText);
    }
  }
  
  static step1_onAddTextSigningText(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addTextSigningText", status))
    {
      if (window.display_1.nextToContinue.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_1.nextToContinue.fontForeColor, WizScreens.step1_onSetContinueTextFontForeColor);
      }
      else
      {
        Utils.addTextObject(window.display_1.nextToContinue, WizScreens.step1_onAddTextNextCont);
      }
    }
  }

  static step1_onSetContinueTextFontForeColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl SetContinueTextFontForeColor", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_1.nextToContinue.fontBackColor, WizScreens.step1_onSetContinueTextFontBackColor);
    }
  }
  
  static step1_onSetContinueTextFontBackColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl SetContinueTextFontBackColor", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addTextObject(window.display_1.nextToContinue, WizScreens.step1_onAddTextNextCont);
    }
  }
  
  static step1_onAddTextNextCont(wizCtlV, status)
  {
    //Utils.print(".addTextNextCont");
    if(Utils.callbackStatusOK("WizCtl Utils.addTextNextCont", status))
    {
      Utils.setFont(window.pad.Font, window.display_1.cancelButton.buttonSize, window.display_1.cancelButton.buttonBold, false, WizScreens.step1_onPutFontCancel);
    }
  }
  
  static step1_onPutFontCancel(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutFontCancel", status))
    {
      var buttonSource = Utils.getButtonSourceFromHTMLDoc();

      if (buttonSource == textSource.STANDARD) 
      {
        // Set up font colours if required for colour pads
        if (window.display_1.cancelButton.fontForeColor != "")
        {
          Utils.setFontForeColor(window.display_1.cancelButton.fontForeColor, WizScreens.step1_onSetCancelButtonFontForeColor);
        }
        else
        {
          Utils.addButtonObject(window.display_1.cancelButton, WizScreens.step1_onAddCancelButton);
        }
      }
      else
      {
        Utils.addObjectImage(window.display_1.cancelButton, WizScreens.step1_onAddCancelButton, window.display_1.cancelButton.imageFile);
      }
    }
  }
    
  static step1_onSetCancelButtonFontForeColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontCancelButtonForeColor", status))
    {
      Utils.setFontBackColor(window.display_1.cancelButton.fontBackColor, WizScreens.step1_onSetCancelButtonFontBackColor);
    }
  }
    
  static step1_onSetCancelButtonFontBackColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl setCancelButtonFontBackColor", status))
    {
      Utils.addButtonObject(window.display_1.cancelButton, WizScreens.step1_onAddCancelButton);
    }
  }   
  
  static step1_onAddCancelButton(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddCancelButton", status))
    {
      /* If the user has chosen to use images for the buttons then add the image object, otherwise a standard button object */
      var buttonSource = Utils.getButtonSourceFromHTMLDoc();

      if (buttonSource == textSource.STANDARD)
      {
        Utils.addButtonObject(window.display_1.nextButton, WizScreens.step1_onAddNextButton);
      }
      else
      {
        Utils.addObjectImage(window.display_1.nextButton, WizScreens.step1_onAddNextButton, buttonSource);
      }
    }
  }
  
  static step1_onAddNextButton(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddNextButton", status))
    {
      window.wizCtl.Display(WizScreens.step1_onDisplay);
    }
  }
  
  static step1_onDisplay(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Display", status))
    {
      window.wizCtl.SetEventHandler(WizScreens.step1_Handler);
    }
  }

  /* This is the event handler for the user input on the first screen of the wizard */
  static step1_Handler(ctl, id, type, status)
  {
    function step1_onGetObjectState(wizCtlV, objState, status)
    {
      if(window.sdkPtr.VariantType.VARIANT_NUM == objState.type && 1 == objState.num)
      {
        Utils.print("Check box was selected");
      }
      WizScreens.step2();
    }

    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      switch(id) 
      {
        case buttonEvent.NEXT:
          window.wizCtl.GetObjectState("Check", step1_onGetObjectState);
          break;
        case buttonEvent.CHECK:
          break;
        case buttonEvent.CANCEL:
          SessionControl.script_Cancelled();
          break;
        default:
          Utils.print("Unexpected event: " + id);
          alert("Unexpected event: " + id);
          break;
      }
    }
    else
    {
      Utils.print("Wizard window closed");
      SessionControl.script_Cancelled();
    }
  }

  /* The static step2() is the controlling routine for setting up and displaying the objects
    on the screen screen in the wizard sequence, i.e. the one with the radio buttons */
  static step2()
  {
    window.wizCtl.Reset(WizScreens.step2_onWizCtlReset);
  }

  static step2_onWizCtlReset(wizCtlV, status)
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      Utils.setFont(window.display_2.stepMsg2.fontName, window.display_2.stepMsg2.fontSize, window.display_2.stepMsg2.fontWeight, false, WizScreens.step2_onPutFont);
    }
    else
    {
      Utils.print("WizCtl Reset" + status);
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        SessionControl.actionWhenRestarted();
      }
    }
  }
    
  static step2_onPutFont(wizCtlV, status)
  {
    var fontForeColor = "";
    
    if(Utils.callbackStatusOK("WizCtl PutFont", status))
    {
      // In case font colours were changed on the previous screen make sure we revert to black on white now
      if (window.pad.Range == padRange.STU5X0)
      {
        if (window.display_2.stepMsg2.fontForeColor != "")
        {
          fontForeColor = window.display_2.stepMsg2.fontForeColor;
        }
        else
        {
          fontForeColor = padColors.BLACK;
        }
        Utils.setFontForeColor(fontForeColor, WizScreens.step2_onSetStepMsg2FontForeColor);
      }
      else
      {
        // For monochrome pads skip the setting of font colours
        Utils.addTextObject(window.display_2.stepMsg2, WizScreens.step2_onAddText1);
      }
    }
  }
  
  static step2_onSetStepMsg2FontForeColor(wizCtlV, status)
  {
    var fontBackColor;
    
    if(Utils.callbackStatusOK("WizCtl setStepMsg2FontForeColor", status))
    {
      if (window.display_2.stepMsg2.fontBackColor != "")
      {
        fontBackColor = window.display_2.stepMsg2.fontBackColor;
      }
      else
      {
        fontBackColor = padColors.WHITE;
      }
      Utils.setFontBackColor(fontBackColor, WizScreens.step2_onSetStepMsg2FontBackColor);
    }
  }
  
  static step2_onSetStepMsg2FontBackColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl setStepMsg2FontBackColor", status))
    {
      Utils.addTextObject(window.display_2.stepMsg2, WizScreens.step2_onAddText1);
    }
  } 
  
  static step2_onAddText1(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddObject", status))
    {
      if (window.pad.Range == padRange.STU300)
      {
         Utils.addLine(window.display_2.step2Line, WizScreens.step2_onAddPrimitive1);
      }
      else
      {
         Utils.addRectangle( window.display_2.step2Rectangle, WizScreens.step2_onAddPrimitive1);
      }
    }
  }
  
  static step2_onAddPrimitive1(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Primitive", status))
    {
      Utils.setFont(window.display_2.infoObject.fontName, window.display_2.infoObject.fontSize, window.display_2.infoObject.fontBold, false, WizScreens.step2_onPutFont2);
    }
  }
  
  // Now add this text to the WizCtl: "Radio buttons provide options for the signing process and can be transferred to the document"
  static step2_onPutFont2(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutFont2", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (window.display_2.infoObject.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_2.infoObject.fontForeColor, WizScreens.step2_setFontForeColorInfoObject);
      }
      else
      {
        Utils.addTextObject(window.display_2.infoObject, WizScreens.step2_onAddText3);
      }
    }
  }
  
  static step2_setFontForeColorInfoObject(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColorInfoObject", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_2.infoObject.fontBackColor, WizScreens.step2_setFontBackColorInfoObject);
    }
  }
  
  static step2_setFontBackColorInfoObject(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColorInfoObject", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addTextObject(window.display_2.infoObject, WizScreens.step2_onAddText3);
    }
  }
  
  static step2_onAddText3(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addText3", status))
    {
      Utils.addTextObject(window.display_2.nextToContinue, WizScreens.step2_onAddText4);
    }
  }
  
  static step2_onAddText4(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addText4", status))
    {
      Utils.setFont(window.pad.Font, window.pad.ButtonSize, window.pad.TextBold, false, WizScreens.step2_onPutFont5);
    }
  }
  
  static step2_onPutFont5(wizCtlV, status)
  {
    if (Utils.callbackStatusOK("WizCtl PutFont5", status ))
    {
      if (window.display_2.maleRadio.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_2.maleRadio.fontForeColor, WizScreens.step2_onSetFontForeColorMaleRadio);
      }
      else
      {
        Utils.addRadioButton( window.display_2.maleRadio, WizScreens.step2_onAddRadioButton1);
      }
    }
  }
  
  static step2_onSetFontForeColorMaleRadio()
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColorMaleRadio", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_2.maleRadio.fontBackColor, WizScreens.step2_onSetFontBackColorMaleRadio);
    }
  }
  
  static step2_onSetFontBackColorMaleRadio(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColorMaleRadio", status))
    {
      // After setting up the font colours set up the radio button itself
      Utils.addRadioButton( window.display_2.maleRadio, WizScreens.step2_onAddRadioButton1);
    }
  }
  
  static step2_onAddRadioButton1(wizCtlV, status)
  {
    if (Utils.callbackStatusOK("WizCtl AddRadioButton1", status ))
    {
      Utils.addRadioButton(window.display_2.femaleRadio, WizScreens.step2_onAddRadioButton2);
    }
  }
  
  static step2_onAddRadioButton2(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddRadioButton2", status))
    {
      var buttonSource = Utils.getButtonSourceFromHTMLDoc();

      if (buttonSource == textSource.STANDARD) 
      {
        // Set up font colours if required for colour pads
        if (window.display_2.cancelButton.fontForeColor != "")
        {
          Utils.setFontForeColor(window.display_2.cancelButton.fontForeColor, WizScreens.step2_onSetCancelButtonFontForeColor);
        }
        else
        {
          Utils.addButtonObject(window.display_2.cancelButton, WizScreens.step2_onAddCancelButton);
        }
      }
      else
      {
        Utils.addObjectImage(window.display_2.cancelButton, WizScreens.step2_onAddCancelButton, buttonSource);
      }
    }
  }
  
  static step2_onSetCancelButtonFontForeColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl step2_Utils.setFontCancelButtonForeColor", status))
    {
      Utils.setFontBackColor(window.display_2.cancelButton.fontBackColor, WizScreens.step2_onSetCancelButtonFontBackColor);
    }
  }
    
  static step2_onSetCancelButtonFontBackColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl step2_setCancelButtonFontBackColor", status))
    {
      Utils.addButtonObject(window.display_2.cancelButton, WizScreens.step2_onAddCancelButton);
    }
  }   
  
  static step2_onAddCancelButton(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddCancelButton", status))
    {
      var buttonSource = Utils.getButtonSourceFromHTMLDoc();

      if (buttonSource == textSource.STANDARD) 
      {
        Utils.addButtonObject(window.display_2.nextButton, WizScreens.step2_onAddNextButton);
      }
      else
      {
        Utils.addObjectImage(window.display_2.nextButton, WizScreens.step2_onAddNextButton, buttonSource);
      }
    }
  }

  static step2_onAddNextButton(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddNextButton", status))
    {
      window.wizCtl.Display(WizScreens.step2_onDisplay);
    }
  }
  
  static step2_onDisplay(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Display", status))
    {
      window.wizCtl.SetEventHandler(WizScreens.step2_Handler);
    }
  }

  /* This is the event handler for the user input on the second screen of the wizard */
  static step2_Handler(ctl, id, type, status)
  { 
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      switch(id) {
        case buttonEvent.NEXT:
          WizScreens.step3();
          break;
        case buttonEvent.CHECK:
          break;
        case buttonEvent.CANCEL:
          WizScreens.step1();
          break;
        case radioSelection.MALE:
          break;
        case radioSelection.FEMALE:
          break;
        default:
          Utils.print("Unexpected event: " + id);
          alert("Unexpected event: " + id);
        break;
      } 
    }
    else
    {
      Utils.print("Wizard window closed");
      SessionControl.script_Cancelled();
    }
  }

  /* The static Step3() is the controlling routine for setting up and displaying the objects
    on the third screen in the wizard sequence i.e. the signature capture itself.
    The objects themselves are set up in SigCaptX-Wizard-PadDefs.js */
  static step3()
  {
    window.wizCtl.Reset(WizScreens.step3_onWizCtlReset);
  }

  static step3_onWizCtlReset(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Reset", status))
    {
      Utils.setFont(window.display_3.stepMsg3.fontName, window.display_3.stepMsg3.fontSize, window.display_3.stepMsg3.fontBold, false, WizScreens.step3_onPutFont);
    }
  }

  static step3_onPutFont(wizCtlV, status)
  {
    var fontForeColor;
    
    if(Utils.callbackStatusOK("WizCtl step3 PutFont", status))
    {
      // In case font colours were changed on the previous screen make sure we revert to black on white now
      
      if (window.pad.Range == padRange.STU5X0)
      {
        if (window.display_3.stepMsg3.fontForeColor != "")
        {
          fontForeColor = window.display_3.stepMsg3.fontForeColor;
        }
        else
        {
          fontForeColor = padColors.BLACK;
        }
        Utils.setFontForeColor(fontForeColor, WizScreens.step3_onSetStepMsg3FontForeColor);
      }
      else
      {
        Utils.addTextObject(window.display_3.stepMsg3, WizScreens.step3_onAddText1);
      }
    }
  }
  
  static step3_onSetStepMsg3FontForeColor(wizCtlV, status)
  {
    var fontBackColor;
    
    if(Utils.callbackStatusOK("WizCtl setStepMsg3FontForeColor", status))
    {
      if (window.display_3.stepMsg3.fontBackColor != "")
      {
        fontBackColor = window.display_3.stepMsg3.fontBackColor;
      }
      else
      {
        fontBackColor = padColors.WHITE;
      }
      Utils.setFontBackColor(fontBackColor, WizScreens.step3_onSetStepMsg3FontBackColor);
    }
  }
  
  static step3_onSetStepMsg3FontBackColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl setStepMsg2FontBackColor", status))
    {
      Utils.addTextObject(window.display_3.stepMsg3, WizScreens.step3_onAddText1);
    }
  }  

  static step3_onAddText1(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addText1", status))
    {
      /* Because of the very different dimensions of the STU 300 we have to have use a different layout for the buttons and text etc
         so there are separate routines just for the 300 */
      if(padType.STU300 == window.pad.Type)
      {
        WizScreens.step3_isSTU300();
      }
      else
      {
        WizScreens.step3_notSTU300();
      }      
    }
  }
  
  static step3_notSTU300()
  {
    Utils.addRectangle( window.display_3.step3Rectangle, WizScreens.step3_onAddPrimitive1);
  }

  static step3_onAddPrimitive1(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPrimitive", status))
    {
      Utils.setFont(window.display_3.pleaseSign.fontName, window.display_3.pleaseSign.fontSize, window.display_3.pleaseSign.fontBold, false, WizScreens.step3_onPutFont2);
    }
  }

  static step3_onPutFont2(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutFont2", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (window.display_3.pleaseSign.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_3.pleaseSign.fontForeColor, WizScreens.step3_onSetFontForeColorPleaseSign);
      }
      else
      {
        Utils.addTextObject(window.display_3.pleaseSign, WizScreens.step3_onAddText2);
      }
    }
  }
  
  static step3_onSetFontForeColorPleaseSign(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColorPleaseSign", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_3.pleaseSign.fontBackColor, WizScreens.step3_onSetFontBackColorPleaseSign);
    }
  }
  
  static step3_onSetFontBackColorPleaseSign(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColorPleaseSign", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addTextObject(window.display_3.pleaseSign, WizScreens.step3_onAddText2);
    }
  }

  static step3_onAddText2(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addText2", status))
    {
      Utils.setFont(window.display_3.XMark.fontName, window.display_3.XMark.fontSize, window.display_3.XMark.fontBold, false, WizScreens.step3_onPutFontXMark);
    }
  }

  static step3_onPutFontXMark(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl FontXMark", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (window.display_3.XMark.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_3.XMark.fontForeColor, WizScreens.step3_onSetFontForeColorXMark);
      }
      else
      {
        Utils.addTextObject(window.display_3.XMark, WizScreens.step3_onAddTextXMark);
      }
    }
    else
    {
      Utils.addTextObject(window.display_3.XMark, WizScreens.step3_onAddTextXMark);
    }
  }
  
  static step3_onSetFontForeColorXMark(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColorXMark", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_3.XMark.fontBackColor, WizScreens.step3_onSetFontBackColorXMark);
    }
  }
  
  static step3_onSetFontBackColorXMark(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColorXMark", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addTextObject(window.display_3.XMark, WizScreens.step3_onAddTextXMark);
    }
  }
   
  static step3_onAddTextXMark(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addTextXMark", status))
    {
      Utils.addTextObject(window.display_3.sigMarkerLine, WizScreens.step3_onAddMarkerLine);
    }
  }

  static step3_onAddMarkerLine(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddMarkerLine", status))
    {
      Utils.setFont(window.pad.Font, window.display_3.signatureFontSize, window.pad.TextBold, false, WizScreens.step3_onPutSignatureFont);
    }
  }

  static step3_onPutSignatureFont(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutSignatureFont", status))
    {
      Utils.addSignatureObject(window.sigCtl, WizScreens.step3_onAddSignature);
    }
  }

  static step3_onAddSignature(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddSignature", status))
    {
      /* If we are using a colour pad then set the colour of the foreground and background fonts up now if defined in the text object */
      if (window.display_3.why.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_3.why.fontForeColor, WizScreens.step3_onSetFontForeColorWhy);
      }
      else
      {
        Utils.addTextObject(window.display_3.who, WizScreens.step3_onAddWho);
      }
    }
    else
    {
      Utils.addTextObject(window.display_3.who, WizScreens.step3_onAddWho);
    }
  }
  
  static step3_onSetFontForeColorWhy(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColorWhy", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_3.why.fontBackColor, WizScreens.step3_onSetFontBackColorWhy);
    }
  }
  
  static step3_onSetFontBackColorWhy(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColorWhy", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addTextObject(window.display_3.who, WizScreens.step3_onAddWho);
    }
  }

  static step3_onAddWho(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddWho", status))
    {
      Utils.addTextObject(window.display_3.why, WizScreens.step3_onAddWhy);
    }
  }
 
  static step3_onAddWhy(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddWhy", status))
    {
      Utils.setFont(window.display_3.okButton.fontName, window.display_3.okButton.buttonSize, window.display_3.okButton.fontBold, false, WizScreens.step3_onPutFontOK);
    }
  }

  static step3_onPutFontOK(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutFontOK", status))
    {
      var buttonSource = Utils.getButtonSourceFromHTMLDoc();
            
      if (buttonSource == textSource.STANDARD) 
      {
        // Set up font colours if required for colour pads
        if (window.display_3.okButton.fontForeColor != "")
        {
          Utils.setFontForeColor(window.display_3.okButton.fontForeColor, WizScreens.step3_onSetOKButtonFontForeColor);
        }
        else
        {
          Utils.addButtonObject(window.display_3.okButton, WizScreens.step3_onAddOK);
        }
      }
      else
      {
        Utils.addObjectImage(window.display_3.okButton, WizScreens.step3_onAddOK, buttonSource);
      }
    }
  }
    
  static step3_onSetOKButtonFontForeColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl step3 Utils.setFontOKButtonForeColor", status))
    {
      Utils.setFontBackColor(window.display_3.okButton.fontBackColor, WizScreens.step3_onSetOKButtonFontBackColor);
    }
  }
    
  static step3_onSetOKButtonFontBackColor(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl step3_setOKButtonFontBackColor", status))
    {
      Utils.addButtonObject(window.display_3.okButton, WizScreens.step3_onAddOK);
    }
  }   

  static step3_onAddOK(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddOK", status))
    {
      var buttonSource = Utils.getButtonSourceFromHTMLDoc();
            
      if (buttonSource == textSource.STANDARD) 
      {
        Utils.addButtonObject(window.display_3.clearButton, WizScreens.step3_onAddClear);
      }
      else
      {
        Utils.addObjectImage(window.display_3.clearButton, WizScreens.step3_onAddClear, buttonSource);
      }
    }
  }

  static step3_onAddClear(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddClear", status))
    {
      var buttonSource = Utils.getButtonSourceFromHTMLDoc();
            
      if (buttonSource == textSource.STANDARD) 
      {
        Utils.addButtonObject(window.display_3.cancelButton, WizScreens.step3_doDisplay);
      }
      else
      {
        Utils.addObjectImage(window.display_3.cancelButton, WizScreens.step3_doDisplay, buttonSource);
      }
    }
  }

  // The following group of statics are only applicable to the STU 300 

  static step3_isSTU300()
  {
    Utils.addLine(window.display_3.line, WizScreens.step3_onAddPrimitiveSTU300);
  }
  
  // STU 300
  static step3_onAddPrimitiveSTU300(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPrimitiveSTU300", status))
    {
      Utils.setFont(window.display_3.penSymbol.fontName, window.display_3.penSymbol.fontSize, window.pad.TextBold, window.sdkPtr.FontCharset.SYMBOL_CHARSET, WizScreens.step3_onPutFontPenSymbol);
    }
  }
  
  // STU 300
  static step3_onPutFontPenSymbol(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutFontPenSymbol", status))
    {
      window.wizCtl.GetFont(WizScreens.step3_onGetFontSTU300);
    }
  }
  
  // STU 300
  static step3_onGetFontSTU300(wizCtlV, font, status)
  {
    if(Utils.callbackStatusOK("WizCtl GetFontSTU300", status))
    {
      Utils.addTextObject(window.display_3.penSymbol, WizScreens.step3_onAddText1STU300);
    }
  }
  
  // STU 300
  static step3_onAddText1STU300(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.addText1STU300", status))
    {
      Utils.setFont(window.pad.Font, window.pad.signatureFontSize, window.sdkPtr.FontWeight.FW_NORMAL, false, WizScreens.step3_onPutSignatureFont);
    }
  }
  // end of STU300 statics

  // These next 2 statics are called regardless of the STU currently in use
  static step3_doDisplay(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddCancelButton", status))
    {
      window.wizCtl.Display(WizScreens.step3_onDisplay);
    }
  }

  static step3_onDisplay(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Display", status))
    {
      window.wizCtl.SetEventHandler(WizScreens.step3_Handler);
    }
  }

  /* This is the event handler for the user input on the third screen of the wizard i.e. signature capture*/
  static step3_Handler(ctl, id, type, status)
  {    
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      switch(id) {
        case buttonEvent.OK:
          Utils.print("OK selected");
          SessionControl.script_Completed(false);
          break;
        case buttonEvent.CLEAR:
          Utils.print("Clear");
          break;
        case buttonEvent.CANCEL:
          Utils.print("Previous");
          SessionControl.script_Cancelled();
          break;
        default:
          alert("Unexpected event: " + id);
          break;
      }
    }
    else
    {
      Utils.print("Wizard window closed");
      SessionControl.script_Cancelled();
    }
  }
}