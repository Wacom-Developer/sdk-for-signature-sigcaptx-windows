/* **************************************************************************
  SigCaptX-WizardPINPad-Step1.ts
   
  The step1() is the controlling routine for setting up and displaying the objects
  on the PIN pad screen - in this case this is the first and only screen in the wizard sequence.
  The objects themselves are set up in SigCaptX-WizardPINPad-PadDefs.js
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { callbackStatusOK, print, WizDisplay } from './SigCaptX-WizUtils';
import { buttonEvent, PIN_MAXLENGTH, PIN_MINLENGTH } from './SigCaptX-Globals';
import { WizardEventController } from './SigCaptX-WizSessionCtrl';
import { Screen_Display1 } from './SigCaptX-WizardPINPad-PadDefs';

declare global{
  interface Window{
    inputObj:any;
    sdkPtr:any;
    step1:any;
    wizCtl:any;
  }
}

export class PINScreen
{
  screen:any;

  constructor(pad)
  {
    this.screen = new Screen_Display1(pad);
  }

  step1 = () =>
  {
    window.wizCtl.Reset(this.step1_onWizCtlReset);
  }
 
  step1_onWizCtlReset = (wizCtlV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      WizDisplay.setFont(this.screen.enterBelow.fontName, this.screen.enterBelow.fontSize, this.screen.enterBelow.fontBold, false, this.onPutFontEnterBelow);
    }
    else
    {
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        WizardEventController.actionWhenRestarted(window.step1);
      }
    }
  }
  
  /* Add the text object "Enter a 4 digit PIN code below...." */
  onPutFontEnterBelow = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PutFontEnterBelow", status))
    {
      // If font colour is required do it now
      if (this.screen.enterBelow.fontForeColor != null && this.screen.enterBelow.fontForeColor != "")
      {
        WizDisplay.setFontForeColor(this.screen.enterBelow.fontForeColor, this.step1_onSetFontForeColorEnterBelow);
      }
      else
      {
        WizDisplay.addTextObject(this.screen.enterBelow, this.step1_onAddEnterBelow);
      }
    }
  }
  
  step1_onSetFontForeColorEnterBelow = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.setFontForeColorEnterBelow", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      WizDisplay.setFontBackColor(this.screen.enterBelow.fontBackColor, this.step1_onSetFontBackColorEnterBelow);
    }
  }
  
  step1_onSetFontBackColorEnterBelow = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.setFontBackColorEnterBelow", status))
    {
      // After setting up the font colours set up the text string itself
      WizDisplay.addTextObject(this.screen.enterBelow, this.step1_onAddEnterBelow);
    }
  }
  
  /* Next 9 functions - add the buttons for the 9 PINs */
  step1_onAddEnterBelow = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl step1 AddEnterBelow", status))
    {
      // If font colour is required do it now
      if (this.screen.pin1.fontForeColor != null && this.screen.pin1.fontForeColor != "")
      {
        WizDisplay.setFontForeColor(this.screen.pin1.fontForeColor, this.step1_onSetFontForeColorPin1);
      }
      else
      {
        WizDisplay.addButtonObject(this.screen.pin1, this.step1_onAddPin1Button);
      }
    }
  }

  step1_onSetFontForeColorPin1 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.setFontForeColorPin1", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      WizDisplay.setFontBackColor(this.screen.pin1.fontBackColor, this.step1_onSetFontBackColorPin1);
    }
  }
  
  step1_onSetFontBackColorPin1 = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.setFontBackColorPin1", status))
    {
      // After setting up the font colours set up the text string itself
      WizDisplay.addButtonObject(this.screen.pin1, this.step1_onAddPin1Button);
    }
  }
  
  step1_onAddPin1Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PutFontEnterBelow", status))
    {
      WizDisplay.addButtonObject(this.screen.pin2, this.onAddPin2Button);
    }
  }
  
  onAddPin2Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPin2Button", status))
    {
      WizDisplay.addButtonObject(this.screen.pin3, this.onAddPin3Button);
    }
  }
  
  onAddPin3Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPin3Button", status))
    {
      WizDisplay.addButtonObject(this.screen.pin4, this.onAddPin4Button);
    }
  }
  
  onAddPin4Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPin4Button", status))
    {
      WizDisplay.addButtonObject(this.screen.pin5, this.onAddPin5Button);
    }
  }
  
  onAddPin5Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPin5Button", status))
    {
      WizDisplay.addButtonObject(this.screen.pin6, this.onAddPin6Button);
    }
  }
  
  onAddPin6Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPin6Button", status))
    {
      WizDisplay.addButtonObject(this.screen.pin7, this.onAddPin7Button);
    }
  }
  
  onAddPin7Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPin7Button", status))
    {
      WizDisplay.addButtonObject(this.screen.pin8, this.onAddPin8Button);
    }
  }
  
  onAddPin8Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPin8Button", status))
    {
      WizDisplay.addButtonObject(this.screen.pin9, this.onAddPin9Button);
    }
  }
  
  /* Next create the input object for accepting the input from the user */
  onAddPin9Button = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddPin9Button", status))
    {
      window.inputObj = new window.sdkPtr.InputObj(this.onInputObjCtr);
    }
  }
  
  onInputObjCtr = (inputObjV, status) =>
  {
    if (callbackStatusOK("InputObj constructor", status))
    {
      window.inputObj.PutMinLength(PIN_MINLENGTH, this.onInputObjMinLen);
    }
  }

  /* The input obj has a minimum and maximum length */
  onInputObjMinLen = (inputObjV, status) =>
  {
    if (callbackStatusOK("InputObj PutMinLength", status))
    {
      window.inputObj.PutMaxLength(PIN_MAXLENGTH, this.onInputObjMaxLen);
    }   
  }
  
  onInputObjMaxLen = (inputObjV, status) =>
  {
    if (callbackStatusOK("InputObj PutMaxLength", status))
    {
      WizDisplay.addInputObject(window.inputObj, this.onAddObjectInput);
    }
  }
  
  /* Now add the input echo object */
  onAddObjectInput = (wizCtlV, status) =>
  {
    if (callbackStatusOK("WizCtl WizDisplay.addInputObj", status))
    {
      WizDisplay.addInputObjectEcho("centre", this.screen.yInputEcho, this.onAddObjectInputEcho);
    }
  }
  
  /* Finally add the Next and Cancel buttons */
  onAddObjectInputEcho = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.addInputEcho", status))
    {
      // If font colour is required do it now
      if (this.screen.cancelButton.fontForeColor != null && this.screen.cancelButton.fontForeColor != "")
      {
        WizDisplay.setFontForeColor(this.screen.cancelButton.fontForeColor, this.step1_onSetFontForeColorCancelButton);
      }
      else
      {
        WizDisplay.addButtonObject(this.screen.cancelButton, this.step1_onAddCancelButton);
      }
    }
  }
  
  step1_onSetFontForeColorCancelButton = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.setFontForeColorCancelButton", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      WizDisplay.setFontBackColor(this.screen.cancelButton.fontBackColor, this.step1_onSetFontBackColorCancelButton);
    }
  }
  
  step1_onSetFontBackColorCancelButton = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl WizDisplay.setFontBackColorCancelButton", status))
    {
      // After setting up the font colours set up the text string itself
      WizDisplay.addButtonObject(this.screen.cancelButton, this.step1_onAddCancelButton);
    }
  }
  
  step1_onAddCancelButton = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddCancelButtno", status))
    {
       WizDisplay.addButtonObject(this.screen.nextButton, this.onAddNextButton);
    }
  }
  
  onAddNextButton = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl AddNextButton", status))
    {
      window.wizCtl.Display(this.onDisplay);
    }
  }
 
  onDisplay = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      window.wizCtl.SetEventHandler(this.step1_Handler);
    }
  }

  /* Thishandles the events generated by the user input on the pad */
  step1_Handler = (ctl, id, type, status) =>
  {   
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      switch(id) 
      {
        case "input":
          switch (type) 
          {
            case 4: 
              break; //print("min chars entered")
            case 5: 
              break; //print("max chars entered")
            case 6: 
              break; //print("attempted to exceed min/max chars")
            default: 
              print("Input unexpected type: " + type); 
              break;
          }
          break;
      case buttonEvent.CLEAR:   
        break; // handled by the InputObj control
      case buttonEvent.OK:
        window.inputObj.GetText(this.onInputObjGetText);
        break;
      case buttonEvent.CANCEL:
        print("Cancel");
        WizardEventController.script_Completed(true);
        break;
      default:
        print( "Exception: step1_Handler(): " + "unexpected event: " + id);
        break;
      }  
    }
    else
    {
      print("Wizard window closed");
      WizardEventController.script_Cancelled();
    }
  }

  /* Called when user clicks OK to signify that PIN input is complete */
  onInputObjGetText = (inputObjV, text, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status) 
    {
      print("Code entered: " + text);
      WizardEventController.script_Completed(true);
    }
    else
    {
      print("InputObj GetText error: " + status);
      WizardEventController.script_Cancelled();
    }
  }
}