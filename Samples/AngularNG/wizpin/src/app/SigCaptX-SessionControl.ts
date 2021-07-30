/* **************************************************************************
  SigCaptX-SessionControl.ts
   
  This Typescript file contains static functions to start up the connection with the SigCaptX service
  and to start and stop the wizard script
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { HTMLTags } from 'src/main';
import { checkSizeSelection, LICENCEKEY, SERVICEPORT, textSource, TIMEOUT } from './SigCaptX-Globals';
import { Utils } from './SigCaptX-Utils';
import {  WizPinScreen } from './SigCaptX-WizardPINPad-Step1';
import { PadDefs, screen_Display1 } from './SigCaptX-WizardPINPad-PadDefs';
import { WacomGSS_SignatureSDK, JSONreq } from './wgssSigCaptX';

declare global {
  interface window {
      JSONreq: any;
      scriptIsRunning: boolean;
      sdkPtr: any;  
      wizCtl: any;
    }
}

export class SessionControl
{
  static timeout: any;
	
	/* wizardEventController is the main event handler for the wizard script */
	
  static body_onload()
  {
    Utils.clearTextBox();
    SessionControl.actionWhenRestarted();
  }
  
  static start_stop()
  {
    if( window.scriptIsRunning ) 
    {
      SessionControl.stop();
    }
    else
    {
      SessionControl.wizardStart();
    }
  }
  
  static stop()
  {
    if( !window.scriptIsRunning ) 
    {
      Utils.print("Script not running");
    }
    else
    {
      SessionControl.stopScript();
    }
  }
  
  static script_Completed(stopScriptNow)
  {
    Utils.print("Script completed");
    if (stopScriptNow)
    {
      SessionControl.stopScript();
    }
    else
    {
      Utils.showSignature();
    }
  }
  
  static script_Cancelled()
  {
    Utils.print("Script cancelled");
    SessionControl.stop();
  }


	// static called to start off the wizard session
	static wizardStart()
	{
		if(!window.sdkPtr.running)
		{
			Utils.print("Session error. Restarting the session.");
			SessionControl.actionWhenRestarted();
			return;
		}
		
		if(null != window.wizCtl)
		{
			window.wizCtl.Close(SessionControl.onWizClose);
			return;
		}
		SessionControl.start_wizard();
	}
  
  static onWizClose(wizCtlV, status)
  {
    if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
    {
      Utils.print("Session error. Restarting the session.");
      SessionControl.actionWhenRestarted();
    }
    else
    {
      window.wizCtl = null;
      SessionControl.start_wizard();
    }
  }
  
  static start_wizard()
  {
    window.scriptIsRunning = true;
    window.wizCtl = new window.sdkPtr.WizCtl(SessionControl.onWizCtlConstructor);
  }
  
  static onWizCtlConstructor(wizCtlV, status)
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      var visible = (HTMLTags.checkDisplayWizard.checked);
      Utils.print("Enabling licence");
      wizCtlV.PutLicence(LICENCEKEY, SessionControl.onWizCtlPutLicence);
    }
    else
    {
      Utils.print("WizCtl Constructor error: " + status);
      window.wizCtl = null;
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        Utils.print("Session error. Restarting the session.");
        SessionControl.actionWhenRestarted();
      }
    }
  }
  
  static onWizCtlPutLicence(sigCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutLicence", status) === true)
    {
      var visible = (true == HTMLTags.checkDisplayWizard.checked);
      window.wizCtl.PutVisibleWindow(visible, SessionControl.onPutVisibleWindow);
    }
  }
	
  static onPutVisibleWindow(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PutVisibleWindow", status) === true)
    {
      window.wizCtl.PadConnect(SessionControl.onPadConnect);
    }
  }
  
  static onPadConnect(wizCtlV, connected, status)
  {
    if(window.sdkPtr.ResponseStatus.OK == status && connected)
    {
      window.wizCtl.GetPadWidth(SessionControl.onGetPadWidth);
    }
    else
    {
      Utils.print("Unable to make connection to the Pad. Check it is plugged in and try again.");
      window.wizCtl.Close(SessionControl.onErrorClose);
    }
  }
  
  static onErrorClose(wizCtlG, status) 
  {
    window.wizCtl = null;
  }
  
  static onGetPadWidth(wizCtlV, padWidth, status)
  {
    if(Utils.callbackStatusOK("WizCtl GetPadWidth", status) == true)
    {
      window.width = padWidth;
      window.wizCtl.GetPadHeight(SessionControl.onGetPadHeight);
    }
  }
  
  static onGetPadHeight(wizCtlV, padHeight, status)
  {
    var buttonTextSource;
    var chkBoxSize;

    if(window.sdkPtr.ResponseStatus.OK == status)
    { 
      window.height = padHeight;

      /* If the user wants a large check box pass this as a parameter to CPad_STU in SigCaptX-Wizard-PadDefs.js */
      /* Note that this code is also used by the PIN pad sample which doesn't have the user options so make sure
         the tags exist first */
      
      if (HTMLTags.checkLargeCheckBox != null)
      {
        if (HTMLTags.checkLargeCheckBox.checked)
        {
          chkBoxSize = checkSizeSelection.LARGE;
        }
        else
        {
          chkBoxSize = checkSizeSelection.STANDARD;
        }
      }
    
      window.pad = new PadDefs(window.width, window.height);
      
      /* Decide what parameter to pass to Screen1() in SigCaptX-WizardCheckbox-PadDefs.js 
         This depends on what the user has selected on the HTML form. Make sure the tags exist first */
  
      if (HTMLTags.radioUTF8 != null)
      {
        if (HTMLTags.radioUTF8.checked)
        {
          buttonTextSource = textSource.UTF8;
        }
        else
        {
          if (HTMLTags.radioRemote.checked)
          {
            buttonTextSource = textSource.REMOTE;
          }
          else
          {
            buttonTextSource = textSource.STANDARD;
          }
        }
      }
      window.display_1 = new screen_Display1(window.pad);
      WizPinScreen.step1();
    }
    else
    {
      Utils.print("WizCtl PutVisibleWindow error: " + status);
    }
  }

  /* This static is called if connection with the SigCaptX service has to be re-initiated because for whatever reason it has stopped or failed */
  static actionWhenRestarted() 
  {
    window.sigCtl = null;
    window.dynCapt = null;
    
    if(null != HTMLTags.imageBox.firstChild)
    {
      HTMLTags.imageBox.removeChild(HTMLTags.imageBox.firstChild);
    }
    this.timeout = setTimeout(SessionControl.timedDetect, TIMEOUT);
    
    // pass the starting service port  number as configured in the registry
    console.log("Starting up WacomGSS_SignatureSDK");
    window.JSONreq = JSONreq;

    let wgssSignatureSDK = new WacomGSS_SignatureSDK(SessionControl.onDetectRunning, SERVICEPORT);
    window.sdkPtr = wgssSignatureSDK;
  }

  static timedDetect() 
  {
    if (window.sdkPtr.running) 
    {
      Utils.print("Signature SDK Service detected.");
      SessionControl.start();
    } 
    else 
    {
      Utils.print("Signature SDK Service not detected.");
    }
  }
    
  static onDetectRunning()
  {
    if (window.sdkPtr.running) 
    {
      Utils.print("Signature SDK Service detected.");
      clearTimeout(SessionControl.timeout);
      Utils.print("Starting...")
      SessionControl.start();
    }
    else 
    {
      Utils.print("Signature SDK Service not detected.");
    }
  }

  static start()
  {
    if (window.sdkPtr.running) 
    {
      Utils.print("Checking components ...");
      window.sigCtl = new window.sdkPtr.SigCtl(SessionControl.onSigCtlConstructor);
    }
  }    
    
  static onSigCtlConstructor(sigCtlV, status)
  {
    if(Utils.callbackStatusOK("SigCtl Constructor", status))
    {
      sigCtlV.PutLicence(LICENCEKEY, SessionControl.onSigCtlPutLicence);
    }
  }

  static onDynCaptConstructor(dynCaptV, status)
  {
    if(Utils.callbackStatusOK("DynCapt Constructor", status))
    {
      window.sigCtl.GetSignature(SessionControl.onGetSignature);
    }
  }
    
  static onSigCtlPutLicence(sigCtlV, status) 
  {
    if(Utils.callbackStatusOK("SigCtl PutLicence", status))
    {
      window.dynCapt = new window.sdkPtr.DynamicCapture(SessionControl.onDynCaptConstructor);
    }
  }

  static onGetSignature(sigCtlV, sigObjV, status)
  {
    if(Utils.callbackStatusOK("SigCapt GetSignature", status))
    {
      sigCtlV.GetProperty("Component_FileVersion", SessionControl.onSigCtlGetFileVersion);
    }
  }

  static onGetSigCaptXVersion(version, status)
  {
    if(Utils.callbackStatusOK("SigCaptX GetVersion", status))
    {
      Utils.print("SigCaptX  v" + version);
      window.sigCtl.GetProperty("Component_FileVersion", SessionControl.onSigCtlGetFileVersion);
    }
  }
    
  static onSigCtlGetFileVersion(sigCtlV, property, status)
  {
    if(Utils.callbackStatusOK("SigCtl GetProperty", status))
    {
      Utils.print("DLL: flSigCOM.dll  v" + property.text);
      window.dynCapt.GetProperty("Component_FileVersion", SessionControl.onDynCaptGetFileVersion);
    }
  }

  static onDynCaptGetFileVersion(dynCaptV, property, status)
  {
    if(Utils.callbackStatusOK("DynCapt GetProperty", status))
    {
      Utils.print("DLL: flSigCapt.dll v" + property.text);
      Utils.print("Test application ready.");
      Utils.print("Press 'Start Wizard' to enter your PIN");
      /*
      if('static' === typeof callback)
      {
        callback();
      }
      */
    }
  }

  // Function called to stop the wizard script
  static stopScript()
  {
    window.scriptIsRunning = false;
    var btnStartStop = (<HTMLInputElement>document.getElementById("btnStartStopWizard"));
    btnStartStop.value = "Start Wizard";
    if(null != window.wizCtl)
    {
      window.wizCtl.Reset(SessionControl.onReset);
    }
  }
  static onReset(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl Reset", status))
    {
      window.wizCtl.Close(SessionControl.onClose);
    }
  }

  static onClose(wizCtlV, status)
  {
    if(Utils.callbackStatusOK("WizCtl PadDisconnect", status))
    {
      window.wizCtl = null;
      Utils.print("Pad disconnected");
    }
  }
}