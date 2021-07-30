/* **************************************************************************
  SigCaptX-SessionControl.ts
   
  This Typescript file contains functions to start up the connection with the SigCaptX service. 
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { LICENCEKEY, SERVICEPORT, TIMEOUT } from './SigCaptX-Globals';
import { SigCapture } from './capture';
import { WacomGSS_SignatureSDK, JSONreq } from './wgssSigCaptX';

declare global {
  interface window {
      JSONreq: any;
      sdkPtr: any;  
    }
}

export class SessionControl
{
  static timeout: any;

  /* This static is called if connection with the SigCaptX service has to be re-initiated because for whatever reason it has stopped or failed */
  static actionWhenRestarted() 
  {
    SigCapture.sigCtl = null;
    SigCapture.dynCapt = null;
    
    if(null != SigCapture.HTMLTagIds.imageBox.firstChild)
    {
      SigCapture.HTMLTagIds.imageBox.removeChild(SigCapture.HTMLTagIds.imageBox.firstChild);
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
      SigCapture.print("Signature SDK Service detected.");
      SessionControl.start();
    } 
    else 
    {
      SigCapture.print("Signature SDK Service not detected.");
    }
  }
    
  static onDetectRunning()
  {
    if (window.sdkPtr.running) 
    {
      SigCapture.print("Signature SDK Service detected.");
      clearTimeout(this.timeout);
      SigCapture.print("Starting...")
      SessionControl.start();
    }
    else 
    {
      SigCapture.print("Signature SDK Service not detected.");
    }
  }

  static start()
  {
    if (window.sdkPtr.running) 
    {
      SigCapture.print("Checking components ...");
      SigCapture.sigCtl = new window.sdkPtr.SigCtl(SessionControl.onSigCtlConstructor);
    }
  }    
    
  static onSigCtlConstructor(sigCtlV, status)
  {
    if(SigCapture.callbackStatusOK("SigCtl Constructor", status))
    {
      sigCtlV.PutLicence(LICENCEKEY, SessionControl.onSigCtlPutLicence);
    }
  }

  static onDynCaptConstructor(dynCaptV, status)
  {
    if(SigCapture.callbackStatusOK("DynCapt Constructor", status))
    {
      SigCapture.sigCtl.GetSignature(SessionControl.onGetSignature);
    }
  }
    
  static onSigCtlPutLicence(sigCtlV, status) 
  {
    if(SigCapture.callbackStatusOK("SigCtl PutLicence", status))
    {
      SigCapture.dynCapt = new window.sdkPtr.DynamicCapture(SessionControl.onDynCaptConstructor);
    }
  }

  static onGetSignature(sigCtlV, sigObjV, status)
  {
    if(SigCapture.callbackStatusOK("SigCapt GetSignature", status))
    {
      sigCtlV.GetProperty("Component_FileVersion", SessionControl.onSigCtlGetFileVersion);
    }
  }

  static onGetSigCaptXVersion(version, status)
  {
    if(SigCapture.callbackStatusOK("SigCaptX GetVersion", status))
    {
      SigCapture.print("SigCaptX  v" + version);
      SigCapture.sigCtl.GetProperty("Component_FileVersion", SessionControl.onSigCtlGetFileVersion);
    }
  }
    
  static onSigCtlGetFileVersion(sigCtlV, property, status)
  {
    if(SigCapture.callbackStatusOK("SigCtl GetProperty", status))
    {
      SigCapture.print("DLL: flSigCOM.dll  v" + property.text);
      SigCapture.dynCapt.GetProperty("Component_FileVersion", SessionControl.onDynCaptGetFileVersion);
    }
  }

  static onDynCaptGetFileVersion(dynCaptV, property, status)
  {
    if(SigCapture.callbackStatusOK("DynCapt GetProperty", status))
    {
      SigCapture.print("DLL: flSigCapt.dll v" + property.text);
      SigCapture.print("Test application ready.");
      SigCapture.print("Press 'Capture' to capture a signature.");
      /*
      if('static' === typeof callback)
      {
        callback();
      }
      */
    }
  }
}