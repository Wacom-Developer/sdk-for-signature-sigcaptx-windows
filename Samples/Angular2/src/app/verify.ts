/* **************************************************************************
  verify.ts
   
  This file contains the source code for verifying the signature by means of
  the hash which was calculated when it was originally captured.
  The "verify()" function is activated by the click event on the 
  "Verify" button on the form as defined in btnverify.html
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';
import { SigCapture } from "./capture";
import { SessionControl } from './SigCaptX-SessionControl';

@Component({
    selector: 'btn-verify',
    templateUrl: './btnverify.html'
  })
  
  export class VerifySig
  {
    verify()
    {
      console.log("Verifying");
      VerifySig.verifySignedData();
    }
  
   // This function recalculates the hash value from the first and last names
    // and checks it against the hash embedded in the signature object
    static verifySignedData = () =>
    {
      SigCapture.print("Verifying signed data...");
      if(null == SigCapture.sigObj)
      {
        SessionControl.actionWhenRestarted();
        return;
      }
      SigCapture.hash = null;
      SigCapture.sigObj.GetIsCaptured(VerifySig.onGetIsCaptured);
    }
      
    static onGetIsCaptured = (sigObj, isCaptured, status) =>
    {
      if(window.sdkPtr.ResponseStatus.OK == status) 
      {
        if(!isCaptured)
        {
          SigCapture.print("No signature has been captured yet." );
          return;
        }
        sigObj.GetWho(VerifySig.onGetWho);
      }
      else 
      {
        SigCapture.print("Signature GetWho error: " + status);
        if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
        {
          SigCapture.print("Session error. Restarting the session.");
          SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.ts
        }
      }
    }
  
    static onGetWho = (sigObjV, who, status) =>
    {
      if(SigCapture.callbackStatusOK("Signature GetWho", status))
      {
        SigCapture.print("  Name:   " + who);
        var tz = window.sdkPtr.TimeZone.TimeLocal;
        SigCapture.sigObj.GetWhen(tz, VerifySig.onGetWhen);
      } 
    }
    
    static onGetWhen = (sigObjV, when, status) =>
    {
      if(SigCapture.callbackStatusOK("Signature GetWhen", status)) 
      {
        SigCapture.print("  Date:   " + when.toString() );
        SigCapture.sigObj.GetWhy(VerifySig.onGetWhy);
      } 
    }
    
    static onGetWhy = (sigObjV, why, status) =>
    {
      if(SigCapture.callbackStatusOK("Signature GetWhy", status))
      {
        SigCapture.print("  Reason: " + why);
      }
    }  
  
    onGetHashForVerification = () =>
    {
      SigCapture.sigObj.CheckSignedData(SigCapture.hash, this.onCheckSignedData);
    }
      
    onCheckSignedData = (hash, status) =>
    {
      SigCapture.print("Verify result: " + status);
      if(window.sdkPtr.SignedData.DataGood == status)
      {
        SigCapture.print("Signed Data OK");
      }
      else
      {
        SigCapture.print("Signed Data Has Changed");
      }
    }
  }