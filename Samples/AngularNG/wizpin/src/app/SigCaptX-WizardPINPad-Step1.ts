/* **************************************************************************
  SigCaptX-WizardPINPad-Step1.js
   
  The static step1() is the controlling routine for setting up and displaying the objects
  on the PIN pad screen - in this case this is the first and only screen in the wizard sequence.
  The objects themselves are set up in SigCaptX-WizardPINPad-PadDefs.ts
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { SessionControl } from "./SigCaptX-SessionControl";
import { Utils } from './SigCaptX-Utils';
import { buttonEvent, PIN_MAXLENGTH, PIN_MINLENGTH } from "./SigCaptX-Globals";

export class WizPinScreen
{
  static inputObj:any;

  static step1()
  {
    window.wizCtl.Reset(WizPinScreen.onWizCtlReset);
  }

  static onWizCtlReset(wizCtlV, status)
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      Utils.setFont(window.display_1.enterBelow.fontName, window.display_1.enterBelow.fontSize, window.display_1.enterBelow.fontBold, false, WizPinScreen.onPutFontEnterBelow);
    }
    else
    {
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        SessionControl.actionWhenRestarted();
      }
    }
  }
    
  /* Add the text object "Enter a 4 digit PIN code below...." */
  static onPutFontEnterBelow(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutFontEnterBelow", status))
    {
      // If font colour is required do it now
      if (window.display_1.enterBelow.fontForeColor != null && window.display_1.enterBelow.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_1.enterBelow.fontForeColor, WizPinScreen.onSetFontForeColorEnterBelow);
      }
      else
      {
        Utils.addTextObject(window.display_1.enterBelow, WizPinScreen.onAddEnterBelow);
      }
    }
  }
    
  static onSetFontForeColorEnterBelow(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColorEnterBelow", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_1.enterBelow.fontBackColor, WizPinScreen.onSetFontBackColorEnterBelow);
    }
  }
    
  static onSetFontBackColorEnterBelow(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColorEnterBelow", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addTextObject(window.display_1.enterBelow, WizPinScreen.onAddEnterBelow);
    }
  }
  
  /* Next 9 statics - add the buttons for the 9 PINs */
  static onAddEnterBelow(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl step1 AddEnterBelow", status))
    {
      // If font colour is required do it now
      if (window.display_1.pin1.fontForeColor != null && window.display_1.pin1.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_1.pin1.fontForeColor, WizPinScreen.onSetFontForeColorPin1);
      }
      else
      {
        Utils.addButtonObject(window.display_1.pin1, WizPinScreen.onAddPin1Button);
      }
    }
  }

  static onSetFontForeColorPin1(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColorPin1", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_1.pin1.fontBackColor, WizPinScreen.onSetFontBackColorPin1);
    }
  }
  
  static onSetFontBackColorPin1(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColorPin1", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addButtonObject(window.display_1.pin1, WizPinScreen.onAddPin1Button);
    }
  }
    
  static onAddPin1Button(wizCtlV, status) 
  {
    if(Utils.callbackStatusOK("WizCtl PutFontEnterBelow", status))
    {
      Utils.addButtonObject(window.display_1.pin2, WizPinScreen.onAddPin2Button);
    }
  }
  
  static onAddPin2Button(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPin2Button", status))
    {
      Utils.addButtonObject(window.display_1.pin3, WizPinScreen.onAddPin3Button);
    }
  }
  
  static onAddPin3Button(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPin3Button", status))
    {
      Utils.addButtonObject(window.display_1.pin4, WizPinScreen.onAddPin4Button);
    }
  }
    
  static onAddPin4Button(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPin4Button", status))
    {
      Utils.addButtonObject(window.display_1.pin5, WizPinScreen.onAddPin5Button);
    }
  }
  
  static onAddPin5Button(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPin5Button", status))
    {
      Utils.addButtonObject(window.display_1.pin6, WizPinScreen.onAddPin6Button);
    }
  }
  
  static onAddPin6Button(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPin6Button", status))
    {
      Utils.addButtonObject(window.display_1.pin7, WizPinScreen.onAddPin7Button);
    }
  }
    
  static onAddPin7Button(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPin7Button", status))
    {
      Utils.addButtonObject(window.display_1.pin8, WizPinScreen.onAddPin8Button);
    }
  }
  
  static onAddPin8Button(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPin8Button", status))
    {
      Utils.addButtonObject(window.display_1.pin9, WizPinScreen.onAddPin9Button);
    }
  }
  
  /* Next create the input object for accepting the input from the user */
  static onAddPin9Button(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddPin9Button", status))
    {
      WizPinScreen.inputObj = new window.sdkPtr.InputObj(WizPinScreen.onInputObjCtr);
    }
  }
    
  static onInputObjCtr(inputObjV, status) 
  {
    if (Utils.callbackStatusOK("InputObj constructor", status))
    {
      WizPinScreen.inputObj.PutMinLength(PIN_MINLENGTH, WizPinScreen.onInputObjMinLen);
    }
  }

  /* The input obj has a minimum and maximum length */
  static onInputObjMinLen(inputObjV, status) 
  {
    if (Utils.callbackStatusOK("InputObj PutMinLength", status))
    {
      WizPinScreen.inputObj.PutMaxLength(PIN_MAXLENGTH, WizPinScreen.onInputObjMaxLen);
    }   
  }
  
  static onInputObjMaxLen(inputObjV, status)    
  {
    if (Utils.callbackStatusOK("InputObj PutMaxLength", status))
    {
      Utils.addInputObject(WizPinScreen.inputObj, WizPinScreen.onAddObjectInput);
    }
  }
    
  /* Now add the input echo object */
  static onAddObjectInput(wizCtlV, status)
  {
    if (Utils.callbackStatusOK("WizCtl addInputObj", status))
    {
      Utils.addInputObjectEcho("centre", window.display_1.yInputEcho, WizPinScreen.onAddObjectInputEcho);
    }
  }
    
  /* Finally add the Next and Cancel buttons */
  static onAddObjectInputEcho(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddInputEcho", status))
    {
      // If font colour is required do it now
      if (window.display_1.cancelButton.fontForeColor != null && window.display_1.cancelButton.fontForeColor != "")
      {
        Utils.setFontForeColor(window.display_1.cancelButton.fontForeColor, WizPinScreen.onSetFontForeColorCancelButton);
      }
      else
      {
        Utils.addButtonObject(window.display_1.cancelButton, WizPinScreen.onAddCancelButton);
      }
    }
  }
  
  static onSetFontForeColorCancelButton(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontForeColorCancelButton", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      Utils.setFontBackColor(window.display_1.cancelButton.fontBackColor, WizPinScreen.onSetFontBackColorCancelButton);
    }
  }
    
  static onSetFontBackColorCancelButton(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Utils.setFontBackColorCancelButton", status))
    {
      // After setting up the font colours set up the text string itself
      Utils.addButtonObject(window.display_1.cancelButton, WizPinScreen.onAddCancelButton);
    }
  }
  
  static onAddCancelButton(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddCancelButtno", status))
    {
      Utils.addButtonObject(window.display_1.nextButton, WizPinScreen.onAddNextButton);
    }
  }
  
  static onAddNextButton(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl AddNextButton", status))
    {
      window.wizCtl.Display(WizPinScreen.onDisplay);
    }
  }
  
  static onDisplay(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Display", status))
    {
      window.wizCtl.SetEventHandler(WizPinScreen.Handler);
    }
  }

  /* This static handles the events generated by the user input on the pad */
  static Handler(ctl, id, type, status)
  {   
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      switch(id) 
      {
        case "input":
          switch (type) 
          {
            case 4: 
              break; //Utils.print("min chars entered")
            case 5: 
              break; //Utils.print("max chars entered")
            case 6: 
              break; //Utils.print("attempted to exceed min/max chars")
            default: 
              Utils.print("Input unexpected type: " + type); 
              break;
          }
          break;
      case buttonEvent.CLEAR:   
        break; // handled by the InputObj control
      case buttonEvent.OK:
        WizPinScreen.inputObj.GetText(WizPinScreen.onInputObjGetText);
        break;
      case buttonEvent.CANCEL:
        Utils.print("Cancel");
        SessionControl.script_Completed(true);
        break;
      default:
        Utils.print( "Exception: Handler(): " + "unexpected event: " + id);
        break;
      }  
    }
    else
    {
      Utils.print("Wizard window closed");
      SessionControl.script_Cancelled();
    }
  }

  /* Called when user clicks OK to signify that PIN input is complete */
  static onInputObjGetText(inputObjV, text, status) 
  {
    if(window.sdkPtr.ResponseStatus.OK == status) 
    {
      Utils.print("Code entered: " + text);
      SessionControl.script_Completed(true);
    }
    else
    {
      Utils.print("InputObj GetText error: " + status);
      SessionControl.script_Cancelled();
    }
  }
}