/* **************************************************************************
  SigCaptX-WizSessionCtrl.ts
   
  This file containss which are used for controlling the starting and stopping
  of the wizard session. It also contains the calls to the pad and screen definitions
  in SigCaptX-Wizard-PadDefs.js 
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { callbackStatusOK, print, clearTextBox, showSignature } from './SigCaptX-WizUtils';
import { checkSizeSelection, LICENCEKEY, SERVICEPORT, textSource } from './SigCaptX-Globals';
import { PadControl }  from './SigCaptX-Wizard-PadDefs';
import { WizardScreens }  from './SigCaptX-Wizard-Main.js';
import { HTMLTags } from './sigcaptx';

declare global {
  interface Window {
      dynCapt: any;
      numScreenDisplays:number;
      scriptIsRunning:boolean;
      sigCtl: any;
      sdkPtr: any;
      sigObj: any;
      width:number;
      wizCtl: any;
  }
}

declare var WacomGSS_SignatureSDK:any;

export class WizardEventController
{
  static body_onload()
  {
    clearTextBox();
    WizardEventController.actionWhenRestarted();
  }
    
  static start_stop(numScreens)
  {
    if( window.scriptIsRunning ) 
    {
      WizardEventController.stop();
    }
    else
    {
      WizardEventController.wizardStart(numScreens);
    }
  }

  static stop()
  {
    if( !window.scriptIsRunning ) 
    {
      print("Script not running");
    }
    else
    {
      WizardEventController.stopScript();
    }
  }
  
  static script_Completed(stopScriptNow)
  {
    print("Script completed");
    if (stopScriptNow)
    {
      WizardEventController.stopScript();
    }
    else
    {
      showSignature();
    }
  }
  
  static script_Cancelled()
  {
    print("Script cancelled");
    WizardEventController.stop();
  }

  // called to start off the wizard session
  static wizardStart = (numScreens) =>
  {
    window.numScreenDisplays = numScreens;
    
    if(!window.sdkPtr.running)
    {
      print("Session error. Restarting the session.");
      WizardEventController.actionWhenRestarted(WizardEventController.wizardStart);
      return;
    }
    
    if(null != window.wizCtl)
    {
      window.wizCtl.Close(WizardEventController.onWizClose);
      return;
    }
    WizardEventController.start_wizard();
  }

  static onWizClose = (wizCtlV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
    {
      print("Session error. Restarting the session.");
      WizardEventController.actionWhenRestarted(WizardEventController.wizardStart);
    }
    else
    {
      window.wizCtl = null;
      WizardEventController.start_wizard();
    }
  }

  static start_wizard = () =>
  {
    window.scriptIsRunning = true;
    window.wizCtl = new window.sdkPtr.WizCtl(WizardEventController.onWizCtlConstructor);
  }

  /* This is called if connection with the SigCaptX service has to be re-initiated because for whatever reason it has stopped or failed */
  static actionWhenRestarted = (callback ?) =>
  {
    window.sigObj = null;
    window.sigCtl = null;
    window.dynCapt = null;
    window.wizCtl = null;
    window.pad = null;
    
    if(null != HTMLTags.imageBox.firstChild)
    {
      HTMLTags.imageBox.removeChild(HTMLTags.imageBox.firstChild);
    }
    
    // pass the starting service port  number as configured in the registry
    console.log("Starting up WacomGSS_SignatureSDK");
    let wgssSignatureSDK = new WacomGSS_SignatureSDK(WizardEventController.onDetectRunning, SERVICEPORT);
  }

  static timedDetect = () =>
  {
    if (window.sdkPtr.running) 
    {
      print("Signature SDK Service detected.");
      WizardEventController.start();
    } 
    else 
    {
      print("Signature SDK Service not detected.");
    }
  }

  static onWizCtlConstructor = (wizCtlV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      var visible = (true == HTMLTags.chkDisplayWizard.checked);
      print("Enabling licence");
      window.wizCtl.PutLicence(LICENCEKEY, WizardEventController.onWizCtlPutLicence);
    }
    else
    {
      print("WizCtl Constructor error: " + status);
      window.wizCtl = null;
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        print("Session error. Restarting the session.");
        WizardEventController.actionWhenRestarted(WizardEventController.wizardStart);
      }
    }
  }

  static onWizCtlPutLicence = (sigCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PutLicence", status) == true)
    {
      //print("License set OK - now checking chkDisplayWizard");
      var visible = (true == HTMLTags.chkDisplayWizard.checked);
      window.wizCtl.PutVisibleWindow(visible, WizardEventController.onPutVisibleWindow);
    }
  }
    
  static onPutVisibleWindow = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PutVisibleWindow", status) == true)
    {
      window.wizCtl.PadConnect(WizardEventController.onPadConnect);
    }
  }

  static onPadConnect = (wizCtlV, connected, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status && connected)
    {
      window.wizCtl.GetPadWidth(WizardEventController.onGetPadWidth);
    }
    else
    {
      print("Unable to make connection to the Pad. Check it is plugged in and try again.");
      window.wizCtl.Close(WizardEventController.onErrorClose);
    }
  }

  static onErrorClose = (wizCtlG, status) =>
  {
    window.wizCtl = null;
  }

  static onGetPadWidth = (wizCtlV, padWidth, status) =>
  {
    if(callbackStatusOK("WizCtl GetPadWidth", status) == true)
    {
      window.width = padWidth;
      window.wizCtl.GetPadHeight(WizardEventController.onGetPadHeight);
    }
  }
    
  static onGetPadHeight = (wizCtlV, padHeight, status) =>
  {
    var buttonTextSource;
    var chkBoxSize;

    if(window.sdkPtr.ResponseStatus.OK == status)
    { 
      /* If the user wants a large check box pass this as a parameter to CPad_STU in SigCaptX-Wizard-PadDefs.js */
      /* Note that this code is also used by the PIN pad sample which doesn't have the user options so make sure
          the tags exist first */
      
      if (HTMLTags.chkLargeCheckbox != null)
      {
        if (HTMLTags.chkLargeCheckbox.checked)
        {
          chkBoxSize = checkSizeSelection.LARGE;
        }
        else
        {
          chkBoxSize = checkSizeSelection.STANDARD;
        }
      }
          
      /* Decide what parameter to pass to Screen1() in SigCaptX-WizardCheckbox-PadDefs.js 
          This depends on what the user has selected on the HTML form. Make sure the tags exist first */

      if (HTMLTags.utf8ButtonText != null)
      {
        if (HTMLTags.utf8ButtonText.checked)
        {
          buttonTextSource = textSource.UTF8;
        }
        else
        {
          if (HTMLTags.remoteImages.checked)
          {
            buttonTextSource = textSource.REMOTE;
          }
          else
          {
            buttonTextSource = textSource.STANDARD;
          }
        }
      }

      window.pad = new PadControl(window.width, padHeight, chkBoxSize, window.numScreenDisplays, buttonTextSource);

      //print("Calling screen1 with button source " + buttonTextSource);
      let wizardScreenSequence = new WizardScreens(window.pad, buttonTextSource);
      wizardScreenSequence.step1();
    }
    else
    {
      print("WizCtl PutVisibleWindow error: " + status);
    }
  }

  static onDetectRunning = () =>
  {
    if (window.sdkPtr.running) 
    {
      print("Signature SDK Service detected.");
      //clearTimeout(timeout);
      print("Starting...")
      WizardEventController.start();
    }
    else 
    {
      print("Signature SDK Service not detected.");
    }
  }

  static start = () =>
  {
    if (window.sdkPtr.running) 
    {
      print("Checking components ...");
      window.sigCtl = new window.sdkPtr.SigCtl(WizardEventController.start_onSigCtlConstructor);
    }
  }    

  static start_onSigCtlConstructor = (sigCtlV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      sigCtlV.PutLicence(LICENCEKEY, WizardEventController.start_onSigCtlPutLicence);
    }
    else
    {
      print("SigCtl constructor error: " + status);
    }
  }

  static start_onDynCaptConstructor = (dynCaptV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      window.sigCtl.GetSignature(WizardEventController.start_onGetSignature);
    }
    else
    {
      print("DynCapt constructor error: " + status);
    }
  }

  static start_onSigCtlPutLicence = (sigCtlV, status) =>
  {
    if (window.sdkPtr.ResponseStatus.OK == status) 
    {
      window.dynCapt = new window.sdkPtr.DynamicCapture(WizardEventController.start_onDynCaptConstructor);
    }
    else 
    {
      print("SigCtl constructor error: " + status);
    }
  }

  start_onWizCtlConstructor = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl constructor", status))
    {
      window.sigCtl.GetSignature(WizardEventController.start_onGetSignature);
    }
  }

  static start_onGetSignature = (sigCtlV, sigObjV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      window.sigObj = sigObjV;
      sigCtlV.GetProperty("Component_FileVersion", WizardEventController.start_onSigCtlGetFileVersion);
    }
    else
    {
      print("SigCapt GetSignature error: " + status);
    }
  }

  static start_onGetSigCaptXVersion = (version, status) =>
  {
    if(callbackStatusOK("SigCaptX GetVersion", status))
    {
      print("SigCaptX  v" + version);
      window.sigCtl.GetProperty("Component_FileVersion", WizardEventController.start_onSigCtlGetFileVersion);
    }
  }

  static start_onSigCtlGetFileVersion = (sigCtlV, property, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      print("DLL: flSigCOM.dll  v" + property.text);
      window.dynCapt.GetProperty("Component_FileVersion", WizardEventController.start_onDynCaptGetFileVersion);
    }
    else
    {
      print("SigCtl GetProperty error: " + status);
    }
  }

  static start_onDynCaptGetFileVersion = (dynCaptV, property, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      print("DLL: flSigCapt.dll v" + property.text);
      print("Test application ready.");
      print("Press 'Start Wizard' to capture a signature.");
    }
    else
    {
      print("DynCapt GetProperty error: " + status);
    }
  }

  // called to stop the wizard script
  static stopScript = () =>
  {
    window.scriptIsRunning = false;
    
    HTMLTags.btnStartStop.value = "Start Wizard";
    if(null != window.wizCtl)
    {
      window.wizCtl.Reset(WizardEventController.onReset);
    }
  }
  static onReset = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Reset", status))
    {
      window.wizCtl.Close(WizardEventController.onClose);
    }
  }

  static onClose = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PadDisconnect", status))
    {
      window.wizCtl = null;
      print("Pad disconnected");
    }
  }
}


