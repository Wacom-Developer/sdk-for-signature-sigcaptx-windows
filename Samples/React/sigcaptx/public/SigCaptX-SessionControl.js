/* **************************************************************************
  SigCaptX-SessionControl.js
   
  This file contains functions which are used for controlling the starting and stopping
  of the wizard session. It also contains the calls to the pad and screen definition
  functions in SigCaptX-Wizard-PadDefs.js 
  
  Copyright (c) 2018 Wacom Co. Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/

function bodyOnLoad()
{
	clearTextBox();
	actionWhenRestarted();
	enableRestoreButton();
}
  
  
/* wizardEventController is the main event handler for the wizard script */
var wizardEventController =
{
  body_onload : function()
  {
    clearTextBox();
    actionWhenRestarted();
  },
  
  start_stop : function(numScreens)
  {
    if( scriptIsRunning ) 
    {
      wizardEventController.stop();
    }
    else
    {
      wizardStart(numScreens);
    }
  },
  
  stop : function()
  {
    if( !scriptIsRunning ) 
    {
      print("Script not running");
    }
    else
    {
      stopScript();
    }
  },
  
  script_Completed : function(stopScriptNow)
  {
    print("Script completed");
    if (stopScriptNow)
    {
      stopScript();
    }
    else
    {
      showSignature();
    }
  },
  
  script_Cancelled : function()
  {
    print("Script cancelled");
    wizardEventController.stop();
  }
}

// Function called to start off the wizard session
 function wizardStart(numScreens)
{
  numScreenDisplays = numScreens;
  
  if(!wgssSignatureSDK.running)
  {
    print("Session error. Restarting the session.");
    actionWhenRestarted(window.WizardStart);
    return;
  }
  
  if(null != wizCtl)
  {
    wizCtl.Close(onWizClose);
    return;
  }
  start_wizard();
  
  function onWizClose(wizCtlV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
    {
      print("Session error. Restarting the session.");
      actionWhenRestarted(window.WizardStart);
    }
    else
    {
      wizCtl = null;
      start_wizard();
    }
  }
  
  function start_wizard()
  {
    scriptIsRunning = true;
    wizCtl = new wgssSignatureSDK.WizCtl(onWizCtlConstructor);
  }
  
  function onWizCtlConstructor(wizCtlV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      var visible = (true == document.getElementById("chkDisplayWizard").checked);
      print("Enabling licence");
      wizCtl.PutLicence(LICENCEKEY, onWizCtlPutLicence);
    }
    else
    {
      print("WizCtl Constructor error: " + status);
      wizCtl = null;
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
      {
        print("Session error. Restarting the session.");
        actionWhenRestarted(window.WizardStart);
      }
    }
  }
  
  function onWizCtlPutLicence(sigCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutLicence", status) == true)
    {
      var visible = (true == document.getElementById("chkDisplayWizard").checked);
      wizCtl.PutVisibleWindow(visible, onPutVisibleWindow);
    }
  }
	
  function onPutVisibleWindow(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PutVisibleWindow", status) == true)
    {
      wizCtl.PadConnect(onPadConnect);
    }
  }
  
  function onPadConnect(wizCtlV, connected, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status && connected)
    {
      wizCtl.GetPadWidth(onGetPadWidth);
    }
    else
    {
      print("Unable to make connection to the Pad. Check it is plugged in and try again.");
      wizCtl.Close(onErrorClose);
    }
  }
  
  function onErrorClose(wizCtlG, status) 
  {
    wizCtl = null;
  }
  
  function onGetPadWidth(wizCtlV, padWidth, status)
  {
    if(callbackStatusOK("WizCtl GetPadWidth", status) == true)
    {
      width = padWidth;
      wizCtl.GetPadHeight(onGetPadHeight);
    }
  }
  
  function onGetPadHeight(wizCtlV, padHeight, status)
  {
    var buttonTextSource;
    var chkBoxSize;

    if(wgssSignatureSDK.ResponseStatus.OK == status)
    { 
      height = padHeight;

      /* If the user wants a large check box pass this as a parameter to CPad_STU in SigCaptX-Wizard-PadDefs.js */
      /* Note that this code is also used by the PIN pad sample which doesn't have the user options so make sure
         the tags exist first */
      
      if (document.getElementById("chkLargeCheckbox") != null)
      {
        if (document.getElementById("chkLargeCheckbox").checked)
        {
          chkBoxSize = checkSizeSelection.LARGE;
        }
        else
        {
          chkBoxSize = checkSizeSelection.STANDARD;
        }
      }
    
      pad = new CPad_STU(width, height, chkBoxSize);
      
      /* Decide what parameter to pass to Screen1() in SigCaptX-WizardCheckbox-PadDefs.js 
         This depends on what the user has selected on the HTML form. Make sure the tags exist first */
  
      if (document.getElementById("utf8") != null)
      {
        if (document.getElementById("utf8").checked)
        {
          buttonTextSource = textSource.UTF8;
        }
        else
        {
          if (document.getElementById("local").checked)
          {
            buttonTextSource = textSource.LOCAL;
          }
          else
          {
            if (document.getElementById("remote").checked)
            {
              buttonTextSource = textSource.REMOTE;
            }
            else
            {
              buttonTextSource = textSource.STANDARD;
            }
          }
        }
      }
      display_1 = new screen_Display1(pad, buttonTextSource);
      if (numScreenDisplays >= 2)
      {
        display_2 = new screen_Display2(pad, buttonTextSource);
      }
      if (numScreenDisplays >= 3)
      {
        display_3 = new screen_Display3(pad, buttonTextSource);
      }
      step1();
    }
    else
    {
      print("WizCtl PutVisibleWindow error: " + status);
    }
  }
}


