/* **************************************************************************
  SigCaptX-Wizard-Main.ts
   
  This file contains the main control functions for controlling the 
  wizard session.

  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/

import { buttonEvent, DONTSETFONT, DONTUSEWINGDINGS, padColors, padRange, padType, radioSelection, SETFONT, textSource, USEWINGDINGS } from './SigCaptX-Globals';
import { callbackStatusOK, getButtonSourceFromHTMLDoc, print,  WizDisplay } from './SigCaptX-WizUtils';
import { WizardEventController } from './SigCaptX-WizSessionCtrl';
import { Screen_Display1, Screen_Display2, Screen_Display3 } from './SigCaptX-Wizard-PadDefs';

declare global {
  interface Window {
      pad:any;
  }
}

export class WizardScreens
{
  buttonSource:any;
  screen1:any;
  screen2:any;
  screen3:any;

  constructor(pad, buttonTextSource)
  {
    this.buttonSource = getButtonSourceFromHTMLDoc();
    this.screen1 = new Screen_Display1(pad, buttonTextSource);
    this.screen2 = new Screen_Display2(pad, buttonTextSource);
    this.screen3 = new Screen_Display3(pad, buttonTextSource);
  }

      
  step1()
  {
    window.wizCtl.Reset(this.step1_onWizCtlReset);
  }

  step1_onWizCtlReset = (wizCtlV:any, status:number) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      WizDisplay.setFont(this.screen1.stepMsg1.fontName, this.screen1.stepMsg1.fontSize, this.screen1.stepMsg1.fontBold, DONTUSEWINGDINGS, this.step1_onPutFontStepMsg1);
    }
    else
    {
      print("WizCtl Reset" + status);
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        WizardEventController.actionWhenRestarted(this.step1);
      }
    }
  }

  step1_onPutFontStepMsg1 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PutFontStepMsg1", status))
    {
      WizDisplay.setupTextObject(this.screen1.stepMsg1, DONTSETFONT, DONTUSEWINGDINGS, this.step1_onAddTextStep1);
    }
  }

  step1_onAddTextStep1 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addObject", status))
    {
      if (window.pad.range == "300")
      {
        WizDisplay.addLine(this.screen1.step1Line, this.step1_onAddRectangle);
      }
      else
      { 
        WizDisplay.addRectangle(this.screen1.step1Rectangle, this.step1_onAddRectangle);
      }
    }
  }
    
  step1_onAddRectangle = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Primitive", status))
    {
      WizDisplay.setupTextObject(this.screen1.infoText, SETFONT, DONTUSEWINGDINGS, this.step1_onAddTextInfoText);
    }
  }

  step1_onAddTextInfoText = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addTextInfoText", status))
    {
      WizDisplay.setFont(this.screen1.checkboxObj.fontName, this.screen1.checkboxObj.fontSize, this.screen1.checkboxObj.fontBold, DONTUSEWINGDINGS, this.step1_onPutFontCheckbox);
    }
  }
    
  step1_onPutFontCheckbox = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PutFontCheckbox", status))
    {
      WizDisplay.addCheckBox(this.screen1.checkboxObj.xPos, this.screen1.checkboxObj.yPos, this.screen1.checkboxObj.options, this.step1_onAddCheck);
    }
  }
    
  step1_onAddCheck = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddCheck", status))
    {
      WizDisplay.setupTextObject(this.screen1.signingText, SETFONT, DONTUSEWINGDINGS, this.step1_onAddTextSigningText);
    }
  }
  
  step1_onAddTextSigningText = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addTextSigningText", status))
    {
      WizDisplay.setupTextObject(this.screen1.nextToContinue, SETFONT, DONTUSEWINGDINGS, this.step1_onAddTextNextCont);
    }
  }
    
  step1_onAddTextNextCont = (wizCtlV, status) =>
  {
    //print("step1_onAddTextNextCont");
    if(callbackStatusOK("WizCtl WizDisplay.addTextNextCont", status))
    {
      if (this.buttonSource === textSource.STANDARD)
      {
        WizDisplay.setupButtonObject(this.screen1.cancelButton, SETFONT, DONTUSEWINGDINGS, this.step1_onAddCancelButton);
      }
      else
      {
        WizDisplay.addObjectImage(this.screen1.cancelButton, this.step1_onAddCancelButton, this.screen1.cancelButton.imageFile);
      }
    }
  }
    
  step1_onAddCancelButton = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddCancelButton", status))
    {
      /* If the user has chosen to use images for the buttons then add the image object, otherwise a standard button object */

      if (this.buttonSource == textSource.STANDARD)
      {
        WizDisplay.setupButtonObject(this.screen1.nextButton, DONTSETFONT, DONTUSEWINGDINGS, this.step1_onAddNextButton);
      }
      else
      {
        WizDisplay.addObjectImage(this.screen1.nextButton, this.step1_onAddNextButton, this.buttonSource);
      }
    }
  }
    
  step1_onAddNextButton = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddNextButton", status))
    {
      window.wizCtl.Display(this.step1_onDisplay);
    }
  }
  
  step1_onDisplay = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      window.wizCtl.SetEventHandler(this.step1_Handler);
    }
  }

  /* This is the event handler for the user input on the first screen of the wizard */

  step1_onGetObjectState = (wizCtlV, objState, status) =>
  {
    if(window.sdkPtr.VariantType.VARIANT_NUM == objState.type && 1 == objState.num)
    {
      print("Check box was selected");
    }
    this.step2();
  }

  step1_Handler = (ctl, id, type, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      switch(id) 
      {
        case buttonEvent.NEXT:
          window.wizCtl.GetObjectState("Check", this.step1_onGetObjectState);
          break;
        case buttonEvent.CHECK:
          break;
        case buttonEvent.CANCEL:
          WizardEventController.script_Cancelled();
          break;
        default:
          print("Unexpected event: " + id);
          alert("Unexpected event: " + id);
          break;
      }
    }
    else
    {
      print("Wizard window closed");
      WizardEventController.script_Cancelled();
    }
  }

  /* The step2() is the controlling routine for setting up and displaying the objects
    on the screen screen in the wizard sequence, i.e. the one with the radio buttons */
  step2 = () =>
  {
    window.wizCtl.Reset(this.step2_onWizCtlReset);
  }

  step2_onWizCtlReset = (wizCtlV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
        WizDisplay.setupTextObject(this.screen2.stepMsg2, SETFONT, DONTUSEWINGDINGS, this.step2_onAddText1);
    }
    else
    {
      print("WizCtl Reset" + status);
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        WizardEventController.actionWhenRestarted(this.step2);
      }
    }
  }

  step2_onAddText1 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addObject", status))
    {
      if (window.pad.range == padRange.STU300)
      {
          WizDisplay.addLine(this.screen2.step2Line, this.step2_onAddPrimitive1);
      }
      else
      {
          WizDisplay.addRectangle( this.screen2.step2Rectangle, this.step2_onAddPrimitive1);
      }
    }
  }
  
  step2_onAddPrimitive1 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Primitive", status))
    {
       // Now add this text to the WizCtl: "Radio buttons provide options for the signing process and can be transferred to the document"
       WizDisplay.setupTextObject(this.screen2.infoObject, SETFONT, DONTUSEWINGDINGS, this.step2_onAddInfoObject);
    }
  }
  
  step2_onAddInfoObject = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addInfoObject", status))
    {
      WizDisplay.setupTextObject(this.screen2.nextToContinue, DONTSETFONT, DONTUSEWINGDINGS, this.step2_onAddNextToContinue);
    }
  }
  
  step2_onAddNextToContinue = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addNextToContinue", status))
    {
       WizDisplay.setupRadio(this.screen2.maleRadio, SETFONT, DONTUSEWINGDINGS, this.step2_onAddRadioButton1);
    }
  }
  
  step2_onAddRadioButton1 = (wizCtlV, status) =>
  {
    if (callbackStatusOK("WizCtl WizDisplay.addRadioButton1", status ))
    {
      WizDisplay.setupRadio(this.screen2.femaleRadio, DONTSETFONT, DONTUSEWINGDINGS, this.step2_onAddRadioButton2);
    }
  }
  
  step2_onAddRadioButton2 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addRadioButton2", status))
    {
      if (this.buttonSource == textSource.STANDARD) 
      {
        WizDisplay.setupButtonObject(this.screen2.cancelButton, DONTSETFONT, DONTUSEWINGDINGS, this.step2_onAddCancelButton);
      }
      else
      {
        //print("Adding button as an image from source " + buttonSource);
        WizDisplay.addObjectImage(this.screen2.cancelButton, this.step2_onAddCancelButton, this.buttonSource);
      }
    }
  }
  
  step2_onAddCancelButton = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddCancelButton", status))
    {
      if (this.buttonSource == textSource.STANDARD) 
      {
        WizDisplay.setupButtonObject(this.screen2.nextButton, DONTSETFONT, DONTUSEWINGDINGS, this.step2_onAddNextButton);
      }
      else
      {
        WizDisplay.addObjectImage(this.screen2.nextButton, this.step2_onAddNextButton, this.buttonSource);
      }
    }
  }

  step2_onAddNextButton = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddNextButton", status))
    {
      window.wizCtl.Display(this.step2_onDisplay);
    }
  }
  
  step2_onDisplay = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      window.wizCtl.SetEventHandler(this.step2_Handler);
    }
  }

  /* This is the event handler for the user input on the second screen of the wizard */
  step2_Handler = (ctl, id, type, status) =>
  { 
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      switch(id) {
        case buttonEvent.NEXT:
          this.step3();
          break;
        case buttonEvent.CHECK:
          break;
        case buttonEvent.CANCEL:
          this.step1();
          break;
        case radioSelection.MALE:
          break;
        case radioSelection.FEMALE:
          break;
        default:
          print("Unexpected event: " + id);
          alert("Unexpected event: " + id);
        break;
      } 
    }
    else
    {
      print("Wizard window closed");
      WizardEventController.script_Cancelled();
    }
  }

