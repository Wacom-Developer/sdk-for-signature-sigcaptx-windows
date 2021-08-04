/* **************************************************************************
  SigCaptX-CaptSessionCtrl.ts
   
  This Typescript file contains statics to start up the connection with the SigCaptX service. 
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { LICENCEKEY, SERVICEPORT } from './SigCaptX-Globals';
import { HTMLTags, SigCapture, Utils } from './sigcaptx';

declare global {
  interface Window {
      AboutBox: any;
      Capture:any;
      displaySignatureDetails: any;
      ClearSignature: any;
      SetSignatureText: any;
      VerifySig: any;
      sdkPtr: any;  
    }
}

declare var WacomGSS_SignatureSDK:any;

export class SessionControl
{
  /* This static is called if connection with the SigCaptX service has to be re-initiated because for whatever reason it has stopped or failed */
  static actionWhenRestarted() 
  {
    SigCapture.sigCtl = null;
    SigCapture.dynCapt = null;
    
    if(null != HTMLTags.imageBox.firstChild)
    {
      HTMLTags.imageBox.removeChild(HTMLTags.imageBox.firstChild);
    }
    //let timeout = setTimeout(timedDetect, TIMEOUT);
    
    // pass the starting service port  number as configured in the registry
    console.log("Starting up WacomGSS_SignatureSDK");
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
      //clearTimeout(timeout);
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
    //print("checking if SDK is running: " + wgssSignatureSDK.running);
    if (window.sdkPtr.running) 
    {
      Utils.print("Checking components ...");
      SigCapture.sigCtl = new window.sdkPtr.SigCtl(SessionControl.onSigCtlConstructor);
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
      SigCapture.sigCtl.GetSignature(SessionControl.onGetSignature);
    }
  }
    
  static onSigCtlPutLicence(sigCtlV, status) 
  {
    if(Utils.callbackStatusOK("SigCtl PutLicence", status))
    {
      SigCapture.dynCapt = new window.sdkPtr.DynamicCapture(SessionControl.onDynCaptConstructor);
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
      SigCapture.sigCtl.GetProperty("Component_FileVersion", SessionControl.onSigCtlGetFileVersion);
    }
  }
    
  static onSigCtlGetFileVersion(sigCtlV, property, status)
  {
    if(Utils.callbackStatusOK("SigCtl GetProperty", status))
    {
      Utils.print("DLL: flSigCOM.dll  v" + property.text);
      SigCapture.dynCapt.GetProperty("Component_FileVersion", SessionControl.onDynCaptGetFileVersion);
    }
  }

  static onDynCaptGetFileVersion(dynCaptV, property, status)
  {
    if(Utils.callbackStatusOK("DynCapt GetProperty", status))
    {
      Utils.print("DLL: flSigCapt.dll v" + property.text);
      Utils.print("Test application ready.");
      Utils.print("Press 'Capture' to capture a signature.");
      /*
      if('static' === typeof callback)
      {
        callback();
      }
      */
    }
  }
}