/* This function is called if connection with the SigCaptX service has to be re-initiated because for whatever reason it has stopped or failed */
function actionWhenRestarted(callback) 
{
  wgssSignatureSDK = null;
  sigObj = null;
  sigCtl = null;
  dynCapt = null;
  wizCtl = null;
  pad = null;
  
  var wizCtlTest = null;
  var imageBox = document.getElementById("imageBox");
  
  if(null != imageBox.firstChild)
  {
    imageBox.removeChild(imageBox.firstChild);
  }
  var timeout = setTimeout(timedDetect, TIMEOUT);
  
  // pass the starting service port  number as configured in the registry
  wgssSignatureSDK = new WacomGSS_SignatureSDK(onDetectRunning, SERVICEPORT);

  function timedDetect() 
  {
    if (wgssSignatureSDK.running) 
    {
      print("Signature SDK Service detected.");
      start();
    } 
    else 
    {
      print("Signature SDK Service not detected.");
    }
  }
  
  function onDetectRunning()
  {
    if (wgssSignatureSDK.running) 
    {
      print("Signature SDK Service detected.");
      clearTimeout(timeout);
      start();
    }
    else 
    {
      print("Signature SDK Service not detected.");
    }
  }

  function start()
  {
    if (wgssSignatureSDK.running) 
    {
      print("Checking components ...");
      sigCtl = new wgssSignatureSDK.SigCtl(onSigCtlConstructor);
    }
  }  

  function onSigCtlConstructor(sigCtlV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      sigCtl.PutLicence(LICENCEKEY, onSigCtlPutLicence);
    }
    else
    {
      print("SigCtl constructor error: " + status);
    }
  }

  function onDynCaptConstructor(dynCaptV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      sigCtl.GetSignature(onGetSignature);
    }
    else
    {
      print("DynCapt constructor error: " + status);
    }
  }
  
  function onSigCtlPutLicence(sigCtlV, status) 
  {
    if (wgssSignatureSDK.ResponseStatus.OK == status) 
    {
      dynCapt = new wgssSignatureSDK.DynamicCapture(onDynCaptConstructor);
    }
    else 
    {
      print("SigCtl constructor error: " + status);
    }
  }

  function onWizCtlConstructor(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl constructor", status))
    {
      sigCtl.GetSignature(onGetSignature);
    }
  }

  function onGetSignature(sigCtlV, sigObjV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      sigObj = sigObjV;
      sigCtl.GetProperty("Component_FileVersion", onSigCtlGetFileVersion);
    }
    else
    {
      print("SigCapt GetSignature error: " + status);
    }
  }

  function onGetSigCaptXVersion(version, status)
  {
    if(callbackStatusOK("SigCaptX GetVersion", status))
    {
      print("SigCaptX  v" + version);
      sigCtl.GetProperty("Component_FileVersion", onSigCtlGetFileVersion);
    }
  }
  
  function onSigCtlGetFileVersion(sigCtlV, property, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      print("DLL: flSigCOM.dll  v" + property.text);
      dynCapt.GetProperty("Component_FileVersion", onDynCaptGetFileVersion);
    }
    else
    {
      print("SigCtl GetProperty error: " + status);
    }
  }

  function onDynCaptGetFileVersion(dynCaptV, property, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      print("DLL: flSigCapt.dll v" + property.text);
      print("Test application ready.");
      print("Press 'Capture' or 'Start Wizard' to capture a signature.");
      if('function' === typeof callback)
      {
        callback();
      }
    }
    else
    {
      print("DynCapt GetProperty error: " + status);
    }
  }
  
  function onWizCtlGetProperty(wizCtlV, property, status)
  {
    if(callbackStatusOK("WizCtl GetProperty", status))
    {
      print("DLL: flWizCtl.dll v" + property.text);
      wizCtlTest.Close(onWizCtlClose);
    }
  }

  function onWizCtlClose(wizCtlV, status)
  {
    //We don't check the status for compatibility with older version
    //Older versions gave an error status when closing an idle WizCtl
    print("Test application ready.");
    print("Press 'Start Wizard' to capture a signature.");
    if('function' === typeof callback)
    {
      callback();
    }
  }
}

// Function called to stop the wizard script
function stopScript()
{
  scriptIsRunning = false;
  document.getElementById("btnStartStopWizard").value = "Start Wizard";
  if(null != wizCtl)
  {
    wizCtl.Reset(onReset);
  }

  function onReset(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl Reset", status))
    {
      wizCtl.Close(onClose);
    }
  }

  function onClose(wizCtlV, status)
  {
    if(callbackStatusOK("WizCtl PadDisconnect", status))
    {
      wizCtl = null;
      print("Pad disconnected");
    }
  }
}