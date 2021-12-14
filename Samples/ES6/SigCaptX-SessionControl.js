/* **************************************************************************
  SigCaptX-SessionControl.js
   
  This file contains functions which are used for controlling the starting and stopping
  of the wizard session. 
  
  Copyright (c) 2021 Wacom Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/

class WizSessionCtrl
{
	constructor()
	{
		timeout = null;
		this.width = 0;
	}
	
	static body_onload()
  {
		let userMsg = new UserMsg();    // Initialize the UserMsg class
    UserMsg.clearTextBox();         // Clear the user message box
		HTMLIds = new HTMLElementIds(); // Set up the references to the HTML elements for later use
	
    WizSessionCtrl.actionWhenRestarted();
  }
  
  static start_stop(numScreens)
  {
    if( scriptIsRunning ) 
    {
      WizSessionCtrl.stop();
    }
    else
    {
			WizSessionCtrl.setButtonTextType();   // Populate the global which indicates the button source
      WizSessionCtrl.wizardStart(numScreens);
    }
  }
  
  static setButtonTextType()
  {
		/* Decide what parameter to pass to setupDisplay1() in SigCaptX-Wizard-PadDisp1.js 
			 This depends on what the user has selected on the HTML form. Make sure the tags exist first */

		buttonTextType = textSource.STANDARD;
		
		if (HTMLIds.utf8 !== null)
		{
			if (HTMLIds.utf8.checked)
			{
				buttonTextType = textSource.UTF8;
			}
			else
			{
				if (HTMLIds.local.checked)
				{
					buttonTextType = textSource.LOCAL;
				}
				else
				{
					if (HTMLIds.remote.checked)
					{
						buttonTextType = textSource.REMOTE;
					}
				}
			}
		}
  }
  
  static stop()
  {
    if( !scriptIsRunning ) 
    {
      UserMsg.print("Script not running");
    }
    else
    {
      WizSessionCtrl.stopScript();
    }
  }
  
  static script_Completed(stopScriptNow)
  {
    UserMsg.print("Script completed");
    if (stopScriptNow)
    {
      WizSessionCtrl.stopScript();
    }
    else
    {
			UserMsg.print("Showing signature");
      sigDetails.showSignature();
    }
  }
  
  static script_Cancelled()
  {
    UserMsg.print("Script cancelled");
    WizSessionCtrl.stop();
  }
	
	static start_wizard = () =>
	{
		scriptIsRunning = true;
		wizCtl = new wgssSignatureSDK.WizCtl(WizSessionCtrl.onWizCtlConstructor);
	}
	
	// function called to start off the wizard session
	static wizardStart(numScreens)
	{
		numScreenDisplays = numScreens;
		
		if(!wgssSignatureSDK.running)
		{
			UserMsg.print("Session error. Restarting the session.");
			WizSessionCtrl.actionWhenRestarted(window.WizardStart);
			return;
		}
		else
		if(null !== wizCtl)
		{
			wizCtl.Close(WizSessionCtrl.onWizClose);
			return;
		}
		else
		{
			WizSessionCtrl.start_wizard();
		}
	}
		
	static onWizClose = (wizCtlV, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
		{
			UserMsg.print("Session error. Restarting the session.");
			WizSessionCtrl.actionWhenRestarted(window.WizardStart);
		}
		else
		{
			wizCtl = null;
			WizSessionCtrl.start_wizard();
		}
	}
		
	static onWizCtlConstructor = (wizCtlV, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{
			UserMsg.print("Enabling licence");
			wizCtl.PutLicence(LICENCEKEY, WizSessionCtrl.onWizCtlPutLicence);
		}
		else
		{
			UserMsg.print("WizCtl Constructor error: " + status);
			wizCtl = null;
			if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
			{
				UserMsg.print("Session error. Restarting the session.");
				WizSessionCtrl.actionWhenRestarted(window.WizardStart);
			}
		}
	}

	static onWizCtlPutLicence = (sigCtlV, status) =>
	{
		if(callbackStatusOK("WizCtl PutLicence", status) == true)
		{
			// Display the wizard mirror window on the PC screen if selected
			let visible = (true === HTMLIds.chkDisplayWizard.checked);
			wizCtl.PutVisibleWindow(visible, WizSessionCtrl.onPutVisibleWindow);
		}
	}
		
	static onPutVisibleWindow = (wizCtlV, status) =>
	{
		if(callbackStatusOK("WizCtl PutVisibleWindow", status) === true)
		{
			wizCtl.PadConnect(WizSessionCtrl.onPadConnect);  // Connect to pad
		}
	}
		
	static onPadConnect = (wizCtlV, connected, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status && connected)
		{
			wizCtl.GetPadWidth(WizSessionCtrl.onGetPadWidth);
		}
		else
		{
			UserMsg.print("Unable to make connection to the Pad. Check it is plugged in and try again.");
			wizCtl.Close(WizSessionCtrl.onErrorClose);
		}
	}
	
	static onErrorClose = (wizCtlG, status) =>
	{
		wizCtl = null;
	}
		
	static onGetPadWidth = (wizCtlV, padWidth, status) =>
	{
		if(callbackStatusOK("WizCtl GetPadWidth", status) === true)
		{
			this.width = padWidth;
			wizCtl.GetPadHeight(WizSessionCtrl.onGetPadHeight);
		}
	}
	
	static onGetPadHeight = (wizCtlV, padHeight, status) =>
	{
		if(wgssSignatureSDK.ResponseStatus.OK === status)
		{ 
			startDisplay(padHeight, this.width);
		}
		else
		{
			UserMsg.print("WizCtl PutVisibleWindow error: " + status);
		}
	}
	
	// Function to stop the wizard script
	static stopScript = () =>
	{
		scriptIsRunning = false;
		HTMLIds.btnStartStopWizard.value = "Start Wizard";
		if(null !== wizCtl)
		{
			wizCtl.Reset(WizSessionCtrl.onReset);
		}
	}
	
  static onReset = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl Reset", status))
    {
      wizCtl.Close(WizSessionCtrl.onClose);
    }
  }

  static onClose = (wizCtlV, status) =>
  {
    if(callbackStatusOK("WizCtl PadDisconnect", status))
    {
      wizCtl = null;
      UserMsg.print("Pad disconnected");
    }
  }
	
	/* This function is called if connection with the SigCaptX service has to be re-initiated 
	   because for whatever reason it has stopped or failed */
	static actionWhenRestarted = (callback) =>
	{
		// First reset all the global variables related to the capture session
		wgssSignatureSDK = null;
		sigObj = null;
		sigCtl = null;
		dynCapt = null;
		wizCtl = null;
		pad = null;

		// Remove any signature image which might still be displayed
		if (HTMLIds.imageBox !== null) 
		{
			if(null !== HTMLIds.imageBox.firstChild)
			{
				HTMLIds.imageBox.removeChild(HTMLIds.imageBox.firstChild);
			}
		}
		timeout = setTimeout(WizSessionCtrl.timedDetect, TIMEOUT);
		
		// pass the starting service port  number as configured in the registry
		wgssSignatureSDK = new WacomGSS_SignatureSDK(WizSessionCtrl.onDetectRunning, SERVICEPORT);
	}
	
  static timedDetect()
  {
    if (wgssSignatureSDK.running) 
    {
      UserMsg.print("Signature SDK Service detected.");
      start();
    } 
    else 
    {
      UserMsg.print("Signature SDK Service not detected.");
    }
  }
  
  static onDetectRunning()
  {
    if (wgssSignatureSDK.running) 
    {
      UserMsg.print("Signature SDK Service detected.");
      clearTimeout(timeout);
      WizSessionCtrl.start();
    }
    else 
    {
      UserMsg.print("Signature SDK Service not detected.");
    }
  }

  static start = () =>
  {
    if (wgssSignatureSDK.running) 
    {
      UserMsg.print("Checking components ...");
      sigCtl = new wgssSignatureSDK.SigCtl(WizSessionCtrl.onSigCtlConstructor);
    }
  }  

  static onSigCtlConstructor = (sigCtlV, status) =>
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status)
    {
			// Enable the licence on the sigCtl
      sigCtl.PutLicence(LICENCEKEY, WizSessionCtrl.onSigCtlPutLicence);
    }
    else
    {
      UserMsg.print("SigCtl constructor error: " + status);
    }
  }

  static onDynCaptConstructor = (dynCaptV, status) =>
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status)
    {
      sigCtl.GetSignature(WizSessionCtrl.onGetSignature);
    }
    else
    {
      UserMsg.print("DynCapt constructor error: " + status);
    }
  }
  
  static onSigCtlPutLicence = (sigCtlV, status) =>
  {
    if (wgssSignatureSDK.ResponseStatus.OK === status) 
    {
      dynCapt = new wgssSignatureSDK.DynamicCapture(WizSessionCtrl.onDynCaptConstructor);
    }
    else 
    {
      UserMsg.print("SigCtl constructor error: " + status);
    }
  }

  static onGetSignature = (sigCtlV, sigObjV, status) =>
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status)
    {
      sigObj = sigObjV;
      sigCtl.GetProperty("Component_FileVersion", WizSessionCtrl.onSigCtlGetFileVersion);
    }
    else
    {
      UserMsg.print("SigCapt GetSignature error: " + status);
    }
  }

  static onGetSigCaptXVersion = (version, status) =>
  {
    if(callbackStatusOK("SigCaptX GetVersion", status))
    {
      UserMsg.print("SigCaptX  v" + version);
      sigCtl.GetProperty("Component_FileVersion", WizSessionCtrl.onSigCtlGetFileVersion);
    }
  }
  
  static onSigCtlGetFileVersion = (sigCtlV, property, status) =>
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status)
    {
      UserMsg.print("DLL: flSigCOM.dll  v" + property.text);
      dynCapt.GetProperty("Component_FileVersion", WizSessionCtrl.onDynCaptGetFileVersion);
    }
    else
    {
      UserMsg.print("SigCtl GetProperty error: " + status);
    }
  }

  static onDynCaptGetFileVersion = (dynCaptV, property, status) =>
  {
    if(wgssSignatureSDK.ResponseStatus.OK === status)
    {
      UserMsg.print("DLL: flSigCapt.dll v" + property.text);
      UserMsg.print("Test application ready.");
      UserMsg.print("Press 'Capture' or 'Start Wizard' to capture a signature.");
      if('const' === typeof callback)
      {
        callback();
      }
    }
    else
    {
      UserMsg.print("DynCapt GetProperty error: " + status);
    }
  }
  
  static onWizCtlGetProperty = (wizCtlV, property, status) =>
  {
    if(callbackStatusOK("WizCtl GetProperty", status))
    {
      UserMsg.print("DLL: flWizCtl.dll v" + property.text);
      wizCtlV.Close(WizSessionCtrl.onWizCtlClose);
    }
  }

  static onWizCtlClose = (wizCtlV, status) =>
  {
    //We don't check the status for compatibility with older version
    //Older versions gave an error status when closing an idle WizCtl
    UserMsg.print("Test application ready.");
    UserMsg.print("Press 'Start Wizard' to capture a signature.");
    if('const' === typeof callback)
    {
      callback();
    }
  }
}




