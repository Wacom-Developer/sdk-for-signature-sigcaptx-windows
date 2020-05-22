/* **************************************************************************
  SigCaptX-WizardPINPad-Step1.js
   
  The function step1() is the controlling routine for setting up and displaying the objects
  on the PIN pad screen - in this case this is the first and only screen in the wizard sequence.
  The objects themselves are set up in SigCaptX-WizardPINPad-PadDefs.js
  
  Copyright (c) 2018 Wacom Co. Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/
function step1()
{
  wizCtl.Reset(step1_onWizCtlReset);
  
  //print("At start of step1() Cancel Button fore color is " + display_1.cancelButton.fontForeColor);
  function step1_onWizCtlReset(wizCtlV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      setFont(display_1.enterBelow.fontName, display_1.enterBelow.fontSize, display_1.enterBelow.fontBold, false, onPutFontEnterBelow);
    }
    else
    {
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
      {
        actionWhenRestarted(window.step1);
      }
    }
  }
  
  /* Add the text object "Enter a 4 digit PIN code below...." */
  function onPutFontEnterBelow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutFontEnterBelow", status))
    {
      // If font colour is required do it now
      if (display_1.enterBelow.fontForeColor != null && display_1.enterBelow.fontForeColor != "")
      {
        setFontForeColor(display_1.enterBelow.fontForeColor, step1_onSetFontForeColorEnterBelow);
      }
      else
      {
        addTextObject(display_1.enterBelow, onAddEnterBelow);
      }
    }
  }
  
  function step1_onSetFontForeColorEnterBelow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorEnterBelow", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.enterBelow.fontBackColor, step1_onSetFontBackColorEnterBelow);
    }
  }
  
  function step1_onSetFontBackColorEnterBelow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorEnterBelow", status))
    {
      // After setting up the font colours set up the text string itself
      addTextObject(display_1.enterBelow, step1_onAddEnterBelow);
    }
  }
  
  /* Next 9 functions - add the buttons for the 9 PINs */
  function step1_onAddEnterBelow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl step1 AddEnterBelow", status))
    {
      // If font colour is required do it now
      if (display_1.pin1.fontForeColor != null && display_1.pin1.fontForeColor != "")
      {
        setFontForeColor(display_1.pin1.fontForeColor, step1_onSetFontForeColorPin1);
      }
      else
      {
        addButtonObject(display_1.pin1, step1_onAddPin1Button);
      }
    }
  }

  function step1_onSetFontForeColorPin1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorPin1", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.pin1.fontBackColor, step1_onSetFontBackColorPin1);
    }
  }
  
  function step1_onSetFontBackColorPin1(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorPin1", status))
    {
      // After setting up the font colours set up the text string itself
      addButtonObject(display_1.pin1, step1_onAddPin1Button);
    }
  }
  
  function step1_onAddPin1Button(wizCtlV, status) 
  {
    if(callbackStatusOK("WizCtl PutFontEnterBelow", status))
    {
      addButtonObject(display_1.pin2, onAddPin2Button);
    }
  }
  
  function onAddPin2Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin2Button", status))
    {
      addButtonObject(display_1.pin3, onAddPin3Button);
    }
  }
  
  function onAddPin3Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin3Button", status))
    {
      addButtonObject(display_1.pin4, onAddPin4Button);
    }
  }
  
  function onAddPin4Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin4Button", status))
    {
      addButtonObject(display_1.pin5, onAddPin5Button);
    }
  }
  
  function onAddPin5Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin5Button", status))
    {
      addButtonObject(display_1.pin6, onAddPin6Button);
    }
  }
  
  function onAddPin6Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin6Button", status))
    {
      addButtonObject(display_1.pin7, onAddPin7Button);
    }
  }
  
  function onAddPin7Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin7Button", status))
    {
      addButtonObject(display_1.pin8, onAddPin8Button);
    }
  }
  
  function onAddPin8Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin8Button", status))
    {
      addButtonObject(display_1.pin9, onAddPin9Button);
    }
  }
  
  /* Next create the input object for accepting the input from the user */
  function onAddPin9Button(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddPin9Button", status))
    {
      inputObj = new wgssSignatureSDK.InputObj(onInputObjCtr);
    }
  }
  
  function onInputObjCtr(inputObjV, status) 
  {
    if (callbackStatusOK("InputObj constructor", status))
    {
      inputObj.PutMinLength(PIN_MINLENGTH, onInputObjMinLen);
    }
  }

  /* The input obj has a minimum and maximum length */
  function onInputObjMinLen(inputObjV, status) 
  {
    if (callbackStatusOK("InputObj PutMinLength", status))
    {
      inputObj.PutMaxLength(PIN_MAXLENGTH, onInputObjMaxLen);
    }   
  }
  
  function onInputObjMaxLen(inputObjV, status)    
  {
    if (callbackStatusOK("InputObj PutMaxLength", status))
    {
      addInputObject(inputObj, onAddObjectInput);
    }
  }
  
  /* Now add the input echo object */
  function onAddObjectInput(wizCtlV, status)
  {
    if (callbackStatusOK("WizCtl addInputObj", status))
    {
      addInputObjectEcho("centre", display_1.yInputEcho, onAddObjectInputEcho);
    }
  }
  
  /* Finally add the Next and Cancel buttons */
  function onAddObjectInputEcho(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddInputEcho", status))
    {
      // If font colour is required do it now
      if (display_1.cancelButton.fontForeColor != null && display_1.cancelButton.fontForeColor != "")
      {
        setFontForeColor(display_1.cancelButton.fontForeColor, step1_onSetFontForeColorCancelButton);
      }
      else
      {
        addButtonObject(display_1.cancelButton, step1_onAddCancelButton);
      }
    }
  }
  
  function step1_onSetFontForeColorCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontForeColorCancelButton", status))
    {
      // If a foreground colour has been set then we assume a background colour must also be required
      setFontBackColor(display_1.cancelButton.fontBackColor, step1_onSetFontBackColorCancelButton);
    }
  }
  
  function step1_onSetFontBackColorCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl SetFontBackColorCancelButton", status))
    {
      // After setting up the font colours set up the text string itself
      addButtonObject(display_1.cancelButton, step1_onAddCancelButton);
    }
  }
  
  function step1_onAddCancelButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddCancelButtno", status))
    {
       addButtonObject(display_1.nextButton, onAddNextButton);
    }
  }
  
  function onAddNextButton(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl AddNextButton", status))
    {
      wizCtl.Display(onDisplay);
    }
  }
 
  function onDisplay(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Display", status))
    {
      wizCtl.SetEventHandler(step1_Handler);
    }
  }
}

/* This function handles the events generated by the user input on the pad */
function step1_Handler(ctl, id, type, status)
{   
  if(wgssSignatureSDK.ResponseStatus.OK == status)
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
            print("Input unexpected type: " + Type); 
            break;
        }
        break;
    case buttonEvent.CLEAR:   
      break; // handled by the InputObj control
    case buttonEvent.OK:
      inputObj.GetText(onInputObjGetText);
      break;
    case buttonEvent.CANCEL:
      print("Cancel");
      wizardEventController.script_Completed(true);
      break;
    default:
      print( "Exception: step1_Handler(): " + "unexpected event: " + id);
      break;
    }  
  }
  else
  {
    print("Wizard window closed");
    wizardEventController.script_Cancelled();
  }
}

/* Called when user clicks OK to signify that PIN input is complete */
function onInputObjGetText(inputObjV, text, status) 
{
  if(wgssSignatureSDK.ResponseStatus.OK == status) 
  {
    print("Code entered: " + text);
    wizardEventController.script_Completed(true);
  }
  else
  {
    print("InputObj GetText error: " + status);
    wizardEventController.script_Cancelled();
  }
}