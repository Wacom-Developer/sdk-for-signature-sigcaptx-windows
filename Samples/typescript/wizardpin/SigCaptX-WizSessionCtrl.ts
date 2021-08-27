/* **************************************************************************
  SigCaptX-WizSessionCtrl.ts
   
  This file containss which are used for controlling the starting and stopping
  of the wizard session. It also contains the calls to the pad and screen definitions
  in SigCaptX-WizardPINPad-PadDefs.js 
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { callbackStatusOK, print, clearTextBox } from './SigCaptX-WizUtils';
import { LICENCEKEY, SERVICEPORT } from './SigCaptX-Globals';
import { PadControl }  from './SigCaptX-WizardPINPad-PadDefs';
import { PINScreen }  from './SigCaptX-WizardPINPad-Step1';

declare global {
  interface Window {
      numScreenDisplays:number;
      pad:any;
      scriptIsRunning:boolean;
      sigCtl: any;
      sdkPtr: any;
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
    window.sigCtl = null;
    window.wizCtl = null;
    window.pad = null;

    var imageBox = document.getElementById("imageBox");
    
    if(null != imageBox.firstChild)
    {
      imageBox.removeChild(imageBox.firstChild);
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
      var visible = (true == (<HTMLInputElement>document.getElementById("chkDisplayWizard")).checked);
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
      var visible = (true == (<HTMLInputElement>document.getElementById("chkDisplayWizard")).checked);
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
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      window.pad = new PadControl(window.width, padHeight); // See SigCaptX-WizardPINPad-PadDefs
      let wizardScreenSequence = new PINScreen(window.pad);
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

  static start_onSigCtlPutLicence = (sigCtlV, status) =>
  {
    if (window.sdkPtr.ResponseStatus.OK == status) 
    {
      sigCtlV.GetProperty("Component_FileVersion", WizardEventController.start_onSigCtlGetFileVersion);
    }
    else 
    {
      print("SigCtl constructor error: " + status);
    }
  }

  static start_onSigCtlGetFileVersion = (sigCtlV, property, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      print("DLL: flSigCOM.dll  v" + property.text);
      window.wizCtl = new window.sdkPtr.WizCtl(WizardEventController.start_onWizCtlConstructor);
    }
    else
    {
      print("SigCtl GetProperty error: " + status);
    }
  }

  static start_onWizCtlConstructor = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl constructor", status))
    {
      wizCtlV.GetProperty("Component_FileVersion", WizardEventController.start_onWizCtlGetFileVersion);
    }
  }

  static start_onWizCtlGetFileVersion = (WizCtlV, property, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      print("DLL: flWizCOM.dll v" + property.text);
      print("Test application ready.");
      print("Press 'Start Wizard' to capture a signature.");
    }
    else
    {
      print("WizCtl GetProperty error: " + status);
    }
  }

  // called to stop the wizard script
  static stopScript = () =>
  {
    window.scriptIsRunning = false;
    
    (<HTMLInputElement>document.getElementById("btnStartStopWizard")).value = "Start Wizard";
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