/* The this.step3() is the controlling routine for setting up and displaying the objects
   on the third screen in the wizard sequence i.e. the signature capture itself.
   The objects themselves are set up in SigCaptX-Wizard-PadDefs.js */
  step3 = () =>
  {
    window.wizCtl.Reset(this.step3_onWizCtlReset);
  }

  step3_onWizCtlReset = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Reset", status))
    {
       WizDisplay.setupTextObject(this.screen3.stepMsg3, SETFONT, DONTUSEWINGDINGS, this.step3_onAddStepMsg);
    }
  }

  step3_onAddStepMsg = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addText1", status))
    {
      /* Because of the very different dimensions of the STU 300 we have to have use a different layout for the buttons and text etc
         so there are separate routines just for the 300 */
      if(padType.STU300 == window.pad.type)
      {
        this.step3_isSTU300();
      }
      else
      {
        this.step3_notSTU300();
      }      
    }
  }
  
  step3_notSTU300 = () =>
  {
    WizDisplay.addRectangle( this.screen3.step3Rectangle, this.step3_onAddPrimitive1);
  }

  step3_onAddPrimitive1 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPrimitive", status))
    {
       WizDisplay.setupTextObject(this.screen3.pleaseSign, SETFONT, DONTUSEWINGDINGS, this.step3_onAddPleaseSign);
    }
  }

  step3_onAddPleaseSign = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addPleaseSign", status))
    {
       WizDisplay.setupTextObject(this.screen3.XMark, SETFONT, DONTUSEWINGDINGS, this.step3_onAddTextXMark);
    }
  }
   
  step3_onAddTextXMark = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addTextXMark", status))
    {
      WizDisplay.setupTextObject(this.screen3.sigMarkerLine, DONTSETFONT, DONTUSEWINGDINGS, this.step3_onAddMarkerLine);
    }
  }

  step3_onAddMarkerLine = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddMarkerLine", status))
    {
       WizDisplay.setFont(window.pad.font, this.screen3.signatureFontSize, window.pad.textBold, false, this.step3_onPutSignatureFont);
    }
  }

  step3_onPutSignatureFont = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PutSignatureFont", status))
    {
      WizDisplay.addSignatureObject(window.sigCtl, this.step3_onAddSignature);
    }
  }

  step3_onAddSignature = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addSignature", status))
    {
      WizDisplay.setupTextObject(this.screen3.why, DONTSETFONT, DONTUSEWINGDINGS, this.step3_onAddWhy);
    }
  }
  
  step3_onAddWhy = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl  WizDisplay.addWhy", status))
    {
      WizDisplay.setupTextObject(this.screen3.who, DONTSETFONT, DONTUSEWINGDINGS, this.step3_onAddWho);
    }
  }

  step3_onAddWho = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddWho", status))
    {
      if (this.buttonSource == textSource.STANDARD) 
      {
        WizDisplay.setupButtonObject(this.screen3.okButton, SETFONT, DONTUSEWINGDINGS, this.step3_onAddOK);
      }
      else
      {
        WizDisplay.addObjectImage(this.screen3.okButton, this.step3_onAddOK, this.buttonSource);
      }
    }
  }
    
  step3_onAddOK = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddOK", status))
    {
      if (this.buttonSource == textSource.STANDARD) 
      {
        WizDisplay.setupButtonObject(this.screen3.clearButton, SETFONT, DONTUSEWINGDINGS, this.step3_onAddClear);
      }
      else
      {
        WizDisplay.addObjectImage(this.screen3.clearButton, this.step3_onAddClear, this.buttonSource);
      }
    }
  }

  step3_onAddClear = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddClear", status))
    {    
      if (this.buttonSource == textSource.STANDARD) 
      {
        WizDisplay.setupButtonObject(this.screen3.cancelButton, SETFONT, DONTUSEWINGDINGS, this.step3_doDisplay);
      }
      else
      {
        WizDisplay.addObjectImage(this.screen3.cancelButton, this.step3_doDisplay, this.buttonSource);
      }
    }
  }

  // The following group of functions are only applicable to the STU 300 

  step3_isSTU300 = () =>
  {
    WizDisplay.addLine(this.screen3.line, this.step3_onAddPrimitiveSTU300);
  }
  
  // STU 300
  step3_onAddPrimitiveSTU300 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPrimitiveSTU300", status))
    {
       WizDisplay.setFont(this.screen3.penSymbol.fontName, this.screen3.penSymbol.fontSize, window.pad.textBold, 2, this.step3_onPutFontPenSymbol);
    }
  }
  
  // STU 300
  step3_onPutFontPenSymbol = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PutFontPenSymbol", status))
    {
      window.wizCtl.GetFont(this.step3_onGetFontSTU300);
    }
  }
  
  // STU 300
  step3_onGetFontSTU300 = (wizCtlV, font, status) =>
  {
    if(callbackStatusOK("WizCtl GetFontSTU300", status))
    {
      WizDisplay.setupTextObject(this.screen3.penSymbol, SETFONT, USEWINGDINGS, this.step3_onAddText1STU300);
    }
  }
  
  // STU 300
  step3_onAddText1STU300 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addText1STU300", status))
    {
       WizDisplay.setFont(window.pad.font, window.pad.signatureFontSize, window.sdkPtr.FontWeight.FW_NORMAL, false, this.step3_onPutSignatureFont);
    }
  }
  // end of STU300 functions

  // These next 2 functions are called regardless of the STU currently in use
  step3_doDisplay = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddCancelButton", status))
    {
      window.wizCtl.Display(this.step3_onDisplay);
    }
  }

  step3_onDisplay = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      window.wizCtl.SetEventHandler(this.step3_Handler);
    }
  }

  /* This is the event handler for the user input on the third screen of the wizard i.e. signature capture*/
  step3_Handler = (ctl, id, type, status) =>
  {    
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      switch(id) {
        case buttonEvent.OK:
          print("OK selected");
          WizardEventController.script_Completed(false);
          break;
        case buttonEvent.CLEAR:
          print("Clear");
          break;
        case buttonEvent.CANCEL:
          print("Previous");
          WizardEventController.script_Cancelled();
          break;
        default:
          alert("Unexpected event: " + id);
          break;
      }
    }
    else
    {
      print("Wizard window closed");
      WizardEventController.script_Cancelled();
    }
  }
}