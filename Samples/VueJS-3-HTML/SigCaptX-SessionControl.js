/* **************************************************************************
  SigCaptX-SessionControl.js
   
  This file contains functions which are used for controlling the starting and stopping
  of the wizard session. It also contains the calls to the pad and screen definition
  functions in SigCaptX-Wizard-PadDefs.js 
  
  Copyright (c) 2022 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/


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
  
  if (imageBox != null)
  {
    if(null != imageBox.firstChild)
    {
      imageBox.removeChild(imageBox.firstChild);
    }
  }
  var timeout = setTimeout(timedDetect, TIMEOUT);
  
  // pass the starting service port  number as configured in the registry
  wgssSignatureSDK = new WacomGSS_SignatureSDK(onDetectRunning, SERVICEPORT);

  function timedDetect() 
  {
    if (wgssSignatureSDK.running) 
    {
      vue_app.userMsg("Signature SDK Service detected.");
      start();
    } 
    else 
    {
      vue_app.userMsg("Signature SDK Service not detected.");
    }
  }
  
  function onDetectRunning()
  {
    if (wgssSignatureSDK.running) 
    {
      vue_app.userMsg("Signature SDK Service detected.");
      clearTimeout(timeout);
      start();
    }
    else 
    {
      vue_app.userMsg("Signature SDK Service not detected.");
    }
  }

  function start()
  {
    if (wgssSignatureSDK.running) 
    {
      vue_app.userMsg("Checking components ...");
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
      vue_app.userMsg("SigCtl constructor error: " + status);
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
      vue_app.userMsg("DynCapt constructor error: " + status);
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
      vue_app.userMsg("SigCtl constructor error: " + status);
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
      vue_app.userMsg("SigCapt GetSignature error: " + status);
    }
  }

  function onGetSigCaptXVersion(version, status)
  {
    if(callbackStatusOK("SigCaptX GetVersion", status))
    {
      vue_app.userMsg("SigCaptX  v" + version);
      sigCtl.GetProperty("Component_FileVersion", onSigCtlGetFileVersion);
    }
  }
  
  function onSigCtlGetFileVersion(sigCtlV, property, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      vue_app.userMsg("DLL: flSigCOM.dll  v" + property.text);
      dynCapt.GetProperty("Component_FileVersion", onDynCaptGetFileVersion);
    }
    else
    {
      vue_app.userMsg("SigCtl GetProperty error: " + status);
    }
  }

  function onDynCaptGetFileVersion(dynCaptV, property, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      vue_app.userMsg("DLL: flSigCapt.dll v" + property.text);
      vue_app.userMsg("Test application ready.");
      vue_app.userMsg("Press 'Capture' or 'Start Wizard' to capture a signature.");
      if('function' === typeof callback)
      {
        callback();
      }
    }
    else
    {
      vue_app.userMsg("DynCapt GetProperty error: " + status);
    }
  }
  
  function onWizCtlGetProperty(wizCtlV, property, status)
  {
    if(callbackStatusOK("WizCtl GetProperty", status))
    {
      vue_app.userMsg("DLL: flWizCtl.dll v" + property.text);
      wizCtlTest.Close(onWizCtlClose);
    }
  }

  function onWizCtlClose(wizCtlV, status)
  {
    //We don't check the status for compatibility with older version
    //Older versions gave an error status when closing an idle WizCtl
    vue_app.userMsg("Test application ready.");
    vue_app.userMsg("Press 'Start Wizard' to capture a signature.");
    if('function' === typeof callback)
    {
      callback();
    }
  }
}
